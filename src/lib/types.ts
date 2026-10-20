export type Role = 'admin' | 'client';

export type Tier = 'basico' | 'intermediario' | 'premium' | 'personalizado';

export type OrderStatus =
  | 'aguardando_pagamento'
  | 'pago'
  | 'briefing_recebido'
  | 'em_producao'
  | 'publicado'
  | 'manutencao'
  | 'cancelado';

export type MonthlyStatus = 'pendente' | 'ativo' | 'atrasado' | 'cancelado';

export interface Profile {
  id: string;
  role: Role;
  name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  long_description: string | null;
  image_url: string | null;
  demo_url: string | null;
  featured: boolean;
  active: boolean;
  features: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TemplateTier {
  id: string;
  template_id: string;
  tier: Tier;
  setup_price: number;
  monthly_price: number;
  features: string[];
  active: boolean;
}

export interface DomainPricing {
  id: string;
  years: number;
  registry_price: number;
  labor_fee: number;
  active: boolean;
  sort_order: number;
}

export interface Discount {
  id: string;
  code: string;
  percent: number;
  amount: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface Briefing {
  business_name?: string;
  segment?: string;
  primary_color?: string;
  secondary_color?: string;
  layout?: string;
  about?: string;
  sections?: string[];
  references?: string;
  logo_url?: string;
  extra?: string;
}

export interface Order {
  id: string;
  client_id: string | null;
  template_id: string | null;
  template_slug: string | null;
  tier: Tier;
  status: OrderStatus;
  briefing: Briefing;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  company_name: string | null;
  setup_price: number;
  monthly_price: number;
  discount_code: string | null;
  discount_amount: number;
  domain_years: number | null;
  domain_total: number;
  total_paid: number;
  payment_mock: boolean;
  client_ip: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteProject {
  id: string;
  order_id: string;
  client_id: string | null;
  site_url: string | null;
  status: string;
  monthly_status: MonthlyStatus;
  next_due_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const TIER_LABELS: Record<Tier, string> = {
  basico: 'Básico',
  intermediario: 'Intermediário',
  premium: 'Premium',
  personalizado: '100% Personalizado',
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  aguardando_pagamento: 'Aguardando pagamento',
  pago: 'Pago',
  briefing_recebido: 'Briefing recebido',
  em_producao: 'Em produção',
  publicado: 'Publicado',
  manutencao: 'Em manutenção',
  cancelado: 'Cancelado',
};

export const MONTHLY_LABELS: Record<MonthlyStatus, string> = {
  pendente: 'Pendente',
  ativo: 'Ativo',
  atrasado: 'Atrasado',
  cancelado: 'Cancelado',
};

export const TEMPLATE_CATEGORIES = [
  'E-commerce',
  'Cursos',
  'Portfólio',
  'Landing Page',
  'Institucional',
  'Blog',
  'Restaurante',
  'Serviços',
] as const;
