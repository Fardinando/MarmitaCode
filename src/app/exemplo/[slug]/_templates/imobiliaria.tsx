import Link from 'next/link';
import { Bed, Bath, Maximize2, MapPin, Search } from 'lucide-react';

const IMOVEIS = [
  {
    title: 'Apartamento Jardins',
    neighborhood: 'Jardins · SP',
    price: 'R$ 1.2M',
    bedrooms: 3,
    bathrooms: 2,
    size: '110m²',
    img: 'photo-1522708323590-d24dbb6b0267',
    tag: 'Novo',
  },
  {
    title: 'Casa Alto de Pinheiros',
    neighborhood: 'Alto de Pinheiros · SP',
    price: 'R$ 2.8M',
    bedrooms: 4,
    bathrooms: 3,
    size: '220m²',
    img: 'photo-1564013799919-ab600027ffc6',
    tag: null,
  },
  {
    title: 'Loft Vila Madalena',
    neighborhood: 'Vila Madalena · SP',
    price: 'R$ 850k',
    bedrooms: 2,
    bathrooms: 1,
    size: '75m²',
    img: 'photo-1502672260266-1c1ef2d93688',
    tag: 'Oportunidade',
  },
  {
    title: 'Cobertura Moema',
    neighborhood: 'Moema · SP',
    price: 'R$ 3.5M',
    bedrooms: 4,
    bathrooms: 4,
    size: '280m²',
    img: 'photo-1600596542815-ffad4c1539a9',
    tag: 'Destaque',
  },
  {
    title: 'Studio Pinheiros',
    neighborhood: 'Pinheiros · SP',
    price: 'R$ 580k',
    bedrooms: 1,
    bathrooms: 1,
    size: '42m²',
    img: 'photo-1560448204-e02f11c3d0e2',
    tag: null,
  },
  {
    title: 'Casa Alphaville',
    neighborhood: 'Alphaville · SP',
    price: 'R$ 4.2M',
    bedrooms: 5,
    bathrooms: 5,
    size: '450m²',
    img: 'photo-1512917774080-9991f1c4c750',
    tag: null,
  },
];

export function ImobiliariaTemplate() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-stone-50/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">
            Horizonte<span className="text-amber-600">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-stone-600">
            <a href="#imoveis" className="hover:text-stone-900">Imóveis</a>
            <a className="hover:text-stone-900">Para alugar</a>
            <a className="hover:text-stone-900">Vender</a>
            <a className="hover:text-stone-900">Sobre</a>
          </div>
          <a className="text-sm font-bold border-b-2 border-stone-900 pb-0.5">
            Agendar visita
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-700 text-xs uppercase tracking-[0.3em] font-bold mb-6">Horizonte Imóveis · Desde 1998</p>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              Encontre o <span className="italic font-light">lar</span><br />que você sempre quis.
            </h1>
            <p className="text-stone-600 text-lg mb-10 max-w-md">
              Mais de 2.000 imóveis selecionados em São Paulo. Curadoria humana,
              atendimento sem pressa, sua decisão.
            </p>

            {/* Search card */}
            <div className="p-6 bg-white rounded-2xl shadow-xl border border-stone-100">
              <div className="flex gap-2 mb-4 text-xs font-bold uppercase tracking-widest">
                <button className="px-4 py-2 bg-stone-900 text-white rounded-full">Comprar</button>
                <button className="px-4 py-2 text-stone-500">Alugar</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select className="px-4 py-3 border border-stone-200 rounded-xl text-sm bg-white">
                  <option>Qualquer bairro</option>
                </select>
                <select className="px-4 py-3 border border-stone-200 rounded-xl text-sm bg-white">
                  <option>Qualquer tipo</option>
                </select>
                <select className="px-4 py-3 border border-stone-200 rounded-xl text-sm bg-white">
                  <option>Faixa de preço</option>
                </select>
                <select className="px-4 py-3 border border-stone-200 rounded-xl text-sm bg-white">
                  <option>Qtd. quartos</option>
                </select>
              </div>
              <button className="w-full mt-4 py-4 bg-stone-900 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                <Search size={16} /> Buscar imóveis
              </button>
            </div>
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

      {/* Grid de imóveis */}
      <section id="imoveis" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber-700 text-sm uppercase tracking-widest font-bold mb-2">Destaques</p>
            <h2 className="text-4xl font-black tracking-tight">Imóveis em destaque</h2>
          </div>
          <a className="text-sm font-bold border-b-2 border-stone-900 pb-0.5">
            Ver todos ({IMOVEIS.length * 25}+)
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMOVEIS.map((im) => (
            <article key={im.title} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <img
                  src={`https://images.unsplash.com/${im.img}?w=800&auto=format&fit=crop`}
                  alt={im.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {im.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest">
                    {im.tag}
                  </span>
                )}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center text-stone-700">
                  ♡
                </div>
              </div>
              <h3 className="font-black text-lg">{im.title}</h3>
              <p className="text-stone-500 text-sm flex items-center gap-1 mt-1">
                <MapPin size={12} /> {im.neighborhood}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-stone-600">
                <span className="flex items-center gap-1"><Bed size={14} /> {im.bedrooms}</span>
                <span className="flex items-center gap-1"><Bath size={14} /> {im.bathrooms}</span>
                <span className="flex items-center gap-1"><Maximize2 size={14} /> {im.size}</span>
              </div>
              <div className="mt-3 font-black text-xl text-amber-700">{im.price}</div>
            </article>
          ))}
        </div>
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
