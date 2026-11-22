-- Rastreia qual next_due_date ja foi avisada por email, pra o cron
-- nao reenviar o mesmo lembrete todo dia da semana que antecede.
alter table public.site_projects
  add column if not exists last_reminder_due_date date;

-- Comentario pra referencia
comment on column public.site_projects.last_reminder_due_date is
  'next_due_date pra qual ja enviamos email de aviso. Usado pelo cron /api/cron/monthly-reminders pra idempotencia por ciclo.';
