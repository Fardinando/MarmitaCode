import Link from 'next/link';

const PRODUTOS = [
  { name: 'Vestido midi floral', price: 189, color: 'from-pink-200 to-rose-300', tag: 'Novo' },
  { name: 'Blazer linho creme', price: 329, color: 'from-amber-100 to-amber-200', tag: null },
  { name: 'Calça wide alfaiataria', price: 249, color: 'from-stone-200 to-stone-400', tag: null },
  { name: 'Camisa seda estampada', price: 219, color: 'from-indigo-200 to-indigo-300', tag: 'Promo' },
  { name: 'Saia plissada pastel', price: 169, color: 'from-emerald-100 to-emerald-200', tag: null },
  { name: 'Casaco oversized', price: 489, color: 'from-neutral-300 to-neutral-500', tag: 'Novo' },
  { name: 'Vestido longo linho', price: 299, color: 'from-orange-100 to-orange-200', tag: null },
  { name: 'Bolsa couro vintage', price: 379, color: 'from-amber-700 to-amber-900', tag: 'Promo' },
];

export function LojaTemplate() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-2xl italic tracking-tight">boutique.</div>
          <div className="hidden md:flex gap-8 text-sm text-neutral-600 uppercase tracking-widest">
            <a href="#vestidos" className="hover:text-neutral-900">Vestidos</a>
            <a href="#blazers" className="hover:text-neutral-900">Blazers</a>
            <a href="#acessorios" className="hover:text-neutral-900">Acessórios</a>
            <a href="#sale" className="text-rose-600 font-bold hover:text-rose-700">Promo</a>
          </div>
          <a href="#contato" className="text-sm font-bold px-5 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-700">
            Fale conosco
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-rose-500 text-xs uppercase tracking-[0.3em] mb-6">Nova coleção · Primavera 26</p>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              Moda <span className="italic font-light">atemporal</span><br />para o seu dia a dia.
            </h1>
            <p className="text-neutral-600 text-lg mb-10 max-w-md">
              Peças cuidadosamente selecionadas de pequenos ateliês brasileiros. Entrega para todo o país.
            </p>
            <div className="flex gap-4">
              <a href="#produtos" className="px-8 py-4 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-700">
                Ver coleção
              </a>
              <a href="#sale" className="px-8 py-4 border border-neutral-300 font-bold rounded-full hover:bg-neutral-100">
                Promoções
              </a>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-100 via-amber-100 to-rose-200 flex items-center justify-center text-9xl">
            👗
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl font-black tracking-tight">Mais vendidos</h2>
          <span className="text-neutral-500 text-sm">{PRODUTOS.length} produtos</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {PRODUTOS.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div className={`relative aspect-[3/4] rounded-2xl bg-gradient-to-br ${p.color} mb-3 overflow-hidden`}>
                {p.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    p.tag === 'Promo' ? 'bg-rose-500 text-white' : 'bg-neutral-900 text-white'
                  }`}>
                    {p.tag}
                  </span>
                )}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition">
                  <a href="https://wa.me/" className="block py-2.5 bg-white/95 rounded-xl text-xs font-black text-center uppercase tracking-widest">
                    Pedir no WhatsApp
                  </a>
                </div>
              </div>
              <h3 className="font-bold text-sm">{p.name}</h3>
              <p className="text-neutral-600 text-sm mt-1">R$ {p.price},00</p>
            </div>
          ))}
        </div>
      </section>

      {/* Faixa de valores */}
      <section className="bg-neutral-50 py-16 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            ['🚚', 'Frete grátis acima de R$ 299', 'Para todo o Brasil'],
            ['🔄', 'Troca em até 30 dias', 'Sem complicação'],
            ['💳', 'Parcele em até 6x', 'Sem juros no cartão'],
          ].map(([icon, title, sub]) => (
            <div key={title}>
              <div className="text-4xl mb-3">{icon}</div>
              <div className="font-bold">{title}</div>
              <div className="text-neutral-500 text-sm mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-black mb-6">Dúvidas? Fale com a gente</h2>
        <p className="text-neutral-600 mb-10">Atendimento personalizado via WhatsApp — segunda a sábado, 9h às 18h.</p>
        <a href="https://wa.me/" className="inline-block px-10 py-5 bg-green-500 text-white font-bold rounded-full">
          Chamar no WhatsApp
        </a>
      </section>

      <footer className="border-t border-neutral-200 py-8 text-center text-neutral-500 text-sm">
        © boutique. · <Link href="/encomendar/loja" className="font-bold text-neutral-900 hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
