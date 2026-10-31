import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderEmails } from '@/lib/notifications/email';
import { getProfile } from '@/lib/auth';
import type { Order } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Reenvia os e-mails de briefing (admin + cliente) pra todos os pedidos que
 * já têm briefing preenchido. Admin only.
 *
 * POST para disparar. GET só mostra o que seria enviado (dry-run).
 */
async function listOrdersWithBriefing() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('orders')
    .select('*')
    .not('briefing', 'is', null);
  if (error) throw error;
  // Filtra defensivamente: briefing precisa ter chaves de verdade.
  return (data as Order[]).filter((o) => {
    const b = o.briefing as Record<string, unknown> | null;
    return b && Object.keys(b).length > 0;
  });
}

export async function GET() {
  const profile = await getProfile();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  try {
    const orders = await listOrdersWithBriefing();
    return NextResponse.json({
      ok: true,
      mode: 'dry-run',
      count: orders.length,
      orders: orders.map((o) => ({
        id: o.id,
        contact_name: o.contact_name,
        contact_email: o.contact_email,
        template: o.template_slug,
        status: o.status,
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function POST() {
  const profile = await getProfile();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  try {
    const orders = await listOrdersWithBriefing();
    const results: Array<{ id: string; email: string | null; ok: boolean; detail?: unknown }> = [];

    for (const order of orders) {
      try {
        const r = await sendOrderEmails(order);
        results.push({
          id: order.id,
          email: order.contact_email,
          ok: true,
          detail: r,
        });
      } catch (e: unknown) {
        results.push({
          id: order.id,
          email: order.contact_email,
          ok: false,
          detail: String(e),
        });
      }
      // pequeno delay pra não estourar rate limit do Resend (10 req/s free tier)
      await new Promise((r) => setTimeout(r, 150));
    }

    return NextResponse.json({
      ok: true,
      total: orders.length,
      sent: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
      results,
    });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
