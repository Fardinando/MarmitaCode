import Link from 'next/link';
import {
  Globe,
  Check,
  ArrowRight,
  Lock,
  Shield,
  Gift,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import {
  C,
  serif,
  sans,
  PageShell,
  Section,
  SectionHead,
  Display,
  Emph,
  Lead,
  Eyebrow,
  PrimaryBtn,
  GhostBtn,
  Card,
  Numero,
} from '@/components/ui';

const TIERS = [
  {
    key: 'basico',
    nome: 'Feijão com Arroz',
    preco: '97',
    desc: 'O básico bem feito: pegue um dos nossos templates e troque cores, marca, fontes e textos. Pronto pra servir.',
    bonus: 'Integração com WhatsApp inclusa',
  },
  {
    key: 'intermediario',
    nome: 'Prato Feito',
    preco: '197',
    desc: 'Template com mais liberdade: mude o fluxo, adicione ou tire funcionalidades, ajuste seções. Ainda é marmita, só que turbinada.',
    bonus: '1 mês de ajustes ilimitados',
    destaque: true,
  },
  {
    key: 'premium',
    nome: 'À la Carte',
    preco: '397',
    desc: 'Site 100% personalizado, desenvolvido do zero a partir do seu prompt. Nada de template — o chef prepara exclusivo pra você.',
    bonus: '3 meses de ajustes ilimitados',
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

export default function Home() {
  return (
    <PageShell>
      <WhatsAppWidget />

      {/* HERO */}
      <section className="relative px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 md:mb-20">
            <Logo />
          </div>

          <Eyebrow>cardápio da semana · pronto em 7 dias</Eyebrow>

          <h1
            className="text-[12vw] md:text-[7rem] leading-[0.95] tracking-[-0.025em] max-w-5xl"
            style={{
              ...serif,
              fontWeight: 400,
              color: C.text,
              fontVariationSettings: '"opsz" 144, "SOFT" 50',
            }}
          >
            Seu site profissional,
            <br />
            <Emph>servido em 7 dias.</Emph>
          </h1>

          <div className="mt-10 max-w-[52ch]">
            <Lead>
              Do briefing ao domínio, entregue quentinho. Templates a partir de{' '}
              <strong style={{ color: C.text, fontWeight: 600 }}>R$ 97</strong>{' '}
              ou projeto sob medida — pra pequenos negócios que precisam vender
              online sem virar refém de agência.
            </Lead>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <PrimaryBtn href="/templates">
              Ver o cardápio <ArrowRight size={16} />
            </PrimaryBtn>
            <Link
              href="/encomendar/personalizado?tier=personalizado"
              className="text-base underline underline-offset-4"
              style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
            >
              …ou peça um prato do zero
            </Link>
          </div>

          <div
            className="mt-16 pt-8 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm"
            style={{
              borderTop: `1px solid ${C.border}`,
              ...serif,
              color: C.textMuted,
            }}
          >
            <span className="flex items-center gap-2">
              <Shield size={14} style={{ color: C.accent }} />
              Garantia de 7 dias — devolvemos 100%
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#25D366' }}
              />
              Atendimento direto comigo no WhatsApp
            </span>
            <span style={{ color: C.textFaint, fontStyle: 'italic' }}>
              no ar agora →{' '}
              <Link
                href="/cases#apexenem"
                className="hover:text-[#F5EFE4]"
                style={{ color: C.textMuted }}
              >
                ApexEnem
              </Link>
              ,{' '}
              <Link
                href="/cases#agoramed"
                className="hover:text-[#F5EFE4]"
                style={{ color: C.textMuted }}
              >
                AgoraMed
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* PAS */}
      <Section divider>
        <div className="max-w-5xl mx-auto">
          <SectionHead
            eyebrow="por que a marmita existe"
            title={<>Site não precisa ser <Emph>drama.</Emph></>}
            size="lg"
          />

          <div
            className="mt-14 grid md:grid-cols-3 gap-8 text-[15px] leading-relaxed"
            style={{ ...serif, color: C.textMuted }}
          >
            <PASItem n={1} label="o problema">
              Agência cobra <strong style={{ color: C.text, fontWeight: 600 }}>R$ 5.000</strong> e some
              no meio do projeto. Freelancer é roleta russa. Construtor drag-and-drop te prende numa
              plataforma cara que fica lenta.
            </PASItem>
            <PASItem n={2} label="enquanto isso">
              Seu concorrente está pegando os clientes que{' '}
              <strong style={{ color: C.text, fontWeight: 600 }}>pesquisam no Google agora</strong>.
              Cada semana sem site é faturamento perdido.
            </PASItem>
            <PASItem n={3} label="a marmita" highlight>
              Padronizamos a produção como uma{' '}
              <strong style={{ color: C.text, fontWeight: 600 }}>cozinha industrial</strong> — mesma
              qualidade de agência, fração do tempo. Em 7 dias no ar, com domínio, SSL e suporte no
              WhatsApp.
            </PASItem>
          </div>
        </div>
      </Section>

      {/* TIERS */}
      <Section id="como-funciona" divider>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="o cardápio"
            title={<>Escolha sua <Emph>marmita.</Emph></>}
            lead={
              <>
                Pagamento único + manutenção mensal de R$ 47,90 — hospedagem,
                SSL, backups e suporte.
              </>
            }
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((t) => (
              <Card key={t.key} accent={t.destaque} className="flex flex-col">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="text-2xl md:text-3xl" style={{ ...serif, fontWeight: 500, color: C.text }}>
                    {t.nome}
                  </h3>
                  {t.destaque && (
                    <span
                      className="text-xs italic"
                      style={{ ...serif, color: C.accent }}
                    >
                      recomendado
                    </span>
                  )}
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs" style={{ color: C.textFaint, ...sans, fontWeight: 600 }}>
                      R$
                    </span>
                    <span
                      className="text-5xl md:text-6xl leading-none"
                      style={{ ...serif, fontWeight: 500, color: C.text }}
                    >
                      {t.preco}
                    </span>
                  </div>
                  <div className="text-sm mt-2 italic" style={{ ...serif, color: C.textFaint }}>
                    único · depois R$ 47,90/mês
                  </div>
                </div>
                <p
                  className="text-[15px] leading-relaxed mb-6 flex-1"
                  style={{ color: C.textMuted, ...serif }}
                >
                  {t.desc}
                </p>
                <div
                  className="flex items-start gap-2 pt-5 text-sm"
                  style={{ borderTop: `1px solid ${C.border}`, ...serif, color: C.text }}
                >
                  <Gift size={14} style={{ color: C.accent, marginTop: 3 }} className="shrink-0" />
                  <span style={{ fontStyle: 'italic' }}>{t.bonus}</span>
                </div>
              </Card>
            ))}
          </div>

          <div
            className="mt-12 max-w-3xl mx-auto p-6 rounded-3xl flex items-start gap-4"
            style={{
              backgroundColor: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.25)',
            }}
          >
            <Shield size={22} className="shrink-0 mt-1" style={{ color: '#34D399' }} />
            <p className="text-[15px] leading-relaxed" style={{ color: C.textMuted, ...serif }}>
              <strong style={{ color: '#34D399', fontStyle: 'normal', fontWeight: 600 }}>
                Garantia de 7 dias.
              </strong>{' '}
              Se não aprovar o site, devolvemos{' '}
              <strong style={{ color: C.text, fontWeight: 600 }}>100% do valor pago</strong>. Sem
              letrinha miúda.
            </p>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/planos"
              className="text-base underline underline-offset-4"
              style={{ color: C.accent, ...serif, fontStyle: 'italic' }}
            >
              comparar planos em detalhe →
            </Link>
          </div>
        </div>
      </Section>

      {/* FORA DO CARDÁPIO — teaser */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <Card className="md:p-14">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <Eyebrow>fora do cardápio</Eyebrow>
                <Display size="md">
                  Não é site? <Emph>A gente faz também.</Emph>
                </Display>
                <p
                  className="mt-5 text-base leading-relaxed max-w-[48ch]"
                  style={{ color: C.textMuted, ...serif }}
                >
                  Sistema de estoque, bot de WhatsApp, automação, app mobile,
                  software desktop, dashboard — se dá pra programar, está no menu.
                </p>
                <div className="mt-8">
                  <PrimaryBtn href="/fora-do-cardapio">
                    Conhecer <ArrowRight size={14} />
                  </PrimaryBtn>
                </div>
              </div>
              <ul
                className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:pl-10"
                style={{
                  ...serif,
                  color: C.textMuted,
                  borderLeft: `1px dashed ${C.border}`,
                }}
              >
                {[
                  'Sistema de estoque',
                  'Bot WhatsApp',
                  'App mobile',
                  'Software desktop',
                  'Automação',
                  'Dashboard',
                ].map((t, i) => (
                  <li key={t} className="flex gap-2">
                    <span style={{ color: C.accent, ...sans, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* CARTÃO DE RECEITA */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ backgroundColor: '#E8D7B8', color: '#2B1F18' }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-10 hidden md:flex flex-col justify-around items-center"
              style={{ backgroundColor: '#D4A574' }}
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="block w-4 h-4 rounded-full"
                  style={{ backgroundColor: '#2B1F18', opacity: 0.12 }}
                />
              ))}
            </div>

            <div className="p-8 md:p-16 md:pl-24">
              <div
                className="flex items-start justify-between gap-6 mb-10 pb-6"
                style={{ borderBottom: '2px solid rgba(43,31,24,0.15)' }}
              >
                <div>
                  <p
                    className="text-xs font-bold tracking-widest"
                    style={{ color: '#8B5A2B', ...sans }}
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
                    Site publicado<br />em{' '}
                    <em style={{ fontStyle: 'italic', color: '#C84C09' }}>7 dias.</em>
                  </h2>
                </div>
                <div
                  className="hidden md:flex shrink-0 w-28 h-28 items-center justify-center rounded-full rotate-[-8deg] text-center"
                  style={{
                    border: '3px solid #C84C09',
                    color: '#C84C09',
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
                  <h3 className="mb-5 text-2xl" style={{ ...serif, fontWeight: 600 }}>Ingredientes</h3>
                  <ul className="space-y-3" style={serif}>
                    {INGREDIENTES.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-snug" style={{ color: '#3B2E24' }}>
                        <span style={{ color: '#C84C09' }} aria-hidden="true">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3">
                  <h3 className="mb-5 text-2xl" style={{ ...serif, fontWeight: 600 }}>Modo de preparo</h3>
                  <ol className="space-y-5" style={serif}>
                    {PREPARO.map((p, idx) => (
                      <li key={p.tempo} className="grid grid-cols-[auto_1fr] gap-5 items-baseline">
                        <span
                          className="text-xs font-bold tracking-widest whitespace-nowrap"
                          style={{ color: '#8B5A2B', ...sans }}
                        >
                          {p.tempo}
                        </span>
                        <span className="text-[15px] leading-snug" style={{ color: '#3B2E24' }}>
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
                  borderTop: '1px dashed rgba(43,31,24,0.2)',
                }}
              >
                <strong style={{ fontStyle: 'normal', fontVariationSettings: '"WONK" 1' }}>
                  Nota do chef —
                </strong>{' '}
                não gostou do prato? Devolvemos o valor em até 7 dias. Sem letrinha miúda, sem conversa pra enrolar.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CASES */}
      <Section divider>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="sites nossos no ar agora"
            title={<>O que já saiu da <Emph>cozinha.</Emph></>}
            lead="Não é portfólio bonito — é site em produção, com usuários reais pagando, código nosso e manutenção contínua."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <CaseCard
              href="/cases#apexenem"
              nicho="EdTech, no ar"
              nome="ApexEnem"
              accent="#5B6CFF"
              resumo="Plataforma para o ENEM — correção de redação por IA, simulados adaptativos, acompanhamento de evolução."
              stats={[['7d', 'entrega'], ['99,9%', 'uptime'], ['IA', 'redação']]}
            />
            <CaseCard
              href="/cases#agoramed"
              nicho="Área de membros, no ar"
              nome="AgoraMed"
              accent="#2DD4BF"
              resumo="Área de membros pra médicos residentes — trilhas, cursos, acompanhamento. UX pensada pro turno de plantão."
              stats={[['14d', 'entrega'], ['24/7', 'acesso'], ['LGPD', 'médico']]}
            />
          </div>

          <div className="mt-10">
            <Link
              href="/cases"
              className="text-base underline underline-offset-4"
              style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
            >
              …todos os cases
            </Link>
          </div>
        </div>
      </Section>

      {/* DOMÍNIO */}
      <Section id="dominio" divider>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <Eyebrow><Globe size={14} /> domínio próprio</Eyebrow>
            <Display size="md">
              Seu site, <Emph>seu domínio.</Emph>
            </Display>
            <p className="mt-6 text-lg leading-relaxed max-w-[52ch]" style={{ ...serif, color: C.textMuted }}>
              Você registra o seu domínio direto no{' '}
              <strong style={{ color: C.text, fontWeight: 600 }}>Registro.br</strong> — simples e
              rápido. Enviamos tutorial passo a passo depois do pedido, e cuidamos de toda a parte
              técnica (DNS, apontamento, SSL).
            </p>
          </div>
          <ul className="space-y-4" style={{ ...serif, color: C.textMuted }}>
            {[
              [Check, 'Você escolhe e registra no Registro.br'],
              [Check, 'Tutorial completo enviado por e-mail'],
              [Lock, 'Nós fazemos toda a configuração técnica'],
            ].map(([Icon, t], i) => (
              <li key={i} className="flex items-start gap-3 text-[15px]">
                <Icon size={18} style={{ color: C.accent, marginTop: 3 }} />
                <span>{t as string}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" divider>
        <div className="max-w-3xl mx-auto">
          <SectionHead
            eyebrow="perguntas que ouvimos toda semana"
            title={<>Tira a <Emph>dúvida.</Emph></>}
            size="lg"
          />
          <div className="mt-12 space-y-0">
            {FAQ.map((item, i) => (
              <details
                key={item.q}
                className="group"
                style={{
                  borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <summary
                  className="cursor-pointer list-none py-6 flex items-center justify-between gap-6"
                  style={{ ...serif, color: C.text }}
                >
                  <span className="text-lg md:text-xl">{item.q}</span>
                  <span
                    className="shrink-0 text-2xl leading-none transition-transform group-open:rotate-45"
                    style={{ color: C.accent, ...serif }}
                  >
                    +
                  </span>
                </summary>
                <div
                  className="pb-6 pr-10 text-[15px] leading-relaxed"
                  style={{ ...serif, color: C.textMuted }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Display size="xl">
            O fogão tá aceso. <Emph>Qual é o pedido?</Emph>
          </Display>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <PrimaryBtn href="/templates">
              Ver o cardápio <ArrowRight size={16} />
            </PrimaryBtn>
            <GhostBtn href="/encomendar/personalizado?tier=personalizado">
              Peça um prato do zero
            </GhostBtn>
            <span className="text-base italic" style={{ ...serif, color: C.textFaint }}>
              — Fernando, chef da casa.
            </span>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

function PASItem({
  n,
  label,
  highlight,
  children,
}: {
  n: number;
  label: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={highlight ? 'md:pl-10' : ''}
      style={highlight ? { borderLeft: `1px dashed ${C.accentInk}66` } : undefined}
    >
      <div
        className="mb-3 text-xs tracking-widest uppercase"
        style={{
          color: highlight ? C.accent : C.textFaint,
          ...sans,
          fontWeight: 700,
        }}
      >
        {n}. {label}
      </div>
      <p style={{ color: highlight ? C.text : C.textMuted }}>{children}</p>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderLeft: '2px solid #C84C09' }} className="pl-3">
      <div
        className="text-[10px] font-bold tracking-widest uppercase"
        style={{ color: '#8B5A2B', ...sans }}
      >
        {label}
      </div>
      <div className="text-xl md:text-2xl mt-1" style={{ ...serif, fontWeight: 600, color: '#2B1F18' }}>
        {value}
      </div>
    </div>
  );
}

function CaseCard({
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
    <Link
      href={href}
      className="group block rounded-3xl p-8 transition-colors"
      style={{
        backgroundColor: C.bgElevated,
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        className="text-xs tracking-[0.2em] uppercase mb-5 flex items-center gap-2"
        style={{ color: accent, ...sans, fontWeight: 700 }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
        {nicho}
      </div>
      <h3
        className="text-4xl md:text-5xl leading-none"
        style={{ ...serif, fontWeight: 500, color: C.text }}
      >
        {nome}
      </h3>
      <p
        className="mt-5 text-[15px] leading-relaxed max-w-[48ch]"
        style={{ color: C.textMuted, ...serif }}
      >
        {resumo}
      </p>
      <div className="mt-8 flex gap-10 text-sm" style={{ ...serif }}>
        {stats.map(([n, l]) => (
          <div key={l}>
            <div
              className="text-2xl md:text-3xl leading-none"
              style={{ ...serif, fontWeight: 600, color: accent }}
            >
              {n}
            </div>
            <div
              className="text-[11px] uppercase tracking-widest mt-2"
              style={{ ...sans, fontWeight: 700, color: C.textFaint }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
      <span
        className="mt-8 inline-flex items-center gap-2 text-base underline underline-offset-4 group-hover:gap-3 transition-all"
        style={{ color: accent, ...serif, fontStyle: 'italic' }}
      >
        ver o case →
      </span>
    </Link>
  );
}
