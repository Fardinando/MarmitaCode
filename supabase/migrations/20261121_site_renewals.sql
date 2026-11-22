-- Tabela de pagamentos de mensalidade (antecipacao / renovacao).
-- Cada linha e um pagamento que estendeu o next_due_date em 30 dias.
create table if not exists public.site_renewals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.site_projects(id) on delete cascade,
  payment_id text not null unique,
  amount numeric(10,2) not null default 0,
  previous_due_date date,
  new_due_date date not null,
  paid_at timestamptz not null default now()
);

create index if not exists site_renewals_project_idx on public.site_renewals(project_id);

alter table public.site_renewals enable row level security;

-- cliente ve os proprios, admin ve tudo
drop policy if exists site_renewals_select on public.site_renewals;
create policy site_renewals_select on public.site_renewals for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.site_projects p
      where p.id = project_id and p.client_id = auth.uid()
    )
  );

drop policy if exists site_renewals_admin_write on public.site_renewals;
create policy site_renewals_admin_write on public.site_renewals for all
  using (public.is_admin()) with check (public.is_admin());
