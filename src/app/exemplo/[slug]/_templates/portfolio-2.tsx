import Link from 'next/link';

const WORKS = [
  { title: 'Nebula App', year: '2026', tag: '3D · Motion', img: 'photo-1639322537228-f710d846310a' },
  { title: 'Prisma Identity', year: '2026', tag: 'Brand', img: 'photo-1618005182384-a83a8bd57fbe' },
  { title: 'Volt Energy', year: '2025', tag: 'Web · Code', img: 'photo-1550745165-9bc0b252726f' },
  { title: 'Orbit Dashboard', year: '2025', tag: 'Product', img: 'photo-1551288049-bebda4e38f71' },
];

export function Portfolio2Template() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <nav className="sticky top-10 z-40 bg-black/80 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">
            <span className="text-[#00ff88]">◆</span> nova.dev
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-white/50">
            <a href="#work" className="hover:text-[#00ff88]">Trabalhos</a>
            <a href="#about" className="hover:text-[#00ff88]">Sobre</a>
            <a href="#contact" className="hover:text-[#00ff88]">Contato</a>
          </div>
          <a className="text-xs font-black uppercase tracking-widest px-5 py-2.5 bg-[#00ff88] text-black rounded-full">
            Vamos conversar
          </a>
        </div>
      </nav>

      {/* Hero bold */}
      <section className="max-w-6xl mx-auto px-6 py-32 relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px]" />
        <p className="text-[#00ff88] text-xs uppercase tracking-[0.4em] mb-8 relative">Designer & Developer · Baseado em SP</p>
        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-10 relative">
          Interfaces que <span className="italic text-[#00ff88]">vivem.</span><br />
          Códigos que <span className="italic text-fuchsia-400">respiram.</span>
        </h1>
        <p className="text-white/60 text-xl max-w-2xl relative">
          Produto digital de ponta a ponta: pesquisa, design, prototipagem, código e lançamento.
          Já lancei produtos usados por milhões de pessoas no Brasil e no mundo.
        </p>
      </section>

      {/* Trabalhos grid alternado */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-5xl font-black tracking-tight">Trabalhos recentes</h2>
          <span className="text-white/40 text-sm">{WORKS.length} de 40+</span>
        </div>
        <div className="space-y-20">
          {WORKS.map((w, i) => (
            <article key={w.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer">
                <img src={`https://images.unsplash.com/${w.img}?w=1000&auto=format&fit=crop`} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <p className="text-[#00ff88] text-xs uppercase tracking-[0.3em] font-bold mb-4">{w.tag} · {w.year}</p>
                <h3 className="text-4xl font-black mb-4 tracking-tight">{w.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Projeto completo de produto, do briefing ao go-live. Foco em performance,
                  acessibilidade e uma identidade visual própria.
                </p>
                <a className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#00ff88] border-b border-[#00ff88] pb-1">
                  Ver estudo de caso →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="about" className="bg-white/[0.02] py-24 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div>
            <p className="text-[#00ff88] text-xs uppercase tracking-[0.3em] mb-4">Sobre</p>
            <h2 className="text-5xl font-black mb-6 tracking-tight">Designer que escreve código, dev que pensa design.</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              12 anos trabalhando entre o design e a engenharia. Já ajudei a lançar produtos pra Google,
              Spotify e três startups brasileiras que foram adquiridas.
            </p>
            <div className="flex gap-8 text-sm">
              <div><div className="text-3xl font-black text-[#00ff88]">+120</div><div className="text-white/40">projetos</div></div>
              <div><div className="text-3xl font-black text-fuchsia-400">4</div><div className="text-white/40">prêmios Awwwards</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h2 className="text-6xl font-black tracking-tight mb-6">Pronto pra criar?</h2>
        <p className="text-white/60 mb-10">Respondo todas em até 24h — e sim, leio o briefing inteiro.</p>
        <a className="inline-block px-10 py-5 bg-[#00ff88] text-black font-black uppercase tracking-widest rounded-full">
          ola@nova.dev
        </a>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-xs uppercase tracking-widest">
        © nova.dev · <Link href="/encomendar/portfolio-2" className="text-[#00ff88] hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
