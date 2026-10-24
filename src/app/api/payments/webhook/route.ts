import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getPaymentInfo, mpEnabled } from '@/lib/payments/mercadopago';
import { verifyMpSignature } from '@/lib/payments/mp-signature';
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

const PAID_STATUSES = new Set(['approved', 'authorized']);
const REFUND_STATUSES = new Set(['refunded', 'charged_back']);

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
      body?.resource?.toString() ||
      null;

    if (!paymentId || (topic && topic !== 'payment')) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    // Validação HMAC do Mercado Pago.
    const sig = verifyMpSignature({
      signatureHeader: req.headers.get('x-signature'),
      requestIdHeader: req.headers.get('x-request-id'),
      dataId: paymentId,
    });
    if (!sig.ok) {
      console.warn('MP webhook signature rejected:', sig.reason);
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
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

    // Idempotência: se o payment_status salvo já é igual ao que chegou, nada a fazer.
    if (existing.payment_status === mpStatus && existing.payment_id === paymentId) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const wasPaidBefore = PAID_STATUSES.has(existing.payment_status ?? '');
    const nowPaid = PAID_STATUSES.has(mpStatus);
    const nowRefunded = REFUND_STATUSES.has(mpStatus);

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

    if (order && nowPaid && !wasPaidBefore) {
      await admin
        .from('site_projects')
        .update({ status: 'em_producao' })
        .eq('order_id', order.id);

      await Promise.allSettled([
        sendOrderEmails(order),
        appendOrderToSheet(order),
      ]);
    }

    if (order && nowRefunded && wasPaidBefore) {
      await admin
        .from('site_projects')
        .update({ status: 'cancelado', monthly_status: 'cancelado' })
        .eq('order_id', order.id);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// GET usado por alguns testes do painel do MP.
export async function GET() {
  return NextResponse.json({ ok: true });
}
