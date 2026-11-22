import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createRenewalPreference } from '@/lib/payments/renewal';
import { mpEnabled } from '@/lib/payments/mercadopago';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RENEW_WINDOW_DAYS = 10;

function daysBetween(fromISO: string | null) {
  if (!fromISO) return Infinity;
  const due = new Date(fromISO + 'T00:00:00Z').getTime();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Math.round((due - today.getTime()) / 86400000);
}

export async function POST(req: Request) {
  try {
    const { project_id } = (await req.json().catch(() => ({}))) as { project_id?: string };
    if (!project_id) {
      return NextResponse.json({ error: 'project_id obrigatorio' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'nao autenticado' }, { status: 401 });

    const admin = createAdminClient();
    const { data: project } = await admin
      .from('site_projects')
      .select('id, client_id, order_id, next_due_date, monthly_status')
      .eq('id', project_id)
      .single();

    if (!project || project.client_id !== user.id) {
      return NextResponse.json({ error: 'projeto nao encontrado' }, { status: 404 });
    }

    if (project.monthly_status === 'cancelado') {
      return NextResponse.json({ error: 'assinatura cancelada' }, { status: 400 });
    }

    const daysLeft = daysBetween(project.next_due_date);
    if (daysLeft > RENEW_WINDOW_DAYS) {
      return NextResponse.json(
        { error: `Antecipacao disponivel so a partir de ${RENEW_WINDOW_DAYS} dias antes do vencimento.` },
        { status: 400 },
      );
    }

    const { data: order } = await admin
      .from('orders')
      .select('monthly_price, contact_email, contact_name')
      .eq('id', project.order_id)
      .single();

    const amount = Number(order?.monthly_price ?? 47.9) || 47.9;

    if (!mpEnabled()) {
      // Modo dev / sem MP: estende direto e retorna URL fake.
      const base = project.next_due_date
        ? new Date(project.next_due_date + 'T00:00:00Z')
        : new Date();
      base.setUTCDate(base.getUTCDate() + 30);
      const newDue = base.toISOString().slice(0, 10);
      await admin
        .from('site_projects')
        .update({ next_due_date: newDue, monthly_status: 'ativo' })
        .eq('id', project_id);
      return NextResponse.json({ ok: true, mock: true, new_due_date: newDue });
    }

    const pref = await createRenewalPreference({
      projectId: project_id,
      amount,
      payerEmail: order?.contact_email ?? user.email,
      payerName: order?.contact_name,
    });

    return NextResponse.json({ ok: true, init_point: pref.init_point });
  } catch (err) {
    console.error('renew error', err);
    return NextResponse.json({ error: 'erro interno' }, { status: 500 });
  }
}
