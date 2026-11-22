import 'server-only';

import { Resend } from 'resend';
import type { Order } from '@/lib/types';
import { STATUS_LABELS, TIER_LABELS } from '@/lib/types';
import { withTimeout } from '@/lib/async';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escape(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatBriefingValue(v: unknown): string {
  if (Array.isArray(v)) return v.map((x) => escape(x)).join(', ');
  if (typeof v === 'object' && v !== null) return `<pre style="margin:0;font-size:12px;white-space:pre-wrap;color:#444">${escape(JSON.stringify(v, null, 2))}</pre>`;
  return escape(v);
}

/** Rótulos amigáveis pra chaves conhecidas do briefing. */
const BRIEFING_LABELS: Record<string, string> = {
  business_name: 'Nome da empresa / marca',
  business_tagline: 'Slogan / frase de impacto',
  business_description: 'O que a empresa faz',
  target_audience: 'Público-alvo',
  differentials: 'Diferenciais',
  services: 'Serviços / produtos',
  tone: 'Tom de voz',
  colors: 'Cores da marca',
  color_palette: 'Paleta de cores',
  references: 'Referências visuais',
  reference_sites: 'Sites de referência',
  logo_url: 'URL do logo',
  logo_notes: 'Observações sobre o logo',
  contact_whatsapp: 'WhatsApp pra contato',
  contact_email: 'E-mail pra contato',
  contact_address: 'Endereço',
  social_instagram: 'Instagram',
  social_facebook: 'Facebook',
  social_tiktok: 'TikTok',
  social_youtube: 'YouTube',
  social_linkedin: 'LinkedIn',
  cta_primary: 'CTA principal',
  cta_secondary: 'CTA secundário',
  sections: 'Seções desejadas',
  content_notes: 'Observações de conteúdo',
  deadline: 'Prazo desejado',
  extra_notes: 'Observações extras',
  confirmed_at: 'Confirmado em',
};

function labelFor(key: string): string {
  return BRIEFING_LABELS[key] ?? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function briefingTable(briefing: Record<string, unknown> | null | undefined): string {
  if (!briefing || Object.keys(briefing).length === 0) {
    return '<tr><td style="padding:12px;color:#888">Sem dados de briefing.</td></tr>';
  }
  return Object.entries(briefing)
    .filter(([, v]) => v !== undefined && v !== null && String(v).length > 0)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;width:40%">${escape(labelFor(k))}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;color:#111">${formatBriefingValue(v)}</td>
        </tr>`
    )
    .join('');
}

/** E-mail do admin: urgente, com todos os dados + contatos clicáveis. */
function adminHtml(order: Order): string {
  const name = order.contact_name ?? 'Cliente';
  const email = order.contact_email ?? '';
  const phone = order.contact_phone ?? '';
  const phoneDigits = phone.replace(/\D/g, '');
  const waLink = phoneDigits ? `https://wa.me/${phoneDigits.startsWith('55') ? phoneDigits : '55' + phoneDigits}` : '';

  const headerRows: [string, string][] = [
    ['Pedido', escape(order.id)],
    ['Template', escape(order.template_slug ?? 'Personalizado')],
    ['Plano', escape(TIER_LABELS[order.tier])],
    ['Status', escape(STATUS_LABELS[order.status])],
    ['Setup pago', `R$ ${Number(order.setup_price).toFixed(2)}`],
    ['Mensalidade', `R$ ${Number(order.monthly_price).toFixed(2)}/mês`],
    ['Domínio', order.domain_years ? `${order.domain_years} ano(s) — R$ ${Number(order.domain_total).toFixed(2)}` : 'Não'],
    ['Total pago', `<b style="color:#059669">R$ ${Number(order.total_paid).toFixed(2)}</b>`],
  ];

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:680px;margin:0 auto;background:#fff">
    <div style="background:linear-gradient(135deg,#FF8C00,#FFD700);padding:28px 32px;border-radius:12px 12px 0 0">
      <div style="color:#000;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:3px;opacity:0.7">🔔 Briefing recebido</div>
      <div style="color:#000;font-size:28px;font-weight:900;margin-top:8px;line-height:1.2">${escape(name)} enviou o briefing</div>
      <div style="color:rgba(0,0,0,0.7);font-size:14px;margin-top:6px">${escape(order.template_slug ?? 'Personalizado')} · ${escape(TIER_LABELS[order.tier])}</div>
    </div>

    <div style="padding:28px 32px;background:#fafafa;border-left:1px solid #eee;border-right:1px solid #eee">
      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px;margin-bottom:20px">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:14px">Contato do cliente</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:35%">Nome</td><td style="padding:6px 0;color:#111"><b>${escape(name)}</b></td></tr>
          ${email ? `<tr><td style="padding:6px 0;color:#666">E-mail</td><td style="padding:6px 0"><a href="mailto:${escape(email)}" style="color:#FF8C00;font-weight:600;text-decoration:none">${escape(email)}</a></td></tr>` : ''}
          ${phone ? `<tr><td style="padding:6px 0;color:#666">Telefone</td><td style="padding:6px 0"><a href="tel:${escape(phone)}" style="color:#111;font-weight:600;text-decoration:none">${escape(phone)}</a></td></tr>` : ''}
          ${order.company_name ? `<tr><td style="padding:6px 0;color:#666">Empresa</td><td style="padding:6px 0;color:#111"><b>${escape(order.company_name)}</b></td></tr>` : ''}
        </table>
        ${waLink ? `<a href="${waLink}" style="display:inline-block;margin-top:16px;padding:12px 20px;background:#25D366;color:#fff;text-decoration:none;border-radius:999px;font-size:13px;font-weight:700">💬 Falar no WhatsApp</a>` : ''}
      </div>

      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px;margin-bottom:20px">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:14px">Resumo do pedido</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${headerRows.map(([k, v]) => `<tr><td style="padding:6px 0;color:#666;width:40%">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`).join('')}
        </table>
      </div>

      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:4px">📋 Briefing completo</div>
        <div style="font-size:12px;color:#aaa;margin-bottom:14px">Dados que o cliente respondeu no formulário.</div>
        <table style="width:100%;border-collapse:collapse">
          ${briefingTable(order.briefing as Record<string, unknown> | null)}
        </table>
      </div>
    </div>

    <div style="padding:20px 32px;background:#111;color:#888;font-size:12px;text-align:center;border-radius:0 0 12px 12px">
      MarmitaCode · pedido <code style="color:#FF8C00">${escape(order.id)}</code>
    </div>
  </div>`;
}

/** E-mail do cliente: agradecimento + resumo do briefing que ele enviou. */
function clientHtml(order: Order): string {
  const name = order.contact_name ?? '';
  const first = name.split(' ')[0] || 'tudo bem';
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#fff">
    <div style="background:linear-gradient(135deg,#FF8C00,#FFD700);padding:32px;border-radius:12px 12px 0 0;text-align:center">
      <div style="color:#000;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:3px;opacity:0.7">✓ Briefing recebido</div>
      <div style="color:#000;font-size:30px;font-weight:900;margin-top:10px">Obrigado, ${escape(first)}!</div>
    </div>

    <div style="padding:28px 32px;background:#fafafa;border-left:1px solid #eee;border-right:1px solid #eee;color:#333;line-height:1.6">
      <p style="margin:0 0 16px;font-size:16px">
        Recebemos tudo que você respondeu no briefing. Agora começa a produção do seu site —
        o <b>Chef</b> já está debruçado nas suas respostas pra entregar algo que combine com a sua marca.
      </p>

      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px;margin:22px 0">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:14px">O que vem agora</div>
        <ol style="margin:0;padding-left:20px;color:#333;font-size:14px">
          <li style="margin-bottom:8px">Em até <b>5 dias úteis</b>, você recebe um link com a primeira versão.</li>
          <li style="margin-bottom:8px">Você revisa, pede ajustes pelo WhatsApp e a gente aplica.</li>
          <li>Quando estiver 100% ok, o site vai pro ar no domínio escolhido.</li>
        </ol>
      </div>

      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:4px">📋 Seu briefing</div>
        <div style="font-size:12px;color:#aaa;margin-bottom:14px">Cópia do que você enviou, pra sua referência.</div>
        <table style="width:100%;border-collapse:collapse">
          ${briefingTable(order.briefing as Record<string, unknown> | null)}
        </table>
      </div>

      <p style="margin:22px 0 0;font-size:14px;color:#666">
        Alguma dúvida ou quer complementar algo? É só responder este e-mail ou mandar no WhatsApp.
      </p>
    </div>

    <div style="padding:20px 32px;background:#111;color:#aaa;font-size:12px;text-align:center;border-radius:0 0 12px 12px">
      <div style="color:#FF8C00;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">MarmitaCode</div>
      Pedido <code style="color:#FF8C00">${escape(order.id)}</code>
    </div>
  </div>`;
}

/** E-mail do admin: lembrete de mensalidade prestes a vencer. */
function monthlyAdminHtml(order: Order, dueDate: string, daysLeft: number): string {
  const name = order.contact_name ?? 'Cliente';
  const email = order.contact_email ?? '';
  const phone = order.contact_phone ?? '';
  const phoneDigits = phone.replace(/\D/g, '');
  const waText = encodeURIComponent(
    `Oi ${name.split(' ')[0] || ''}! Tudo bem? Passando pra lembrar que a mensalidade do seu site vence em ${new Date(dueDate).toLocaleDateString('pt-BR')} — R$ ${Number(order.monthly_price).toFixed(2)}. Qualquer coisa me chama por aqui mesmo. Abraço, Fernando.`
  );
  const waLink = phoneDigits
    ? `https://wa.me/${phoneDigits.startsWith('55') ? phoneDigits : '55' + phoneDigits}?text=${waText}`
    : '';

  const dueDateFmt = new Date(dueDate).toLocaleDateString('pt-BR');

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#fff">
    <div style="background:linear-gradient(135deg,#FF8C00,#FFD700);padding:28px 32px;border-radius:12px 12px 0 0">
      <div style="color:#000;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:3px;opacity:0.7">⏰ Mensalidade proxima</div>
      <div style="color:#000;font-size:26px;font-weight:900;margin-top:8px;line-height:1.2">Lembra ${escape(name.split(' ')[0] || name)} pelo WhatsApp</div>
      <div style="color:rgba(0,0,0,0.7);font-size:14px;margin-top:6px">Vence em <b>${dueDateFmt}</b> — faltam ${daysLeft} dia${daysLeft === 1 ? '' : 's'}</div>
    </div>
    <div style="padding:28px 32px;background:#fafafa;border-left:1px solid #eee;border-right:1px solid #eee">
      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px;margin-bottom:20px">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:14px">Contato do cliente</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:35%">Nome</td><td style="padding:6px 0;color:#111"><b>${escape(name)}</b></td></tr>
          ${email ? `<tr><td style="padding:6px 0;color:#666">E-mail</td><td style="padding:6px 0"><a href="mailto:${escape(email)}" style="color:#FF8C00;font-weight:600;text-decoration:none">${escape(email)}</a></td></tr>` : ''}
          ${phone ? `<tr><td style="padding:6px 0;color:#666">Telefone</td><td style="padding:6px 0"><a href="tel:${escape(phone)}" style="color:#111;font-weight:600;text-decoration:none">${escape(phone)}</a></td></tr>` : ''}
        </table>
        ${waLink ? `<a href="${waLink}" style="display:inline-block;margin-top:16px;padding:12px 20px;background:#25D366;color:#fff;text-decoration:none;border-radius:999px;font-size:13px;font-weight:700">💬 Mandar lembrete no WhatsApp</a>` : ''}
      </div>
      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:14px">Detalhe da mensalidade</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:40%">Pedido</td><td style="padding:6px 0;color:#111"><code>${escape(order.id)}</code></td></tr>
          <tr><td style="padding:6px 0;color:#666">Template</td><td style="padding:6px 0;color:#111">${escape(order.template_slug ?? 'Personalizado')}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Plano</td><td style="padding:6px 0;color:#111">${escape(TIER_LABELS[order.tier])}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Valor</td><td style="padding:6px 0;color:#111"><b>R$ ${Number(order.monthly_price).toFixed(2)}/mês</b></td></tr>
          <tr><td style="padding:6px 0;color:#666">Vencimento</td><td style="padding:6px 0;color:#111"><b style="color:#C84C09">${dueDateFmt}</b></td></tr>
        </table>
      </div>
      <p style="margin:22px 0 0;font-size:13px;color:#666;font-style:italic">
        O cliente ja recebeu o aviso automatico, mas um toque no WhatsApp garante.
      </p>
    </div>
    <div style="padding:20px 32px;background:#111;color:#888;font-size:12px;text-align:center;border-radius:0 0 12px 12px">
      MarmitaCode · lembrete mensal automatico
    </div>
  </div>`;
}

/** E-mail do cliente: lembrete amigavel da mensalidade. */
function monthlyClientHtml(order: Order, dueDate: string, daysLeft: number): string {
  const name = order.contact_name ?? '';
  const first = name.split(' ')[0] || 'tudo bem';
  const dueDateFmt = new Date(dueDate).toLocaleDateString('pt-BR');
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5583996532203';
  const waText = encodeURIComponent(
    `Oi Fernando! Quero pagar a mensalidade do site. Pedido ${order.id.slice(0, 8)}.`
  );
  const waLink = `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${waText}`;

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:620px;margin:0 auto;background:#fff">
    <div style="background:linear-gradient(135deg,#FF8C00,#FFD700);padding:32px;border-radius:12px 12px 0 0;text-align:center">
      <div style="color:#000;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:3px;opacity:0.7">⏰ Mensalidade proxima</div>
      <div style="color:#000;font-size:28px;font-weight:900;margin-top:10px">Oi, ${escape(first)}!</div>
    </div>
    <div style="padding:28px 32px;background:#fafafa;border-left:1px solid #eee;border-right:1px solid #eee;color:#333;line-height:1.6">
      <p style="margin:0 0 16px;font-size:16px">
        Passando rapidinho pra lembrar que a mensalidade do seu site <b>${escape(order.template_slug ?? 'personalizado')}</b> vence em <b>${dueDateFmt}</b> —
        ${daysLeft === 0 ? '<b style="color:#C84C09">hoje</b>' : daysLeft === 1 ? 'amanha' : `em ${daysLeft} dias`}.
      </p>
      <div style="background:#fff;border:1px solid #eee;border-radius:10px;padding:20px;margin:22px 0;text-align:center">
        <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:8px">Valor da mensalidade</div>
        <div style="font-size:36px;font-weight:900;color:#111">R$ ${Number(order.monthly_price).toFixed(2)}</div>
        <div style="font-size:13px;color:#666;margin-top:4px">pra manter seu site no ar, com SSL, backup e suporte</div>
      </div>
      <p style="margin:0 0 16px;font-size:15px">
        Pra pagar, e so me chamar no WhatsApp que a gente combina a forma (Pix ou cartao).
        Rapido, sem burocracia.
      </p>
      <div style="text-align:center;margin:28px 0">
        <a href="${waLink}" style="display:inline-block;padding:16px 28px;background:#25D366;color:#fff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700">💬 Pagar pelo WhatsApp</a>
      </div>
      <p style="margin:22px 0 0;font-size:13px;color:#666;font-style:italic">
        Qualquer duvida, e so responder esse email.<br>
        Abraco, Fernando — Chef da MarmitaCode.
      </p>
    </div>
    <div style="padding:20px 32px;background:#111;color:#aaa;font-size:12px;text-align:center;border-radius:0 0 12px 12px">
      <div style="color:#FF8C00;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">MarmitaCode</div>
      Pedido <code style="color:#FF8C00">${escape(order.id.slice(0, 8))}</code>
    </div>
  </div>`;
}

export async function sendMonthlyReminderEmails(
  order: Order,
  dueDate: string,
  daysLeft: number,
) {
  if (!resend) return { skipped: true, reason: 'RESEND_API_KEY ausente' };

  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM ?? 'MarmitaCode <contato@marmitacode.dev.br>';
  const dueDateFmt = new Date(dueDate).toLocaleDateString('pt-BR');

  const results = await Promise.allSettled([
    to
      ? withTimeout(
          resend.emails.send({
            from,
            to,
            replyTo: order.contact_email ?? undefined,
            subject: `[Mensalidade ${dueDateFmt}] ${order.contact_name ?? 'Cliente'} — lembrar no WhatsApp`,
            html: monthlyAdminHtml(order, dueDate, daysLeft),
          }),
          10_000,
          'resend-monthly-admin',
        )
      : Promise.resolve({ skipped: true, reason: 'ORDER_EMAIL_TO ausente' }),
    order.contact_email
      ? withTimeout(
          resend.emails.send({
            from,
            to: order.contact_email,
            subject: `Mensalidade do seu site vence em ${dueDateFmt} — MarmitaCode`,
            html: monthlyClientHtml(order, dueDate, daysLeft),
          }),
          10_000,
          'resend-monthly-client',
        )
      : Promise.resolve({ skipped: true, reason: 'contact_email ausente' }),
  ]);

  return results;
}

export async function sendOrderEmails(order: Order) {
  if (!resend) return { skipped: true, reason: 'RESEND_API_KEY ausente' };

  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM ?? 'MarmitaCode <contato@marmitacode.dev.br>';
  const templateLabel = order.template_slug ?? 'Personalizado';

  const results = await Promise.allSettled([
    // Admin — tudo detalhado
    to
      ? withTimeout(
          resend.emails.send({
            from,
            to,
            replyTo: order.contact_email ?? undefined,
            subject: `[Briefing] ${order.contact_name ?? 'Cliente'} — ${templateLabel} (${TIER_LABELS[order.tier]})`,
            html: adminHtml(order),
          }),
          10_000,
          'resend-admin',
        )
      : Promise.resolve({ skipped: true, reason: 'ORDER_EMAIL_TO ausente' }),
    // Cliente — agradecimento + cópia do briefing
    order.contact_email
      ? withTimeout(
          resend.emails.send({
            from,
            to: order.contact_email,
            subject: `Recebemos seu briefing — MarmitaCode`,
            html: clientHtml(order),
          }),
          10_000,
          'resend-client',
        )
      : Promise.resolve({ skipped: true, reason: 'contact_email ausente' }),
  ]);

  return results;
}
