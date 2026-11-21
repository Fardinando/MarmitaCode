'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

const PAPER = '#E8D7B8';
const PAPER_DARK = '#D4A574';
const INK = '#2B1F18';
const INK_SOFT = '#3B2E24';
const INK_FAINT = '#8B5A2B';
const RED_STAMP = '#C84C09';
const OFF_BLACK = '#0B0A08';

const TIERS = [
  {
    nome: 'Feijão com Arroz',
    preco: '97',
    linha: 'template do cardápio, cores e marca trocadas, no ar.',
    bonus: 'Integração com WhatsApp inclusa.',
  },
  {
    nome: 'Prato Feito',
    preco: '197',
    linha: 'template com liberdade: fluxo, seções, funcionalidades.',
    bonus: 'Um mês de ajustes à vontade.',
    destaque: true,
  },
  {
    nome: 'À la Carte',
    preco: '397',
    linha: 'site 100% do zero a partir do seu prompt.',
    bonus: 'Três meses de ajustes à vontade.',
  },
];

const INGREDIENTES = [
  'Um template do cardápio (ou prompt pra fazer do zero)',
  'Briefing preenchido: cores, textos, fotos, estrutura',
  'Domínio escolhido (registra no Registro.br)',
  'A sua pressa — a gente respeita o prazo',
];

const PREPARO = [
  { tempo: 'Dia 1', acao: 'Você escolhe no cardápio e preenche o briefing' },
  { tempo: 'Dia 2–5', acao: 'Marmita no fogo: dev, revisão com você, ajustes' },
  { tempo: 'Dia 6', acao: 'Apontamento de domínio, SSL, publicação' },
  { tempo: 'Dia 7', acao: 'Seu site no ar. Garantia começa a contar aqui.' },
];

const FAQ = [
  {
    q: 'Isso funciona de verdade?',
    a: 'Já colocamos sites no ar com usuários reais pagando (ApexEnem, AgoraMed). Não é demo nem portfólio: é site em produção, com domínio, SSL e suporte.',
  },
  {
    q: 'Funciona pro meu negócio?',
    a: 'Se você é um pequeno negócio que precisa de presença profissional online — barbearia, clínica, restaurante, loja, prestador de serviço — funciona. Temos template pro seu nicho ou fazemos do zero.',
  },
  {
    q: 'Vou conseguir usar sem entender de código?',
    a: 'Você não mexe em código. Responde um briefing simples (cores, textos, imagens) e entregamos o site pronto. Mudanças depois é só nos chamar no WhatsApp.',
  },
  {
    q: 'Vale o preço comparado a uma agência?',
    a: 'Agência cobra R$ 3.000 a R$ 10.000 e leva 2 a 3 meses. Freelancer é roleta russa. Construtor drag-and-drop te prende numa plataforma cara. A gente entrega em 7 dias a partir de R$ 97.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Garantia de 7 dias. Se não aprovar o site, devolvemos 100% do valor pago. Sem letrinha miúda.',
  },
  {
    q: 'Por que começar agora?',
    a: 'Cada dia sem site é um cliente pesquisando no Google e achando seu concorrente. Em 7 dias o seu está no ar.',
  },
  {
    q: 'Por que MarmitaCode e não outro?',
    a: 'Dev solo, atendimento direto comigo no WhatsApp (nada de "fulano saiu da agência"), código enxuto e performático, e um processo de "cozinha industrial" que entrega em 7 dias sem perder qualidade.',
  },
];

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-fraunces), Georgia, serif',
};

export default function Home() {
  return (
    <main
      className="relative min-h-screen font-sans"
      style={{ backgroundColor: OFF_BLACK, color: '#F5EDE0' }}
    >
      <WhatsAppWidget />

      {/* ──────────────────────────────────────────────────────────────
          HERO — cardápio escrito, não landing SaaS
         ────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-10 md:mb-16">
            <div className="scale-110 md:scale-125 origin-top-left">
              <Logo />
            </div>
            <div
              className="hidden md:block text-right text-[11px] leading-snug"
              style={{ ...serif, color: '#C8B99F', fontStyle: 'italic' }}
            >
              cardápio da semana<br />
              <span style={{ color: '#8B7E66' }}>válido até esgotar</span>
            </div>
          </div>

          {/* Headline: Fraunces grande, sem uppercase forçado, sem palavra-em-laranja */}
          <h1
            className="max-w-5xl text-[13vw] md:text-[7.5rem] leading-[0.92] tracking-[-0.025em]"
            style={{
              ...serif,
              fontWeight: 400,
              fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 0',
              color: '#F5EDE0',
            }}
          >
            Seu site profissional,
            <br />
            <em
              style={{
                fontStyle: 'italic',
                color: RED_STAMP,
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              }}
            >
              servido em 7 dias.
            </em>
          </h1>

          <p
            className="mt-10 max-w-[48ch] text-lg md:text-xl leading-relaxed"
            style={{ color: '#C8B99F', ...serif, fontWeight: 400 }}
          >
            Do briefing ao domínio, entregue quentinho. Templates a partir de
            {' '}<span style={{ color: '#F5EDE0', fontWeight: 600 }}>R$&nbsp;97</span>{' '}
            ou projeto sob medida — pra pequenos negócios que precisam vender
            online sem virar refém de agência.
          </p>

          <div className="mt-12 flex flex-col md:flex-row md:items-end gap-6">
            <Link
              href="/templates"
              className="group inline-flex items-center gap-4 px-8 py-5 text-sm font-semibold transition-transform hover:translate-x-1"
              style={{
                backgroundColor: RED_STAMP,
                color: PAPER,
                borderRadius: '2px',
                letterSpacing: '0.02em',
              }}
            >
              Ver o cardápio
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/encomendar/personalizado?tier=personalizado"
              className="text-sm underline underline-offset-[6px] decoration-dotted"
              style={{ color: '#C8B99F', ...serif, fontStyle: 'italic' }}
            >
              …ou peça um prato do zero
            </Link>
          </div>

          {/* Linha de fé — não como pills idênticos, como anotação no cardápio */}
          <div
            className="mt-16 pt-8 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm"
            style={{
              borderTop: '1px solid rgba(200,185,159,0.2)',
              ...serif,
              color: '#C8B99F',
            }}
          >
            <span className="flex items-center gap-2">
              <span style={{ color: RED_STAMP, fontSize: '1.3em' }}>✓</span>
              Garantia de 7 dias — devolvemos 100%
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#25D366' }}
              />
              Atendimento direto comigo no WhatsApp
            </span>
            <span style={{ color: '#8B7E66', fontStyle: 'italic' }}>
              no ar agora →{' '}
              <Link
                href="/cases#apexenem"
                className="hover:underline"
                style={{ color: '#C8B99F' }}
              >
                ApexEnem
              </Link>
              ,{' '}
              <Link
                href="/cases#agoramed"
                className="hover:underline"
                style={{ color: '#C8B99F' }}
              >
                AgoraMed
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          PAS — bilhete manuscrito, não três cards SaaS
         ────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl md:text-6xl leading-[1.02] max-w-3xl"
            style={{ ...serif, fontWeight: 400, color: '#F5EDE0' }}
          >
            Site não precisa ser{' '}
            <em style={{ fontStyle: 'italic', color: RED_STAMP }}>drama.</em>
          </h2>

          <div
            className="mt-14 grid md:grid-cols-[1fr_1fr_1.1fr] gap-x-10 gap-y-12 text-[15px] leading-relaxed"
            style={{ ...serif, color: '#C8B99F' }}
          >
            <div>
              <div
                className="mb-3 text-xs tracking-wider uppercase"
                style={{ color: '#8B7E66', fontFamily: 'var(--font-plus-jakarta)' }}
              >
                1. o problema
              </div>
              <p>
                Agência cobra <strong style={{ color: '#F5EDE0', fontWeight: 600 }}>R$ 5.000</strong>
                {' '}e some no meio do projeto. Freelancer é roleta russa. Construtor
                drag-and-drop te prende numa plataforma cara que fica lenta.
              </p>
            </div>
            <div>
              <div
                className="mb-3 text-xs tracking-wider uppercase"
                style={{ color: '#8B7E66', fontFamily: 'var(--font-plus-jakarta)' }}
              >
                2. enquanto isso
              </div>
              <p>
                Seu concorrente está pegando os clientes que{' '}
                <strong style={{ color: '#F5EDE0', fontWeight: 600 }}>
                  pesquisam no Google agora
                </strong>
                . Cada semana sem site é faturamento perdido.
              </p>
            </div>
            <div
              className="md:pl-10"
              style={{ borderLeft: '1px dashed rgba(200,80,9,0.4)' }}
            >
              <div
                className="mb-3 text-xs tracking-wider uppercase"
                style={{ color: RED_STAMP, fontFamily: 'var(--font-plus-jakarta)' }}
              >
                3. a marmita
              </div>
              <p style={{ color: '#E6D9BF' }}>
                Padronizamos a produção como uma{' '}
                <strong style={{ color: '#F5EDE0', fontWeight: 600 }}>cozinha industrial</strong>
                {' '}— mesma qualidade de agência, fração do tempo. Em 7 dias no ar,
                com domínio, SSL e suporte no WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          TIERS — página do cardápio, com etiquetas de preço grampeadas
         ────────────────────────────────────────────────────────────── */}
      <section
        id="como-funciona"
        className="relative px-6 py-28 md:py-36"
        style={{ backgroundColor: PAPER, color: INK }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <h2
              className="text-5xl md:text-7xl leading-[0.95]"
              style={{
                ...serif,
                fontWeight: 500,
                color: INK,
                fontVariationSettings: '"opsz" 144, "SOFT" 40',
              }}
            >
              O cardápio.
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ ...serif, color: INK_SOFT, fontStyle: 'italic' }}
            >
              Pagamento único. Depois, R$&nbsp;47,90/mês pra hospedagem, SSL,
              backups e suporte — como a conta de luz do seu site.
            </p>
          </div>

          <div
            className="mb-14 grid grid-cols-3 gap-0"
            style={{
              borderTop: `1px solid ${INK}20`,
              borderBottom: `1px solid ${INK}20`,
            }}
          >
            <PriceAnchor label="Agência" value="R$ 3–10k" sub="2 a 3 meses" strike />
            <PriceAnchor label="Freelancer" value="R$ 800–2k" sub="prazo incerto" strike borderLeft />
            <PriceAnchor label="MarmitaCode" value="R$ 97+" sub="em 7 dias" highlight borderLeft />
          </div>

          <ul className="space-y-0">
            {TIERS.map((t, i) => (
              <li
                key={t.nome}
                className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-baseline py-10"
                style={{
                  borderTop: i === 0 ? 'none' : `1px solid ${INK}20`,
                }}
              >
                <div
                  className="text-sm tracking-widest uppercase whitespace-nowrap"
                  style={{
                    color: INK_FAINT,
                    fontFamily: 'var(--font-plus-jakarta)',
                    fontWeight: 700,
                  }}
                >
                  N.º 0{i + 1}
                </div>
                <div>
                  <h3
                    className="text-3xl md:text-5xl leading-none"
                    style={{
                      ...serif,
                      fontWeight: 500,
                      color: INK,
                      fontStyle: t.destaque ? 'italic' : 'normal',
                    }}
                  >
                    {t.nome}
                  </h3>
                  <p
                    className="mt-3 text-base md:text-lg leading-snug max-w-[48ch]"
                    style={{ ...serif, color: INK_SOFT }}
                  >
                    {t.linha}{' '}
                    <span style={{ color: RED_STAMP, fontStyle: 'italic' }}>
                      {t.bonus}
                    </span>
                  </p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div
                    className="text-[11px] tracking-widest uppercase"
                    style={{ color: INK_FAINT, fontFamily: 'var(--font-plus-jakarta)' }}
                  >
                    a partir de
                  </div>
                  <div
                    className="text-5xl md:text-6xl leading-none mt-1"
                    style={{
                      ...serif,
                      fontWeight: 600,
                      color: INK,
                      fontVariationSettings: '"opsz" 144',
                    }}
                  >
                    <span style={{ fontSize: '0.5em', verticalAlign: '0.7em', color: INK_FAINT }}>R$ </span>
                    {t.preco}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p
              className="text-sm italic leading-relaxed max-w-md"
              style={{ ...serif, color: INK_SOFT }}
            >
              <strong style={{ fontStyle: 'normal', color: INK }}>
                Garantia de 7 dias.
              </strong>{' '}
              Se não aprovar o site, devolvemos 100% do valor pago. Sem
              letrinha miúda, sem conversa pra enrolar.
            </p>
            <Link
              href="/planos"
              className="text-sm underline underline-offset-4"
              style={{ color: RED_STAMP, ...serif }}
            >
              comparar planos em detalhe →
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FORA DO CARDÁPIO — faixa quadrada no estilo embalagem
         ────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-center p-10 md:p-16"
            style={{
              border: '1px solid rgba(200,185,159,0.25)',
              borderRadius: '2px',
            }}
          >
            {/* etiqueta de pedido no canto */}
            <div
              className="absolute -top-3 left-10 px-3 py-1 text-[10px] tracking-widest uppercase"
              style={{
                backgroundColor: OFF_BLACK,
                color: RED_STAMP,
                fontFamily: 'var(--font-plus-jakarta)',
                fontWeight: 700,
                border: `1px solid ${RED_STAMP}`,
              }}
            >
              Fora do cardápio
            </div>

            <div>
              <h2
                className="text-4xl md:text-6xl leading-[1.02]"
                style={{ ...serif, fontWeight: 400, color: '#F5EDE0' }}
              >
                Não é site?{' '}
                <em style={{ fontStyle: 'italic', color: RED_STAMP }}>
                  A gente faz também.
                </em>
              </h2>
              <p
                className="mt-6 text-lg leading-relaxed max-w-[48ch]"
                style={{ ...serif, color: '#C8B99F' }}
              >
                Sistema de estoque, bot de WhatsApp, automação, app mobile,
                software desktop, dashboard administrativo — se dá pra
                programar, está no menu.
              </p>
              <Link
                href="/fora-do-cardapio"
                className="mt-10 inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold transition-transform hover:translate-x-1"
                style={{
                  backgroundColor: '#F5EDE0',
                  color: OFF_BLACK,
                  borderRadius: '2px',
                }}
              >
                Pedir Fora do Cardápio <ArrowRight size={16} />
              </Link>
            </div>

            <ul
              className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:pl-8"
              style={{
                ...serif,
                color: '#C8B99F',
                borderLeft: '1px dashed rgba(200,80,9,0.3)',
              }}
            >
              {[
                'Sistema de estoque',
                'Bot WhatsApp',
                'App mobile',
                'Software desktop',
                'Automação',
                'Dashboard',
                'Integração',
                'Sob encomenda',
              ].map((t, i) => (
                <li key={t} className="flex gap-2 md:pl-6">
                  <span style={{ color: RED_STAMP, fontFamily: 'var(--font-plus-jakarta)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          RECEITA — cartão de receita (mantido, essa parte funciona)
         ────────────────────────────────────────────────────────────── */}
      <section id="como-funciona-receita" className="relative px-6 py-24 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ backgroundColor: PAPER, color: INK }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-10 hidden md:flex flex-col justify-around items-center"
              style={{ backgroundColor: PAPER_DARK }}
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="block w-4 h-4 rounded-full"
                  style={{ backgroundColor: INK, opacity: 0.12 }}
                />
              ))}
            </div>

            <div className="p-8 md:p-16 md:pl-24">
              <div
                className="flex items-start justify-between gap-6 mb-10 pb-6"
                style={{ borderBottom: `2px solid ${INK}20` }}
              >
                <div>
                  <p
                    className="text-xs tracking-widest"
                    style={{
                      color: INK_FAINT,
                      fontFamily: 'var(--font-plus-jakarta)',
                      fontWeight: 700,
                    }}
                  >
                    RECEITA DA CASA · Nº 001
                  </p>
                  <h2
                    className="mt-3 text-5xl md:text-7xl leading-[0.95]"
                    style={{
                      ...serif,
                      fontWeight: 500,
                      fontVariationSettings: '"opsz" 144, "SOFT" 50',
                    }}
                  >
                    Site publicado
                    <br />
                    em{' '}
                    <em style={{ fontStyle: 'italic', color: RED_STAMP }}>
                      7 dias.
                    </em>
                  </h2>
                </div>
                <div
                  className="hidden md:flex shrink-0 w-28 h-28 items-center justify-center rounded-full rotate-[-8deg] text-center"
                  style={{
                    border: `3px solid ${RED_STAMP}`,
                    color: RED_STAMP,
                    ...serif,
                  }}
                >
                  <div>
                    <div className="text-[9px] tracking-[0.2em] font-bold">APROVADO</div>
                    <div className="text-2xl italic leading-none mt-1">chef</div>
                    <div className="text-[9px] tracking-[0.2em] font-bold mt-1">NA COZINHA</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <Spec label="Rende" value="1 site no ar" />
                <Spec label="Pronto em" value="7 dias" />
                <Spec label="Serve" value="1 negócio" />
              </div>

              <div className="grid md:grid-cols-5 gap-10">
                <div className="md:col-span-2">
                  <h3 className="mb-5 text-2xl" style={{ ...serif, fontWeight: 600 }}>
                    Ingredientes
                  </h3>
                  <ul className="space-y-3" style={serif}>
                    {INGREDIENTES.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-snug"
                        style={{ color: INK_SOFT }}
                      >
                        <span style={{ color: RED_STAMP }} aria-hidden="true">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-3">
                  <h3 className="mb-5 text-2xl" style={{ ...serif, fontWeight: 600 }}>
                    Modo de preparo
                  </h3>
                  <ol className="space-y-5" style={serif}>
                    {PREPARO.map((p, idx) => (
                      <li
                        key={p.tempo}
                        className="grid grid-cols-[auto_1fr] gap-5 items-baseline"
                      >
                        <span
                          className="text-xs font-bold tracking-widest whitespace-nowrap"
                          style={{
                            color: INK_FAINT,
                            fontFamily: 'var(--font-plus-jakarta)',
                          }}
                        >
                          {p.tempo}
                        </span>
                        <span className="text-[15px] leading-snug" style={{ color: INK_SOFT }}>
                          {idx + 1}. {p.acao}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <p
                className="mt-12 pt-6 text-sm leading-relaxed italic"
                style={{
                  ...serif,
                  color: '#5A4332',
                  borderTop: `1px dashed ${INK}33`,
                }}
              >
                <strong style={{ fontStyle: 'normal', fontVariationSettings: '"WONK" 1' }}>
                  Nota do chef —
                </strong>{' '}
                não gostou do prato? Devolvemos o valor em até 7 dias. Sem
                letrinha miúda, sem conversa pra enrolar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CASES — mantidos em duas colunas mas com voz de "mesa posta"
         ────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{ ...serif, fontWeight: 400, color: '#F5EDE0' }}
            >
              O que já saiu da{' '}
              <em style={{ fontStyle: 'italic', color: RED_STAMP }}>cozinha.</em>
            </h2>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ ...serif, color: '#C8B99F' }}
            >
              Não é portfólio bonito — é site em produção, com usuários reais
              pagando, código nosso e manutenção contínua.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <Case
              href="/cases#apexenem"
              nicho="EdTech, no ar"
              nome="ApexEnem"
              accent="#5B6CFF"
              resumo="Plataforma para o ENEM — correção de redação por IA, simulados adaptativos, acompanhamento de evolução."
              stats={[
                ['7d', 'entrega'],
                ['99,9%', 'uptime'],
                ['IA', 'redação'],
              ]}
            />
            <Case
              href="/cases#agoramed"
              nicho="Área de membros, no ar"
              nome="AgoraMed"
              accent="#2DD4BF"
              resumo="Área de membros pra médicos residentes — trilhas, cursos, acompanhamento. UX pensada pro turno de plantão."
              stats={[
                ['14d', 'entrega'],
                ['24/7', 'acesso'],
                ['LGPD', 'médico'],
              ]}
            />
          </div>

          <div className="mt-14">
            <Link
              href="/cases"
              className="text-sm underline underline-offset-4"
              style={{ color: '#C8B99F', ...serif, fontStyle: 'italic' }}
            >
              …ver todos os cases
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          DOMÍNIO — bloco informativo simples, sem card SaaS
         ────────────────────────────────────────────────────────────── */}
      <section
        id="dominio"
        className="relative px-6 py-24 md:py-32"
        style={{
          borderTop: '1px solid rgba(200,185,159,0.15)',
          borderBottom: '1px solid rgba(200,185,159,0.15)',
        }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <div>
            <h2
              className="text-4xl md:text-6xl leading-[1.02] max-w-xl"
              style={{ ...serif, fontWeight: 400, color: '#F5EDE0' }}
            >
              Seu site,{' '}
              <em style={{ fontStyle: 'italic', color: RED_STAMP }}>seu domínio.</em>
            </h2>
            <p
              className="mt-6 text-lg leading-relaxed max-w-[52ch]"
              style={{ ...serif, color: '#C8B99F' }}
            >
              Você registra no{' '}
              <strong style={{ color: '#F5EDE0', fontWeight: 600 }}>Registro.br</strong>
              . Enviamos o tutorial passo a passo depois do pedido, e cuidamos
              de toda a parte técnica — DNS, apontamento, SSL.
            </p>
          </div>

          <ul
            className="space-y-5 text-[15px]"
            style={{ ...serif, color: '#C8B99F' }}
          >
            {[
              'Você escolhe e registra no Registro.br',
              'Tutorial completo enviado por e-mail',
              'Nós fazemos toda a configuração técnica',
            ].map((t) => (
              <li key={t} className="flex gap-3 items-start">
                <Check size={18} style={{ color: RED_STAMP, marginTop: 3 }} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FAQ — perguntas que a gente ouve toda semana
         ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="relative px-6 py-28 md:py-36">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl md:text-6xl leading-[1.02] mb-14"
            style={{ ...serif, fontWeight: 400, color: '#F5EDE0' }}
          >
            Perguntas que a gente{' '}
            <em style={{ fontStyle: 'italic', color: RED_STAMP }}>ouve toda semana.</em>
          </h2>
          <div className="space-y-0">
            {FAQ.map((item, i) => (
              <details
                key={item.q}
                className="group"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(200,185,159,0.15)' : 'none',
                  borderBottom: '1px solid rgba(200,185,159,0.15)',
                }}
              >
                <summary
                  className="cursor-pointer list-none py-6 flex items-center justify-between gap-6"
                  style={{ ...serif, color: '#F5EDE0' }}
                >
                  <span className="text-lg md:text-xl">{item.q}</span>
                  <span
                    className="shrink-0 text-2xl leading-none transition-transform group-open:rotate-45"
                    style={{ color: RED_STAMP, ...serif }}
                  >
                    +
                  </span>
                </summary>
                <div
                  className="pb-6 pr-10 text-[15px] leading-relaxed"
                  style={{ ...serif, color: '#C8B99F' }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CTA FINAL — linha única, assinada, sem glow
         ────────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-5xl md:text-7xl leading-[1.0]"
            style={{ ...serif, fontWeight: 400, color: '#F5EDE0' }}
          >
            O fogão tá aceso.{' '}
            <em style={{ fontStyle: 'italic', color: RED_STAMP }}>
              Qual é o pedido?
            </em>
          </h2>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-6">
            <Link
              href="/templates"
              className="inline-flex items-center gap-4 px-10 py-5 text-sm font-semibold transition-transform hover:translate-x-1"
              style={{
                backgroundColor: RED_STAMP,
                color: PAPER,
                borderRadius: '2px',
              }}
            >
              Fazer meu pedido <ArrowRight size={18} />
            </Link>
            <span
              className="text-sm italic"
              style={{ ...serif, color: '#8B7E66' }}
            >
              — Fernando, chef da casa.
            </span>
          </div>
        </div>
      </section>

    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderLeft: `2px solid ${RED_STAMP}` }} className="pl-3">
      <div
        className="text-[10px] font-bold tracking-widest uppercase"
        style={{ color: INK_FAINT, fontFamily: 'var(--font-plus-jakarta)' }}
      >
        {label}
      </div>
      <div
        className="text-xl md:text-2xl mt-1"
        style={{ ...serif, fontWeight: 600, color: INK }}
      >
        {value}
      </div>
    </div>
  );
}

function PriceAnchor({
  label,
  value,
  sub,
  strike,
  highlight,
  borderLeft,
}: {
  label: string;
  value: string;
  sub: string;
  strike?: boolean;
  highlight?: boolean;
  borderLeft?: boolean;
}) {
  return (
    <div
      className="py-6 px-4 md:px-8 text-center"
      style={{
        borderLeft: borderLeft ? `1px solid ${INK}20` : undefined,
        backgroundColor: highlight ? `${RED_STAMP}10` : 'transparent',
      }}
    >
      <div
        className="text-[10px] uppercase tracking-widest mb-2"
        style={{
          color: highlight ? RED_STAMP : INK_FAINT,
          fontFamily: 'var(--font-plus-jakarta)',
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        className="text-2xl md:text-3xl leading-none"
        style={{
          ...serif,
          fontWeight: 600,
          color: highlight ? RED_STAMP : INK,
          textDecoration: strike ? 'line-through' : 'none',
          textDecorationColor: strike ? '#C84C0966' : undefined,
          opacity: strike ? 0.7 : 1,
        }}
      >
        {value}
      </div>
      <div
        className="text-[11px] mt-2 italic"
        style={{ ...serif, color: INK_SOFT, opacity: strike ? 0.7 : 1 }}
      >
        {sub}
      </div>
    </div>
  );
}

function Case({
  href,
  nicho,
  nome,
  accent,
  resumo,
  stats,
}: {
  href: string;
  nicho: string;
  nome: string;
  accent: string;
  resumo: string;
  stats: [string, string][];
}) {
  return (
    <Link href={href} className="group block">
      <div
        className="text-xs tracking-widest uppercase mb-5 flex items-center gap-2"
        style={{ color: accent, fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700 }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
        {nicho}
      </div>
      <h3
        className="text-5xl md:text-6xl leading-none"
        style={{ ...serif, fontWeight: 500, color: '#F5EDE0' }}
      >
        {nome}
      </h3>
      <p
        className="mt-5 text-[15px] leading-relaxed max-w-[48ch]"
        style={{ ...serif, color: '#C8B99F' }}
      >
        {resumo}
      </p>
      <div
        className="mt-8 flex gap-10 text-sm"
        style={{ ...serif, color: '#8B7E66' }}
      >
        {stats.map(([n, l]) => (
          <div key={l}>
            <div
              className="text-2xl md:text-3xl leading-none"
              style={{ ...serif, fontWeight: 600, color: accent }}
            >
              {n}
            </div>
            <div className="text-[11px] uppercase tracking-widest mt-2" style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 700 }}>
              {l}
            </div>
          </div>
        ))}
      </div>
      <span
        className="mt-8 inline-flex items-center gap-2 text-sm underline underline-offset-4 group-hover:gap-3 transition-all"
        style={{ color: accent, ...serif, fontStyle: 'italic' }}
      >
        ver o case →
      </span>
    </Link>
  );
}
