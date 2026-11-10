'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MarmitaCodeCredit } from './_shared/MarmitaCodeCredit';
import { Bed, Bath, Maximize2, MapPin, Search, Heart, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface Imovel {
  id: string;
  title: string;
  neighborhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  img: string;
  tag: string | null;
  tipo: 'apartamento' | 'casa' | 'studio' | 'cobertura';
}

const ACCENT = '#0EA5E9';

const IMOVEIS: Imovel[] = [
  { id: '1', title: 'Apartamento Jardins', neighborhood: 'Jardins', price: 1200000, bedrooms: 3, bathrooms: 2, size: 110, img: 'photo-1522708323590-d24dbb6b0267', tag: 'Novo', tipo: 'apartamento' },
  { id: '2', title: 'Casa Alto de Pinheiros', neighborhood: 'Alto de Pinheiros', price: 2800000, bedrooms: 4, bathrooms: 3, size: 220, img: 'photo-1564013799919-ab600027ffc6', tag: null, tipo: 'casa' },
  { id: '3', title: 'Loft Vila Madalena', neighborhood: 'Vila Madalena', price: 850000, bedrooms: 2, bathrooms: 1, size: 75, img: 'photo-1502672260266-1c1ef2d93688', tag: 'Oportunidade', tipo: 'apartamento' },
  { id: '4', title: 'Cobertura Moema', neighborhood: 'Moema', price: 3500000, bedrooms: 4, bathrooms: 4, size: 280, img: 'photo-1600596542815-ffad4c1539a9', tag: 'Destaque', tipo: 'cobertura' },
  { id: '5', title: 'Studio Pinheiros', neighborhood: 'Pinheiros', price: 580000, bedrooms: 1, bathrooms: 1, size: 42, img: 'photo-1560448204-e02f11c3d0e2', tag: null, tipo: 'studio' },
  { id: '6', title: 'Casa Alphaville', neighborhood: 'Alphaville', price: 4200000, bedrooms: 5, bathrooms: 5, size: 450, img: 'photo-1512917774080-9991f1c4c750', tag: null, tipo: 'casa' },
  { id: '7', title: 'Apartamento Vila Olímpia', neighborhood: 'Vila Olímpia', price: 1650000, bedrooms: 3, bathrooms: 2, size: 125, img: 'photo-1600585154340-be6161a56a0c', tag: null, tipo: 'apartamento' },
  { id: '8', title: 'Studio Vila Madalena', neighborhood: 'Vila Madalena', price: 490000, bedrooms: 1, bathrooms: 1, size: 38, img: 'photo-1522708323590-d24dbb6b0267', tag: 'Promo', tipo: 'studio' },
  { id: '9', title: 'Cobertura Itaim', neighborhood: 'Itaim Bibi', price: 5200000, bedrooms: 5, bathrooms: 5, size: 380, img: 'photo-1600596542815-ffad4c1539a9', tag: 'Luxo', tipo: 'cobertura' },
];

const NEIGHBORHOODS = ['Todos', ...Array.from(new Set(IMOVEIS.map((i) => i.neighborhood))).sort()];
const TIPOS = ['Todos', 'apartamento', 'casa', 'studio', 'cobertura'];
const PRICES = [
  { label: 'Qualquer preço', min: 0, max: Infinity },
  { label: 'Até R$ 600k', min: 0, max: 600_000 },
  { label: 'R$ 600k — R$ 1.5M', min: 600_000, max: 1_500_000 },
  { label: 'R$ 1.5M — R$ 3M', min: 1_500_000, max: 3_000_000 },
  { label: 'Acima de R$ 3M', min: 3_000_000, max: Infinity },
];
const QUARTOS = [0, 1, 2, 3, 4];

function formatPrice(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(1).replace('.', ',')}M`;
  if (n >= 1_000) return `R$ ${(n / 1_000).toFixed(0)}k`;
  return `R$ ${n}`;
}

export function ImobiliariaTemplate() {
  const [tipo, setTipo] = useState('Todos');
  const [bairro, setBairro] = useState('Todos');
  const [priceIdx, setPriceIdx] = useState(0);
  const [minQuartos, setMinQuartos] = useState(0);
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const resultados = useMemo(() => {
    const price = PRICES[priceIdx];
    return IMOVEIS.filter((im) => {
      if (tipo !== 'Todos' && im.tipo !== tipo) return false;
      if (bairro !== 'Todos' && im.neighborhood !== bairro) return false;
      if (im.price < price.min || im.price > price.max) return false;
      if (im.bedrooms < minQuartos) return false;
      return true;
    });
  }, [tipo, bairro, priceIdx, minQuartos]);

  const toggleFav = (id: string) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setTipo('Todos');
    setBairro('Todos');
    setPriceIdx(0);
    setMinQuartos(0);
  };

  const hasFilters = tipo !== 'Todos' || bairro !== 'Todos' || priceIdx !== 0 || minQuartos !== 0;

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0EA5E9]/20 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-10 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">
            Horizonte<span className="text-[#0EA5E9]">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
            <a href="#imoveis" className="hover:text-white">Imóveis</a>
            <a className="hover:text-white">Alugar</a>
            <a className="hover:text-white">Vender</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-xs text-white/60 font-black">
              <Heart size={14} className={favoritos.size > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {favoritos.size}
            </button>
            <a className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-[#0EA5E9] text-white rounded-full">
              Agendar visita
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0EA5E9]">Horizonte · Desde 1998</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter mb-6">
              Encontre o <span className="bg-gradient-to-r from-[#0EA5E9] to-indigo-400 bg-clip-text text-transparent">lar</span> que você sempre quis.
            </h1>
            <p className="text-white/50 text-lg font-bold mb-8 max-w-md">
              Mais de 2.000 imóveis em São Paulo. Teste nossa busca com filtros em tempo real.
            </p>
            <a href="#imoveis" className="group inline-flex items-center gap-2 px-7 py-4 bg-[#0EA5E9] text-white font-black uppercase tracking-widest text-xs rounded-full hover:gap-3 transition-all shadow-[0_0_40px_rgba(14,165,233,0.4)]">
              <Search size={14} /> Começar busca <ArrowRight size={14} />
            </a>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(14,165,233,0.3)] border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop"
              alt="Casa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* BUSCA */}
      <section id="imoveis" className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Catálogo</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Imóveis <span className="text-[#0EA5E9]">à venda.</span>
            </h2>
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <SlidersHorizontal size={14} /> Filtros
          </button>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-6`}>
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
            <div className="grid md:grid-cols-4 gap-4">
              <SelectField label="Tipo" value={tipo} onChange={setTipo} options={TIPOS.map((t) => ({ v: t, l: t === 'Todos' ? 'Todos os tipos' : t.charAt(0).toUpperCase() + t.slice(1) }))} />
              <SelectField label="Bairro" value={bairro} onChange={setBairro} options={NEIGHBORHOODS.map((n) => ({ v: n, l: n }))} />
              <SelectField
                label="Faixa de preço"
                value={String(priceIdx)}
                onChange={(v) => setPriceIdx(Number(v))}
                options={PRICES.map((p, i) => ({ v: String(i), l: p.label }))}
              />
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 font-black mb-2">Mín. quartos</label>
                <div className="flex gap-1">
                  {QUARTOS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setMinQuartos(q)}
                      className={`flex-1 py-2.5 text-sm font-black rounded-lg border transition ${
                        minQuartos === q ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]' : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                      }`}
                    >
                      {q === 0 ? '—' : q === 4 ? '4+' : q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-xs text-[#0EA5E9] font-black hover:underline"
              >
                × Limpar filtros
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60 text-sm font-medium">
            <b className="text-white text-lg">{resultados.length}</b> imóve{resultados.length === 1 ? 'l' : 'is'} encontrado{resultados.length === 1 ? '' : 's'}
          </p>
          {hasFilters && (
            <div className="flex gap-2 text-xs flex-wrap">
              {tipo !== 'Todos' && <Pill onRemove={() => setTipo('Todos')}>{tipo}</Pill>}
              {bairro !== 'Todos' && <Pill onRemove={() => setBairro('Todos')}>{bairro}</Pill>}
              {priceIdx !== 0 && <Pill onRemove={() => setPriceIdx(0)}>{PRICES[priceIdx].label}</Pill>}
              {minQuartos !== 0 && <Pill onRemove={() => setMinQuartos(0)}>{minQuartos}+ quartos</Pill>}
            </div>
          )}
        </div>

        {resultados.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/50 mb-4 font-bold">Nenhum imóvel encontrado com estes filtros.</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-[#0EA5E9] text-white rounded-full font-black uppercase tracking-widest text-xs">
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((im) => (
              <article key={im.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/10">
                  <img src={`https://images.unsplash.com/${im.img}?w=800&auto=format&fit=crop`} alt={im.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {im.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0EA5E9] text-white text-[10px] font-black uppercase tracking-widest">
                      {im.tag}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFav(im.id)}
                    className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white/70 hover:text-rose-500"
                  >
                    <Heart size={14} className={favoritos.has(im.id) ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>
                </div>
                <h3 className="font-black text-lg">{im.title}</h3>
                <p className="text-white/50 text-sm flex items-center gap-1 mt-1 font-medium">
                  <MapPin size={12} /> {im.neighborhood} · SP
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-white/60 font-medium">
                  <span className="flex items-center gap-1"><Bed size={14} /> {im.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath size={14} /> {im.bathrooms}</span>
                  <span className="flex items-center gap-1"><Maximize2 size={14} /> {im.size}m²</span>
                </div>
                <div className="mt-3 font-black text-xl italic text-[#0EA5E9]">{formatPrice(im.price)}</div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-24 mt-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Quer <span className="text-[#0EA5E9]">vender</span> seu imóvel?
          </h2>
          <p className="text-white/50 font-bold mb-10 text-lg">
            Avaliação gratuita, fotos profissionais e divulgação em todos os portais.
          </p>
          <a className="group inline-flex items-center gap-2 px-10 py-5 bg-[#0EA5E9] text-white font-black uppercase tracking-widest text-xs rounded-full hover:gap-3 transition-all shadow-[0_0_60px_rgba(14,165,233,0.5)]">
            Falar com um consultor <ArrowRight size={14} />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-white/40 text-xs font-black uppercase tracking-widest relative z-10">
        © Horizonte Imóveis · <Link href="/encomendar/imobiliaria" className="text-[#0EA5E9] hover:underline">Quero este site</Link>
        <MarmitaCodeCredit />
      </footer>
    </main>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-white/50 font-black mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-white/10 rounded-xl text-sm bg-white/5 text-white focus:border-[#0EA5E9] outline-none"
      >
        {options.map((o) => <option key={o.v} value={o.v} className="bg-[#0A0A0F]">{o.l}</option>)}
      </select>
    </label>
  );
}

function Pill({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-full font-black">
      {children}
      <button onClick={onRemove} className="hover:text-white">×</button>
    </span>
  );
}
