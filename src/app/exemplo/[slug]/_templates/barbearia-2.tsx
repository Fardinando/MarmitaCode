import Link from 'next/link';
import { Scissors, Clock, MapPin, ArrowRight } from 'lucide-react';

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
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B35]/15 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-10 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scissors size={22} className="text-[#FF6B35]" />
            <div>
              <div className="font-black text-base leading-none tracking-wider">SEU HENRIQUE</div>
              <div className="text-[9px] text-[#FF6B35] tracking-[0.3em] mt-1 font-black">EST. 1958</div>
            </div>
          </div>
          <a className="px-6 py-3 bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            Agendar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 z-10">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6B35]">Desde 1958 · 66 anos de ofício</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter mb-6">
              A barbearia que seu <span className="bg-gradient-to-r from-[#FF6B35] to-amber-400 bg-clip-text text-transparent">avô</span> frequentou.
            </h1>
            <p className="text-white/50 text-lg font-bold mb-10 max-w-md">
              Mais de 60 anos cortando cabelo e aparando barba. Cadeira de ferro, navalha de verdade, café coado na hora.
            </p>
            <a href="#agendar" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white rounded-full text-xs font-black uppercase tracking-widest hover:gap-3 transition-all shadow-[0_0_40px_rgba(255,107,53,0.4)]">
              Reservar cadeira <ArrowRight size={14} />
            </a>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_0_80px_rgba(255,107,53,0.3)] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop"
                alt="Barbearia tradicional"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-[#FF6B35] text-white p-4 rounded-2xl shadow-xl -rotate-3">
              <div className="text-[9px] uppercase tracking-widest font-black">Tradição</div>
              <div className="text-xl font-black italic">66 anos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Tabela de preços</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Nossos <span className="text-[#FF6B35]">serviços.</span>
          </h2>
        </div>
        <div className="divide-y divide-white/5 border-y border-white/10 bg-white/[0.02] rounded-3xl px-6">
          {SERVICOS.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-2xl font-black">{s.name}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 flex items-center gap-1 font-black">
                  <Clock size={10} /> {s.time}
                </p>
              </div>
              <span className="text-3xl font-black italic text-[#FF6B35]">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Barbeiros */}
      <section className="py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/30 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6B35]">Os mestres</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Nossa <span className="text-[#FF6B35]">equipe.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BARBEIROS.map((b) => (
              <figure key={b.name} className="text-center group">
                <div className="aspect-square overflow-hidden rounded-3xl mb-4 border border-white/10 group-hover:border-[#FF6B35]/50 transition">
                  <img src={`https://images.unsplash.com/${b.img}?w=600&auto=format&fit=crop`} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-black italic">{b.name}</h3>
                <p className="text-[#FF6B35] text-[10px] uppercase tracking-widest mt-1 font-black">{b.years} de ofício</p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Visite */}
      <section id="agendar" className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-10 leading-none">
          <span className="text-[#FF6B35]">Visite-nos.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {[
            { icon: MapPin, label: 'Endereço', text: 'Rua da Alfândega, 42\nCentro histórico' },
            { icon: Clock, label: 'Horário', text: 'Terça a sábado\n9h — 19h' },
            { icon: Scissors, label: 'Siga-nos', text: '@barbearia.senhorique' },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
              <Icon className="mx-auto text-[#FF6B35] mb-3" />
              <p className="font-black mb-1 text-[10px] uppercase tracking-widest text-white/60">{label}</p>
              <p className="text-white/80 whitespace-pre-line font-medium">{text}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/" className="inline-flex items-center gap-2 mt-12 px-10 py-5 bg-[#FF6B35] text-white font-black uppercase tracking-widest text-xs rounded-full hover:gap-3 transition-all shadow-[0_0_40px_rgba(255,107,53,0.4)]">
          Agendar pelo WhatsApp <ArrowRight size={14} />
        </a>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-white/40 text-xs font-black uppercase tracking-widest relative z-10">
        © Barbearia do Seu Henrique · <Link href="/encomendar/barbearia-2" className="text-[#FF6B35] hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
