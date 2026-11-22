import 'server-only';

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { siteConfig } from '@/lib/site-config';

const accessToken = process.env.MP_ACCESS_TOKEN;

function client() {
  if (!accessToken) throw new Error('Mercado Pago nao configurado.');
  return new MercadoPagoConfig({ accessToken, options: { timeout: 10_000 } });
}

export interface RenewalPrefResult {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export async function createRenewalPreference(opts: {
  projectId: string;
  amount: number;
  payerEmail?: string | null;
  payerName?: string | null;
}): Promise<RenewalPrefResult> {
  const mp = client();
  const pref = new Preference(mp);

  const result = await pref.create({
    body: {
      external_reference: `renew:${opts.projectId}`,
      items: [
        {
          id: `renew-${opts.projectId}`,
          title: 'Mensalidade MarmitaCode (antecipada)',
          description: 'Antecipa 30 dias no vencimento do site',
          quantity: 1,
          unit_price: Number(opts.amount),
          currency_id: 'BRL',
        },
      ],
      payer: opts.payerEmail
        ? { name: opts.payerName ?? undefined, email: opts.payerEmail }
        : undefined,
      back_urls: {
        success: `${siteConfig.url}/conta?renew=ok`,
        pending: `${siteConfig.url}/conta?renew=pending`,
        failure: `${siteConfig.url}/conta?renew=fail`,
      },
      auto_return: 'approved',
      notification_url: `${siteConfig.url}/api/payments/webhook`,
      statement_descriptor: 'MARMITACODE',
      payment_methods: { installments: 1 },
    },
  });

  return {
    id: result.id!,
    init_point: result.init_point!,
    sandbox_init_point: result.sandbox_init_point!,
  };
}
