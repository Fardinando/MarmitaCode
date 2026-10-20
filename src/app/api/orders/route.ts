import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderEmails } from '@/lib/notifications/email';
import { appendOrderToSheet } from '@/lib/notifications/sheets';
import type { Briefing, Tier } from '@/lib/types';

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
  domainYears?: number | null;
  discountCode?: string | null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderBody;

    if (!body?.tier || !body?.contact?.name || !body?.contact?.email) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }

    const admin = createAdminClient();

    let template: { id: string; slug: string } | null = null;
    let setupPrice = 0;
    let monthlyPrice = 0;

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
          monthlyPrice = Number(tierRow.monthly_price);
        }
      }
    }

    let domainTotal = 0;
    if (body.domainYears) {
      const { data: dp } = await admin
        .from('domain_pricing')
        .select('registry_price, labor_fee')
        .eq('years', body.domainYears)
        .single();
      if (dp) {
        domainTotal = Number(dp.registry_price) + Number(dp.labor_fee);
      }
    }

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

    const subtotal = setupPrice + domainTotal;
    const total = Math.max(0, subtotal - discountAmount);

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

    const { data: order, error } = await admin
      .from('orders')
      .insert({
        client_id: user?.id ?? null,
        template_id: template?.id ?? null,
        template_slug: template?.slug ?? null,
        tier: body.tier,
        status: 'pago',
        briefing: body.briefing ?? {},
        contact_name: body.contact.name,
        contact_email: body.contact.email,
        contact_phone: body.contact.phone ?? null,
        company_name: body.contact.company ?? null,
        setup_price: setupPrice,
        monthly_price: monthlyPrice,
        discount_code: body.discountCode ?? null,
        discount_amount: discountAmount,
        domain_years: body.domainYears ?? null,
        domain_total: domainTotal,
        total_paid: total,
        payment_mock: true,
        client_ip: ip,
      })
      .select('*')
      .single();

    if (error || !order) {
      return NextResponse.json({ error: error?.message ?? 'Erro ao criar pedido.' }, { status: 500 });
    }

    await admin.from('site_projects').insert({
      order_id: order.id,
      client_id: user?.id ?? null,
      status: 'em_producao',
      monthly_status: 'pendente',
    });

    await Promise.allSettled([
      sendOrderEmails(order),
      appendOrderToSheet(order),
    ]);

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
