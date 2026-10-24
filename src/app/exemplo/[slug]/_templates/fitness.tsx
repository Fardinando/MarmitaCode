'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flame, Clock, Trophy, Heart, Calculator, Dumbbell, ArrowRight } from 'lucide-react';

const AULAS = [
  { name: 'HIIT Intenso', instr: 'Carla', time: '45min', level: 'Avançado', img: 'photo-1517836357463-d25dfeac3438' },
  { name: 'Yoga Flow', instr: 'Marina', time: '60min', level: 'Todos os níveis', img: 'photo-1544367567-0f2fcb009e0b' },
  { name: 'Funcional', instr: 'Pedro', time: '50min', level: 'Intermediário', img: 'photo-1534438327276-14e5300c3a48' },
  { name: 'Pilates', instr: 'Luiza', time: '55min', level: 'Iniciante', img: 'photo-1518611012118-696072aa579a' },
];

type Objetivo = 'emagrecer' | 'definir' | 'ganhar-massa' | 'condicionamento' | null;

export function FitnessTemplate() {
  // Calculadora
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(170);
  const [objetivo, setObjetivo] = useState<Objetivo>(null);
  const [nivelAtual, setNivelAtual] = useState<'iniciante' | 'intermediario' | 'avancado'>('iniciante');
  const [calcDone, setCalcDone] = useState(false);

  const imc = peso / Math.pow(altura / 100, 2);
  const imcLabel =
    imc < 18.5 ? 'Abaixo do peso' :
    imc < 25 ? 'Peso saudável' :
    imc < 30 ? 'Sobrepeso' : 'Obesidade';
  const imcColor =
    imc < 18.5 ? 'text-blue-400' :
    imc < 25 ? 'text-lime-400' :
    imc < 30 ? 'text-amber-400' : 'text-rose-400';

  const planoRecomendado = (() => {
    if (!objetivo) return null;
    if (objetivo === 'emagrecer') return { nome: 'HIIT + Funcional', frequencia: '5x/semana', mensal: 'Semestral', modalidades: ['HIIT', 'Funcional', 'Esteira'] };
    if (objetivo === 'definir') return { nome: 'Musculação + HIIT', frequencia: '5x/semana', mensal: 'Semestral', modalidades: ['Musculação', 'HIIT', 'Core'] };
    if (objetivo === 'ganhar-massa') return { nome: 'Hipertrofia', frequencia: '4-5x/semana', mensal: 'Anual', modalidades: ['Musculação', 'Força', 'Nutrição'] };
    return { nome: 'Funcional + Pilates', frequencia: '3-4x/semana', mensal: 'Mensal', modalidades: ['Funcional', 'Pilates', 'Yoga'] };
  })();

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="sticky top-10 z-40 bg-black/80 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-black text-2xl italic tracking-tighter">
            FORGE<span className="text-lime-400">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-white/60 font-black">
            <a href="#aulas" className="hover:text-lime-400">Aulas</a>
            <a href="#calculadora" className="hover:text-lime-400">Calculadora</a>
            <a href="#planos" className="hover:text-lime-400">Planos</a>
          </div>
          <a className="px-5 py-2.5 bg-lime-400 text-black text-[11px] font-black uppercase tracking-widest">
            Matricular
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-6">A mais nova de SP</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 max-w-3xl">
            Sua melhor versão <span className="text-lime-400">começa hoje.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10">
            Academia completa, aulas em grupo, musculação, acompanhamento personalizado.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#calculadora" className="px-10 py-5 bg-lime-400 text-black font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <Calculator size={16} /> Calcular meu plano
            </a>
            <a href="#aulas" className="px-10 py-5 border border-white/30 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10">
              Ver aulas
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

      {/* CALCULADORA DE TREINO */}
      <section id="calculadora" className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-4">Calculadora personalizada</p>
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">
          Qual plano<br />combina com você?
        </h2>
        <p className="text-white/60 mb-10 max-w-xl">
          Responda 3 perguntas e a gente monta o plano ideal pros seus objetivos. Em 10 segundos.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
            {/* Peso */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black uppercase tracking-widest text-white/60">Peso</label>
                <span className="text-2xl font-black text-lime-400">{peso} kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={peso}
                onChange={(e) => setPeso(parseInt(e.target.value))}
                className="w-full accent-lime-400"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                <span>40</span><span>150kg</span>
              </div>
            </div>

            {/* Altura */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black uppercase tracking-widest text-white/60">Altura</label>
                <span className="text-2xl font-black text-lime-400">{altura} cm</span>
              </div>
              <input
                type="range"
                min="140"
                max="210"
                value={altura}
                onChange={(e) => setAltura(parseInt(e.target.value))}
                className="w-full accent-lime-400"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                <span>140</span><span>210cm</span>
              </div>
            </div>

            {/* Objetivo */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/60 mb-3">Objetivo principal</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'emagrecer' as const, l: '🔥 Emagrecer' },
                  { k: 'definir' as const, l: '💪 Definir' },
                  { k: 'ganhar-massa' as const, l: '🏋️ Ganhar massa' },
                  { k: 'condicionamento' as const, l: '🏃 Condicionamento' },
                ].map((o) => (
                  <button
                    key={o.k}
                    onClick={() => setObjetivo(o.k)}
                    className={`p-3 rounded-xl text-xs font-bold transition ${
                      objetivo === o.k ? 'bg-lime-400 text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/60 mb-3">Nível atual</label>
              <div className="grid grid-cols-3 gap-2">
                {['iniciante', 'intermediario', 'avancado'].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNivelAtual(n as 'iniciante' | 'intermediario' | 'avancado')}
                    className={`p-3 rounded-xl text-xs font-bold uppercase transition ${
                      nivelAtual === n ? 'bg-lime-400 text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {n === 'intermediario' ? 'Intermed.' : n}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCalcDone(true)}
              disabled={!objetivo}
              className="w-full py-4 bg-lime-400 hover:bg-lime-300 disabled:opacity-40 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-xl"
            >
              <Calculator size={14} /> Calcular meu plano
            </button>
          </div>

          {/* Resultado */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-500/10 border border-lime-400/30">
            {!calcDone || !planoRecomendado ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                <Dumbbell size={60} className="text-lime-400/40 mb-6" />
                <p className="text-white/60 max-w-xs">
                  Responda as 4 perguntas e clique em <b className="text-lime-400">Calcular meu plano</b> pra ver sua recomendação personalizada.
                </p>
              </div>
            ) : (
              <>
                <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-4">Seu plano personalizado</p>
                <h3 className="text-4xl font-black uppercase tracking-tight mb-6">{planoRecomendado.nome}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-black/40 rounded-2xl">
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-1">IMC</div>
                    <div className="text-2xl font-black">{imc.toFixed(1)}</div>
                    <div className={`text-xs font-bold ${imcColor}`}>{imcLabel}</div>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl">
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Frequência</div>
                    <div className="text-2xl font-black">{planoRecomendado.frequencia.split('/')[0]}</div>
                    <div className="text-xs text-white/60">por semana</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-black">Modalidades recomendadas</div>
                  <div className="flex flex-wrap gap-2">
                    {planoRecomendado.modalidades.map((m) => (
                      <span key={m} className="px-3 py-1.5 bg-lime-400/20 text-lime-300 text-xs font-bold rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-black/40 rounded-2xl mb-6">
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Melhor plano financeiro</div>
                  <div className="font-black text-lg text-white">Plano {planoRecomendado.mensal}</div>
                </div>

                <a href="#planos" className="w-full py-4 bg-lime-400 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-xl">
                  Quero matricular <ArrowRight size={14} />
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Aulas */}
      <section id="aulas" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-lime-400 text-xs uppercase tracking-[0.4em] font-black mb-4">Grade de aulas</p>
        <h2 className="text-5xl font-black uppercase tracking-tight mb-12">O que rola aqui</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AULAS.map((a) => (
            <div key={a.name} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={`https://images.unsplash.com/${a.img}?w=600&auto=format&fit=crop`} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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

      {/* Planos */}
      <section id="planos" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black uppercase tracking-tight text-center mb-12">Planos</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: 'Mensal', price: '149', desc: 'Flexível, sem fidelidade.' },
            { name: 'Semestral', price: '119', desc: 'Compromisso de 6 meses. Economia de 20%.', hot: true },
            { name: 'Anual', price: '99', desc: '12 meses + 1 mês cortesia.' },
          ].map((p) => (
            <div key={p.name} className={`p-10 rounded-2xl border ${p.hot ? 'bg-lime-400/10 border-lime-400/40 scale-105' : 'bg-white/[0.03] border-white/5'}`}>
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
