# MarmitaCode

Plataforma de portfólio e venda de sites: templates prontos, três níveis de customização e pedidos com briefing completo.

- **Site**: https://marmitacode.vercel.app
- **Deploy**: veja [`deploy.md`](./deploy.md)
- **Banco**: [`supabase/schema.sql`](./supabase/schema.sql)

## O que a plataforma faz

- **Vitrine de templates** por categoria (e-commerce, cursos, portfólio, etc.).
- **Três planos**: Básico (troca de logo/cores/textos), Intermediário (animações fluxos) e 100% Personalizado.
- **Wizard de encomenda**: escolha do plano → briefing (cores com seletor, disposição, conteúdo) → domínio opcional → contato → checkout.
- **Domínio**: o cliente escolhe o período (1/2/3/5/10 anos); nós registramos no Registro.br com nossas credenciais como administrador, o cliente fica como dono. Taxa do Registro.br (anual) + mão de obra única.
- **Entrega do pedido**: salvo no Supabase, enviado por e-mail (Resend) e gravado em Google Sheets, com link de WhatsApp.
- **Checkout mock**: pagamento simulado nesta fase.
- **Conta do contratante** (`/conta`): pedidos, sites, mensalidade.
- **Painel admin** (`/admin`): templates, preços, pedidos, contratantes, descontos e preços de domínio.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Supabase (Postgres + Auth + RLS) · Resend · Google Sheets API.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

Abra http://localhost:3000.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servir o build
- `npm run lint` — ESLint

## Estrutura

```
src/
  app/          rotas (público, conta, admin, api)
  components/   componentes de UI
  lib/          supabase, auth, dados, notificações, tipos
supabase/
  schema.sql    schema completo (tabelas, RLS, seed)
```
