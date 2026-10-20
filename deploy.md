# Deploy da MarmitaCode

Guia completo para colocar a plataforma no ar (Vercel + Supabase + Resend + Google Sheets).

---

## Visão geral da arquitetura

| Serviço | Função |
| --- | --- |
| **Vercel** | Hospeda o site Next.js (`marmitacode.vercel.app`). |
| **Supabase** | Banco de dados (Postgres), autenticação e RLS. |
| **Resend** | Envio de e-mails de pedido (para você e para o cliente). |
| **Google Sheets** | Gravação real de cada pedido em planilha. |
| **WhatsApp** | Botão de contato (link `wa.me`). |

O pagamento é **mockup** (simulado): nada é cobrado de verdade, mas o pedido é registrado e disparado pelos canais reais.

---

## 1. Configurar o Supabase

1. Acesse https://supabase.com e crie um projeto.
2. No menu **SQL Editor**, cole TODO o conteúdo de `supabase/schema.sql` e clique em **Run**.
   - Isso cria as tabelas, políticas de segurança (RLS), gatilhos e os dados de exemplo (templates + preços de domínio).
3. Vá em **Project Settings → API** e copie:
   - `Project URL` → será `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → será `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secreta!) → será `SUPABASE_SERVICE_ROLE_KEY`

### Criar sua conta de admin
1. No site rodando (ou após deploy), acesse `/login` e clique em **Criar conta** com seu e-mail.
2. No Supabase, abra **Table Editor → profiles** e mude a coluna `role` do seu usuário de `client` para `admin`.
3. Pronto: você já pode acessar `/admin`.

> Alternativa: crie o usuário em **Authentication → Users** e depois ajuste o `role` na tabela `profiles`.

---

## 2. Configurar o Resend (e-mail)

1. Crie uma conta em https://resend.com.
2. Em **API Keys**, gere uma chave → será `RESEND_API_KEY`.
3. Em **Domains**, verifique seu domínio (ou use `onboarding@resend.dev` para testes).
4. Defina:
   - `ORDER_EMAIL_FROM` — remetente (ex: `pedidos@seudominio.com` ou `onboarding@resend.dev`).
   - `ORDER_EMAIL_TO` — onde você quer receber os pedidos (seu e-mail).

Sem essas variáveis, o envio de e-mail é simplesmente ignorado (o pedido continua sendo salvo no banco).

---

## 3. Configurar o Google Sheets

1. Acesse https://console.cloud.google.com e crie um projeto.
2. Ative a **Google Sheets API**.
3. Crie uma **Service Account** (Contas de serviço) e gere uma **chave JSON**.
4. Do JSON, copie:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (cole com os `\n`; na Vercel, cole o valor inteiro entre aspas).
5. Crie uma planilha no Google Sheets e copie o ID da URL:
   `https://docs.google.com/spreadsheets/d/`**`ESTE_É_O_ID`**`/edit` → `GOOGLE_SHEETS_ID`.
6. **Compartilhe a planilha** com o `client_email` da service account (permissão de **Editor**).

Cada pedido é adicionado como uma nova linha na planilha.

---

## 4. Variáveis de ambiente

Copie `.env.example` para `.env.local` para rodar localmente, ou cadastre tudo na Vercel.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=https://marmitacode.vercel.app

RESEND_API_KEY=
ORDER_EMAIL_FROM=
ORDER_EMAIL_TO=

GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEETS_ID=

NEXT_PUBLIC_WHATSAPP_NUMBER=5583996532203
```

> `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `GOOGLE_PRIVATE_KEY` são **secretas** — nunca commite nem exponha no cliente.

---

## 5. Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev
```

Abra http://localhost:3000.

---

## 6. Deploy na Vercel

1. Suba o código para o GitHub (repo `Fardinando/MarmitaCode`).
2. Acesse https://vercel.com → **Add New → Project** → importe o repositório.
3. A Vercel detecta o Next.js automaticamente (o `vercel.json` já configura o framework).
4. Em **Environment Variables**, adicione TODAS as variáveis da seção 4.
5. Clique em **Deploy**.
6. Após o primeiro deploy, ajuste `NEXT_PUBLIC_SITE_URL` para a URL final e faça um novo deploy.

### Deploys seguintes
Basta dar `git push` na branch `main`. A Vercel rebuilda automaticamente.

---

## 7. Pós-deploy (checklist)

- [ ] Rodou o `schema.sql` no Supabase.
- [ ] Criou seu usuário e marcou `role = admin` em `profiles`.
- [ ] Preencheu todas as variáveis na Vercel.
- [ ] Compartilhou a planilha do Google com a service account.
- [ ] Testou um pedido de ponta a ponta (aparece no `/admin`, no e-mail e na planilha).
- [ ] Cadastrou/ajustou os templates em `/admin/templates`.
- [ ] Ajustou os preços de domínio em `/admin/dominio`.

---

## 8. Onde fica cada coisa (mapa rápido)

| O que | Onde |
| --- | --- |
| Landing | `/` |
| Catálogo de templates | `/templates` |
| Detalhe do template | `/templates/[slug]` |
| Comparar planos | `/planos` |
| Wizard de encomenda | `/encomendar/[slug]` |
| Confirmação | `/checkout/sucesso` |
| Área do cliente | `/conta` |
| Login/cadastro | `/login` |
| Painel admin | `/admin` |
| Demonstração de template | `/exemplo/[slug]` |
| API de pedidos | `/api/orders` |
| API de templates | `/api/templates` |
| Schema do banco | `supabase/schema.sql` |

---

## 9. Próximas fases (planejado)

- **Pagamento real**: substituir o mock por um gateway (Stripe/Mercado Pago/Pix).
- **WhatsApp automático**: integração via WhatsApp Cloud API da Meta.
- **Sub-templates reais**: cada template publicado em `marmitacode.vercel.app/<slug>`.
- **Fatura/mensalidade**: emissão automática de cobranças recorrentes.
