'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw, Plus, Minus, X, ShoppingBag, Check } from 'lucide-react';

interface Produto {
  id: string;
  name: string;
  price: number;
  img: string;
  badge: string | null;
  cat: 'mercearia' | 'bebidas' | 'doces' | 'cafe';
}

const PRODUTOS: Produto[] = [
  { id: 'p1', name: 'Café especial Serra do Caparaó', price: 48, img: 'photo-1495474472287-4d71bcdd2085', badge: 'Novo', cat: 'cafe' },
  { id: 'p2', name: 'Mel orgânico silvestre 500g', price: 32, img: 'photo-1587049352846-4a222e784d38', badge: null, cat: 'mercearia' },
  { id: 'p3', name: 'Azeite extra-virgem Serra Gaúcha', price: 89, img: 'photo-1474979266404-7eaacbcd87c5', badge: 'Top', cat: 'mercearia' },
  { id: 'p4', name: 'Chocolate 70% bean-to-bar', price: 28, img: 'photo-1511381939415-e44015466834', badge: null, cat: 'doces' },
  { id: 'p5', name: 'Granola artesanal com castanhas', price: 36, img: 'photo-1517686469429-8bdb88b9f907', badge: null, cat: 'mercearia' },
  { id: 'p6', name: 'Kombucha gengibre & limão 500ml', price: 18, img: 'photo-1596803244535-925769f389fc', badge: 'Promo', cat: 'bebidas' },
  { id: 'p7', name: 'Café coado microlote 250g', price: 42, img: 'photo-1495474472287-4d71bcdd2085', badge: null, cat: 'cafe' },
  { id: 'p8', name: 'Doce de leite artesanal 400g', price: 24, img: 'photo-1517686469429-8bdb88b9f907', badge: 'Promo', cat: 'doces' },
];

type Cat = 'todos' | 'mercearia' | 'bebidas' | 'doces' | 'cafe';

const CATEGORIAS: { k: Cat; l: string }[] = [
  { k: 'todos', l: 'Todos' },
  { k: 'mercearia', l: 'Mercearia' },
  { k: 'bebidas', l: 'Bebidas' },
  { k: 'doces', l: 'Doces' },
  { k: 'cafe', l: 'Café' },
];

export function Loja2Template() {
  const [cat, setCat] = useState<Cat>('todos');
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [doneState, setDoneState] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [emailNews, setEmailNews] = useState('');
  const [newsOk, setNewsOk] = useState(false);

  const filtered = cat === 'todos' ? PRODUTOS : PRODUTOS.filter((p) => p.cat === cat);
  const cartItems = cart.map((i) => ({ ...i, produto: PRODUTOS.find((p) => p.id === i.id)! })).filter((x) => x.produto);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.produto.price * i.qty, 0);
  const freteGratis = subtotal >= 199;
  const frete = subtotal > 0 && !freteGratis ? 19 : 0;
  const total = subtotal + frete;

  const add = (id: string) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (ex) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
    setCartOpen(true);
  };

  const change = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-white text-center py-2 text-xs font-bold">
        🚚 FRETE GRÁTIS para pedidos acima de R$ 199 em todo o Brasil
      </div>

      <nav className="sticky top-10 z-40 bg-[#fafaf7]/95 backdrop-blur border-b border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-3">
          <div className="font-black text-2xl tracking-tight">
            Empório<span className="text-emerald-700">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#1a1a1a]/60">
            {CATEGORIAS.slice(1).map((c) => (
              <button key={c.k} onClick={() => setCat(c.k)} className="hover:text-emerald-700">
                {c.l}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <a className="text-sm hidden sm:inline hover:underline">Entrar</a>
            <button
              onClick={() => { setCartOpen(true); setDoneState('cart'); }}
              className="relative px-4 py-2 bg-[#1a1a1a] text-white text-sm font-bold rounded-full flex items-center gap-2 hover:bg-[#333]"
            >
              <ShoppingBag size={14} />
              Sacola
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
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
            <a href="#produtos" className="px-7 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800">
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

      {/* Catálogo */}
      <section id="produtos" className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-3xl font-black tracking-tight">Nosso catálogo</h2>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map((c) => (
              <button
                key={c.k}
                onClick={() => setCat(c.k)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition ${
                  cat === c.k ? 'bg-[#1a1a1a] text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {c.l}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-neutral-500 mb-5">{filtered.length} produto{filtered.length !== 1 ? 's' : ''}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <article key={p.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-200">
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <img src={`https://images.unsplash.com/${p.img}?w=500&auto=format&fit=crop`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    p.badge === 'Promo' ? 'bg-rose-500 text-white' :
                    p.badge === 'Top' ? 'bg-amber-500 text-white' :
                    'bg-emerald-700 text-white'
                  }`}>{p.badge}</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-tight min-h-[2.5rem]">{p.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-emerald-700 font-black">R$ {p.price},00</p>
                  <button onClick={() => add(p.id)} className="w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Faixa de garantias */}
      <section className="bg-emerald-50 py-14 mt-8">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center text-sm">
          {[
            [<Truck key="t" />, 'Frete grátis', 'Pedidos acima de R$ 199'],
            [<ShieldCheck key="s" />, 'Compra segura', 'Pix, cartão em até 6x'],
            [<RefreshCw key="r" />, '30 dias pra trocar', 'Sem perguntas, sem taxa'],
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

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-black mb-3">Novidades da semana</h2>
        <p className="text-[#1a1a1a]/60 mb-6 text-sm">Produtos novos, promoções e histórias dos produtores.</p>
        {newsOk ? (
          <div className="inline-flex items-center gap-2 px-6 py-4 bg-emerald-100 text-emerald-800 rounded-full font-bold text-sm">
            <Check size={16} /> Pronto! Em breve você recebe nossa primeira newsletter.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setNewsOk(true); }}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={emailNews}
              onChange={(e) => setEmailNews(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 px-5 py-3 rounded-full border border-neutral-300 text-sm outline-none focus:border-emerald-700"
            />
            <button className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full text-sm">
              Inscrever
            </button>
          </form>
        )}
      </section>

      <footer className="border-t border-neutral-200 py-8 text-center text-neutral-500 text-sm">
        © Empório · <Link href="/encomendar/loja-2" className="text-emerald-700 font-bold hover:underline">Quero este site</Link>
      </footer>

      {/* Carrinho slide-in */}
      {cartOpen && (
        <div className="fixed inset-0 z-[200] flex" onClick={() => setCartOpen(false)}>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" />
          <aside
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white h-full overflow-y-auto flex flex-col"
          >
            {doneState === 'done' ? (
              <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Check size={36} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black mb-3">Pedido confirmado!</h2>
                <p className="text-neutral-600 mb-6">
                  Enviamos os detalhes pro seu e-mail. Entrega em 3-7 dias úteis.
                </p>
                <p className="text-xs text-neutral-500 mb-8">Nº do pedido · #EMP{Math.floor(Math.random() * 100000)}</p>
                <button
                  onClick={() => { setCartOpen(false); setDoneState('cart'); setCart([]); }}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full"
                >
                  Fechar
                </button>
              </div>
            ) : doneState === 'checkout' ? (
              <>
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
                  <div>
                    <h2 className="text-xl font-black">Finalizar pedido</h2>
                    <button onClick={() => setDoneState('cart')} className="text-xs text-neutral-500 mt-1">← Voltar à sacola</button>
                  </div>
                  <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center">
                    <X size={18} />
                  </button>
                </div>
                <form className="flex-1 overflow-y-auto p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setDoneState('done'); }}>
                  <Field label="E-mail" type="email" required />
                  <Field label="Nome completo" required />
                  <Field label="Telefone" required placeholder="(11) 99999-9999" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="CEP" required placeholder="00000-000" />
                    <Field label="Número" required />
                  </div>
                  <Field label="Endereço" required placeholder="Rua, bairro, cidade — SP" />
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-bold">R$ {subtotal.toLocaleString('pt-BR')},00</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Frete</span>
                      <span className="font-bold">{frete === 0 ? <span className="text-emerald-600">Grátis</span> : `R$ ${frete},00`}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200">
                      <span className="font-black uppercase tracking-widest text-sm">Total</span>
                      <span className="text-2xl font-black">R$ {total.toLocaleString('pt-BR')},00</span>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full">
                    Pagar com Pix
                  </button>
                  <p className="text-[10px] text-center text-neutral-400">
                    Pagamento simulado nesta demonstração.
                  </p>
                </form>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 sticky top-0 bg-white z-10">
                  <h2 className="text-xl font-black">Sua sacola</h2>
                  <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center">
                    <X size={18} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
                    <ShoppingBag size={48} className="text-neutral-300 mb-4" />
                    <p className="text-neutral-500 mb-6">Sua sacola está vazia.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-700"
                    >
                      Explorar catálogo →
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                      {cartItems.map((i) => (
                        <div key={i.id} className="flex gap-4">
                          <img
                            src={`https://images.unsplash.com/${i.produto.img}?w=300&auto=format&fit=crop`}
                            alt={i.produto.name}
                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm leading-snug">{i.produto.name}</h3>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 border border-neutral-200 rounded-full">
                                <button
                                  onClick={() => change(i.id, -1)}
                                  className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bold text-sm w-5 text-center">{i.qty}</span>
                                <button
                                  onClick={() => change(i.id, 1)}
                                  className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="font-black text-sm">R$ {(i.produto.price * i.qty).toLocaleString('pt-BR')},00</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 px-6 py-5 bg-emerald-50 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-700">Subtotal</span>
                        <span className="font-bold">R$ {subtotal.toLocaleString('pt-BR')},00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-700">Frete</span>
                        <span className="font-bold">
                          {freteGratis ? <span className="text-emerald-700">Grátis 🎉</span> : `R$ ${frete},00`}
                        </span>
                      </div>
                      {!freteGratis && subtotal > 0 && (
                        <div className="relative pt-1">
                          <div className="h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-700 transition-all" style={{ width: `${Math.min(100, (subtotal / 199) * 100)}%` }} />
                          </div>
                          <p className="text-[10px] text-emerald-800 mt-2">
                            Faltam R$ {(199 - subtotal).toLocaleString('pt-BR')},00 pra frete grátis!
                          </p>
                        </div>
                      )}
                      <div className="pt-3 border-t border-emerald-200 flex justify-between items-baseline">
                        <span className="font-black uppercase tracking-widest text-sm">Total</span>
                        <span className="text-2xl font-black">R$ {total.toLocaleString('pt-BR')},00</span>
                      </div>
                      <button
                        onClick={() => setDoneState('checkout')}
                        className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full mt-2"
                      >
                        Ir pro checkout
                      </button>
                      <p className="text-[10px] text-center text-neutral-500">
                        Pix com 5% off · ou em até 6x sem juros no cartão
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

function Field({ label, type, required, placeholder }: { label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">{label}</span>
      <input
        type={type ?? 'text'}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-emerald-700"
      />
    </label>
  );
}
