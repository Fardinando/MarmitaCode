'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Bed, Bath, Maximize2, MapPin, Search, Heart, SlidersHorizontal } from 'lucide-react';

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
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="sticky top-10 z-40 bg-stone-50/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">
            Horizonte<span className="text-amber-600">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-stone-600">
            <a href="#imoveis" className="hover:text-stone-900">Imóveis</a>
            <a className="hover:text-stone-900">Para alugar</a>
            <a className="hover:text-stone-900">Vender</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-sm text-stone-600">
              <Heart size={14} className={favoritos.size > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {favoritos.size}
            </button>
            <a className="text-sm font-bold border-b-2 border-stone-900 pb-0.5">
              Agendar visita
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-700 text-xs uppercase tracking-[0.3em] font-bold mb-6">Horizonte Imóveis · Desde 1998</p>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              Encontre o <span className="italic font-light">lar</span><br />que você sempre quis.
            </h1>
            <p className="text-stone-600 text-lg mb-6 max-w-md">
              Mais de 2.000 imóveis em São Paulo. Teste nossa busca com filtros em tempo real.
            </p>

            <a href="#imoveis" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-bold rounded-full">
              <Search size={14} /> Começar busca
            </a>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop"
              alt="Casa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* BUSCA COM FILTROS DINÂMICOS */}
      <section id="imoveis" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <p className="text-amber-700 text-sm uppercase tracking-widest font-bold mb-2">Catálogo</p>
            <h2 className="text-4xl font-black tracking-tight">Imóveis à venda</h2>
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-bold"
          >
            <SlidersHorizontal size={14} /> Filtros
          </button>
        </div>

        {/* Filtros */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-6`}>
          <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm">
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
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Mín. quartos</label>
                <div className="flex gap-1">
                  {QUARTOS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setMinQuartos(q)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg border transition ${
                        minQuartos === q ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-400'
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
                className="mt-4 text-xs text-amber-700 font-bold hover:underline"
              >
                × Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-stone-600 text-sm">
            <b className="text-stone-900 text-lg">{resultados.length}</b> imóve{resultados.length === 1 ? 'l' : 'is'} encontrado{resultados.length === 1 ? '' : 's'}
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

        {/* Grid */}
        {resultados.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-stone-500 mb-4">Nenhum imóvel encontrado com estes filtros.</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-sm">
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((im) => (
              <article key={im.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <img src={`https://images.unsplash.com/${im.img}?w=800&auto=format&fit=crop`} alt={im.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {im.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest">
                      {im.tag}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFav(im.id)}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center text-stone-700 hover:text-rose-500"
                  >
                    <Heart size={14} className={favoritos.has(im.id) ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>
                </div>
                <h3 className="font-black text-lg">{im.title}</h3>
                <p className="text-stone-500 text-sm flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {im.neighborhood} · SP
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-stone-600">
                  <span className="flex items-center gap-1"><Bed size={14} /> {im.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath size={14} /> {im.bathrooms}</span>
                  <span className="flex items-center gap-1"><Maximize2 size={14} /> {im.size}m²</span>
                </div>
                <div className="mt-3 font-black text-xl text-amber-700">{formatPrice(im.price)}</div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-white py-24 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6 tracking-tight">
            Quer <span className="italic font-light">vender</span> seu imóvel?
          </h2>
          <p className="text-stone-300 mb-10 text-lg">
            Avaliação gratuita, fotos profissionais e divulgação em todos os portais.
          </p>
          <a className="inline-block px-10 py-5 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-500">
            Falar com um consultor
          </a>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
        © Horizonte Imóveis · <Link href="/encomendar/imobiliaria" className="text-amber-700 font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm bg-white focus:border-amber-600 outline-none"
      >
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </label>
  );
}

function Pill({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold">
      {children}
      <button onClick={onRemove} className="hover:text-amber-700">×</button>
    </span>
  );
}
