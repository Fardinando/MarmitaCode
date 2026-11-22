-- Garante que todos os template_tiers tenham os precos corretos:
-- R$ 97 / R$ 197 / R$ 397 setup, todos com R$ 47,90/mes.
-- Caso antigos valores (300/500/900 ou 75/100/125) ainda existam,
-- esse UPDATE corrige.

update public.template_tiers
set setup_price = 97, monthly_price = 47.90
where tier = 'basico';

update public.template_tiers
set setup_price = 197, monthly_price = 47.90
where tier = 'intermediario';

update public.template_tiers
set setup_price = 397, monthly_price = 47.90
where tier = 'premium';
