import type { DomainPricing, TemplateTier } from '@/lib/types';

export function domainTotal(dp: DomainPricing) {
  return Number(dp.registry_price) + Number(dp.labor_fee);
}

export function calcTotal(opts: {
  setup: number;
  domain: number;
  discount: number;
}) {
  return Math.max(0, opts.setup + opts.domain - opts.discount);
}

export function tierLabelPrice(tier: TemplateTier) {
  const setup = Number(tier.setup_price);
  const monthly = Number(tier.monthly_price);
  return `R$${setup.toFixed(0)} + R$${monthly.toFixed(0)}/mês`;
}
