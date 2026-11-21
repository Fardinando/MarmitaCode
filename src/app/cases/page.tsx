import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight, Zap, Target, Users, GraduationCap, Stethoscope } from 'lucide-react';
import { IframePreview } from './IframePreview';
import { CasesIllustration } from '@/components/HeroIllustrations';
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
  Numero,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cases · Sites reais que a gente fez',
  description:
    'Portfólio de projetos reais da MarmitaCode — plataformas em produção com clientes pagantes.',
};

interface Case {
  slug: string;
  title: string;
  tagline: string;
  url: string;
  category: string;
  cliente: string;
  ano: string;
  about: string;
  problem: string;
  solution: string;
  result: string[];
  stack: string[];
  colors: { primary: string; glow: string };
  features: { icon: React.ReactNode; label: string; desc: string }[];
  previewImage?: string;
}

const CASES: Case[] = [
  {
    slug: 'apexenem',
    title: 'ApexEnem',
    tagline: 'Plataforma inteligente para o ENEM',
    url: 'https://apexenem.com.br',
    category: 'EdTech · SaaS',
    cliente: 'Projeto próprio',
    ano: '2026',
    about:
      'Plataforma web completa com correção de redação por IA, simulados personalizados, questões inéditas no estilo ENEM e acompanhamento de evolução do aluno.',
    problem:
      'Alunos pré-vestibular pagam caro por correções de redação lentas e simulados genéricos. Faltava uma ferramenta que combinasse feedback instantâneo com um método adaptativo real.',
    solution:
      'Backend com IA custom-trained na matriz do ENEM, correção em segundos nas 5 competências, gerador de simulados que se adapta aos erros do aluno e dashboard de evolução com gráficos.',
    result: [
      'Correção de redação em segundos vs 3-7 dias de concorrentes',
      'Plano gratuito completo para captação',
      'Demo sem cadastro na própria landing',
      'Deploy em produção com domínio próprio',
    ],
    stack: ['Next.js', 'IA custom', 'Supabase', 'Vercel', 'TailwindCSS'],
    colors: { primary: '#5B6CFF', glow: 'rgba(91,108,255,0.4)' },
    previewImage: '/cases/apexenem.png',
    features: [
      { icon: <Target size={16} />, label: 'Correção por IA', desc: 'Feedback nas 5 competências em segundos' },
      { icon: <Zap size={16} />, label: 'Simulados adaptativos', desc: 'Prioriza seus pontos fracos' },
      { icon: <Users size={16} />, label: 'Acompanhamento', desc: 'Gráficos de evolução ao vivo' },
      { icon: <GraduationCap size={16} />, label: 'Questões inéditas', desc: 'Banco próprio no estilo ENEM' },
    ],
  },
  {
    slug: 'agoramed',
    title: 'AgoraMed',
    tagline: 'Pronto para o plantão',
    url: 'https://agoramed.vercel.app',
    category: 'EdTech · Área de Membros',
    cliente: 'Instituição parceira',
    ano: '2026',
    about:
      'Plataforma de ensino para médicos residentes e plantonistas. Área do aluno com cursos, trilhas de aprendizagem, materiais e acompanhamento de progresso.',
    problem:
      'Médicos plantonistas precisam de atualização rápida e prática entre turnos. Plataformas genéricas de ensino não têm linguagem nem profundidade adequadas pra área médica.',
    solution:
      'Área de membros focada em UX pra uso rápido entre turnos, trilhas específicas por especialidade, autenticação segura e identidade visual sóbria compatível com o ambiente hospitalar.',
    result: [
      'Interface limpa e séria, apropriada para profissionais',
      'Autenticação pronta pra escalar',
      'Design system coeso com acento esverdeado',
      'Deploy automático via Vercel',
    ],
    stack: ['Next.js', 'Supabase Auth', 'TailwindCSS', 'Vercel'],
    colors: { primary: '#2DD4BF', glow: 'rgba(45,212,191,0.4)' },
    features: [
      { icon: <Stethoscope size={16} />, label: 'UX médica', desc: 'Pensada pro ambiente de plantão' },
      { icon: <Users size={16} />, label: 'Área do aluno', desc: 'Login seguro, cursos e progresso' },
      { icon: <Target size={16} />, label: 'Trilhas práticas', desc: 'Conteúdo organizado por especialidade' },
      { icon: <Zap size={16} />, label: 'Acesso rápido', desc: 'Otimizado pra uso entre turnos' },
    ],
  },
];

export default function CasesPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <Eyebrow>portfólio · sites nossos no ar</Eyebrow>
            <Display size="xl">
              Projetos em <Emph>produção.</Emph>
            </Display>
            <div className="mt-8 max-w-[48ch]">
              <Lead>
                A gente não só desenvolve — a gente lança. Esses são sites
                nossos no ar agora, com usuários reais, dando lucro.
              </Lead>
            </div>
          </div>
          <div className="order-first md:order-last">
            <CasesIllustration className="w-full h-auto max-w-[460px] mx-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </section>

      {/* CASES */}
      <Section>
        <div className="max-w-6xl mx-auto space-y-24">
          {CASES.map((c, i) => (
            <CaseBlock key={c.slug} caseItem={c} index={i + 1} reverse={i % 2 === 1} />
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section divider>
        <div className="max-w-4xl mx-auto">
          <Display size="xl">
            Seu site pode ser o <Emph>próximo.</Emph>
          </Display>
          <div className="mt-6 max-w-[52ch]">
            <Lead>Mesma qualidade, mesmo cuidado — do briefing ao ar.</Lead>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryBtn href="/templates">
              Ver templates <ArrowUpRight size={14} />
            </PrimaryBtn>
            <GhostBtn href="/encomendar/personalizado?tier=premium">
              Faça do zero
            </GhostBtn>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

function CaseBlock({ caseItem: c, index, reverse }: { caseItem: Case; index: number; reverse: boolean }) {
  return (
    <article id={c.slug} className="relative scroll-mt-24">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          backgroundColor: C.bgElevated,
          border: `1px solid ${C.border}`,
        }}
      >
        {/* Header do case */}
        <div className="relative p-8 md:p-12">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Numero n={index} />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: c.colors.primary }}
                />
                <span
                  className="text-sm italic"
                  style={{ ...serif, color: c.colors.primary }}
                >
                  no ar · {c.category}
                </span>
              </div>
              <h2
                className="text-5xl md:text-7xl leading-[0.95] mb-3"
                style={{
                  ...serif,
                  fontWeight: 500,
                  color: C.text,
                  fontVariationSettings: '"opsz" 144, "SOFT" 40',
                }}
              >
                {c.title}
              </h2>
              <p
                className="text-lg italic"
                style={{ ...serif, color: C.textMuted }}
              >
                {c.tagline}
              </p>
            </div>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shrink-0 transition-transform hover:translate-x-1"
              style={{ backgroundColor: c.colors.primary, color: '#0A0A0A' }}
            >
              Visitar site
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Mockup browser frame */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              border: `1px solid ${C.border}`,
              backgroundColor: C.bg,
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgSoft }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.6)' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(251,191,36,0.6)' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(16,185,129,0.6)' }} />
              <div className="flex-1 flex justify-center">
                <span
                  className="px-4 py-1 rounded-full text-[11px]"
                  style={{
                    border: `1px solid ${C.border}`,
                    color: C.textFaint,
                    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  }}
                >
                  {c.url.replace(/^https?:\/\//, '')}
                </span>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: C.bg }}>
              {c.previewImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.previewImage}
                  alt={`Preview ${c.title}`}
                  className="hidden sm:block absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <IframePreview url={c.url} title={`Preview ${c.title}`} />
              )}
              <div className="sm:hidden absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative text-center px-6">
                  <div
                    className="text-5xl mb-2"
                    style={{ ...serif, fontWeight: 500, color: c.colors.primary }}
                  >
                    {c.title}
                  </div>
                  <div
                    className="text-xs tracking-widest"
                    style={{ ...sans, color: C.textFaint, fontFamily: 'ui-monospace, monospace' }}
                  >
                    {c.url.replace(/^https?:\/\//, '')}
                  </div>
                </div>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${c.title}`}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent hover:from-black/80 transition-colors flex items-end justify-center p-6 group"
              >
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-xl group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: c.colors.primary, color: '#0A0A0A' }}
                >
                  Abrir {c.title.toLowerCase()} em nova aba
                  <ExternalLink size={12} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div
          className={`grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 p-8 md:p-12 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: c.colors.primary, ...sans, fontWeight: 700 }}
            >
              Destaques
            </div>
            <div className="space-y-3">
              {c.features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{
                    backgroundColor: C.bgSoft,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${c.colors.primary}18`,
                      color: c.colors.primary,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-sm" style={{ ...serif, fontWeight: 600, color: C.text }}>
                      {f.label}
                    </div>
                    <div
                      className="text-sm mt-1 leading-relaxed"
                      style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
                    >
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-8 pt-6 space-y-3 text-sm"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <MetaRow label="Cliente" value={c.cliente} />
              <MetaRow label="Ano" value={c.ano} />
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: C.textFaint, ...sans, fontWeight: 700 }}
                >
                  Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: C.bgSoft,
                        border: `1px solid ${C.border}`,
                        color: C.textMuted,
                        ...sans,
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <TextBlock label="Sobre o projeto" title="O que é" accent={c.colors.primary}>
              {c.about}
            </TextBlock>
            <TextBlock label="O desafio" title="O problema" accent={c.colors.primary}>
              {c.problem}
            </TextBlock>
            <TextBlock label="A proposta" title="A solução" accent={c.colors.primary}>
              {c.solution}
            </TextBlock>
            <div>
              <div
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: c.colors.primary, ...sans, fontWeight: 700 }}
              >
                Resultados
              </div>
              <ul className="space-y-2">
                {c.result.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-[15px] leading-relaxed"
                    style={{ color: C.textMuted, ...serif }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: c.colors.primary }}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function TextBlock({
  label,
  title,
  children,
  accent,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div>
      <div
        className="text-xs tracking-[0.2em] uppercase mb-2"
        style={{ color: accent, ...sans, fontWeight: 700 }}
      >
        {label}
      </div>
      <h3
        className="text-2xl mb-3"
        style={{ ...serif, fontWeight: 500, color: C.text }}
      >
        {title}
      </h3>
      <p
        className="text-[15px] leading-relaxed"
        style={{ color: C.textMuted, ...serif }}
      >
        {children}
      </p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: C.textFaint, ...sans, fontWeight: 700 }}
      >
        {label}
      </span>
      <span
        className="text-sm text-right"
        style={{ ...serif, color: C.text, fontStyle: 'italic' }}
      >
        {value}
      </span>
    </div>
  );
}
