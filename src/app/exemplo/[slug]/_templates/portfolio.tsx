'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, ArrowRight } from 'lucide-react';

interface Projeto {
  slug: string;
  title: string;
  year: string;
  tag: string;
  cover: string;
  gallery: string[];
  client: string;
  role: string;
  duration: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  color: string;
}

const PROJETOS: Projeto[] = [
  {
    slug: 'vinicola',
    title: 'Vinícola Valle',
    year: '2026',
    tag: 'Rebranding · Packaging',
    cover: 'photo-1510812431401-41d2bd2722f3',
    gallery: ['photo-1569529465841-dfecdab7503b', 'photo-1553361371-9b22f78e8b1d', 'photo-1510812431401-41d2bd2722f3'],
    client: 'Vinícola Valle · RS',
    role: 'Direção criativa + identidade',
    duration: '4 meses',
    summary: 'Reposicionamento de uma vinícola centenária gaúcha para o mercado premium.',
    problem: 'Marca familiar com visual datado dos anos 90. Vendas estagnadas há 5 anos.',
    solution: 'Nova identidade com tipografia serifada moderna, paleta de tons terrosos e rotulagem com acabamento em dourado quente.',
    result: '+180% em vendas no primeiro ano. Entrada em 3 das top-10 wine stores do Brasil.',
    tech: ['Branding', 'Packaging', 'Fotografia', 'Art Direction'],
    color: '#8b2500',
  },
  {
    slug: 'nebula',
    title: 'Nebula App',
    year: '2026',
    tag: 'Produto digital · iOS/Android',
    cover: 'photo-1559526324-4b87b5e36e44',
    gallery: ['photo-1559526324-4b87b5e36e44', 'photo-1551288049-bebda4e38f71', 'photo-1522202176988-66273c2fd55f'],
    client: 'Nebula Health',
    role: 'Product designer lead',
    duration: '8 meses',
    summary: 'App de meditação para pais de crianças pequenas, iOS e Android.',
    problem: 'Mercado saturado por Calm e Headspace. Diferenciar com UX melhor para pais.',
    solution: 'Narrativas em formato de histórias com personagens, modo offline nativo e timer visual que a criança controla.',
    result: '120k downloads em 6 meses. 4.8★ na App Store. Destaque Apple em 3 países.',
    tech: ['UX Research', 'iOS Design', 'Design System'],
    color: '#0ea5e9',
  },
  {
    slug: 'studiox',
    title: 'Studio X Arquitetura',
    year: '2025',
    tag: 'Branding',
    cover: 'photo-1618005182384-a83a8bd57fbe',
    gallery: ['photo-1618005182384-a83a8bd57fbe', 'photo-1515886657613-9f3515b0c78f', 'photo-1522199755839-a2bacb67c546'],
    client: 'Studio X Arquitetura',
    role: 'Branding completo',
    duration: '3 meses',
    summary: 'Identidade visual para escritório de arquitetura contemporânea.',
    problem: 'Escritório jovem precisando se posicionar entre nomes consolidados.',
    solution: 'Sistema visual modular com grid-like identity, tipografia geométrica custom.',
    result: '12 projetos fechados nos primeiros 6 meses. Prêmio IF Design 2025.',
    tech: ['Identidade visual', 'Tipografia', 'Site'],
    color: '#64748b',
  },
  {
    slug: 'novaera',
    title: 'Nova Era Moda',
    year: '2025',
    tag: 'E-commerce · Design',
    cover: 'photo-1515886657613-9f3515b0c78f',
    gallery: ['photo-1515886657613-9f3515b0c78f', 'photo-1483985988355-763728e1935b', 'photo-1544441893-675973e31985'],
    client: 'Nova Era Moda',
    role: 'Design + desenvolvimento',
    duration: '5 meses',
    summary: 'Loja online de moda sustentável com conteúdo editorial.',
    problem: 'E-commerces de moda são todos parecidos. Precisava destacar a origem sustentável.',
    solution: 'Cada produto virou uma mini-história com foto do produtor e origem do tecido.',
    result: 'Conversão 4.2% (média é 1.8%). Faturamento 3x no primeiro ano.',
    tech: ['Next.js', 'Shopify', 'Editorial'],
    color: '#be185d',
  },
  {
    slug: 'horizonte',
    title: 'Revista Horizonte',
    year: '2024',
    tag: 'Editorial · Impressão',
    cover: 'photo-1522199755839-a2bacb67c546',
    gallery: ['photo-1522199755839-a2bacb67c546', 'photo-1532153975070-2e9ab71f1b14', 'photo-1455390582262-044cdead277a'],
    client: 'Editora Horizonte',
    role: 'Direção de arte editorial',
    duration: '6 meses · 4 edições',
    summary: 'Redesign completo de revista mensal de cultura e arte.',
    problem: 'Circulação em queda. Visual engessado, não conversava com público jovem.',
    solution: 'Grid flexível por reportagem, capas conceituais, tipografia experimental.',
    result: 'Circulação +40% em 6 meses. 3 capas premiadas (SPD).',
    tech: ['Editorial', 'Tipografia', 'Ilustração'],
    color: '#059669',
  },
  {
    slug: 'solar',
    title: 'Campanha Verão Solar',
    year: '2024',
    tag: 'Social · AR',
    cover: 'photo-1618220179428-22790b461013',
    gallery: ['photo-1618220179428-22790b461013', 'photo-1544441893-675973e31985', 'photo-1515886657613-9f3515b0c78f'],
    client: 'Solar Cosméticos',
    role: 'Direção de arte',
    duration: '2 meses',
    summary: 'Campanha de verão 360° para marca de protetor solar.',
    problem: 'Marca percebida como "séria", precisava ganhar presença na gen Z.',
    solution: 'Direção de arte vibrante, modelos reais, filtros Instagram próprios.',
    result: '12M de impressões orgânicas. +40% em vendas 18-25 anos.',
    tech: ['Art Direction', 'Social', 'AR Filters'],
    color: '#ea580c',
  },
];

export function PortfolioTemplate() {
  const [open, setOpen] = useState<string | null>(null);
  const [hovering, setHovering] = useState<string | null>(null);
  const projeto = open ? PROJETOS.find((p) => p.slug === open) : null;

  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#1a1915]">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-[#f5f3ef]/80 backdrop-blur-xl border-b border-[#1a1915]/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1a1915] text-[#f5f3ef] flex items-center justify-center font-black text-sm">M</div>
            <div>
              <div className="font-black text-sm tracking-tight leading-none">Mariana Vieira</div>
              <div className="text-[10px] text-[#1a1915]/50 mt-0.5 uppercase tracking-widest">Designer & Art Director</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#1a1915]/60">
            <a href="#work" className="hover:text-[#1a1915]">Trabalhos</a>
            <a href="#about" className="hover:text-[#1a1915]">Sobre</a>
            <a href="#services" className="hover:text-[#1a1915]">Serviços</a>
            <a href="#contact" className="hover:text-[#1a1915]">Contato</a>
          </div>
          <a href="#contact" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1915] text-[#f5f3ef] text-xs font-bold uppercase tracking-widest hover:bg-[#2d2b25]">
            Vamos criar
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
        </div>
      </nav>

      {/* Hero editorial */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-20 h-px bg-[#1a1915]/40" />
          <span className="text-xs uppercase tracking-[0.4em] text-[#1a1915]/60 font-bold">
            Portfolio · Edição 2026 · Volume VII
          </span>
        </div>
        <h1 className="text-[14vw] md:text-[11rem] font-black leading-[0.82] tracking-[-0.03em] mb-10">
          Design<br />
          que <span className="italic font-light">resolve</span>.<br />
          Que <span className="italic font-light">dura</span>.
        </h1>
        <div className="grid md:grid-cols-[1fr_300px] gap-10 items-end">
          <p className="text-lg md:text-xl text-[#1a1915]/70 leading-relaxed max-w-2xl">
            Trabalho na interseção entre branding, produto digital e direção criativa — ajudando marcas
            brasileiras e estrangeiras a traduzir o que são em sistemas visuais que vendem, atendem e perduram.
          </p>
          <div className="space-y-2 md:text-right text-sm text-[#1a1915]/60 border-t md:border-t-0 md:border-l border-[#1a1915]/20 md:pl-6 pt-4 md:pt-0">
            <div>Baseada em <b className="text-[#1a1915]">São Paulo</b></div>
            <div>Atendendo o <b className="text-[#1a1915]">mundo</b></div>
            <div className="pt-3">Disponível <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><b className="text-[#1a1915]">para Q1 2026</b></span></div>
          </div>
        </div>
      </section>

      {/* Barra de clientes/press */}
      <section className="border-y border-[#1a1915]/10 bg-[#eeebe4]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#1a1915]/40 font-bold text-center mb-6">
            Já ajudei a construir
          </div>
          <div className="flex items-center justify-around flex-wrap gap-x-10 gap-y-4">
            {['NUBANK', 'NATURA', 'ITAÚ', 'MAGAZINE LUIZA', 'OMO', 'HAVAIANAS', 'VIVO'].map((l) => (
              <span key={l} className="font-black text-sm md:text-base text-[#1a1915]/40 tracking-[0.2em]">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de trabalhos — layout editorial */}
      <section id="work" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a1915]/50 font-bold">
              01 · Trabalhos
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4">
              Trabalhos <span className="italic font-light">recentes</span>
            </h2>
          </div>
          <span className="text-sm text-[#1a1915]/50 hidden md:block">
            {PROJETOS.length} de 80+
          </span>
        </div>

        <div className="space-y-24">
          {PROJETOS.map((p, i) => {
            const even = i % 2 === 0;
            return (
              <article key={p.slug} className="group">
                <div
                  className={`grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 items-center ${
                    even ? '' : 'md:[&>div:first-child]:order-2'
                  }`}
                >
                  <div
                    onClick={() => setOpen(p.slug)}
                    onMouseEnter={() => setHovering(p.slug)}
                    onMouseLeave={() => setHovering(null)}
                    className="cursor-pointer relative"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${p.cover}?w=1200&auto=format&fit=crop`}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {hovering === p.slug && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="px-6 py-3 rounded-full bg-[#1a1915] text-[#f5f3ef] text-xs font-black uppercase tracking-widest shadow-2xl animate-in">
                          Ver case →
                        </span>
                      </div>
                    )}
                    <div className="absolute -top-3 -left-3 w-14 h-14 flex items-center justify-center font-black text-5xl text-[#1a1915]/15 pointer-events-none" style={{ fontFamily: 'Georgia, serif' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a1915]/60 font-bold">
                        {p.tag}
                      </span>
                      <span className="text-xs text-[#1a1915]/40">· {p.year}</span>
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-[0.95] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                      {p.title}
                    </h3>
                    <p className="text-lg text-[#1a1915]/70 leading-relaxed mb-8 max-w-md">
                      {p.summary}
                    </p>
                    <div className="pt-6 border-t border-[#1a1915]/10 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex gap-2 flex-wrap">
                        {p.tech.slice(0, 3).map((t) => (
                          <span key={t} className="px-3 py-1 bg-[#1a1915]/5 text-[#1a1915]/70 text-[11px] font-bold rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setOpen(p.slug)}
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest border-b-2 border-[#1a1915] pb-1 hover:text-[#1a1915]/60"
                      >
                        Ver case study
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sobre — grande e editorial */}
      <section id="about" className="bg-[#1a1915] text-[#f5f3ef] py-32">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#f5f3ef]/50 font-bold">
            02 · Sobre
          </span>
          <div className="grid md:grid-cols-[400px_1fr] gap-16 mt-10 items-start">
            <div>
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop"
                  alt="Mariana"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex gap-3">
                {['Instagram', 'LinkedIn', 'Dribbble'].map((n) => (
                  <a key={n} className="px-4 h-10 border border-[#f5f3ef]/20 flex items-center justify-center hover:bg-[#f5f3ef] hover:text-[#1a1915] transition-colors text-[10px] font-bold uppercase tracking-widest">
                    {n}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.95] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                Entre o traço e o algoritmo.
              </h2>
              <div className="space-y-6 text-lg text-[#f5f3ef]/70 leading-relaxed max-w-xl">
                <p>
                  Comecei em uma pequena agência em Porto Alegre em 2012, migrei para Londres, trabalhei
                  em uma consultoria global por 4 anos e voltei pra São Paulo em 2020 pra construir meu próprio estúdio.
                </p>
                <p>
                  Hoje atendo diretamente marcas brasileiras independentes e grandes grupos — do rebranding de uma vinícola
                  à redesign de um produto SaaS com milhões de usuários.
                </p>
                <p className="text-[#f5f3ef] font-bold italic text-2xl pt-2" style={{ fontFamily: 'Georgia, serif' }}>
                  &ldquo;Bom design é invisível. Grande design é inevitável.&rdquo;
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#f5f3ef]/15">
                <Stat n="+80" l="projetos entregues" />
                <Stat n="+15" l="países atendidos" />
                <Stat n="4" l="prêmios Awwwards" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-32">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a1915]/50 font-bold">
          03 · Serviços
        </span>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-4 mb-16 max-w-3xl">
          Como posso <span className="italic font-light">ajudar</span> seu negócio.
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-[#1a1915]/10">
          {[
            { num: '01', titulo: 'Branding & Identidade', items: ['Naming', 'Logo & tipografia', 'Sistema visual', 'Guia de marca'] },
            { num: '02', titulo: 'Produto Digital', items: ['UX/UI', 'Design system', 'Prototipagem', 'Testes com usuários'] },
            { num: '03', titulo: 'Direção Criativa', items: ['Campanhas 360°', 'Editorial', 'Packaging', 'Fotografia'] },
          ].map((s) => (
            <div key={s.num} className="bg-[#f5f3ef] p-10">
              <div className="text-5xl font-black text-[#1a1915]/15 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                {s.num}
              </div>
              <h3 className="text-2xl font-black mb-6 italic" style={{ fontFamily: 'Georgia, serif' }}>
                {s.titulo}
              </h3>
              <ul className="space-y-2 text-sm text-[#1a1915]/70">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#1a1915]/40" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-[#1a1915] text-[#f5f3ef] py-32">
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#f5f3ef]/50 font-bold">
            04 · Vamos criar
          </span>
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.9] mt-6 mb-10" style={{ fontFamily: 'Georgia, serif' }}>
            Vamos<br />trabalhar <span className="text-emerald-400">juntos</span>?
          </h2>
          <p className="text-xl text-[#f5f3ef]/60 mb-12 max-w-xl mx-auto">
            Respondo todos os briefings em até 24h. Agendo call em até 3 dias úteis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:ola@mariana.studio" className="inline-flex items-center gap-3 px-10 py-5 bg-[#f5f3ef] text-[#1a1915] rounded-full font-black uppercase tracking-widest text-xs">
              <Mail size={14} /> ola@mariana.studio
            </a>
            <a className="inline-flex items-center gap-3 px-10 py-5 border border-[#f5f3ef]/30 text-[#f5f3ef] rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#f5f3ef]/10">
              Baixar portfolio PDF
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a1915] text-[#f5f3ef]/40 py-8 text-center text-xs border-t border-[#f5f3ef]/10">
        © 2026 Mariana Vieira Studio · <Link href="/encomendar/portfolio" className="text-emerald-400 hover:underline">Quero este site</Link>
      </footer>

      {/* Modal case study */}
      {projeto && (
        <div
          className="fixed inset-0 z-[200] bg-[#1a1915]/95 overflow-y-auto"
          onClick={() => setOpen(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#f5f3ef] border-b border-[#1a1915]/10 px-6 py-4 flex items-center justify-between z-10">
              <button onClick={() => setOpen(null)} className="text-sm font-bold text-[#1a1915] hover:text-[#1a1915]/60">
                ← Voltar aos trabalhos
              </button>
              <span className="text-xs uppercase tracking-widest text-[#1a1915]/50">{projeto.year} · {projeto.tag}</span>
            </div>

            <div className="bg-[#f5f3ef]">
              <div className="aspect-[21/9] overflow-hidden">
                <img src={`https://images.unsplash.com/${projeto.cover}?w=1800&auto=format&fit=crop`} alt={projeto.title} className="w-full h-full object-cover" />
              </div>

              <div className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-[#1a1915]/50 text-xs uppercase tracking-[0.3em] mb-6">Case study · 2026</p>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  {projeto.title}
                </h1>
                <p className="text-2xl text-[#1a1915]/70 leading-relaxed max-w-3xl">{projeto.summary}</p>
              </div>

              <div className="max-w-4xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-8 border-b border-[#1a1915]/10">
                <MetaCol label="Cliente" value={projeto.client} />
                <MetaCol label="Papel" value={projeto.role} />
                <MetaCol label="Duração" value={projeto.duration} />
              </div>

              <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-[#1a1915]/50 text-xs uppercase tracking-[0.3em] mb-4">01 · O desafio</p>
                <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Georgia, serif' }}>O problema</h2>
                <p className="text-[#1a1915]/70 text-lg leading-relaxed">{projeto.problem}</p>
              </section>

              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-4">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={`https://images.unsplash.com/${projeto.gallery[0]}?w=1000&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={`https://images.unsplash.com/${projeto.gallery[1]}?w=1000&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-[#1a1915]/50 text-xs uppercase tracking-[0.3em] mb-4">02 · A proposta</p>
                <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Georgia, serif' }}>A solução</h2>
                <p className="text-[#1a1915]/70 text-lg leading-relaxed">{projeto.solution}</p>
              </section>

              <div className="max-w-6xl mx-auto px-6">
                <div className="aspect-[21/9] overflow-hidden">
                  <img src={`https://images.unsplash.com/${projeto.gallery[2]}?w=1800&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              <section className="py-24 mt-16" style={{ backgroundColor: projeto.color }}>
                <div className="max-w-4xl mx-auto px-6 text-white">
                  <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-4">03 · Resultado</p>
                  <h2 className="text-5xl md:text-6xl font-black italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                    {projeto.result}
                  </h2>
                </div>
              </section>

              <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-[#1a1915]/50 text-xs uppercase tracking-[0.3em] mb-4">Expertise aplicada</p>
                <div className="flex flex-wrap gap-2">
                  {projeto.tech.map((t) => (
                    <span key={t} className="px-4 py-2 bg-[#1a1915]/10 text-[#1a1915] text-sm font-bold rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              <section className="border-t border-[#1a1915]/10 py-16">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[#1a1915]/50 text-xs uppercase tracking-widest mb-2">Próximo projeto</p>
                    <h3 className="text-3xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>
                      {(() => {
                        const idx = PROJETOS.findIndex((p) => p.slug === projeto.slug);
                        const next = PROJETOS[(idx + 1) % PROJETOS.length];
                        return next.title;
                      })()}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      const idx = PROJETOS.findIndex((p) => p.slug === projeto.slug);
                      const next = PROJETOS[(idx + 1) % PROJETOS.length];
                      setOpen(next.slug);
                      window.scrollTo({ top: 0 });
                    }}
                    className="px-8 py-4 bg-[#1a1915] text-[#f5f3ef] rounded-full font-bold text-sm"
                  >
                    Ver próximo →
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function MetaCol({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-[#1a1915]/50 mb-2">{label}</div>
      <div className="font-black text-[#1a1915]">{value}</div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-4xl font-black" style={{ fontFamily: 'Georgia, serif' }}>{n}</div>
      <div className="text-xs text-[#f5f3ef]/50 mt-1">{l}</div>
    </div>
  );
}
