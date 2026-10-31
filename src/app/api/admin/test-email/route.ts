import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getProfile } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Diagnóstico de envio de e-mail via Resend.
 * Protegido: só admin. Mostra se envs estão setados e tenta mandar um e-mail de teste.
 */
export async function GET(req: Request) {
  const profile = await getProfile();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM;

  const diag = {
    env: {
      RESEND_API_KEY: key ? `${key.slice(0, 6)}…` : null,
      ORDER_EMAIL_TO: to ?? null,
      ORDER_EMAIL_FROM: from ?? '(usando default MarmitaCode <contato@marmitacode.dev.br>)',
    },
    attempt: null as unknown,
    error: null as unknown,
  };

  if (!key) {
    return NextResponse.json({ ok: false, reason: 'RESEND_API_KEY ausente', diag });
  }
  if (!to) {
    return NextResponse.json({ ok: false, reason: 'ORDER_EMAIL_TO ausente', diag });
  }

  const url = new URL(req.url);
  const target = url.searchParams.get('to') ?? to;
  const resend = new Resend(key);

  try {
    const result = await resend.emails.send({
      from: from ?? 'MarmitaCode <contato@marmitacode.dev.br>',
      to: target,
      subject: '[Teste] MarmitaCode / Resend',
      html: `<div style="font-family:sans-serif;padding:24px">
        <h2 style="color:#FF8C00">Teste de envio OK ✓</h2>
        <p>Se você está lendo isso, o Resend está configurado corretamente.</p>
        <p><b>From:</b> ${from ?? 'default'}<br/><b>To:</b> ${target}</p>
      </div>`,
    });
    diag.attempt = result;
    return NextResponse.json({ ok: true, diag });
  } catch (e: unknown) {
    const err = e as { message?: string; name?: string };
    diag.error = { message: err.message, name: err.name, raw: String(e) };
    return NextResponse.json({ ok: false, reason: 'Resend lançou erro', diag }, { status: 500 });
  }
}
