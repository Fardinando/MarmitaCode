import 'server-only';

import { createClient } from '@/lib/supabase/server';
import type { DomainPricing, Template, TemplateTier } from '@/lib/types';

export interface TemplateWithTiers extends Template {
  tiers: TemplateTier[];
}

export async function getTemplates(): Promise<Template[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('templates')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  return (data as Template[]) ?? [];
}

export async function getTemplateBySlug(slug: string): Promise<TemplateWithTiers | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('templates')
    .select('*, tiers:template_tiers(*)')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (!data) return null;
  return data as unknown as TemplateWithTiers;
}

export async function getDomainPricing(): Promise<DomainPricing[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('domain_pricing')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  return (data as DomainPricing[]) ?? [];
}
