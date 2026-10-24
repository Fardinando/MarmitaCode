import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderEmails } from '@/lib/notifications/email';
import { appendOrderToSheet } from '@/lib/notifications/sheets';
import { rateLimit } from '@/lib/rate-limit';
import { isValidEmail, isValidPhoneBR } from '@/lib/validation';
import { createOrderPreference, mpEnabled } from '@/lib/payments/mercadopago';
import type { Briefing, Tier } from '@/lib/types';

const ALLOWED_TIERS: Tier[] = ['basico', 'intermediario', 'premium', 'personalizado'];

// Mesmos valores do catálogo do wizard, validados aqui no server
// pra o cliente não poder "zerar" os extras no payload.
const EXTRAS_SERVER: Record<string, number> = {
  'db-login': 30,
  'video-host': 25,
  'payment-api': 20,
  'admin-area': 40,
  'other': 0,
};

interface OrderBody {
  templateSlug?: string | null;
  tier: Tier;
  briefing: Briefing;
  contact: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  wantsDomain?: boolean | null;
  discountCode?: string | null;
  setupPrice?: number;
  monthlyPrice?: number;
  extras?: string[];
}

function clientIp(req: Request) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function validate(body: OrderBody): string | null {
  if (!body || typeof body !== 'object') return 'Dados inválidos.';
  if (!body.tier || !ALLOWED_TIERS.includes(body.tier)) return 'Plano inválido.';
  if (!body.contact || typeof body.contact !== 'object') return 'Contato ausente.';
  const name = (body.contact.name ?? '').trim();
  const email = (body.contact.email ?? '').trim();
  if (name.length < 2 || name.length > 120) return 'Nome inválido.';
  if (!isValidEmail(email)) return 'E-mail inválido.';
  if (body.contact.phone && !isValidPhoneBR(body.contact.phone)) {
    return 'Telefone inválido. Use DDD + número.';
  }
  if (body.discountCode && String(body.discountCode).length > 60) {
    return 'Cupom inválido.';
  }
  if (body.extras && !Array.isArray(body.extras)) return 'Extras inválidos.';
  if (body.extras && body.extras.length > 10) return 'Extras inválidos.';
  const briefing = body.briefing ?? {};
  const briefingSize = JSON.stringify(briefing).length;
  if (briefingSize > 20_000) return 'Briefing muito grande.';
  return null;
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    const rl = rateLimit(`orders:${ip}`, 5, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Muitas tentativas. Tente em ${rl.retryAfter}s.` },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      );
    }

    const body = (await req.json()) as OrderBody;
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const admin = createAdminClient();

    let template: { id: string; slug: string } | null = null;
    let setupPrice = Number(body.setupPrice ?? 0);
    let baseMonthly = Number(body.monthlyPrice ?? 0);

    if (body.templateSlug) {
      const { data: t } = await admin
        .from('templates')
        .select('id, slug')
        .eq('slug', body.templateSlug)
        .single();

      if (t) {
        template = t;
        const { data: tierRow } = await admin
          .from('template_tiers')
          .select('setup_price, monthly_price')
          .eq('template_id', t.id)
          .eq('tier', body.tier)
          .single();
        if (tierRow) {
          setupPrice = Number(tierRow.setup_price);
          baseMonthly = Number(tierRow.monthly_price);
        }
      }
    }

    // Calcula adicional de extras SEM confiar no payload do cliente.
    const extrasList = Array.isArray(body.extras) ? body.extras : [];
    const extrasMonthlyAdd = extrasList.reduce(
      (sum, k) => sum + (EXTRAS_SERVER[k] ?? 0),
      0
    );
    const monthlyPrice = baseMonthly + extrasMonthlyAdd;

    let discountAmount = 0;
    if (body.discountCode) {
      const { data: d } = await admin
        .from('discounts')
        .select('percent, amount, active, expires_at')
        .eq('code', body.discountCode)
        .single();
      if (d && d.active && (!d.expires_at || new Date(d.expires_at) > new Date())) {
        discountAmount =
          (setupPrice * Number(d.percent)) / 100 + Number(d.amount);
      }
    }

    // Só o setup é cobrado AGORA. Mensalidade começa 30 dias depois.
    const totalNow = Math.max(0, setupPrice - discountAmount);

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const useRealPayment = mpEnabled();
    const initialStatus = useRealPayment ? 'aguardando_pagamento' : 'pago';

    const { data: order, error } = await admin
      .from('orders')
      .insert({
        client_id: user?.id ?? null,
        template_id: template?.id ?? null,
        template_slug: template?.slug ?? null,
        tier: body.tier,
        status: initialStatus,
        briefing: body.briefing ?? {},
        contact_name: body.contact.name.trim(),
        contact_email: body.contact.email.trim(),
        contact_phone: body.contact.phone?.trim() ?? null,
        company_name: body.contact.company?.trim() ?? null,
        setup_price: setupPrice,
        monthly_price: monthlyPrice,
        discount_code: body.discountCode ?? null,
        discount_amount: discountAmount,
        domain_years: null,
        domain_total: 0,
        total_paid: totalNow,
        payment_mock: !useRealPayment,
        payment_provider: useRealPayment ? 'mercadopago' : null,
        client_ip: ip === 'unknown' ? null : ip,
      })
      .select('*')
      .single();

    if (error || !order) {
      console.error('Order insert error:', error);
      return NextResponse.json(
        {
          error: error?.message ?? 'Erro ao criar pedido.',
          hint: error?.code === '42703'
            ? 'Alguma coluna do schema não existe. Rode o schema.sql atualizado no Supabase.'
            : error?.code === '42P01'
            ? 'Tabela orders não existe. Rode o schema.sql no Supabase.'
            : undefined,
        },
        { status: 500 }
      );
    }

    await admin.from('site_projects').insert({
      order_id: order.id,
      client_id: user?.id ?? null,
      status: initialStatus === 'pago' ? 'em_producao' : 'aguardando',
      monthly_status: 'pendente',
    });

    let checkoutUrl: string | null = null;
    if (useRealPayment && totalNow > 0) {
      try {
        const pref = await createOrderPreference(order);
        checkoutUrl = pref.init_point;
        await admin
          .from('orders')
          .update({ payment_id: pref.id, payment_url: pref.init_point })
          .eq('id', order.id);
      } catch (e) {
        console.error('MP preference error:', e);
        return NextResponse.json(
          { error: 'Erro ao criar pagamento. Tente novamente.' },
          { status: 500 }
        );
      }
    } else {
      // Fluxo mock: dispara notificações imediatamente.
      await Promise.allSettled([
        sendOrderEmails(order),
        appendOrderToSheet(order),
      ]);
    }

    return NextResponse.json({ success: true, order, checkoutUrl });
  } catch (err) {
    console.error('Order error:', err);
    const message = err instanceof Error ? err.message : 'Erro interno.';
    return NextResponse.json(
      {
        error: 'Erro interno ao criar pedido.',
        detail: process.env.NODE_ENV === 'production' ? undefined : message,
      },
      { status: 500 }
    );
  }
}
