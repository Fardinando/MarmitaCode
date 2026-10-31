import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ExternalLink, ArrowUpRight, Zap, Target, Users, GraduationCap, Stethoscope } from 'lucide-react';
import { IframePreview } from './IframePreview';

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
  /** Se definido, mostra screenshot estático em vez do iframe. */
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
      { icon: <Target size={18} />, label: 'Correção por IA', desc: 'Feedback nas 5 competências em segundos' },
      { icon: <Zap size={18} />, label: 'Simulados adaptativos', desc: 'Prioriza seus pontos fracos' },
      { icon: <Users size={18} />, label: 'Acompanhamento', desc: 'Gráficos de evolução ao vivo' },
      { icon: <GraduationCap size={18} />, label: 'Questões inéditas', desc: 'Banco próprio no estilo ENEM' },
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
      { icon: <Stethoscope size={18} />, label: 'UX médica', desc: 'Pensada pro ambiente de plantão' },
      { icon: <Users size={18} />, label: 'Área do aluno', desc: 'Login seguro, cursos e progresso' },
      { icon: <Target size={18} />, label: 'Trilhas práticas', desc: 'Conteúdo organizado por especialidade' },
      { icon: <Zap size={18} />, label: 'Acesso rápido', desc: 'Otimizado pra uso entre turnos' },
    ],
  },
];

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative px-6 pt-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,140,0,0.15),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10">
            <Sparkles size={14} className="text-[#FF8C00]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
              Portfólio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
            Projetos em{' '}
            <span className="bg-gradient-to-r from-[#FF8C00] via-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent">
              produção
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A gente não só desenvolve — a gente <b className="text-white">lança</b>. Esses são
            sites nossos no ar agora, com usuários reais, dando lucro.
          </p>
        </div>
      </section>

      {/* CASES */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto space-y-24">
          {CASES.map((c, i) => (
            <CaseBlock key={c.slug} caseItem={c} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative px-6 py-32 border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,140,0,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
            Seu site <span className="text-[#FF8C00]">pode ser o próximo.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Mesma qualidade, mesmo cuidado — do briefing ao ar.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF8C00] text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-[#FFD700]"
            >
              Ver templates <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/encomendar/personalizado?tier=premium"
              className="inline-flex items-center gap-2 px-10 py-5 border border-white/10 bg-white/5 text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10"
            >
              Faça do zero
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseBlock({ caseItem: c, reverse }: { caseItem: Case; reverse: boolean }) {
  return (
    <article id={c.slug} className="relative scroll-mt-24">
      {/* Glow de fundo */}
      <div
        className="absolute inset-0 blur-[120px] opacity-30 rounded-[3rem]"
        style={{ backgroundColor: c.colors.primary }}
        aria-hidden
      />

      <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
        {/* Header do case */}
        <div
          className="relative p-8 md:p-12 border-b border-white/5"
          style={{
            background: `linear-gradient(135deg, ${c.colors.primary}22 0%, transparent 70%)`,
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: c.colors.primary }}
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                  No ar · {c.category}
                </span>
              </div>
              <h2
                className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-3"
                style={{
                  background: `linear-gradient(135deg, #fff 0%, ${c.colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {c.title}
              </h2>
              <p className="text-white/60 text-lg font-bold">{c.tagline}</p>
            </div>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-black text-xs font-black uppercase tracking-widest shrink-0"
              style={{ backgroundColor: c.colors.primary }}
            >
              Visitar site
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mockup browser frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-amber-400/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <div className="flex-1 flex justify-center">
                <span className="px-4 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/40">
                  {c.url.replace(/^https?:\/\//, '')}
                </span>
              </div>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-white/[0.03] to-black overflow-hidden">
              {c.previewImage ? (
                // Screenshot estático (quando o site não renderiza bem em iframe)
                <img
                  src={c.previewImage}
                  alt={`Preview ${c.title}`}
                  className="hidden sm:block absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                // iframe desktop (1440x900) escalado pro container via ResizeObserver
                <IframePreview url={c.url} title={`Preview ${c.title}`} />
              )}
              {/* Mobile: nada de iframe — placeholder bonito com nome do case */}
              <div className="sm:hidden absolute inset-0 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(ellipse at center, ${c.colors.primary}55, transparent 70%)`,
                  }}
                />
                <div className="relative text-center px-6">
                  <div
                    className="text-5xl font-black italic uppercase tracking-tighter mb-2"
                    style={{
                      background: `linear-gradient(135deg, #fff 0%, ${c.colors.primary} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {c.title}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                    {c.url.replace(/^https?:\/\//, '')}
                  </div>
                </div>
              </div>
              {/* Overlay clicável sempre — abre em nova aba */}
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${c.title}`}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent hover:from-black/80 transition-colors flex items-end justify-center p-6 group"
              >
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-2xl group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: c.colors.primary }}
                >
                  Abrir {c.title.toLowerCase()} em nova aba
                  <ExternalLink size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className={`grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 p-8 md:p-12 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
          {/* Esquerda: features */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-5" style={{ color: c.colors.primary }}>
              Destaques
            </p>
            <div className="space-y-3">
              {c.features.map((f) => (
                <div key={f.label} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${c.colors.primary}22`,
                      color: c.colors.primary,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-black text-sm">{f.label}</div>
                    <div className="text-white/50 text-xs mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-3 text-xs">
              <MetaRow label="Cliente" value={c.cliente} />
              <MetaRow label="Ano" value={c.ano} />
              <div>
                <div className="text-white/40 font-black uppercase tracking-widest text-[10px] mb-2">Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Direita: narrativa */}
          <div className="space-y-8">
            <TextBlock label="Sobre o projeto" title="O que é">
              {c.about}
            </TextBlock>
            <TextBlock label="O desafio" title="O problema">
              {c.problem}
            </TextBlock>
            <TextBlock label="A proposta" title="A solução">
              {c.solution}
            </TextBlock>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: c.colors.primary }}>
                Resultados
              </p>
              <ul className="space-y-2">
                {c.result.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
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

function TextBlock({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">{label}</p>
      <h3 className="font-black text-xl mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{children}</p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">{label}</span>
      <span className="font-bold text-white/80 text-right">{value}</span>
    </div>
  );
}
