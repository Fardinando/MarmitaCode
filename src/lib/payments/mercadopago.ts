import 'server-only';

import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import type { Order } from '@/lib/types';
import { siteConfig } from '@/lib/site-config';

const accessToken = process.env.MP_ACCESS_TOKEN;

export const mpEnabled = () => Boolean(accessToken);

function client() {
  if (!accessToken) throw new Error('Mercado Pago não configurado.');
  return new MercadoPagoConfig({ accessToken, options: { timeout: 10_000 } });
}

export interface PreferenceResult {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export async function createOrderPreference(order: Order): Promise<PreferenceResult> {
  const mp = client();
  const pref = new Preference(mp);

  const items: Array<{
    id: string;
    title: string;
    description?: string;
    quantity: number;
    unit_price: number;
    currency_id: 'BRL';
  }> = [
    {
      id: `setup-${order.id}`,
      title: `Site MarmitaCode — ${order.template_slug ?? 'Personalizado'}`,
      description: `Setup único, plano ${order.tier}`,
      quantity: 1,
      unit_price: Number(order.setup_price),
      currency_id: 'BRL',
    },
  ];

  if (order.domain_total && order.domain_years) {
    items.push({
      id: `domain-${order.id}`,
      title: `Registro de domínio (${order.domain_years} ano${order.domain_years > 1 ? 's' : ''})`,
      quantity: 1,
      unit_price: Number(order.domain_total),
      currency_id: 'BRL',
    });
  }

  if (Number(order.discount_amount) > 0) {
    items.push({
      id: `discount-${order.id}`,
      title: `Desconto (${order.discount_code ?? '-'})`,
      quantity: 1,
      unit_price: -Number(order.discount_amount),
      currency_id: 'BRL',
    });
  }

  const result = await pref.create({
    body: {
      external_reference: order.id,
      items,
      payer: order.contact_email
        ? {
            name: order.contact_name ?? undefined,
            email: order.contact_email,
          }
        : undefined,
      back_urls: {
        success: `${siteConfig.url}/checkout/sucesso?order=${order.id}`,
        pending: `${siteConfig.url}/checkout/pendente?order=${order.id}`,
        failure: `${siteConfig.url}/checkout/falha?order=${order.id}`,
      },
      auto_return: 'approved',
      notification_url: `${siteConfig.url}/api/payments/webhook`,
      statement_descriptor: 'MARMITACODE',
      payment_methods: {
        installments: 12,
      },
    },
  });

  return {
    id: result.id!,
    init_point: result.init_point!,
    sandbox_init_point: result.sandbox_init_point!,
  };
}

export async function getPaymentInfo(paymentId: string) {
  const mp = client();
  const payment = new Payment(mp);
  return payment.get({ id: paymentId });
}
