import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ACCENT = '#DC2626';

const PRATOS = [
  { name: 'Feijoada completa', desc: 'Com couve, farofa, torresmo e laranja', price: 'R$ 45', img: 'photo-1613844237701-8f3664fc2eff' },
  { name: 'Picanha na brasa', desc: '400g, acompanha arroz, feijão tropeiro e vinagrete', price: 'R$ 78', img: 'photo-1544025162-d76694265947' },
  { name: 'Moqueca de peixe', desc: 'Tradição baiana, dende e leite de coco', price: 'R$ 62', img: 'photo-1527477396000-e27163b481c2' },
  { name: 'Galinha caipira', desc: 'Cozida no fogão à lenha com angu e quiabo', price: 'R$ 52', img: 'photo-1598515213692-5f252f75d785' },
];

export function Restaurante2Template() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#DC2626]/20 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-10 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl">🍲</span>
            <span className="font-black text-xl tracking-tight">Comida Sincera</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            <a href="#pratos" className="hover:text-[#DC2626]">Pratos</a>
            <a href="#historia" className="hover:text-[#DC2626]">História</a>
            <a href="#visite" className="hover:text-[#DC2626]">Visite</a>
          </div>
          <a href="https://wa.me/" className="px-5 py-2.5 rounded-full bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-widest">
            Pedir
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#DC2626]">Fogão a lenha · Desde 1982</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter mb-6">
              Comida da <span className="bg-gradient-to-r from-[#DC2626] to-amber-400 bg-clip-text text-transparent">roça</span> no coração da cidade.
            </h1>
            <p className="text-white/50 text-lg font-bold mb-10 max-w-md">
              Receitas de três gerações, ingredientes direto do produtor, panelas de ferro e o tempo que a comida boa pede.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#pratos" className="group inline-flex items-center gap-2 px-7 py-4 bg-[#DC2626] text-white rounded-full text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                Ver cardápio <ArrowRight size={14} />
              </a>
              <a href="#visite" className="px-7 py-4 border border-white/15 rounded-full text-xs font-black uppercase tracking-widest text-white/80 hover:bg-white/5">
                Como chegar
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-[0_0_80px_rgba(220,38,38,0.3)]">
              <img
                src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&auto=format&fit=crop"
                alt="Comida brasileira"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#DC2626] text-white p-4 rounded-2xl shadow-xl rotate-[-3deg]">
              <div className="text-[9px] uppercase tracking-widest font-black">Prato do dia</div>
              <div className="text-xl font-black">Feijoada!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pratos */}
      <section id="pratos" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">O cardápio da semana</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Pratos da <span className="text-[#DC2626]">casa.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PRATOS.map((p) => (
            <article key={p.name} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#DC2626]/50 hover:-translate-y-1 transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={`https://images.unsplash.com/${p.img}?w=800&auto=format&fit=crop`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-black">{p.name}</h3>
                  <span className="text-[#DC2626] font-black">{p.price}</span>
                </div>
                <p className="text-white/50 text-sm font-medium">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* História */}
      <section id="historia" className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Nossa história</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
            Três gerações cozinhando com <span className="text-[#DC2626]">amor.</span>
          </h2>
          <p className="text-white/60 text-lg font-medium leading-relaxed">
            Começou com a vovó Teresa em 1982, numa cozinha pequena nos fundos da casa. Hoje, com netos e bisnetos cuidando do negócio,
            mantemos cada receita como ela ensinou — no fogão a lenha, com o tempo que a comida pede.
          </p>
        </div>
      </section>

      {/* Visite */}
      <section id="visite" className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/30 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#DC2626]">Visite-nos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Rua Vovó Teresa, <span className="text-[#DC2626]">42.</span>
          </h2>
          <p className="text-white/50 font-bold mb-6">Bairro histórico · Em frente à igreja matriz</p>
          <ul className="space-y-2 text-sm text-white/70 font-medium">
            <li>Terça a sexta · 11h30 — 15h / 18h — 23h</li>
            <li>Sábado e domingo · 11h30 — 00h</li>
            <li>Segunda · fechados</li>
          </ul>
        </div>
        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.2)]">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop" alt="Fachada" className="w-full h-full object-cover" />
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-white/40 text-xs font-black uppercase tracking-widest relative z-10">
        © Comida Sincera · <Link href="/encomendar/restaurante-2" className="text-[#DC2626] hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
