import 'server-only';

import { google } from 'googleapis';
import type { Order } from '@/lib/types';
import { TIER_LABELS } from '@/lib/types';

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!email || !key || !spreadsheetId) return null;

  return {
    spreadsheetId,
    auth: new google.auth.JWT({
      email,
      key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
  };
}

export async function appendOrderToSheet(order: Order) {
  const config = getAuth();
  if (!config) return { skipped: true };

  const sheets = google.sheets({ version: 'v4', auth: config.auth });

  const values = [[
    new Date(order.created_at).toLocaleString('pt-BR'),
    order.id,
    order.template_slug ?? 'Personalizado',
    TIER_LABELS[order.tier],
    order.contact_name ?? '',
    order.contact_email ?? '',
    order.contact_phone ?? '',
    order.company_name ?? '',
    Number(order.setup_price).toFixed(2),
    Number(order.monthly_price).toFixed(2),
    order.domain_years ?? '',
    Number(order.domain_total).toFixed(2),
    order.discount_code ?? '',
    Number(order.total_paid).toFixed(2),
    JSON.stringify(order.briefing ?? {}),
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });

  return { ok: true };
}
