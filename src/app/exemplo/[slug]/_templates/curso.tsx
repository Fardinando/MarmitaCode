'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Lock,
  CheckCircle2,
  Circle,
  Award,
  Clock,
  Users,
  Star,
  BookOpen,
  LogIn,
  BarChart3,
} from 'lucide-react';

const MODULOS = [
  { num: '01', title: 'Fundamentos do design', lessons: 12, duration: '2h 30min', progress: 100 },
  { num: '02', title: 'Técnicas avançadas', lessons: 18, duration: '4h 10min', progress: 60 },
  { num: '03', title: 'Projeto prático', lessons: 10, duration: '3h 00min', progress: 20 },
  { num: '04', title: 'Mercado e carreira', lessons: 8, duration: '1h 40min', progress: 0 },
  { num: '05', title: 'Certificação', lessons: 4, duration: '45min', progress: 0 },
];

const DEPOIMENTOS = [
  {
    name: 'Ana Prado',
    role: 'Designer freelancer',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop',
    text: 'Mudou minha carreira. O conteúdo é denso mas super didático — em 3 meses já fechei meus primeiros clientes.',
  },
  {
    name: 'Carlos Monteiro',
    role: 'Empreendedor',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    text: 'Melhor investimento que fiz este ano. Comunidade incrível e o professor realmente responde.',
  },
  {
    name: 'Juliana Reis',
    role: 'Analista de marketing',
    img: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=200&auto=format&fit=crop',
    text: 'Em 3 meses consegui promover-me no trabalho aplicando o método. Vale cada centavo.',
  },
];

export function CursoTemplate() {
  const [view, setView] = useState<'landing' | 'login' | 'app'>('landing');

  if (view === 'login') return <LoginView onBack={() => setView('landing')} onLogin={() => setView('app')} />;
  if (view === 'app') return <AppView onLogout={() => setView('landing')} />;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-slate-950/90 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-black text-xl flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-400" />
            Academia<span className="text-indigo-400">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/60">
            <a href="#curso" className="hover:text-white">O curso</a>
            <a href="#modulos" className="hover:text-white">Módulos</a>
            <a href="#depoimentos" className="hover:text-white">Alunos</a>
            <a href="#precos" className="hover:text-white">Investimento</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('login')}
              className="text-sm font-bold text-white/70 hover:text-white flex items-center gap-2"
            >
              <LogIn size={16} /> Entrar
            </button>
            <a href="#precos" className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-400">
              Inscrever-se
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="curso" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-8">
              🚀 Turma de novembro aberta
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Transforme sua<br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">carreira em 90 dias</span>
            </h1>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Método passo a passo com mais de 50 aulas, projetos reais e certificação.
              Comunidade exclusiva com mais de 2.000 alunos ativos.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#precos" className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold text-lg">
                Quero começar
              </a>
              <button
                onClick={() => setView('app')}
                className="px-10 py-5 bg-white/5 border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 flex items-center gap-2"
              >
                <Play size={18} /> Ver plataforma
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                alt="Alunos estudando"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [<BookOpen key="b" size={28} />, '50+', 'Aulas em vídeo'],
            [<Users key="u" size={28} />, '2.000+', 'Alunos ativos'],
            [<Star key="s" size={28} />, '4.9', 'Avaliação média'],
            [<Award key="a" size={28} />, '92%', 'Taxa de conclusão'],
          ].map(([icon, n, l]) => (
            <div key={l as string} className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
              <div className="text-indigo-400 flex justify-center mb-3">{icon}</div>
              <div className="text-3xl font-black">{n}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-2">{l}</div>
            </div>
          ))}
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
                <p className="text-white/50 text-sm flex items-center gap-4">
                  <span className="flex items-center gap-1"><Play size={12} /> {m.lessons} aulas</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {m.duration}</span>
                </p>
              </div>
              <div className="text-indigo-400">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Instrutor */}
      <section className="bg-white/[0.02] py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop"
              alt="Instrutor"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-indigo-400 text-sm uppercase tracking-[0.3em] mb-4">Seu instrutor</p>
            <h2 className="text-4xl font-black mb-4">Rafael Mendes</h2>
            <p className="text-indigo-300 mb-6 font-bold">15 anos de mercado · ex-Google · Mestre em Design</p>
            <p className="text-white/60 leading-relaxed mb-8">
              Trabalhou com marcas como Nike, Nubank e Spotify. Nos últimos 5 anos vem formando
              a nova geração de designers brasileiros com um método único de ensino prático.
            </p>
            <div className="flex gap-4 text-xs uppercase tracking-widest text-white/40">
              <span>+5.000 alunos</span>
              <span>·</span>
              <span>50+ empresas atendidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-indigo-400 text-sm uppercase tracking-[0.3em] text-center mb-4">Alunos reais</p>
        <h2 className="text-5xl font-black text-center mb-16">Resultados que falam</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {DEPOIMENTOS.map((d) => (
            <div key={d.name} className="p-8 bg-white/[0.03] rounded-2xl border border-white/5">
              <div className="text-indigo-400 text-xl mb-4">★★★★★</div>
              <p className="text-white/80 leading-relaxed mb-6">&ldquo;{d.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={d.img} alt={d.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold">{d.name}</div>
                  <div className="text-white/40 text-sm">{d.role}</div>
                </div>
              </div>
            </div>
          ))}
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
                <CheckCircle2 size={16} className="text-indigo-400 shrink-0" /> {f}
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

function LoginView({ onBack, onLogin }: { onBack: () => void; onLogin: () => void }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="text-xs text-white/50 hover:text-white mb-10 flex items-center gap-2">
          ← Voltar ao site
        </button>
        <div className="p-10 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
              <BookOpen size={24} className="text-indigo-400" />
            </div>
            <h1 className="text-3xl font-black mb-2">Entrar na plataforma</h1>
            <p className="text-white/50 text-sm">Acesse sua área de alunos</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">E-mail</label>
              <input
                type="email"
                defaultValue="voce@email.com"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">Senha</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-indigo-500/50"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold">
              Entrar
            </button>
            <p className="text-center text-xs text-white/40">
              Ainda não é aluno? <a href="#precos" className="text-indigo-400">Inscreva-se</a>
            </p>
          </form>
        </div>
        <p className="text-center text-[10px] text-white/30 mt-6 uppercase tracking-widest">
          Demo navegável · nenhuma informação é salva
        </p>
      </div>
    </main>
  );
}

function AppView({ onLogout }: { onLogout: () => void }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const lessons = [
    { title: 'Boas-vindas e introdução', duration: '8min', done: true },
    { title: 'Instalando as ferramentas', duration: '12min', done: true },
    { title: 'Fundamentos do design visual', duration: '18min', done: true },
    { title: 'Tipografia aplicada', duration: '22min', done: false, current: true },
    { title: 'Teoria das cores', duration: '15min', done: false },
    { title: 'Hierarquia e composição', duration: '20min', done: false, locked: true },
    { title: 'Grid e espaçamento', duration: '17min', done: false, locked: true },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* App bar */}
      <nav className="sticky top-10 z-40 bg-slate-900/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-black text-lg flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" />
              Academia<span className="text-indigo-400">.</span>
            </div>
            <div className="hidden md:flex gap-5 text-sm text-white/70">
              <a className="text-white border-b-2 border-indigo-400 pb-1">Meus cursos</a>
              <a className="hover:text-white">Comunidade</a>
              <a className="hover:text-white">Suporte</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-black">V</div>
            <button onClick={onLogout} className="text-xs text-white/50 hover:text-white">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Main */}
        <div>
          <div className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Módulo 02 · Técnicas avançadas
          </div>
          <h1 className="text-3xl font-black mb-6">{lessons[activeLesson].title}</h1>
          <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 relative group cursor-pointer mb-6">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop"
              alt="aula"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center group-hover:scale-110 transition">
                <Play size={28} className="ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              <div className="h-full bg-indigo-500" style={{ width: '35%' }} />
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/50 uppercase tracking-widest mb-8">
            <span className="flex items-center gap-1"><Clock size={12} /> {lessons[activeLesson].duration}</span>
            <span className="flex items-center gap-1"><Users size={12} /> 847 alunos assistindo</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-3">Sobre esta aula</h3>
            <p className="text-white/60 leading-relaxed">
              Nesta aula vamos explorar o papel da tipografia na comunicação visual.
              Você vai aprender a escolher famílias tipográficas, criar hierarquia e usar
              fontes de maneira estratégica em projetos reais.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-3">Materiais</h3>
            <ul className="text-white/60 space-y-2 text-sm">
              <li>📄 PDF resumo da aula</li>
              <li>🎨 Arquivo Figma de referência</li>
              <li>🔗 Links curados</li>
            </ul>
          </div>
        </div>

        {/* Sidebar - lesson list */}
        <aside>
          <div className="sticky top-28 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Progresso do módulo</h3>
              <span className="text-xs text-indigo-400 font-black">3/7</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '43%' }} />
            </div>
            <div className="space-y-2">
              {lessons.map((l, i) => (
                <button
                  key={l.title}
                  onClick={() => !l.locked && setActiveLesson(i)}
                  disabled={l.locked}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs transition ${
                    i === activeLesson
                      ? 'bg-indigo-500/20 border border-indigo-500/40'
                      : l.locked
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {l.done ? (
                    <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
                  ) : l.locked ? (
                    <Lock size={16} className="text-white/40 shrink-0" />
                  ) : (
                    <Circle size={16} className={i === activeLesson ? 'text-indigo-400 shrink-0' : 'text-white/40 shrink-0'} />
                  )}
                  <span className="flex-1 font-bold">{l.title}</span>
                  <span className="text-white/40">{l.duration}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={16} className="text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest">Seu desempenho</span>
            </div>
            <div className="text-2xl font-black">43% concluído</div>
            <div className="text-xs text-white/50 mt-1">Mais 4 aulas pra terminar o módulo</div>
          </div>
        </aside>
      </div>

      <footer className="border-t border-white/5 py-6 text-center text-white/30 text-xs">
        Demo navegável · <Link href="/encomendar/curso" className="text-indigo-400 hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
