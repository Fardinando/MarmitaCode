import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendMonthlyReminderEmails } from '@/lib/notifications/email';
import type { Order } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Cron diario: avisa cliente e admin quando a mensalidade de um
 * site_projects esta a <= 7 dias do vencimento.
 *
 * - Roda via Vercel Cron (vercel.json) uma vez por dia.
 * - Idempotente: so envia uma vez por ciclo (last_reminder_due_date).
 * - Autorizacao: `Authorization: Bearer ${CRON_SECRET}` OU header
 *   `x-vercel-cron` que a Vercel injeta automaticamente nos crons dela.
 */
export async function GET(req: Request) {
  const auth = req.headers.get('authorization') ?? '';
  const isVercelCron = req.headers.get('x-vercel-cron') === '1';
  const secret = process.env.CRON_SECRET;

  if (!isVercelCron) {
    if (!secret) {
      return NextResponse.json(
        { error: 'CRON_SECRET nao configurado.' },
        { status: 500 },
      );
    }
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'nao autorizado' }, { status: 401 });
    }
  }

  const admin = createAdminClient();

  // Janela: hoje ate hoje + 7 dias.
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const horizon = new Date(today);
  horizon.setUTCDate(horizon.getUTCDate() + 7);
  const horizonStr = horizon.toISOString().slice(0, 10);

  // Busca projetos ativos com vencimento na janela
  // que ainda nao receberam lembrete pra esse ciclo.
  const { data: projects, error } = await admin
    .from('site_projects')
    .select('id, order_id, next_due_date, last_reminder_due_date, monthly_status')
    .eq('monthly_status', 'ativo')
    .gte('next_due_date', todayStr)
    .lte('next_due_date', horizonStr);

  if (error) {
    console.error('monthly-reminders: supabase query failed', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const pending = (projects ?? []).filter(
    (p) => p.last_reminder_due_date !== p.next_due_date,
  );

  if (pending.length === 0) {
    return NextResponse.json({ ok: true, checked: projects?.length ?? 0, sent: 0 });
  }

  // Carrega os pedidos vinculados (contato, valores).
  const orderIds = pending.map((p) => p.order_id);
  const { data: orders } = await admin
    .from('orders')
    .select(
      'id, client_id, template_slug, tier, status, contact_name, contact_email, contact_phone, company_name, setup_price, monthly_price, briefing, discount_code, discount_amount, domain_years, domain_total, total_paid, payment_mock, payment_provider, payment_id, payment_status, payment_url, template_id, client_ip, created_at, updated_at',
    )
    .in('id', orderIds);

  const orderMap = new Map<string, Order>();
  for (const o of (orders ?? []) as Order[]) orderMap.set(o.id, o);

  let sent = 0;
  const errors: { project_id: string; reason: string }[] = [];

  for (const p of pending) {
    const order = orderMap.get(p.order_id);
    if (!order) {
      errors.push({ project_id: p.id, reason: 'order nao encontrado' });
      continue;
    }

    const due = new Date(p.next_due_date as string);
    due.setUTCHours(0, 0, 0, 0);
    const msPerDay = 86_400_000;
    const daysLeft = Math.max(0, Math.round((due.getTime() - today.getTime()) / msPerDay));

    try {
      await sendMonthlyReminderEmails(order, p.next_due_date as string, daysLeft);
      await admin
        .from('site_projects')
        .update({ last_reminder_due_date: p.next_due_date })
        .eq('id', p.id);
      sent += 1;
    } catch (err) {
      console.error('monthly-reminders: send failed', p.id, err);
      errors.push({
        project_id: p.id,
        reason: err instanceof Error ? err.message : 'erro desconhecido',
      });
    }
  }

  return NextResponse.json({
    ok: true,
    checked: projects?.length ?? 0,
    sent,
    errors: errors.length > 0 ? errors : undefined,
  });
}
