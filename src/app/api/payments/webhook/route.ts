import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getPaymentInfo, mpEnabled } from '@/lib/payments/mercadopago';
import { sendOrderEmails } from '@/lib/notifications/email';
import { appendOrderToSheet } from '@/lib/notifications/sheets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATUS_MAP: Record<string, string> = {
  approved: 'pago',
  authorized: 'pago',
  in_process: 'aguardando_pagamento',
  pending: 'aguardando_pagamento',
  rejected: 'cancelado',
  cancelled: 'cancelado',
  refunded: 'cancelado',
  charged_back: 'cancelado',
};

export async function POST(req: Request) {
  try {
    if (!mpEnabled()) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const url = new URL(req.url);
    const topic = url.searchParams.get('type') || url.searchParams.get('topic');
    const paymentIdFromQuery = url.searchParams.get('data.id') || url.searchParams.get('id');

    const body = await req.json().catch(() => ({}));
    const paymentId =
      body?.data?.id?.toString() ||
      paymentIdFromQuery ||
      body?.resource?.toString();

    if (!paymentId || (topic && topic !== 'payment')) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const payment = await getPaymentInfo(paymentId);
    const externalRef = payment.external_reference;
    const mpStatus = payment.status ?? 'pending';
    const mappedStatus = STATUS_MAP[mpStatus] ?? 'aguardando_pagamento';

    if (!externalRef) {
      return NextResponse.json({ ok: true, noRef: true });
    }

    const admin = createAdminClient();
    const { data: existing } = await admin
      .from('orders')
      .select('*')
      .eq('id', externalRef)
      .single();

    if (!existing) {
      return NextResponse.json({ ok: true, noOrder: true });
    }

    const wasPaid = existing.status === 'pago';
    const nowPaid = mappedStatus === 'pago';

    const { data: order } = await admin
      .from('orders')
      .update({
        payment_status: mpStatus,
        payment_id: paymentId,
        status: mappedStatus,
      })
      .eq('id', externalRef)
      .select('*')
      .single();

    if (order && nowPaid && !wasPaid) {
      await admin
        .from('site_projects')
        .update({ status: 'em_producao' })
        .eq('order_id', order.id);

      await Promise.allSettled([
        sendOrderEmails(order),
        appendOrderToSheet(order),
      ]);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Alguns testes do MP batem com GET
export async function GET() {
  return NextResponse.json({ ok: true });
}
