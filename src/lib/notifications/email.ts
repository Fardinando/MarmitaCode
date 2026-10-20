import 'server-only';

import { Resend } from 'resend';
import type { Order } from '@/lib/types';
import { STATUS_LABELS, TIER_LABELS } from '@/lib/types';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function orderSummaryHtml(order: Order) {
  const rows: [string, string][] = [
    ['Pedido', order.id],
    ['Template', order.template_slug ?? 'Personalizado'],
    ['Plano', TIER_LABELS[order.tier]],
    ['Status', STATUS_LABELS[order.status]],
    ['Cliente', order.contact_name ?? '-'],
    ['E-mail', order.contact_email ?? '-'],
    ['Telefone', order.contact_phone ?? '-'],
    ['Empresa', order.company_name ?? '-'],
    ['Setup', `R$ ${Number(order.setup_price).toFixed(2)}`],
    ['Mensalidade', `R$ ${Number(order.monthly_price).toFixed(2)}/mês`],
    ['Domínio', order.domain_years ? `${order.domain_years} ano(s) — R$ ${Number(order.domain_total).toFixed(2)}` : 'Não'],
    ['Desconto', order.discount_code ? `${order.discount_code} (-R$ ${Number(order.discount_amount).toFixed(2)})` : '-'],
    ['Total pago', `R$ ${Number(order.total_paid).toFixed(2)}`],
  ];

  const briefing = order.briefing ?? {};
  const briefingRows = Object.entries(briefing)
    .filter(([, v]) => v !== undefined && v !== null && String(v).length > 0)
    .map(([k, v]) => `<tr><td style="padding:4px 8px;color:#888">${k}</td><td style="padding:4px 8px">${Array.isArray(v) ? v.join(', ') : String(v)}</td></tr>`)
    .join('');

  return `
  <div style="font-family:sans-serif;max-width:640px">
    <h2 style="color:#FF8C00">MarmitaCode — Novo pedido</h2>
    <table style="border-collapse:collapse;width:100%">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 8px;color:#888">${k}</td><td style="padding:4px 8px"><b>${v}</b></td></tr>`).join('')}
    </table>
    <h3 style="margin-top:24px">Briefing</h3>
    <table style="border-collapse:collapse;width:100%">${briefingRows || '<tr><td>Sem dados</td></tr>'}</table>
  </div>`;
}

export async function sendOrderEmails(order: Order) {
  if (!resend) return { skipped: true };

  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM ?? 'onboarding@resend.dev';
  const html = orderSummaryHtml(order);

  const results = await Promise.allSettled([
    to
      ? resend.emails.send({
          from,
          to,
          subject: `Novo pedido MarmitaCode — ${order.template_slug ?? 'Personalizado'} (${TIER_LABELS[order.tier]})`,
          html,
        })
      : Promise.resolve(null),
    order.contact_email
      ? resend.emails.send({
          from,
          to: order.contact_email,
          subject: 'Recebemos seu pedido — MarmitaCode',
          html: `
            <div style="font-family:sans-serif;max-width:640px">
              <h2 style="color:#FF8C00">Pedido recebido!</h2>
              <p>Olá ${order.contact_name ?? ''}, recebemos seu pedido e já vamos analisar o briefing.</p>
              ${html}
            </div>`,
        })
      : Promise.resolve(null),
  ]);

  return results;
}
