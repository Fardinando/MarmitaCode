import Link from 'next/link';
import { Scissors, Clock, MapPin } from 'lucide-react';

const SERVICOS = [
  { name: 'Corte clássico', price: 'R$ 45', time: '30 min' },
  { name: 'Barba quente c/ toalha', price: 'R$ 60', time: '45 min' },
  { name: 'Combo cavalheiro', price: 'R$ 95', time: '1h 15' },
  { name: 'Barboterapia completa', price: 'R$ 80', time: '1h' },
];

const BARBEIROS = [
  { name: 'Zé Pedro', years: '22 anos', img: 'photo-1507680434567-5739c80be1ac' },
  { name: 'Antônio', years: '18 anos', img: 'photo-1570295999919-56ceb5ecca61' },
  { name: 'Marcos', years: '14 anos', img: 'photo-1500648767791-00dcc994a43e' },
];

export function Barbearia2Template() {
  return (
    <main className="min-h-screen bg-[#f4ead5] text-[#2b1810]">
      <nav className="sticky top-10 z-40 bg-[#f4ead5]/95 backdrop-blur border-b border-[#2b1810]/15">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scissors size={22} className="text-[#8b4513]" />
            <div>
              <div className="font-black text-base leading-none tracking-wider">BARBEARIA DO SEU HENRIQUE</div>
              <div className="text-[9px] text-[#8b4513] tracking-[0.3em] mt-1">EST. 1958</div>
            </div>
          </div>
          <a className="px-6 py-3 bg-[#2b1810] text-[#f4ead5] text-[11px] font-black uppercase tracking-widest rounded-full">
            Agendar
          </a>
        </div>
      </nav>

      {/* Hero vintage */}
      <section className="relative overflow-hidden border-b border-[#2b1810]/10">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-[#8b4513] flex-1 max-w-[80px]" />
              <span className="text-[10px] font-black tracking-[0.4em] text-[#8b4513] uppercase">Desde 1958</span>
              <div className="h-px bg-[#8b4513] flex-1 max-w-[80px]" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              A barbearia que seu <span className="italic">avô</span> frequentou.
            </h1>
            <p className="text-[#2b1810]/70 text-lg mb-10 max-w-md leading-relaxed">
              Mais de 60 anos cortando cabelo e aparando barba no mesmo lugar. Cadeira de barbeiro de ferro, navalha de verdade, café coado na hora.
            </p>
            <a href="#agendar" className="inline-block px-8 py-4 bg-[#2b1810] text-[#f4ead5] rounded-sm text-xs font-black uppercase tracking-widest">
              Reservar cadeira
            </a>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden border-8 border-[#2b1810] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521490878406-df8de974c384?w=800&auto=format&fit=crop"
                alt="Barbearia tradicional"
                className="w-full h-full object-cover sepia-[0.3]"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-[#8b4513] text-[#f4ead5] p-4 shadow-xl -rotate-3">
              <div className="text-[9px] uppercase tracking-widest">Tradição</div>
              <div className="text-xl font-black">66 anos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-[#8b4513] text-xs uppercase tracking-[0.4em] text-center mb-3 font-bold">Tabela de preços</p>
        <h2 className="text-5xl font-black text-center mb-16" style={{ fontFamily: 'Georgia, serif' }}>Nossos serviços</h2>
        <div className="divide-y divide-[#2b1810]/20 border-y border-[#2b1810]/20">
          {SERVICOS.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-2xl font-black">{s.name}</h3>
                <p className="text-[#2b1810]/50 text-xs uppercase tracking-widest mt-1 flex items-center gap-1">
                  <Clock size={10} /> {s.time}
                </p>
              </div>
              <span className="text-3xl font-black text-[#8b4513]">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Barbeiros */}
      <section className="bg-[#2b1810] text-[#f4ead5] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#deb887] text-xs uppercase tracking-[0.4em] text-center mb-3">Os mestres</p>
          <h2 className="text-5xl font-black text-center mb-16" style={{ fontFamily: 'Georgia, serif' }}>Nossa equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {BARBEIROS.map((b) => (
              <figure key={b.name} className="text-center">
                <div className="aspect-square overflow-hidden border-4 border-[#deb887] mb-4">
                  <img src={`https://images.unsplash.com/${b.img}?w=600&auto=format&fit=crop`} alt={b.name} className="w-full h-full object-cover sepia-[0.2]" />
                </div>
                <h3 className="text-2xl font-black" style={{ fontFamily: 'Georgia, serif' }}>{b.name}</h3>
                <p className="text-[#deb887] text-xs uppercase tracking-widest mt-1">{b.years} de ofício</p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé com endereço */}
      <section id="agendar" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-black mb-10" style={{ fontFamily: 'Georgia, serif' }}>Visite-nos</h2>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <MapPin className="mx-auto text-[#8b4513] mb-3" />
            <p className="font-black mb-1">Endereço</p>
            <p className="text-[#2b1810]/70">Rua da Alfândega, 42<br />Centro histórico</p>
          </div>
          <div>
            <Clock className="mx-auto text-[#8b4513] mb-3" />
            <p className="font-black mb-1">Horário</p>
            <p className="text-[#2b1810]/70">Terça a sábado<br />9h — 19h</p>
          </div>
          <div>
            <Scissors className="mx-auto text-[#8b4513] mb-3" />
            <p className="font-black mb-1">Siga-nos</p>
            <p className="text-[#2b1810]/70">@barbearia.senhorique</p>
          </div>
        </div>
        <a href="https://wa.me/" className="inline-block mt-12 px-10 py-5 bg-[#2b1810] text-[#f4ead5] font-black uppercase tracking-widest text-xs">
          Agendar pelo WhatsApp
        </a>
      </section>

      <footer className="border-t border-[#2b1810]/20 py-6 text-center text-[#2b1810]/50 text-xs">
        © Barbearia do Seu Henrique · <Link href="/encomendar/barbearia-2" className="text-[#8b4513] font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
