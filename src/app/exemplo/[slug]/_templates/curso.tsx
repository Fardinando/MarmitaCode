import Link from 'next/link';

const MODULOS = [
  { num: '01', title: 'Fundamentos', lessons: 12, duration: '2h 30min' },
  { num: '02', title: 'Técnicas avançadas', lessons: 18, duration: '4h 10min' },
  { num: '03', title: 'Projeto prático', lessons: 10, duration: '3h 00min' },
  { num: '04', title: 'Mercado e carreira', lessons: 8, duration: '1h 40min' },
  { num: '05', title: 'Certificação', lessons: 4, duration: '45min' },
];

const DEPOIMENTOS = [
  { name: 'Ana P.', text: 'Mudou minha carreira. O conteúdo é denso mas super didático.', role: 'Designer' },
  { name: 'Carlos M.', text: 'Melhor investimento que fiz este ano. Comunidade incrível.', role: 'Empreendedor' },
  { name: 'Juliana R.', text: 'Em 3 meses consegui meus primeiros clientes aplicando o método.', role: 'Freelancer' },
];

export function CursoTemplate() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-slate-950/90 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-black text-xl">
            Academia<span className="text-indigo-400">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/60">
            <a href="#curso" className="hover:text-white">O curso</a>
            <a href="#modulos" className="hover:text-white">Módulos</a>
            <a href="#depoimentos" className="hover:text-white">Alunos</a>
            <a href="#precos" className="hover:text-white">Investimento</a>
          </div>
          <a href="#precos" className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-400">
            Inscrever-se
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="curso" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-8">
            🚀 Novas turmas abertas
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-8">
            Transforme sua<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">carreira em 90 dias</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Método passo a passo com mais de 50 aulas, projetos reais e certificação.
            Comunidade exclusiva com mais de 2.000 alunos.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#precos" className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold text-lg">
              Quero começar
            </a>
            <a href="#modulos" className="px-10 py-5 bg-white/5 border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10">
              Ver o programa
            </a>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              ['50+', 'Aulas em vídeo'],
              ['2k+', 'Alunos ativos'],
              ['4.9★', 'Avaliação média'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-4xl font-black text-indigo-400">{n}</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-indigo-400 text-sm uppercase tracking-[0.3em] text-center mb-4">Programa completo</p>
        <h2 className="text-5xl font-black text-center mb-16">O que você vai aprender</h2>
        <div className="space-y-3">
          {MODULOS.map((m) => (
            <div key={m.num} className="flex items-center gap-6 p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-indigo-500/40 transition">
              <div className="text-5xl font-black text-indigo-500/40">{m.num}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{m.title}</h3>
                <p className="text-white/50 text-sm">{m.lessons} aulas · {m.duration}</p>
              </div>
              <div className="text-indigo-400">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="bg-white/[0.02] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-indigo-400 text-sm uppercase tracking-[0.3em] text-center mb-4">Alunos reais</p>
          <h2 className="text-5xl font-black text-center mb-16">Resultados que falam</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {DEPOIMENTOS.map((d) => (
              <div key={d.name} className="p-8 bg-white/[0.03] rounded-2xl border border-white/5">
                <div className="text-indigo-400 text-xl mb-4">★★★★★</div>
                <p className="text-white/80 leading-relaxed mb-6">&ldquo;{d.text}&rdquo;</p>
                <div className="font-bold">{d.name}</div>
                <div className="text-white/40 text-sm">{d.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preço */}
      <section id="precos" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-black mb-6">Investimento</h2>
        <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
          <p className="text-white/60 line-through text-lg mb-2">De R$ 1.997</p>
          <div className="text-6xl font-black mb-2">R$ 997</div>
          <p className="text-white/60 mb-8">ou 12x de R$ 97</p>
          <ul className="text-left space-y-3 mb-10 max-w-sm mx-auto">
            {['Acesso vitalício ao conteúdo', 'Comunidade exclusiva', 'Certificado de conclusão', 'Suporte direto com instrutor', 'Garantia de 7 dias'].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="text-indigo-400">✓</span> {f}
              </li>
            ))}
          </ul>
          <a href="#" className="block px-10 py-5 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold text-lg">
            Garantir minha vaga
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-sm">
        © Academia Online · <Link href="/encomendar/curso" className="text-indigo-400 hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
