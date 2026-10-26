import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Rotina admin: percorre todos os pedidos com client_id=null e, pra cada um,
 * tenta encontrar o auth.user com o mesmo email. Se achar, vincula o pedido
 * (e o site_project correspondente) a esse user.
 *
 * Use quando quiser dar o fix em lote nos pedidos antigos — a vinculação
 * automática (via linkOrphanOrders em getProfile) só roda quando o cliente
 * faz login/visita /conta.
 */
export async function POST() {
  await requireAdmin();

  const admin = createAdminClient();

  const { data: orphans, error } = await admin
    .from('orders')
    .select('id, contact_email, status')
    .is('client_id', null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const list = orphans ?? [];
  const report: {
    totalOrphans: number;
    linked: number;
    skipped: number;
    details: { orderId: string; email: string | null; status: string; result: string }[];
  } = { totalOrphans: list.length, linked: 0, skipped: 0, details: [] };

  // Busca todos os users em um unico listUsers pra evitar N chamadas.
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailToId = new Map<string, string>();
  for (const u of usersPage?.users ?? []) {
    if (u.email) emailToId.set(u.email.toLowerCase().trim(), u.id);
  }

  for (const o of list) {
    const email = (o.contact_email ?? '').toLowerCase().trim();
    if (!email) {
      report.skipped++;
      report.details.push({ orderId: o.id, email: null, status: o.status, result: 'sem_email' });
      continue;
    }
    const uid = emailToId.get(email);
    if (!uid) {
      report.skipped++;
      report.details.push({ orderId: o.id, email, status: o.status, result: 'user_nao_encontrado' });
      continue;
    }
    await admin.from('orders').update({ client_id: uid }).eq('id', o.id);
    await admin.from('site_projects').update({ client_id: uid }).eq('order_id', o.id);
    report.linked++;
    report.details.push({ orderId: o.id, email, status: o.status, result: 'vinculado' });
  }

  return NextResponse.json(report);
}

export async function GET() {
  // Preview sem alterar nada — útil pra ver quais pedidos estão órfãos.
  await requireAdmin();
  const admin = createAdminClient();

  const { data: orphans } = await admin
    .from('orders')
    .select('id, contact_email, contact_name, status, total_paid, created_at, template_slug')
    .is('client_id', null)
    .order('created_at', { ascending: false });

  return NextResponse.json({
    total: (orphans ?? []).length,
    orphans: orphans ?? [],
  });
}
