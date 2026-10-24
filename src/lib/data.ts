import 'server-only';

import { createClient } from '@/lib/supabase/server';
import type { DomainPricing, Template, TemplateTier } from '@/lib/types';

export interface TemplateWithTiers extends Template {
  tiers: TemplateTier[];
}

// Used when the domain_pricing table is empty or unreachable, so the domain
// step in the order wizard always works (Registro.br annual + one-time labor).
export const DEFAULT_DOMAIN_PRICING: DomainPricing[] = [
  { id: 'default-1', years: 1, registry_price: 40, labor_fee: 10, active: true, sort_order: 1 },
  { id: 'default-2', years: 2, registry_price: 80, labor_fee: 10, active: true, sort_order: 2 },
  { id: 'default-3', years: 3, registry_price: 120, labor_fee: 10, active: true, sort_order: 3 },
  { id: 'default-5', years: 5, registry_price: 200, labor_fee: 10, active: true, sort_order: 5 },
  { id: 'default-10', years: 10, registry_price: 400, labor_fee: 10, active: true, sort_order: 10 },
];

// Fallback plans for the 100% custom order flow (no template selected).
// Pra rota 'personalizado' só faz sentido o plano À la Carte, que é o único
// que cobre projetos do zero.
export function defaultCustomTiers(): TemplateTier[] {
  return [
    {
      id: 'custom-premium',
      template_id: 'custom',
      tier: 'premium',
      setup_price: 397,
      monthly_price: 47.9,
      features: [
        'Projeto 100% personalizado',
        'Desenvolvido do zero a partir do seu briefing',
        'Design exclusivo',
        'Lógica frontend sob medida',
      ],
      active: true,
    },
  ];
}

export async function getTemplates(): Promise<Template[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('templates')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    return (data as Template[]) ?? [];
  } catch {
    return [];
  }
}

export async function getTemplateBySlug(slug: string): Promise<TemplateWithTiers | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('templates')
      .select('*, tiers:template_tiers(*)')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (!data) return null;
    return data as unknown as TemplateWithTiers;
  } catch {
    return null;
  }
}

export async function getDomainPricing(): Promise<DomainPricing[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('domain_pricing')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (!data || data.length === 0) return DEFAULT_DOMAIN_PRICING;
    return data as DomainPricing[];
  } catch {
    return DEFAULT_DOMAIN_PRICING;
  }
}
