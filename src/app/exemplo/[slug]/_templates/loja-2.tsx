import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const PRODUTOS = [
  { name: 'Café especial Serra do Caparaó', price: 48, img: 'photo-1495474472287-4d71bcdd2085', badge: 'Novo' },
  { name: 'Mel orgânico silvestre 500g', price: 32, img: 'photo-1587049352846-4a222e784d38', badge: null },
  { name: 'Azeite extra-virgem Serra Gaúcha', price: 89, img: 'photo-1474979266404-7eaacbcd87c5', badge: 'Top' },
  { name: 'Chocolate 70% bean-to-bar', price: 28, img: 'photo-1511381939415-e44015466834', badge: null },
  { name: 'Granola artesanal com castanhas', price: 36, img: 'photo-1517686469429-8bdb88b9f907', badge: null },
  { name: 'Kombucha gengibre & limão 500ml', price: 18, img: 'photo-1596803244535-925769f389fc', badge: 'Promo' },
];

export function Loja2Template() {
  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-white text-center py-2 text-xs font-bold">
        🚚 FRETE GRÁTIS para pedidos acima de R$ 199 em todo o Brasil
      </div>

      <nav className="sticky top-10 z-40 bg-[#fafaf7]/95 backdrop-blur border-b border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-2xl tracking-tight">
            Empório<span className="text-emerald-700">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#1a1a1a]/60">
            <a className="hover:text-emerald-700">Mercearia</a>
            <a className="hover:text-emerald-700">Bebidas</a>
            <a className="hover:text-emerald-700">Doces</a>
            <a className="hover:text-emerald-700">Produtores</a>
          </div>
          <div className="flex gap-3 items-center">
            <a className="text-sm hover:underline">Entrar</a>
            <a className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-bold rounded-full">
              🛒 2
            </a>
          </div>
        </div>
      </nav>

      {/* Hero mercado */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <p className="text-emerald-700 text-xs uppercase tracking-[0.3em] font-bold mb-6">Direto do produtor</p>
          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
            Produtos de verdade, feitos por <span className="italic text-emerald-700">gente de verdade</span>.
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg mb-8">
            Selecionamos pequenos produtores brasileiros e levamos até você. Comida honesta, trabalho justo.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a className="px-7 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800">
              Explorar catálogo
            </a>
            <a className="px-7 py-4 border border-[#1a1a1a]/20 rounded-full font-bold hover:bg-[#1a1a1a]/5">
              Conheça os produtores
            </a>
          </div>
        </div>
        <div className="aspect-square rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Faixa de valores */}
      <section className="bg-emerald-50 py-10 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center text-sm">
          {[
            [<Truck key="t" />, 'Frete grátis', 'Pedidos acima de R$ 199'],
            [<ShieldCheck key="s" />, 'Compra segura', 'Pix, cartão em 6x'],
            [<RefreshCw key="r" />, '30 dias pra trocar', 'Sem perguntas'],
          ].map(([icon, title, sub]) => (
            <div key={title as string} className="flex items-center gap-4 justify-center">
              <div className="text-emerald-700">{icon}</div>
              <div className="text-left">
                <div className="font-black">{title}</div>
                <div className="text-[#1a1a1a]/60 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid de produtos */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-black tracking-tight">Mais pedidos da semana</h2>
          <a className="text-sm font-bold text-emerald-700 hover:underline">Ver tudo →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUTOS.map((p) => (
            <article key={p.name} className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-3">
                <img src={`https://images.unsplash.com/${p.img}?w=600&auto=format&fit=crop`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    p.badge === 'Promo' ? 'bg-rose-600 text-white' : p.badge === 'Top' ? 'bg-amber-500 text-white' : 'bg-[#1a1a1a] text-white'
                  }`}>{p.badge}</span>
                )}
                <button className="absolute inset-x-3 bottom-3 py-2.5 bg-white/95 text-[#1a1a1a] text-xs font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition">
                  + Adicionar
                </button>
              </div>
              <h3 className="font-bold text-sm leading-tight">{p.name}</h3>
              <p className="text-emerald-700 font-black mt-1">R$ {p.price},00</p>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1a1a1a] text-white py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-3">Receba nossas novidades da semana</h2>
          <p className="text-white/60 mb-6 text-sm">Produtos novos, promoções e histórias dos produtores.</p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="seu@email.com" className="flex-1 px-5 py-3 rounded-full text-[#1a1a1a] text-sm" />
            <button className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-full text-sm">OK</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a]/10 py-8 text-center text-[#1a1a1a]/50 text-xs uppercase tracking-widest">
        © Empório · <Link href="/encomendar/loja-2" className="text-emerald-700 font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
