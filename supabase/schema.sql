-- MarmitaCode v2 - Supabase schema
-- Run this in the Supabase SQL editor.

-- ============ PROFILES ============
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('admin', 'client')),
  name text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is current user admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============ TEMPLATES ============
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text,
  long_description text,
  image_url text,
  demo_url text,
  featured boolean not null default false,
  active boolean not null default true,
  features jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ TEMPLATE TIERS ============
create table if not exists public.template_tiers (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  tier text not null check (tier in ('basico', 'intermediario', 'premium')),
  setup_price numeric(10,2) not null default 0,
  monthly_price numeric(10,2) not null default 0,
  features jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  unique (template_id, tier)
);

-- ============ DOMAIN PRICING ============
create table if not exists public.domain_pricing (
  id uuid primary key default gen_random_uuid(),
  years int not null unique,
  registry_price numeric(10,2) not null default 0,
  labor_fee numeric(10,2) not null default 10,
  active boolean not null default true,
  sort_order int not null default 0
);

-- ============ DISCOUNTS ============
create table if not exists public.discounts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  percent numeric(5,2) not null default 0,
  amount numeric(10,2) not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============ ORDERS ============
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles(id) on delete set null,
  template_id uuid references public.templates(id) on delete set null,
  template_slug text,
  tier text not null check (tier in ('basico', 'intermediario', 'premium', 'personalizado')),
  status text not null default 'aguardando_pagamento'
    check (status in ('aguardando_pagamento','pago','briefing_recebido','em_producao','publicado','manutencao','cancelado')),
  briefing jsonb not null default '{}'::jsonb,
  contact_name text,
  contact_email text,
  contact_phone text,
  company_name text,
  setup_price numeric(10,2) not null default 0,
  monthly_price numeric(10,2) not null default 0,
  discount_code text,
  discount_amount numeric(10,2) not null default 0,
  domain_years int,
  domain_total numeric(10,2) not null default 0,
  total_paid numeric(10,2) not null default 0,
  payment_mock boolean not null default true,
  client_ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ SITE PROJECTS ============
create table if not exists public.site_projects (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  client_id uuid references public.profiles(id) on delete set null,
  site_url text,
  status text not null default 'em_producao',
  monthly_status text not null default 'pendente' check (monthly_status in ('pendente','ativo','atrasado','cancelado')),
  next_due_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ SETTINGS ============
create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ============ RLS ============
alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.template_tiers enable row level security;
alter table public.domain_pricing enable row level security;
alter table public.discounts enable row level security;
alter table public.orders enable row level security;
alter table public.site_projects enable row level security;
alter table public.settings enable row level security;

-- profiles: own read/update, admin all
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (id = auth.uid() or public.is_admin());

-- public catalog: anyone can read
drop policy if exists templates_read on public.templates;
create policy templates_read on public.templates for select using (true);
drop policy if exists tiers_read on public.template_tiers;
create policy tiers_read on public.template_tiers for select using (true);
drop policy if exists domain_read on public.domain_pricing;
create policy domain_read on public.domain_pricing for select using (true);

-- admin write on catalog
drop policy if exists templates_admin_write on public.templates;
create policy templates_admin_write on public.templates for all
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists tiers_admin_write on public.template_tiers;
create policy tiers_admin_write on public.template_tiers for all
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists domain_admin_write on public.domain_pricing;
create policy domain_admin_write on public.domain_pricing for all
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists discounts_admin on public.discounts;
create policy discounts_admin on public.discounts for all
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists settings_admin on public.settings;
create policy settings_admin on public.settings for all
  using (public.is_admin()) with check (public.is_admin());

-- orders: client sees own, admin all
drop policy if exists orders_select on public.orders;
create policy orders_select on public.orders for select
  using (client_id = auth.uid() or public.is_admin());
drop policy if exists orders_admin_write on public.orders;
create policy orders_admin_write on public.orders for all
  using (public.is_admin()) with check (public.is_admin());

-- site_projects: client sees own, admin all
drop policy if exists projects_select on public.site_projects;
create policy projects_select on public.site_projects for select
  using (client_id = auth.uid() or public.is_admin());
drop policy if exists projects_admin_write on public.site_projects;
create policy projects_admin_write on public.site_projects for all
  using (public.is_admin()) with check (public.is_admin());

-- ============ PAGAMENTO (Mercado Pago) ============
alter table public.orders add column if not exists payment_provider text;
alter table public.orders add column if not exists payment_id text;
alter table public.orders add column if not exists payment_status text;
alter table public.orders add column if not exists payment_url text;

-- ============ SEED ============
insert into public.templates (slug, name, category, description, long_description, demo_url, featured, active, features, sort_order) values
  ('restaurante', 'Sabor da Casa', 'Restaurante', 'Site para restaurantes e delivery com cardápio e pedido pelo WhatsApp.', 'Template completo para restaurantes: hero com destaque, cardápio categorizado, horários, endereço e botão de pedido direto no WhatsApp.', '/exemplo/restaurante', true, true, '["Cardápio categorizado","Pedido pelo WhatsApp","Horários e endereço","Visual aconchegante"]', 1),
  ('barbearia', 'Barber Studio', 'Barbearia', 'Site de barbearia e salão com serviços, equipe e agendamento.', 'Visual moderno preto e dourado, serviços com preços, equipe, agendamento rápido pelo WhatsApp. Perfeito para barbearias e salões.', '/exemplo/barbearia', true, true, '["Serviços com preços","Perfis da equipe","Agendamento WhatsApp","Visual masculino premium"]', 2),
  ('curso', 'Academia Online', 'Cursos', 'Página de curso online com módulos, depoimentos e inscrição.', 'Landing page completa para venda de curso: hero convertedor, módulos, depoimentos, preço e CTA. Pensada para alta conversão.', '/exemplo/curso', true, true, '["Hero de alta conversão","Módulos detalhados","Depoimentos","Checkout do curso"]', 3),
  ('portfolio', 'Portfolio Studio', 'Portfólio', 'Portfólio profissional minimalista com projetos, bio e contato.', 'Portfólio elegante e minimalista para designers, criativos e consultores. Grid de projetos, bio completa e contato direto.', '/exemplo/portfolio', false, true, '["Grid de projetos","Bio detalhada","Design minimalista","Contato direto"]', 4),
  ('loja', 'Loja Boutique', 'E-commerce', 'Vitrine de produtos com pedido via WhatsApp.', 'Vitrine moderna para pequenos lojistas. Grade de produtos, destaques, promoções e pedido via WhatsApp. Sem complicação de pagamento online.', '/exemplo/loja', true, true, '["Vitrine de produtos","Pedido via WhatsApp","Destaques e promoções","Fácil de atualizar"]', 5)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  long_description = excluded.long_description,
  demo_url = excluded.demo_url,
  featured = excluded.featured,
  active = excluded.active,
  features = excluded.features,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.template_tiers (template_id, tier, setup_price, monthly_price, features)
select t.id, tiers.tier, tiers.setup, tiers.monthly, tiers.features
from public.templates t
cross join (values
  ('basico', 300, 75, '["Troca de logomarca","Troca de cores","Troca de textos"]'::jsonb),
  ('intermediario', 500, 100, '["Tudo do Básico","Animações personalizadas","Reordenação de seções","Ajuste de fluxos"]'::jsonb),
  ('premium', 900, 125, '["Tudo do Intermediário","Design exclusivo","Lógica sob medida","Baseado ou não em template"]'::jsonb)
) as tiers(tier, setup, monthly, features)
on conflict (template_id, tier) do nothing;

insert into public.domain_pricing (years, registry_price, labor_fee, sort_order) values
  (1, 40, 10, 1),
  (2, 80, 10, 2),
  (3, 120, 10, 3),
  (5, 200, 10, 5),
  (10, 400, 10, 10)
on conflict (years) do nothing;

insert into public.settings (key, value) values
  ('brand', '{"name":"MarmitaCode","tagline":"Solução entregue quentinha","whatsapp":"5583996532203","email":"contato@marmitacode.com"}'),
  ('domain_policy', '{"registry":"registro.br","note":"O cliente compra o domínio no Registro.br e informa nossas credenciais como administrador. O cliente permanece como proprietário. A taxa é anual e controlada pelo Registro.br."}')
on conflict (key) do nothing;
