import Link from 'next/link';
import { Flame, Clock, Trophy, Heart } from 'lucide-react';

const AULAS = [
  { name: 'HIIT Intenso', instr: 'Carla', time: '45min', level: 'Avançado', img: 'photo-1517836357463-d25dfeac3438' },
  { name: 'Yoga Flow', instr: 'Marina', time: '60min', level: 'Todos os níveis', img: 'photo-1544367567-0f2fcb009e0b' },
  { name: 'Funcional', instr: 'Pedro', time: '50min', level: 'Intermediário', img: 'photo-1534438327276-14e5300c3a48' },
  { name: 'Pilates', instr: 'Luiza', time: '55min', level: 'Iniciante', img: 'photo-1518611012118-696072aa579a' },
];

export function FitnessTemplate() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-black/80 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-2xl italic tracking-tighter">
            FORGE<span className="text-lime-400">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-white/60 font-black">
            <a href="#aulas" className="hover:text-lime-400">Aulas</a>
            <a href="#planos" className="hover:text-lime-400">Planos</a>
            <a href="#estrutura" className="hover:text-lime-400">Estrutura</a>
          </div>
          <a className="px-6 py-3 bg-lime-400 text-black text-[11px] font-black uppercase tracking-widest">
            Fazer matrícula
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-6">A mais nova de SP</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 max-w-3xl">
            Sua melhor versão <span className="text-lime-400">começa hoje.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10">
            Academia completa com equipamentos top de linha, aulas em grupo e acompanhamento personalizado.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a className="px-10 py-5 bg-lime-400 text-black font-black uppercase tracking-widest text-xs">
              Aula experimental grátis
            </a>
            <a className="px-10 py-5 border border-white/30 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10">
              Ver estrutura
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            [<Flame key="f" size={28} />, '2.500+', 'Alunos ativos'],
            [<Clock key="c" size={28} />, '24h', 'Academia 24/7'],
            [<Trophy key="t" size={28} />, '15+', 'Modalidades'],
            [<Heart key="h" size={28} />, '98%', 'Satisfação'],
          ].map(([icon, n, l]) => (
            <div key={l as string}>
              <div className="text-lime-400 flex justify-center mb-2">{icon}</div>
              <div className="text-3xl font-black">{n}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Aulas */}
      <section id="aulas" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-4">Grade de aulas</p>
        <h2 className="text-5xl font-black uppercase tracking-tight mb-12">O que rola aqui</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AULAS.map((a) => (
            <div key={a.name} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={`https://images.unsplash.com/${a.img}?w=600&auto=format&fit=crop`}
                alt={a.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-lime-400 text-[10px] uppercase tracking-widest font-black">{a.level}</span>
                <h3 className="text-2xl font-black uppercase mt-2">{a.name}</h3>
                <p className="text-white/60 text-sm mt-1">com {a.instr} · {a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Estrutura */}
      <section id="estrutura" className="bg-white/[0.02] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-4">Nossa estrutura</p>
          <h2 className="text-5xl font-black uppercase tracking-tight mb-12">O espaço</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {['photo-1540497077202-7c8a3999166f', 'photo-1571902943202-507ec2618e8f', 'photo-1534438327276-14e5300c3a48'].map((p) => (
              <div key={p} className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={`https://images.unsplash.com/${p}?w=800&auto=format&fit=crop`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black uppercase tracking-tight text-center mb-12">Planos</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: 'Mensal', price: '149', desc: 'Flexível, sem fidelidade.' },
            { name: 'Semestral', price: '119', desc: 'Compromisso de 6 meses. Economia de 20%.', hot: true },
            { name: 'Anual', price: '99', desc: '12 meses + 1 mês cortesia.' },
          ].map((p) => (
            <div
              key={p.name}
              className={`p-10 rounded-2xl border ${
                p.hot ? 'bg-lime-400/10 border-lime-400/40 scale-105' : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <h3 className="text-sm font-black uppercase tracking-widest text-lime-400">{p.name}</h3>
              <div className="mt-6">
                <span className="text-5xl font-black">R$ {p.price}</span>
                <span className="text-white/40 text-sm">/mês</span>
              </div>
              <p className="text-white/60 text-sm mt-4 mb-8">{p.desc}</p>
              <a className="block py-4 text-center bg-white text-black font-black uppercase tracking-widest text-[11px]">
                Quero este
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-xs uppercase tracking-widest">
        © Forge · <Link href="/encomendar/fitness" className="text-lime-400 hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
