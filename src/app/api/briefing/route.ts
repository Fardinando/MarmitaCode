import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderEmails } from '@/lib/notifications/email';
import { limit } from '@/lib/rate-limit';
import { briefingUpdateSchema } from '@/lib/security/schemas';
import { ZodError } from 'zod';

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  const ip = xff?.split(',')[0]?.trim() ?? real ?? 'unknown';
  return ip.replace(/[^\w:.-]/g, '').slice(0, 64) || 'unknown';
}

export const dynamic = 'force-dynamic';

/**
 * Salva o briefing completo do pedido.
 * Protegido: usuário precisa estar logado E ser dono do pedido E o pedido
 * precisa estar com status 'pago' (ou avançado).
 */
export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    const rl = limit('briefing', ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Muitas tentativas. Tente em ${rl.retryAfter}s.` },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      );
    }

    const raw = await req.text();
    if (raw.length > 100_000) {
      return NextResponse.json({ error: 'Payload muito grande.' }, { status: 413 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
    }

    let body;
    try {
      body = briefingUpdateSchema.parse(parsed);
    } catch (e) {
      const msg = e instanceof ZodError ? e.issues[0]?.message ?? 'Dados inválidos.' : 'Dados inválidos.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Verifica autenticação e ownership.
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
    }

    const admin = createAdminClient();
    const { data: order } = await admin
      .from('orders')
      .select('id, client_id, status')
      .eq('id', body.orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 });
    }
    if (order.client_id !== user.id) {
      return NextResponse.json({ error: 'Pedido não pertence a você.' }, { status: 403 });
    }

    // Só aceita briefing se já foi pago.
    const paidStatuses = ['pago', 'briefing_recebido', 'em_producao', 'publicado', 'manutencao'];
    if (!paidStatuses.includes(order.status)) {
      return NextResponse.json(
        { error: 'Briefing disponível apenas após confirmação do pagamento.' },
        { status: 403 }
      );
    }

    const briefingWithTimestamp = {
      ...body.briefing,
      confirmed_at: new Date().toISOString(),
    };

    const { data: updated, error } = await admin
      .from('orders')
      .update({
        briefing: briefingWithTimestamp,
        status: 'briefing_recebido',
      })
      .eq('id', body.orderId)
      .select('*')
      .single();

    if (error || !updated) {
      console.error('[briefing] update error', { code: error?.code });
      return NextResponse.json({ error: 'Erro ao salvar briefing.' }, { status: 500 });
    }

    // Notifica admin.
    await sendOrderEmails(updated).catch((e) => console.error('[briefing] email', e));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[briefing] unhandled', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
