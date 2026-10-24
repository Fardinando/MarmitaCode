'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, X, Check, Heart } from 'lucide-react';

interface Produto {
  id: string;
  name: string;
  price: number;
  img: string;
  tag: string | null;
  category: 'vestidos' | 'blazers' | 'calcas' | 'acessorios';
}

const PRODUTOS: Produto[] = [
  { id: '1', name: 'Vestido midi floral', price: 189, img: 'photo-1572804013309-59a88b7e92f1', tag: 'Novo', category: 'vestidos' },
  { id: '2', name: 'Blazer linho creme', price: 329, img: 'photo-1591047139829-d91aecb6caea', tag: null, category: 'blazers' },
  { id: '3', name: 'Calça wide alfaiataria', price: 249, img: 'photo-1551803091-e20673f15770', tag: null, category: 'calcas' },
  { id: '4', name: 'Camisa seda estampada', price: 219, img: 'photo-1550246140-29f40b909e5a', tag: 'Promo', category: 'blazers' },
  { id: '5', name: 'Saia plissada pastel', price: 169, img: 'photo-1583496661160-fb5886a0aaaa', tag: null, category: 'vestidos' },
  { id: '6', name: 'Casaco oversized', price: 489, img: 'photo-1544022613-e87ca75a784a', tag: 'Novo', category: 'blazers' },
  { id: '7', name: 'Vestido longo linho', price: 299, img: 'photo-1595777457583-95e059d581b8', tag: null, category: 'vestidos' },
  { id: '8', name: 'Bolsa couro vintage', price: 379, img: 'photo-1584917865442-de89df76afd3', tag: 'Promo', category: 'acessorios' },
];

type Cat = 'todos' | 'vestidos' | 'blazers' | 'calcas' | 'acessorios';

interface CartItem {
  produto: Produto;
  qty: number;
  size: string;
}

const SIZES = ['PP', 'P', 'M', 'G', 'GG'];

export function LojaTemplate() {
  const [cat, setCat] = useState<Cat>('todos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addingProduct, setAddingProduct] = useState<Produto | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const filtered = cat === 'todos' ? PRODUTOS : PRODUTOS.filter((p) => p.category === cat);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.produto.price * i.qty, 0);
  const frete = subtotal > 0 && subtotal < 299 ? 25 : 0;
  const total = subtotal + frete;

  const openAdd = (p: Produto) => {
    setAddingProduct(p);
    setSelectedSize('M');
  };

  const confirmAdd = () => {
    if (!addingProduct) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.produto.id === addingProduct.id && i.size === selectedSize);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { produto: addingProduct, qty: 1, size: selectedSize }];
    });
    setAddingProduct(null);
    setCartOpen(true);
  };

  const updateQty = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.produto.id === id && i.size === size ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const toggleWish = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const CATEGORIAS: { k: Cat; label: string }[] = [
    { k: 'todos', label: 'Todos' },
    { k: 'vestidos', label: 'Vestidos' },
    { k: 'blazers', label: 'Blazers & Camisas' },
    { k: 'calcas', label: 'Calças' },
    { k: 'acessorios', label: 'Acessórios' },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <nav className="sticky top-10 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-3">
          <div className="font-black text-2xl italic tracking-tight">boutique.</div>
          <div className="hidden md:flex gap-6 text-xs text-neutral-600 uppercase tracking-widest">
            {CATEGORIAS.slice(1).map((c) => (
              <button key={c.k} onClick={() => setCat(c.k)} className="hover:text-neutral-900">
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1.5 text-sm text-neutral-700 hover:text-neutral-900">
              <Heart size={16} /> {wishlist.size}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-full hover:bg-neutral-700 flex items-center gap-2"
            >
              <ShoppingBag size={14} />
              Carrinho
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-rose-500 text-xs uppercase tracking-[0.3em] mb-6">Nova coleção · Primavera 26</p>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              Moda <span className="italic font-light">atemporal</span><br />para o seu dia a dia.
            </h1>
            <p className="text-neutral-600 text-lg mb-10 max-w-md">
              Peças cuidadosamente selecionadas de pequenos ateliês brasileiros. Frete grátis acima de R$ 299.
            </p>
            <div className="flex gap-4">
              <a href="#produtos" className="px-8 py-4 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-700">
                Ver coleção
              </a>
              <button
                onClick={() => setCart((prev) => prev.length === 0 ? [{ produto: PRODUTOS[0], qty: 1, size: 'M' }] : prev)}
                className="px-8 py-4 border border-neutral-300 font-bold rounded-full hover:bg-neutral-100"
              >
                Testar carrinho
              </button>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop"
              alt="Moda primavera"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Filtros + grid */}
      <section id="produtos" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-4xl font-black tracking-tight">Nossa seleção</h2>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map((c) => (
              <button
                key={c.k}
                onClick={() => setCat(c.k)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition ${
                  cat === c.k ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-neutral-500 mb-6">{filtered.length} produtos</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <article key={p.id} className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 mb-3">
                <img
                  src={`https://images.unsplash.com/${p.img}?w=600&auto=format&fit=crop`}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {p.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    p.tag === 'Promo' ? 'bg-rose-500 text-white' : 'bg-neutral-900 text-white'
                  }`}>
                    {p.tag}
                  </span>
                )}
                <button
                  onClick={() => toggleWish(p.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition ${
                    wishlist.has(p.id) ? 'bg-rose-500 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
                  }`}
                >
                  <Heart size={14} className={wishlist.has(p.id) ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={() => openAdd(p)}
                  className="absolute inset-x-3 bottom-3 py-2.5 bg-neutral-900 text-white text-xs font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2"
                >
                  <Plus size={12} /> Adicionar
                </button>
              </div>
              <h3 className="font-bold text-sm">{p.name}</h3>
              <p className="text-neutral-600 text-sm mt-1">R$ {p.price},00</p>
            </article>
          ))}
        </div>
      </section>

      {/* Faixa */}
      <section className="bg-neutral-50 py-16">
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

      <footer className="border-t border-neutral-200 py-8 text-center text-neutral-500 text-sm">
        © boutique. · <Link href="/encomendar/loja" className="font-bold text-neutral-900 hover:underline">Quero este site</Link>
      </footer>

      {/* Modal selecionar tamanho */}
      {addingProduct && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setAddingProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
          >
            <div className="aspect-square">
              <img src={`https://images.unsplash.com/${addingProduct.img}?w=800&auto=format&fit=crop`} alt={addingProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black mb-1">{addingProduct.name}</h3>
              <p className="text-rose-500 text-2xl font-black mb-6">R$ {addingProduct.price},00</p>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3 font-bold">Tamanho</p>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 rounded-full border font-bold text-sm ${
                        selectedSize === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={confirmAdd}
                className="w-full py-4 bg-neutral-900 hover:bg-neutral-700 text-white font-bold rounded-full"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carrinho lateral */}
      {cartOpen && (
        <div className="fixed inset-0 z-[200] flex" onClick={() => { setCartOpen(false); setCheckoutDone(false); }}>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" />
          <aside
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white h-full overflow-y-auto flex flex-col"
          >
            {checkoutDone ? (
              <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                  <Check size={36} className="text-emerald-500" />
                </div>
                <h2 className="text-3xl font-black mb-3">Pedido confirmado!</h2>
                <p className="text-neutral-600 mb-8">
                  Enviamos os detalhes pro seu e-mail. Previsão de entrega: 5-7 dias úteis.
                </p>
                <p className="text-xs text-neutral-500 mb-8">Nº do pedido · #BQT{Math.floor(Math.random() * 100000)}</p>
                <button
                  onClick={() => { setCartOpen(false); setCheckoutDone(false); setCart([]); }}
                  className="w-full py-4 bg-neutral-900 hover:bg-neutral-700 text-white font-bold rounded-full"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 sticky top-0 bg-white z-10">
                  <h2 className="text-xl font-black">Seu carrinho</h2>
                  <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center">
                    <X size={18} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
                    <ShoppingBag size={48} className="text-neutral-300 mb-4" />
                    <p className="text-neutral-500 mb-6">Seu carrinho está vazio.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="text-sm font-bold text-neutral-900 border-b-2 border-neutral-900"
                    >
                      Explorar coleção →
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 px-6 py-4 space-y-4">
                      {cart.map((item) => (
                        <div key={`${item.produto.id}-${item.size}`} className="flex gap-4">
                          <img
                            src={`https://images.unsplash.com/${item.produto.img}?w=300&auto=format&fit=crop`}
                            alt={item.produto.name}
                            className="w-20 h-24 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{item.produto.name}</h3>
                            <p className="text-xs text-neutral-500 mt-1">Tam. {item.size}</p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 border border-neutral-200 rounded-full">
                                <button
                                  onClick={() => updateQty(item.produto.id, item.size, -1)}
                                  className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bold text-sm w-5 text-center">{item.qty}</span>
                                <button
                                  onClick={() => updateQty(item.produto.id, item.size, 1)}
                                  className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="font-black text-sm">R$ {(item.produto.price * item.qty).toLocaleString('pt-BR')},00</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Resumo + checkout */}
                    <div className="border-t border-neutral-200 px-6 py-5 bg-neutral-50 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="font-bold">R$ {subtotal.toLocaleString('pt-BR')},00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Frete</span>
                        <span className="font-bold">{frete === 0 ? <span className="text-emerald-600">Grátis</span> : `R$ ${frete},00`}</span>
                      </div>
                      {subtotal < 299 && subtotal > 0 && (
                        <p className="text-xs text-rose-500">
                          Faltam R$ {(299 - subtotal).toLocaleString('pt-BR')},00 pra ganhar frete grátis.
                        </p>
                      )}
                      <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                        <span className="font-black text-sm uppercase tracking-widest">Total</span>
                        <span className="text-2xl font-black">R$ {total.toLocaleString('pt-BR')},00</span>
                      </div>
                      <button
                        onClick={() => setCheckoutDone(true)}
                        className="w-full py-4 bg-neutral-900 hover:bg-neutral-700 text-white font-bold rounded-full mt-2"
                      >
                        Finalizar compra
                      </button>
                      <p className="text-[10px] text-center text-neutral-400">
                        Em até 6x sem juros no cartão
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
