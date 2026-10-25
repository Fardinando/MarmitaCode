'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Check, Heart, Scissors, Stethoscope, Award, Clock, MapPin, Phone, ChevronRight, Dog } from 'lucide-react';

const SERVICOS = [
  { id: 'banho', nome: 'Banho', desc: 'Shampoo, condicionador, secagem e perfume.', durations: { P: 60, M: 75, G: 90 }, prices: { P: 45, M: 65, G: 85 }, icon: '🛁' },
  { id: 'tosa', nome: 'Tosa higiênica', desc: 'Patinhas, barriga, íntimas e olhos.', durations: { P: 45, M: 60, G: 75 }, prices: { P: 55, M: 75, G: 95 }, icon: '✂️' },
  { id: 'completo', nome: 'Banho + Tosa completa', desc: 'Pacote completo com corte estilizado.', durations: { P: 120, M: 150, G: 180 }, prices: { P: 110, M: 140, G: 180 }, icon: '✨' },
  { id: 'veterinario', nome: 'Consulta veterinária', desc: 'Check-up completo com vet.', durations: { P: 40, M: 40, G: 40 }, prices: { P: 150, M: 150, G: 150 }, icon: '🩺' },
  { id: 'vacina', nome: 'Vacinação', desc: 'V8/V10, antirrábica, giárdia.', durations: { P: 20, M: 20, G: 20 }, prices: { P: 90, M: 90, G: 90 }, icon: '💉' },
  { id: 'hospedagem', nome: 'Hospedagem/Day care', desc: 'Diária com passeios inclusos.', durations: { P: 1440, M: 1440, G: 1440 }, prices: { P: 95, M: 115, G: 135 }, icon: '🏠' },
];

const PRODUTOS = [
  { id: 'p1', nome: 'Ração Premium Golden 15kg', cat: 'racao', price: 189, img: 'photo-1583337130417-3346a1be7dee', badge: 'Mais vendido' },
  { id: 'p2', nome: 'Shampoo neutro 500ml', cat: 'higiene', price: 32, img: 'photo-1548199973-03cce0bbc87b', badge: null },
  { id: 'p3', nome: 'Brinquedo mordedor', cat: 'brinquedo', price: 28, img: 'photo-1535268647677-300dbf3d78d1', badge: 'Promo' },
  { id: 'p4', nome: 'Coleira ajustável', cat: 'acessorio', price: 45, img: 'photo-1601758228041-f3b2795255f1', badge: null },
  { id: 'p5', nome: 'Ração úmida sachê 85g', cat: 'racao', price: 8, img: 'photo-1596492784531-6e6eb5ea9993', badge: null },
  { id: 'p6', nome: 'Caminha ortopédica M', cat: 'acessorio', price: 189, img: 'photo-1583337130417-3346a1be7dee', badge: 'Novo' },
];

type Size = 'P' | 'M' | 'G';

export function PetshopTemplate() {
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [servicoSel, setServicoSel] = useState<string | null>(null);
  const [porte, setPorte] = useState<Size>('M');
  const [petNome, setPetNome] = useState('');
  const [tutor, setTutor] = useState('');
  const [tel, setTel] = useState('');
  const [bookDone, setBookDone] = useState(false);

  const cartTotal = cart.reduce((s, i) => {
    const p = PRODUTOS.find((x) => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addProduct = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
  };

  const openService = (id?: string) => {
    setServicoSel(id ?? null);
    setBookDone(false);
    setPetNome(''); setTutor(''); setTel('');
    setServiceOpen(true);
  };

  const servicoObj = SERVICOS.find((s) => s.id === servicoSel);

  return (
    <main className="min-h-screen bg-amber-50 text-amber-950">
      <nav className="sticky top-10 z-40 bg-amber-50/95 backdrop-blur border-b-2 border-amber-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl">🐾</div>
            <span className="font-black text-xl italic">AuAu<span className="text-orange-500">+</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-amber-900/70 font-bold">
            <a href="#servicos" className="hover:text-orange-500">Serviços</a>
            <a href="#loja" className="hover:text-orange-500">Loja</a>
            <a href="#contato" className="hover:text-orange-500">Contato</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => openService()} className="px-4 py-2 bg-orange-500 text-white text-xs font-black uppercase rounded-full hover:bg-orange-600 flex items-center gap-1">
              <Scissors size={12} /> Agendar
            </button>
            <button className="relative p-2.5 bg-amber-950 text-amber-50 rounded-full">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest rounded-full mb-6">
              🐕 25 anos cuidando dos seus melhores amigos
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic leading-[0.95] tracking-tight mb-6">
              Pet shop com <span className="text-orange-500">amor</span> no detalhe.
            </h1>
            <p className="text-amber-900/70 text-lg mb-10 max-w-md">
              Banho e tosa, consulta veterinária, loja completa e hospedagem — tudo em um lugar só, com profissionais que amam o que fazem.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => openService()} className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center gap-2">
                <Scissors size={14} /> Agendar banho/tosa
              </button>
              <a href="#loja" className="px-8 py-4 bg-amber-950 text-amber-50 font-black uppercase tracking-widest text-xs rounded-full">
                Ver loja
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop" alt="Cachorro" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl p-5 shadow-xl -rotate-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🐾</div>
                <div>
                  <div className="font-black">+8.000</div>
                  <div className="text-xs text-amber-900/60">pets atendidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-orange-500 text-xs uppercase tracking-[0.4em] font-black mb-4">Nossos serviços</p>
        <h2 className="text-5xl font-black italic tracking-tight mb-12">Cuidado completo</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICOS.map((s) => (
            <button key={s.id} onClick={() => openService(s.id)}
              className="group text-left p-7 bg-white rounded-3xl border-2 border-amber-100 hover:border-orange-300 hover:shadow-lg transition">
              <div className="text-4xl mb-5">{s.icon}</div>
              <h3 className="text-xl font-black mb-2">{s.nome}</h3>
              <p className="text-amber-900/60 text-sm leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-amber-100 text-xs">
                <span className="text-amber-900/50">
                  P/M/G · R$ {s.prices.P}-{s.prices.G}
                </span>
                <span className="text-orange-500 font-black group-hover:translate-x-1 transition">
                  Agendar →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Loja */}
      <section id="loja" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-orange-500 text-xs uppercase tracking-[0.4em] font-black mb-3">Loja online</p>
              <h2 className="text-5xl font-black italic tracking-tight">Mais vendidos</h2>
            </div>
            <a className="text-sm font-black uppercase tracking-widest text-orange-500 border-b-2 border-orange-500">
              Ver tudo →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {PRODUTOS.map((p) => (
              <article key={p.id} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-amber-100 mb-3">
                  <img src={`https://images.unsplash.com/${p.img}?w=500&auto=format&fit=crop`} alt={p.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      p.badge === 'Promo' ? 'bg-rose-500 text-white' :
                      p.badge === 'Mais vendido' ? 'bg-amber-500 text-white' :
                      'bg-amber-950 text-white'
                    }`}>{p.badge}</span>
                  )}
                  <button onClick={() => addProduct(p.id)}
                    className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg">
                    <Plus size={18} />
                  </button>
                </div>
                <h3 className="font-black text-sm">{p.nome}</h3>
                <p className="text-orange-500 font-black mt-1">R$ {p.price},00</p>
              </article>
            ))}
          </div>

          {/* Mini carrinho resumo */}
          {cartCount > 0 && (
            <div className="mt-8 p-5 bg-amber-50 border-2 border-amber-200 rounded-3xl flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-amber-900/60">
                  No carrinho
                </div>
                <div className="font-black text-xl mt-1">
                  {cartCount} ite{cartCount > 1 ? 'ns' : 'm'} · R$ {cartTotal.toLocaleString('pt-BR')},00
                </div>
              </div>
              <button className="px-6 py-3 bg-amber-950 text-amber-50 font-black uppercase tracking-widest text-xs rounded-full">
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-gradient-to-br from-orange-500 to-amber-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            [<Scissors key="s" size={28} />, 'Profissionais formados', 'Equipe treinada em grooming internacional.'],
            [<Stethoscope key="v" size={28} />, 'Vet 24h de plantão', 'Emergências cobertas pelo nosso veterinário parceiro.'],
            [<Award key="a" size={28} />, 'Produtos premium', 'Rações, acessórios e brinquedos das melhores marcas.'],
          ].map(([icon, t, d]) => (
            <div key={t as string}>
              <div className="text-amber-100 mb-5">{icon}</div>
              <h3 className="text-2xl font-black mb-3">{t}</h3>
              <p className="text-amber-50/80 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-black italic tracking-tight mb-8">Visite-nos</h2>
          <div className="space-y-5">
            <Info icon={<MapPin size={18} />} title="Endereço">
              Rua dos Pets, 100 · Vila Mariana · SP<br />
              <span className="text-amber-900/50 text-xs">Com estacionamento próprio</span>
            </Info>
            <Info icon={<Clock size={18} />} title="Horário">
              Segunda a sábado · 8h — 20h<br />
              Domingo · 9h — 14h
            </Info>
            <Info icon={<Phone size={18} />} title="Contato">
              (11) 4000-5000 · WhatsApp
            </Info>
          </div>
        </div>
        <div className="aspect-square rounded-[3rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1558929996-da64ba858215?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      <footer className="border-t-2 border-amber-200 py-8 text-center text-amber-900/50 text-xs">
        © AuAu+ · <Link href="/encomendar/petshop" className="text-orange-500 font-black hover:underline">Quero este site</Link>
      </footer>

      {/* Modal serviço */}
      {serviceOpen && (
        <div className="fixed inset-0 z-[200] bg-amber-950/70 backdrop-blur flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={() => setServiceOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl max-w-md w-full p-8 my-8 relative">
            <button onClick={() => setServiceOpen(false)} className="absolute top-4 right-4 text-amber-900/40 hover:text-amber-900 text-2xl leading-none">×</button>

            {bookDone ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-6">🐾</div>
                <h3 className="text-2xl font-black italic mb-3">Agendamento recebido!</h3>
                <p className="text-amber-900/60 text-sm mb-6">
                  Confirmaremos pelo WhatsApp em até 1h. Até logo, {petNome || 'amiguinho'}! 🐕
                </p>
                <button onClick={() => setServiceOpen(false)} className="w-full py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-full">
                  Fechar
                </button>
              </div>
            ) : !servicoSel ? (
              <div>
                <h3 className="text-2xl font-black italic mb-6">Qual serviço?</h3>
                <div className="space-y-2">
                  {SERVICOS.map((s) => (
                    <button key={s.id} onClick={() => setServicoSel(s.id)}
                      className="w-full p-4 border-2 border-amber-100 hover:border-orange-300 rounded-xl text-left flex items-center gap-3">
                      <div className="text-2xl">{s.icon}</div>
                      <div className="flex-1">
                        <div className="font-black text-sm">{s.nome}</div>
                        <div className="text-xs text-amber-900/50">R$ {s.prices.P}-{s.prices.G}</div>
                      </div>
                      <ChevronRight size={16} className="text-orange-500" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBookDone(true); }}>
                <div className="text-3xl mb-3">{servicoObj?.icon}</div>
                <h3 className="text-2xl font-black italic mb-6">{servicoObj?.nome}</h3>

                <label className="block mb-4">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2">Porte do pet</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['P', 'M', 'G'] as Size[]).map((p) => (
                      <button type="button" key={p} onClick={() => setPorte(p)}
                        className={`p-4 rounded-xl border-2 text-center ${porte === p ? 'border-orange-500 bg-orange-50' : 'border-amber-100'}`}>
                        <div className="font-black text-lg">{p}</div>
                        <div className="text-[10px] text-amber-900/60 mt-1">
                          {p === 'P' ? '< 10kg' : p === 'M' ? '10-25kg' : '> 25kg'}
                        </div>
                        <div className="text-sm font-black text-orange-500 mt-2">
                          R$ {servicoObj?.prices[p]}
                        </div>
                      </button>
                    ))}
                  </div>
                </label>

                <Field label="Nome do pet" value={petNome} onChange={setPetNome} placeholder="Ex: Thor" />
                <Field label="Seu nome" value={tutor} onChange={setTutor} />
                <Field label="WhatsApp" value={tel} onChange={setTel} placeholder="(11) 99999-9999" />

                <div className="p-4 bg-amber-50 rounded-xl mb-6 text-sm space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span className="text-amber-900/60">Serviço</span>
                    <b>{servicoObj?.nome}</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-900/60">Duração</span>
                    <b>{servicoObj?.durations[porte]}min</b>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-amber-200">
                    <span className="text-amber-900/60">Total</span>
                    <b className="text-orange-500 text-xl">R$ {servicoObj?.prices[porte]}</b>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2">
                  Agendar <Check size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-orange-500 mb-1">{title}</h4>
        <p className="text-amber-900 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2">{label}</span>
      <input required value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-amber-100 rounded-xl text-sm outline-none focus:border-orange-500" />
    </label>
  );
}
