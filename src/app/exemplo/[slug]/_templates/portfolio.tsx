import Link from 'next/link';

const PROJETOS = [
  { title: 'Rebranding Vinícola', year: '2026', tag: 'Branding', color: 'from-rose-500 to-amber-500' },
  { title: 'App de meditação', year: '2026', tag: 'Produto', color: 'from-teal-500 to-cyan-500' },
  { title: 'Identidade visual Studio X', year: '2025', tag: 'Branding', color: 'from-violet-500 to-fuchsia-500' },
  { title: 'E-commerce de moda', year: '2025', tag: 'Web', color: 'from-stone-500 to-stone-700' },
  { title: 'Direção de arte editorial', year: '2024', tag: 'Editorial', color: 'from-emerald-500 to-lime-500' },
  { title: 'Campanha Verão', year: '2024', tag: 'Social', color: 'from-orange-500 to-red-500' },
];

export function PortfolioTemplate() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Nav */}
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
        <p className="text-stone-600 text-xl max-w-2xl leading-relaxed">
          Diretor de arte e designer brasileiro atuando com branding, identidade visual
          e produtos digitais para marcas que querem se destacar.
        </p>
      </section>

      {/* Projetos */}
      <section id="projetos" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl font-black tracking-tight">Projetos selecionados</h2>
          <span className="text-stone-500 text-sm">{PROJETOS.length} trabalhos</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJETOS.map((p) => (
            <div key={p.title} className="group cursor-pointer">
              <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${p.color} mb-5 group-hover:scale-[1.02] transition-transform`} />
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <span className="text-stone-500 text-sm">{p.year}</span>
              </div>
              <p className="text-stone-500 text-sm mt-1 uppercase tracking-widest">{p.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="bg-stone-900 text-stone-50 py-32 mt-24">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-stone-400 text-sm uppercase tracking-widest mb-4">Sobre</p>
            <h2 className="text-5xl font-black tracking-tight italic">Olá, eu sou um designer com propósito.</h2>
          </div>
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
    </main>
  );
}
