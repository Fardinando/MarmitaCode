'use client';

import { useState } from 'react';
import Link from 'next/link';

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
}

const PROJETOS: Projeto[] = [
  {
    slug: 'vinicola',
    title: 'Rebranding Vinícola Valle',
    year: '2026',
    tag: 'Branding',
    cover: 'photo-1510812431401-41d2bd2722f3',
    gallery: ['photo-1569529465841-dfecdab7503b', 'photo-1553361371-9b22f78e8b1d', 'photo-1510812431401-41d2bd2722f3'],
    client: 'Vinícola Valle (RS)',
    role: 'Direção criativa, identidade visual, rotulagem',
    duration: '4 meses',
    summary: 'Reposicionamento de uma vinícola centenária gaúcha para o mercado premium.',
    problem: 'Marca familiar, visual datado dos anos 90, não comunicava a qualidade do produto nem conseguia preços premium no varejo. Vendas estagnadas há 5 anos.',
    solution: 'Nova identidade com tipografia serifada moderna, paleta de tons terrosos, rotulagem com acabamento em dourado quente e sistema fotográfico editorial. Nome passou a destacar o terroir.',
    result: 'Aumento de 180% nas vendas no primeiro ano, entrada em 3 das top-10 wine stores do Brasil, matéria na revista Veja. Preço médio da garrafa subiu 65%.',
    tech: ['Design editorial', 'Fotografia', 'Direção de arte', 'Packaging'],
  },
  {
    slug: 'app-meditacao',
    title: 'App Nebula',
    year: '2026',
    tag: 'Produto digital',
    cover: 'photo-1559526324-4b87b5e36e44',
    gallery: ['photo-1559526324-4b87b5e36e44', 'photo-1551288049-bebda4e38f71', 'photo-1522202176988-66273c2fd55f'],
    client: 'Nebula Health (startup)',
    role: 'Product designer lead',
    duration: '8 meses',
    summary: 'App de meditação com foco em sono infantil, iOS/Android.',
    problem: 'Mercado saturado por Calm e Headspace. Diferenciar com público-alvo específico e UX melhor pra pais de crianças pequenas.',
    solution: 'Narrativas em formato de histórias com personagens, trilha baseada em frequências de ondas delta, modo offline nativo e timer visual que a própria criança controla.',
    result: '120k downloads nos 6 primeiros meses, 4.8 estrelas na App Store, destaque editorial da Apple em 3 países.',
    tech: ['iOS', 'Android', 'Design system', 'Pesquisa UX'],
  },
  {
    slug: 'studio-x',
    title: 'Identidade Studio X',
    year: '2025',
    tag: 'Branding',
    cover: 'photo-1618005182384-a83a8bd57fbe',
    gallery: ['photo-1618005182384-a83a8bd57fbe', 'photo-1515886657613-9f3515b0c78f', 'photo-1596920566403-2072ed25d437'],
    client: 'Studio X Arquitetura',
    role: 'Branding completo',
    duration: '3 meses',
    summary: 'Identidade visual para escritório de arquitetura contemporânea.',
    problem: 'Escritório recém-formado por 3 arquitetos jovens, precisando se posicionar entre nomes consolidados.',
    solution: 'Sistema visual modular com grid-like identity, tipografia geométrica custom e aplicações em projetos arquitetônicos reais via colagem.',
    result: '12 projetos fechados nos primeiros 6 meses, prêmio IF Design 2025 na categoria branding.',
    tech: ['Identidade visual', 'Tipografia', 'Site'],
  },
  {
    slug: 'ecommerce-moda',
    title: 'E-commerce Nova Era',
    year: '2025',
    tag: 'Web',
    cover: 'photo-1515886657613-9f3515b0c78f',
    gallery: ['photo-1515886657613-9f3515b0c78f', 'photo-1483985988355-763728e1935b', 'photo-1544441893-675973e31985'],
    client: 'Nova Era Moda',
    role: 'Design + desenvolvimento',
    duration: '5 meses',
    summary: 'Loja online de moda sustentável com conteúdo editorial.',
    problem: 'E-commerces de moda são todos parecidos. Precisava destacar a história de cada peça e a origem sustentável.',
    solution: 'Cada produto virou uma mini-história com foto do produtor, origem do tecido e processo. Checkout em 3 cliques.',
    result: 'Taxa de conversão 4.2% (média do segmento é 1.8%). Faturamento 3x no primeiro ano.',
    tech: ['Next.js', 'Shopify', 'Design editorial', 'Fotografia'],
  },
  {
    slug: 'editorial',
    title: 'Revista Horizonte',
    year: '2024',
    tag: 'Editorial',
    cover: 'photo-1596920566403-2072ed25d437',
    gallery: ['photo-1596920566403-2072ed25d437', 'photo-1532153975070-2e9ab71f1b14', 'photo-1455390582262-044cdead277a'],
    client: 'Editora Horizonte',
    role: 'Direção de arte editorial',
    duration: '6 meses · 4 edições',
    summary: 'Redesign completo de revista mensal de cultura e arte.',
    problem: 'Circulação em queda. Visual engessado, não conversava com público jovem.',
    solution: 'Grid flexível por reportagem, capas conceituais ilustradas, tipografia experimental, impressão em papel reciclado.',
    result: 'Circulação +40% em 6 meses, 3 capas premiadas no Society of Publication Designers.',
    tech: ['Design editorial', 'Tipografia', 'Ilustração', 'Impressão'],
  },
  {
    slug: 'campanha-verao',
    title: 'Campanha Verão Solar',
    year: '2024',
    tag: 'Social',
    cover: 'photo-1618220179428-22790b461013',
    gallery: ['photo-1618220179428-22790b461013', 'photo-1544441893-675973e31985', 'photo-1515886657613-9f3515b0c78f'],
    client: 'Solar Cosméticos',
    role: 'Direção de arte',
    duration: '2 meses',
    summary: 'Campanha de verão 360º para marca de protetor solar.',
    problem: 'Marca percebida como "séria", precisava ganhar presença entre gen Z.',
    solution: 'Direção de arte vibrante, modelos reais em vez de atletas, filtros Instagram próprios, parcerias com creators.',
    result: '12M de impressões orgânicas, +40% em vendas na faixa 18-25 anos, viralização de um dos filtros.',
    tech: ['Direção de arte', 'Social media', 'AR filters', 'Produção'],
  },
];

export function PortfolioTemplate() {
  const [open, setOpen] = useState<string | null>(null);
  const projeto = open ? PROJETOS.find((p) => p.slug === open) : null;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="sticky top-10 z-40 bg-stone-50/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">
            Studio<span className="text-stone-400">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-stone-500">
            <a href="#projetos" className="hover:text-stone-900">Projetos</a>
            <a href="#sobre" className="hover:text-stone-900">Sobre</a>
            <a href="#contato" className="hover:text-stone-900">Contato</a>
          </div>
          <a href="#contato" className="text-sm font-bold border-b-2 border-stone-900 pb-0.5">
            Vamos conversar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <p className="text-stone-500 text-sm tracking-widest uppercase mb-10">Portfolio · 2010 — Agora</p>
        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-10 max-w-4xl">
          Design que <span className="italic font-light">resolve</span> problemas e <span className="italic font-light">conta</span> histórias.
        </h1>
        <p className="text-stone-600 text-xl max-w-2xl leading-relaxed mb-6">
          Diretora de arte e designer atuando com branding, identidade visual
          e produtos digitais para marcas que querem se destacar.
        </p>
        <p className="text-stone-500 text-sm">
          Clique em qualquer projeto abaixo para ver o case completo →
        </p>
      </section>

      {/* Grid de projetos */}
      <section id="projetos" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl font-black tracking-tight">Projetos selecionados</h2>
          <span className="text-stone-500 text-sm">{PROJETOS.length} de 80+</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJETOS.map((p) => (
            <button
              key={p.slug}
              onClick={() => setOpen(p.slug)}
              className="group text-left cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative">
                <img
                  src={`https://images.unsplash.com/${p.cover}?w=1000&auto=format&fit=crop`}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition bg-white text-stone-900 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest">
                    Ver case completo →
                  </span>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <span className="text-stone-500 text-sm">{p.year}</span>
              </div>
              <p className="text-stone-500 text-sm mt-1 uppercase tracking-widest">{p.tag}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="bg-stone-900 text-stone-50 py-32 mt-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[280px_1fr] gap-16 items-center">
          <div className="aspect-square rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop"
              alt="Designer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-stone-400 text-sm uppercase tracking-widest mb-4">Sobre</p>
            <h2 className="text-5xl font-black tracking-tight italic mb-6">Olá, eu sou uma designer com propósito.</h2>
            <div className="text-stone-300 leading-relaxed space-y-5">
              <p>
                Trabalho há mais de 10 anos criando identidades visuais e experiências digitais
                para marcas de pequenas empresas até agências globais.
              </p>
              <p>
                Meu foco está em design que não é apenas bonito, mas resolve problemas de
                negócio concretos: posicionamento, conversão, memorabilidade.
              </p>
              <div className="pt-5 flex gap-10 text-sm">
                <div>
                  <div className="text-3xl font-black">+80</div>
                  <div className="text-stone-400">projetos entregues</div>
                </div>
                <div>
                  <div className="text-3xl font-black">+15</div>
                  <div className="text-stone-400">países atendidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-6xl font-black tracking-tight mb-6">
          Vamos criar algo <span className="italic font-light">juntos</span>?
        </h2>
        <p className="text-stone-600 mb-10 text-lg">Respondo todas as mensagens em até 24h.</p>
        <a href="mailto:ola@studio.com" className="inline-block px-10 py-5 bg-stone-900 text-stone-50 rounded-full font-bold">
          ola@studio.com
        </a>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
        © Studio · <Link href="/encomendar/portfolio" className="text-stone-900 font-bold hover:underline">Quero este site</Link>
      </footer>

      {/* Modal case study */}
      {projeto && (
        <div
          className="fixed inset-0 z-[200] bg-stone-900/95 overflow-y-auto"
          onClick={() => setOpen(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="min-h-screen"
          >
            {/* Nav do case */}
            <div className="sticky top-0 bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
              <button onClick={() => setOpen(null)} className="text-sm font-bold text-stone-700 hover:text-stone-900">
                ← Voltar aos projetos
              </button>
              <span className="text-xs uppercase tracking-widest text-stone-500">{projeto.year} · {projeto.tag}</span>
            </div>

            <div className="bg-stone-50">
              {/* Capa */}
              <div className="aspect-[21/9] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${projeto.cover}?w=1800&auto=format&fit=crop`}
                  alt={projeto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Título */}
              <div className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mb-6">Case study</p>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8">{projeto.title}</h1>
                <p className="text-2xl text-stone-700 leading-relaxed max-w-3xl">{projeto.summary}</p>
              </div>

              {/* Meta: cliente, role, duration */}
              <div className="max-w-4xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-8 border-b border-stone-200">
                <MetaCol label="Cliente" value={projeto.client} />
                <MetaCol label="Papel" value={projeto.role} />
                <MetaCol label="Duração" value={projeto.duration} />
              </div>

              {/* Problema */}
              <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mb-4">O desafio</p>
                <h2 className="text-3xl font-black mb-6">O problema</h2>
                <p className="text-stone-700 text-lg leading-relaxed">{projeto.problem}</p>
              </section>

              {/* Galeria 1 */}
              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={`https://images.unsplash.com/${projeto.gallery[0]}?w=1000&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={`https://images.unsplash.com/${projeto.gallery[1]}?w=1000&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Solução */}
              <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mb-4">A proposta</p>
                <h2 className="text-3xl font-black mb-6">A solução</h2>
                <p className="text-stone-700 text-lg leading-relaxed">{projeto.solution}</p>
              </section>

              {/* Galeria 2 */}
              <div className="max-w-6xl mx-auto px-6">
                <div className="aspect-[21/9] rounded-2xl overflow-hidden">
                  <img src={`https://images.unsplash.com/${projeto.gallery[2]}?w=1800&auto=format&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Resultado — destaque */}
              <section className="bg-stone-900 text-stone-50 py-24 mt-16">
                <div className="max-w-4xl mx-auto px-6">
                  <p className="text-stone-400 text-xs uppercase tracking-[0.3em] mb-4">O resultado</p>
                  <h2 className="text-5xl font-black mb-8 italic leading-tight">{projeto.result}</h2>
                </div>
              </section>

              {/* Tech */}
              <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mb-4">Expertise aplicada</p>
                <div className="flex flex-wrap gap-2">
                  {projeto.tech.map((t) => (
                    <span key={t} className="px-4 py-2 rounded-full bg-stone-200 text-stone-800 text-sm font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              {/* Próximo projeto */}
              <section className="border-t border-stone-200 py-16">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">Próximo</p>
                    <h3 className="text-2xl font-black">
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
                    className="px-8 py-4 bg-stone-900 text-stone-50 rounded-full font-bold text-sm"
                  >
                    Ver próximo projeto →
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
      <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">{label}</div>
      <div className="font-bold text-stone-900">{value}</div>
    </div>
  );
}
