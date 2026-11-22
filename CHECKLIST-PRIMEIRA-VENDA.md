# Checklist pra primeira venda do MarmitaCode

Auditoria do sistema completo (2026-11-21). Siga essa lista antes de divulgar o site.

## Fluxo do comprador (ja implementado)

1. **Entra em `/templates`** -> escolhe template ou "Faça do zero"
2. **Preenche briefing** em `/encomendar/[slug]` -> servidor valida (Zod), cria `order` com status `aguardando_pagamento`
3. **Checkout** -> redirecionado pra Mercado Pago (Pix / cartao) OU fallback mockup se MP nao configurado
4. **Webhook** `/api/payments/webhook` recebe aprovacao -> marca order como `pago`, cria/atualiza `site_project` com:
   - `status = 'em_producao'`
   - `monthly_status = 'ativo'`
   - `next_due_date = hoje + 30 dias` (primeira mensalidade; setup cobre o primeiro mes)
5. **Email de briefing recebido** disparado automaticamente pra voce (admin) e pro cliente
6. **Comprador cria conta** em `/checkout/criar-conta` -> fica vinculado ao `client_id` do order
7. **Minha conta** `/conta` -> cliente ve o status do site, URL quando publicada, e a data da proxima mensalidade

## Fluxo de mensalidade (NOVO - implementado nesse commit)

- `vercel.json` -> cron diario as 12:00 UTC (09:00 BRT)
- `src/app/api/cron/monthly-reminders/route.ts` -> busca `site_projects` com:
  - `monthly_status = 'ativo'`
  - `next_due_date entre hoje e hoje+7`
  - `last_reminder_due_date != next_due_date` (idempotencia)
- Dispara DOIS emails por projeto:
  - **Pra voce (admin)**: lembre o cliente X no WhatsApp. Botao `wa.me/...` com mensagem pre-preenchida.
  - **Pro cliente**: avisa que a mensalidade vence em N dias. Botao WhatsApp pra pagar direto com voce.
- Depois de enviar, grava `last_reminder_due_date = next_due_date` pra nao reenviar
- Resposta JSON com `checked` + `sent` + `errors` pra auditar

## Passos pra ativar o cron antes da primeira venda

1. **Rodar as migrations** em Supabase (SQL Editor, na ordem):
   ```sql
   -- supabase/migrations/20261121_monthly_reminders.sql
   alter table public.site_projects
     add column if not exists last_reminder_due_date date;

   -- supabase/migrations/20261121_fix_tier_prices.sql
   update public.template_tiers set setup_price = 97,  monthly_price = 47.90 where tier = 'basico';
   update public.template_tiers set setup_price = 197, monthly_price = 47.90 where tier = 'intermediario';
   update public.template_tiers set setup_price = 397, monthly_price = 47.90 where tier = 'premium';
   ```
   Depois rode `GET /api/setup/seed` (precisa de admin logado) pra garantir os templates e features atualizados.

2. **Setar env vars na Vercel** (Settings -> Environment Variables):
   - `CRON_SECRET` -> rode `openssl rand -hex 32` e cole o resultado
     - Usado so pra testes manuais; a Vercel injeta `x-vercel-cron: 1` automatico
   - Confirma que ja existem: `RESEND_API_KEY`, `ORDER_EMAIL_TO` (seu email), `ORDER_EMAIL_FROM`,
     `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`

3. **Deploy** -> o cron so comeca a rodar DEPOIS do deploy com o `vercel.json` atualizado

4. **Testar o cron manualmente**:
   ```bash
   curl -H "Authorization: Bearer $CRON_SECRET" \
     https://marmitacode.dev.br/api/cron/monthly-reminders
   ```
   Resposta esperada: `{"ok":true,"checked":0,"sent":0}` (ainda sem vendas).

## Outros checkpoints pra primeira venda

- [ ] **Mercado Pago em modo producao** -> `MP_ACCESS_TOKEN` precisa ser o token PROD (nao TEST).
      Confere em `src/lib/payments/mercadopago.ts` que `mpEnabled()` retorna `true`.
- [ ] **Webhook do MP apontando pro dominio real** -> no painel do MP, URL de notificacao =
      `https://marmitacode.dev.br/api/payments/webhook`
- [ ] **MP_WEBHOOK_SECRET setado** -> gerado no painel do MP e colado na Vercel. Sem isso,
      o webhook rejeita a notificacao com 401.
- [ ] **Emails chegando**: rode uma compra teste (pode ser R$ 1 em dev) e confere que recebe
      os dois emails (admin e cliente).
- [ ] **Google Sheets opcional**: se quiser log em planilha, preencha
      `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEETS_ID`.
- [ ] **Teste de email de lembrete**: insira manualmente um `site_projects` com
      `next_due_date = hoje + 3 dias` e rode o cron com curl -> deve disparar os dois emails.

## Quando o cliente paga a mensalidade (fluxo manual, por enquanto)

Fluxo atual: cliente paga voce no Pix/WhatsApp, voce abre `/admin/pedidos`, encontra o
pedido, e **atualiza `site_projects.next_due_date` manualmente** pra +30 dias (ou ajusta no
Supabase direto). Automacao disso pode ser feita depois — por enquanto, cada mensalidade
e um toque manual seu.

## Arquitetura (resumida)

```
/ (home) -> /templates -> /encomendar/[slug] -> POST /api/orders
                                                    |
                                                    v
                                              Mercado Pago (checkout)
                                                    |
                                                    v
                            POST /api/payments/webhook (confirma pagamento)
                                                    |
                            +-----------------------+-----------------------+
                            |                       |                       |
                            v                       v                       v
                     update order           update site_project       sendOrderEmails
                     (status='pago')        (monthly_status='ativo',    (admin+cliente)
                                             next_due_date=+30d)

                    (depois disso, diariamente)
                            |
                            v
        Vercel Cron -> GET /api/cron/monthly-reminders
                            |
                            v
                    sendMonthlyReminderEmails (admin+cliente)
```
