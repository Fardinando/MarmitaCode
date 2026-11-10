'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MarmitaCodeCredit } from './_shared/MarmitaCodeCredit';
import { Check, Zap, Shield, Users, ArrowRight, Plus, MoreHorizontal, CheckCircle2, Circle, Clock, Flag, TrendingUp, Sparkles } from 'lucide-react';

const ACCENT = '#5B6CFF';

const FEATURES = [
  { icon: Zap, color: 'bg-[#5B6CFF]', title: 'Rápido como pensamento', desc: 'Resposta média de 80ms em qualquer região do Brasil.' },
  { icon: Shield, color: 'bg-emerald-500', title: 'Segurança bancária', desc: 'ISO 27001, LGPD-ready e criptografia ponta a ponta.' },
  { icon: Users, color: 'bg-rose-500', title: 'Multi-usuário', desc: 'Convide seu time, defina papéis e permissões.' },
];

const PLANS = [
  { name: 'Starter', price: 'R$ 49', desc: 'Para começar.', features: ['Até 3 usuários', '5GB armazenamento', 'Suporte por e-mail', 'Relatórios básicos'], featured: false },
  { name: 'Pro', price: 'R$ 149', desc: 'Para equipes em crescimento.', features: ['Até 15 usuários', '100GB armazenamento', 'Suporte prioritário', 'Analytics avançado', 'API completa'], featured: true },
  { name: 'Business', price: 'R$ 349', desc: 'Para operações robustas.', features: ['Usuários ilimitados', '1TB armazenamento', 'Suporte 24/7', 'SSO corporativo', 'SLA 99.9%'], featured: false },
];

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Revisar design do onboarding', status: 'todo', priority: 'high', assignee: 'AP' },
  { id: 't2', title: 'Integrar API de pagamentos', status: 'todo', priority: 'medium', assignee: 'CM' },
  { id: 't3', title: 'Escrever documentação v2', status: 'todo', priority: 'low', assignee: 'JR' },
  { id: 't4', title: 'Call com cliente — Nubank', status: 'doing', priority: 'high', assignee: 'AP' },
  { id: 't5', title: 'Prototipar nova feature de export', status: 'doing', priority: 'medium', assignee: 'CM' },
  { id: 't6', title: 'Setup inicial do projeto', status: 'done', priority: 'low', assignee: 'JR' },
  { id: 't7', title: 'Aprovar budget Q4', status: 'done', priority: 'high', assignee: 'AP' },
];

export function SaasTemplate() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#5B6CFF]/20 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-10 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B6CFF] to-indigo-600" />
            Linear<span className="text-[#5B6CFF]">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/60 font-medium">
            <a href="#features" className="hover:text-white">Recursos</a>
            <a href="#demo" className="hover:text-white">Demo ao vivo</a>
            <a href="#precos" className="hover:text-white">Preços</a>
          </div>
          <div className="flex gap-3">
            <a className="text-sm font-bold hidden sm:inline text-white/70">Entrar</a>
            <a href="#precos" className="px-5 py-2 bg-white text-black rounded-full text-sm font-black hover:bg-[#5B6CFF] hover:text-white transition">
              Teste grátis
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10">
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10">
            <Sparkles size={12} className="text-[#5B6CFF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
              Novo · integração com Slack e GitHub
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
            Gerencie projetos com <span className="bg-gradient-to-r from-white to-[#5B6CFF] bg-clip-text text-transparent">clareza cirúrgica.</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl font-bold max-w-2xl mx-auto mb-12">
            A plataforma de gestão que seu time vai realmente usar. Teste agora, sem precisar de cadastro.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#demo" className="group px-8 py-4 bg-[#5B6CFF] text-white rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-3 transition-all">
              Experimentar agora <ArrowRight size={14} />
            </a>
            <a href="#precos" className="px-8 py-4 border border-white/15 rounded-full font-black uppercase tracking-widest text-xs text-white/80 hover:bg-white/5">
              Ver planos
            </a>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-8">14 dias grátis · sem cartão</p>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-8">
            Mais de 2.000 times usam Linear
          </p>
          <div className="flex items-center justify-around flex-wrap gap-8 opacity-40">
            {['NUBANK', 'LOGGI', 'IFOOD', 'MERCADO LIVRE', 'STONE', 'HOTMART'].map((l) => (
              <span key={l} className="font-black text-sm sm:text-xl text-white tracking-widest">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO INTERATIVA */}
      <section id="demo" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B6CFF]/10 border border-[#5B6CFF]/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B6CFF] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5B6CFF]">Demo ao vivo</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Experimente <span className="text-[#5B6CFF]">aqui mesmo.</span>
          </h2>
          <p className="text-white/50 font-bold max-w-xl mx-auto">
            Sem cadastro, sem download. Mova tarefas, crie novas, veja o produto em ação.
          </p>
        </div>

        <KanbanDemo />
      </section>

      {/* Features */}
      <section id="features" className="py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">O que entregamos</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Tudo que seu <span className="text-[#5B6CFF]">time precisa.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#5B6CFF]/50 transition">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">{title}</h3>
                <p className="text-white/50 leading-relaxed text-sm font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#5B6CFF] text-6xl mb-8 font-black">❝</div>
          <p className="text-3xl md:text-5xl font-black italic leading-tight mb-10 tracking-tight">
            Em três meses, cortamos pela metade o tempo que o time passava em reuniões.
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop" alt="CEO" className="w-14 h-14 rounded-full object-cover ring-2 ring-[#5B6CFF]" />
            <div className="text-left">
              <div className="font-black">Mariana Oliveira</div>
              <div className="text-white/40 text-xs font-black uppercase tracking-widest">COO · Hotmart</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Preços <span className="text-[#5B6CFF]">transparentes.</span>
          </h2>
          <p className="text-white/50 font-bold">Sem letras miúdas. Cancele quando quiser.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`p-10 rounded-3xl relative ${
                p.featured
                  ? 'bg-gradient-to-br from-[#5B6CFF] to-indigo-700 border-2 border-[#5B6CFF] md:scale-105 shadow-[0_0_80px_rgba(91,108,255,0.4)]'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  Mais escolhido
                </div>
              )}
              <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${p.featured ? 'text-white/80' : 'text-[#5B6CFF]'}`}>
                {p.name}
              </div>
              <div className="text-6xl font-black italic tracking-tighter mb-2">{p.price}</div>
              <p className={`mb-8 text-sm font-medium ${p.featured ? 'text-white/80' : 'text-white/50'}`}>{p.desc}</p>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-medium">
                    <Check size={16} className={p.featured ? 'text-white' : 'text-[#5B6CFF]'} />
                    {f}
                  </li>
                ))}
              </ul>
              <a className={`block py-3 text-center rounded-full font-black uppercase tracking-widest text-xs ${p.featured ? 'bg-white text-[#5B6CFF]' : 'bg-white/10 text-white hover:bg-white/20'} transition`}>
                Começar
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-white/40 text-xs font-black uppercase tracking-widest relative z-10">
        © Linear · <Link href="/encomendar/saas" className="text-[#5B6CFF] hover:underline">Quero este site</Link>
        <MarmitaCodeCredit />
      </footer>
    </main>
  );
}

function KanbanDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskStatus, setNewTaskStatus] = useState<Task['status'] | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const columns: { key: Task['status']; label: string }[] = [
    { key: 'todo', label: 'A fazer' },
    { key: 'doing', label: 'Em andamento' },
    { key: 'done', label: 'Concluído' },
  ];

  const moveTask = (id: string, direction: 'left' | 'right') => {
    const order: Task['status'][] = ['todo', 'doing', 'done'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = order.indexOf(t.status);
        const next = direction === 'right' ? order[Math.min(2, idx + 1)] : order[Math.max(0, idx - 1)];
        return { ...t, status: next };
      })
    );
  };

  const addTask = (status: Task['status']) => {
    if (!newTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: `t${Date.now()}`, title: newTitle, status, priority: 'medium', assignee: 'VC' },
    ]);
    setNewTitle('');
    setNewTaskStatus(null);
  };

  return (
    <div className="rounded-3xl bg-black/60 backdrop-blur-xl p-5 md:p-8 shadow-[0_0_100px_rgba(91,108,255,0.2)] border border-white/10">
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#5B6CFF] to-indigo-600" />
          <div>
            <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Projeto · Lançamento MVP</div>
            <div className="font-black text-sm">Sprint 24</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="font-bold">{tasks.filter((t) => t.status === 'done').length}/{tasks.length} concluídas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/70">{col.label}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-white/10 rounded-full text-white/60 font-black">{colTasks.length}</span>
                </div>
                <button
                  onClick={() => { setNewTaskStatus(col.key); setNewTitle(''); }}
                  className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-white/60"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {colTasks.map((t) => (
                  <div key={t.id} className="group p-3 bg-black/40 rounded-xl border border-white/5 hover:border-[#5B6CFF]/50 transition">
                    <div className="flex items-start gap-2 mb-2">
                      {t.status === 'done' ? (
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      ) : t.status === 'doing' ? (
                        <Clock size={14} className="text-[#5B6CFF] shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={14} className="text-white/40 shrink-0 mt-0.5" />
                      )}
                      <p className={`text-sm text-white flex-1 font-medium ${t.status === 'done' ? 'line-through opacity-50' : ''}`}>
                        {t.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Flag size={10} className={
                          t.priority === 'high' ? 'text-rose-400' : t.priority === 'medium' ? 'text-amber-400' : 'text-white/40'
                        } />
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5B6CFF] to-indigo-600 flex items-center justify-center text-[9px] font-black text-white">
                          {t.assignee}
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        {col.key !== 'todo' && (
                          <button onClick={() => moveTask(t.id, 'left')} className="w-6 h-6 rounded hover:bg-white/10 text-white/60 text-xs">←</button>
                        )}
                        {col.key !== 'done' && (
                          <button onClick={() => moveTask(t.id, 'right')} className="w-6 h-6 rounded hover:bg-white/10 text-white/60 text-xs">→</button>
                        )}
                        <button className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center text-white/60">
                          <MoreHorizontal size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {newTaskStatus === col.key && (
                  <div className="p-3 bg-black/40 rounded-xl border border-[#5B6CFF]/50">
                    <input
                      autoFocus
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addTask(col.key);
                        if (e.key === 'Escape') setNewTaskStatus(null);
                      }}
                      placeholder="Nova tarefa..."
                      className="w-full bg-transparent text-white text-sm outline-none placeholder-white/30"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => addTask(col.key)} className="px-3 py-1 bg-[#5B6CFF] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        Adicionar
                      </button>
                      <button onClick={() => setNewTaskStatus(null)} className="px-3 py-1 text-white/60 text-[10px] font-black uppercase tracking-widest">
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-white/40 text-[10px] mt-6 uppercase tracking-[0.3em] font-black">
        Dica: passe o mouse sobre uma tarefa pra mover entre colunas
      </p>
    </div>
  );
}
