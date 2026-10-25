import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderEmails } from '@/lib/notifications/email';
import { appendOrderToSheet } from '@/lib/notifications/sheets';
import { limit } from '@/lib/rate-limit';
import { createOrderPreference, mpEnabled } from '@/lib/payments/mercadopago';
import { orderBodySchema } from '@/lib/security/schemas';
import { ZodError } from 'zod';

// Preços server-side (fonte da verdade) pra funcionalidades extras.
const EXTRAS_SERVER: Record<string, number> = {
  'db-login': 30,
  'video-host': 25,
  'payment-api': 20,
  'admin-area': 40,
  other: 0,
};

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  const ip = xff?.split(',')[0]?.trim() ?? real ?? 'unknown';
  // RFC: trim pra evitar key injection
  return ip.replace(/[^\w:.-]/g, '').slice(0, 64) || 'unknown';
}

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);

    // Rate limit mais apertado: 3 pedidos/min por IP.
    const rl = limit('orders', ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Muitas tentativas. Tente em ${rl.retryAfter}s.` },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      );
    }

    // Protege contra body gigante (10kb é mais que suficiente)
    const raw = await req.text();
    if (raw.length > 50_000) {
      return NextResponse.json({ error: 'Payload grande demais.' }, { status: 413 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
    }

    // Validação Zod — todas as entradas sanitizadas.
    let body;
    try {
      body = orderBodySchema.parse(parsed);
    } catch (e) {
      const msg = e instanceof ZodError ? e.issues[0]?.message ?? 'Dados inválidos.' : 'Dados inválidos.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Honeypot: se bot preencheu, retorna 200 silencioso pra não dar feedback.
    if (body._hp && body._hp.length > 0) {
      return NextResponse.json({ success: true, order: { id: 'bot-detected' } });
    }

    const admin = createAdminClient();

    // Resolve preços no banco (nunca confia no cliente).
    let template: { id: string; slug: string } | null = null;
    let setupPrice = 0;
    let baseMonthly = 0;

    if (body.templateSlug) {
      const { data: t } = await admin
        .from('templates')
        .select('id, slug, active')
        .eq('slug', body.templateSlug)
        .single();

      if (!t || !t.active) {
        return NextResponse.json({ error: 'Template indisponível.' }, { status: 400 });
      }
      template = { id: t.id, slug: t.slug };

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
    } else {
      // Personalizado — usa valor dica mas limita.
      setupPrice = Math.max(0, Math.min(10000, Number(body.setupPrice ?? 397)));
      baseMonthly = Math.max(0, Math.min(500, Number(body.monthlyPrice ?? 47.9)));
    }

    const extrasList = Array.isArray(body.extras) ? body.extras : [];
    const extrasMonthlyAdd = extrasList.reduce((s, k) => s + (EXTRAS_SERVER[k] ?? 0), 0);
    const monthlyPrice = baseMonthly + extrasMonthlyAdd;

    // Desconto — resolvido no banco.
    let discountAmount = 0;
    if (body.discountCode) {
      const { data: d } = await admin
        .from('discounts')
        .select('percent, amount, active, expires_at')
        .eq('code', body.discountCode)
        .single();
      if (d && d.active && (!d.expires_at || new Date(d.expires_at) > new Date())) {
        discountAmount = (setupPrice * Number(d.percent)) / 100 + Number(d.amount);
      }
    }

    const totalNow = Math.max(0, setupPrice - discountAmount);

    // User logado é obrigatório — fluxo novo exige cadastro antes do pagamento.
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado pra fechar o pedido.', requireLogin: true },
        { status: 401 }
      );
    }

    const useRealPayment = mpEnabled();
    const initialStatus = useRealPayment ? 'aguardando_pagamento' : 'pago';

    const { data: order, error } = await admin
      .from('orders')
      .insert({
        client_id: user.id,
        template_id: template?.id ?? null,
        template_slug: template?.slug ?? null,
        tier: body.tier,
        status: initialStatus,
        // Briefing inicial é mínimo — o briefing completo vem APÓS pagamento.
        briefing: body.briefing ?? {},
        contact_name: body.contact.name,
        contact_email: body.contact.email,
        contact_phone: body.contact.phone ?? null,
        company_name: body.contact.company ?? null,
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
      console.error('[orders] insert error', { code: error?.code });
      return NextResponse.json(
        { error: 'Erro ao criar pedido. Tente novamente.' },
        { status: 500 }
      );
    }

    await admin.from('site_projects').insert({
      order_id: order.id,
      client_id: user.id,
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
        console.error('[orders] MP preference error', e);
        return NextResponse.json(
          { error: 'Erro ao criar pagamento. Tente novamente.' },
          { status: 500 }
        );
      }
    } else {
      await Promise.allSettled([sendOrderEmails(order), appendOrderToSheet(order)]);
    }

    return NextResponse.json({
      success: true,
      order: { id: order.id, status: order.status },
      checkoutUrl,
      // Após pagamento o cliente é levado pra /briefing/[orderId]
      briefingUrl: `/briefing/${order.id}`,
    });
  } catch (err) {
    console.error('[orders] unhandled', err);
    return NextResponse.json({ error: 'Erro interno ao criar pedido.' }, { status: 500 });
  }
}
