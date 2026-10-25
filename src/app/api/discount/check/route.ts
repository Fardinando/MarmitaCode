import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { limit } from '@/lib/rate-limit';
import { z } from 'zod';

const schema = z.object({
  code: z.string().trim().toUpperCase().regex(/^[A-Z0-9_-]{1,40}$/, 'Código inválido'),
  setup: z.number().min(0).max(100000),
});

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  const ip = xff?.split(',')[0]?.trim() ?? real ?? 'unknown';
  return ip.replace(/[^\w:.-]/g, '').slice(0, 64) || 'unknown';
}

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    const rl = limit('briefing', ip); // Reutiliza o bucket de briefing (10/min)
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Muitas tentativas. Tente em ${rl.retryAfter}s.` },
        { status: 429 }
      );
    }

    const raw = await req.text();
    if (raw.length > 500) {
      return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
    }

    const result = schema.safeParse(parsed);
    if (!result.success) {
      return NextResponse.json(
        { valid: false, error: result.error.issues[0]?.message ?? 'Dados inválidos.' },
        { status: 400 }
      );
    }

    const { code, setup } = result.data;

    const admin = createAdminClient();
    const { data: d } = await admin
      .from('discounts')
      .select('code, percent, amount, active, expires_at')
      .eq('code', code)
      .maybeSingle();

    if (!d) {
      return NextResponse.json({ valid: false, error: 'Cupom não encontrado.' });
    }
    if (!d.active) {
      return NextResponse.json({ valid: false, error: 'Cupom inativo.' });
    }
    if (d.expires_at && new Date(d.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, error: 'Cupom expirado.' });
    }

    const percent = Number(d.percent) || 0;
    const amount = Number(d.amount) || 0;
    const discountAmount = (setup * percent) / 100 + amount;
    const total = Math.max(0, setup - discountAmount);

    return NextResponse.json({
      valid: true,
      code: d.code,
      percent,
      amount,
      discountAmount,
      total,
      // Mensagem amigável
      message:
        percent > 0
          ? `${percent}% de desconto aplicado`
          : `R$ ${amount.toFixed(2).replace('.', ',')} de desconto aplicado`,
    });
  } catch (err) {
    console.error('[discount/check]', err);
    return NextResponse.json({ valid: false, error: 'Erro interno.' }, { status: 500 });
  }
}
