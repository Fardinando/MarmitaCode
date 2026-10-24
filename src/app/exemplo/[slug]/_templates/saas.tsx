'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Shield, Users, ArrowRight, Plus, MoreHorizontal, CheckCircle2, Circle, Clock, Flag, TrendingUp } from 'lucide-react';

const FEATURES = [
  { icon: Zap, title: 'Rápido como pensamento', desc: 'Resposta média de 80ms em qualquer região do Brasil.' },
  { icon: Shield, title: 'Segurança bancária', desc: 'ISO 27001, LGPD-ready e criptografia ponta a ponta.' },
  { icon: Users, title: 'Multi-usuário', desc: 'Convide seu time, defina papéis e permissões.' },
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
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="sticky top-10 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
            Linear<span className="text-blue-600">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-slate-600 font-medium">
            <a href="#features" className="hover:text-slate-900">Recursos</a>
            <a href="#demo" className="hover:text-slate-900">Demo ao vivo</a>
            <a href="#precos" className="hover:text-slate-900">Preços</a>
            <a className="hover:text-slate-900">Clientes</a>
          </div>
          <div className="flex gap-3">
            <a className="text-sm font-bold hidden sm:inline">Entrar</a>
            <a href="#precos" className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-700">
              Teste grátis
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-8 border border-blue-200">
            ✨ Novo: integração com Slack e GitHub
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent">
            Gerencie projetos<br />com clareza cirúrgica.
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto mb-10">
            A plataforma de gestão que seu time vai realmente usar. Teste agora, sem precisar de cadastro.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#demo" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2">
              Experimentar agora <ArrowRight size={16} />
            </a>
            <a href="#precos" className="px-8 py-4 border border-slate-300 rounded-xl font-bold hover:bg-slate-50">
              Ver planos
            </a>
          </div>
          <p className="text-slate-500 text-xs mt-6">14 dias grátis · sem cartão de crédito</p>
        </div>
      </section>

      {/* Logos */}
      <section className="py-10 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 font-bold mb-6">
            Mais de 2.000 times usam Linear
          </p>
          <div className="flex items-center justify-around flex-wrap gap-8 opacity-50">
            {['NUBANK', 'LOGGI', 'IFOOD', 'MERCADO LIVRE', 'STONE', 'HOTMART'].map((l) => (
              <span key={l} className="font-black text-sm sm:text-xl text-slate-400 tracking-widest">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO INTERATIVA DO PRODUTO */}
      <section id="demo" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-blue-600 text-sm uppercase tracking-widest font-bold mb-4 text-center">Demo ao vivo</p>
        <h2 className="text-5xl font-black text-center mb-6">Experimente aqui mesmo.</h2>
        <p className="text-slate-600 text-center mb-16 max-w-xl mx-auto">
          Sem cadastro, sem download. Mova tarefas, crie novas, veja o produto em ação exatamente como o seu time usaria.
        </p>

        <KanbanDemo />
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-blue-600 text-sm uppercase tracking-widest font-bold mb-4 text-center">O que entregamos</p>
          <h2 className="text-5xl font-black text-center mb-16">Tudo que seu time precisa.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 rounded-3xl bg-white border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-blue-400 text-5xl mb-8">❝</div>
          <p className="text-3xl md:text-4xl font-bold leading-tight mb-10">
            Em três meses, cortamos pela metade o tempo que o time passava em reuniões.
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop" alt="CEO" className="w-14 h-14 rounded-full object-cover" />
            <div className="text-left">
              <div className="font-bold">Mariana Oliveira</div>
              <div className="text-slate-400 text-sm">COO · Hotmart</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center mb-6">Preços transparentes.</h2>
        <p className="text-slate-600 text-center mb-16">Sem letras miúdas. Cancele quando quiser.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`p-10 rounded-3xl ${
                p.featured
                  ? 'bg-slate-900 text-white border-2 border-slate-900 scale-105 shadow-2xl'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div className={`text-xs font-black uppercase tracking-widest mb-3 ${p.featured ? 'text-blue-400' : 'text-blue-600'}`}>
                {p.name}
              </div>
              <div className="text-5xl font-black mb-2">{p.price}</div>
              <p className={`mb-8 text-sm ${p.featured ? 'text-slate-300' : 'text-slate-500'}`}>{p.desc}</p>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={p.featured ? 'text-blue-400' : 'text-blue-600'} />
                    {f}
                  </li>
                ))}
              </ul>
              <a className={`block py-3 text-center rounded-xl font-bold ${p.featured ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                Começar
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 text-center text-slate-500 text-sm">
        © Linear · <Link href="/encomendar/saas" className="text-blue-600 font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}

// Kanban demo interativo
function KanbanDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskStatus, setNewTaskStatus] = useState<Task['status'] | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const columns: { key: Task['status']; label: string; color: string }[] = [
    { key: 'todo', label: 'A fazer', color: 'bg-slate-100' },
    { key: 'doing', label: 'Em andamento', color: 'bg-blue-50' },
    { key: 'done', label: 'Concluído', color: 'bg-emerald-50' },
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
    <div className="rounded-3xl bg-slate-900 p-5 md:p-8 shadow-2xl border border-slate-800">
      {/* Fake app header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
          <div className="text-white">
            <div className="text-xs text-slate-400">Projeto · Lançamento MVP</div>
            <div className="font-bold text-sm">Sprint 24</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <TrendingUp size={14} className="text-emerald-400" />
          <span>{tasks.filter((t) => t.status === 'done').length}/{tasks.length} concluídas</span>
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="bg-slate-800/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest font-black text-slate-300">{col.label}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-700 rounded-full text-slate-400 font-bold">{colTasks.length}</span>
                </div>
                <button
                  onClick={() => { setNewTaskStatus(col.key); setNewTitle(''); }}
                  className="w-6 h-6 rounded-md hover:bg-slate-700 flex items-center justify-center text-slate-400"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {colTasks.map((t) => (
                  <div key={t.id} className="group p-3 bg-slate-900 rounded-xl border border-slate-700 hover:border-blue-500/50 transition">
                    <div className="flex items-start gap-2 mb-2">
                      {t.status === 'done' ? (
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      ) : t.status === 'doing' ? (
                        <Clock size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={14} className="text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <p className={`text-sm text-white flex-1 ${t.status === 'done' ? 'line-through opacity-50' : ''}`}>
                        {t.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Flag size={10} className={
                          t.priority === 'high' ? 'text-rose-400' : t.priority === 'medium' ? 'text-amber-400' : 'text-slate-500'
                        } />
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[9px] font-black text-white">
                          {t.assignee}
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        {col.key !== 'todo' && (
                          <button onClick={() => moveTask(t.id, 'left')} className="w-6 h-6 rounded hover:bg-slate-700 text-slate-400 text-xs">←</button>
                        )}
                        {col.key !== 'done' && (
                          <button onClick={() => moveTask(t.id, 'right')} className="w-6 h-6 rounded hover:bg-slate-700 text-slate-400 text-xs">→</button>
                        )}
                        <button className="w-6 h-6 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400">
                          <MoreHorizontal size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {newTaskStatus === col.key && (
                  <div className="p-3 bg-slate-900 rounded-xl border border-blue-500/50">
                    <input
                      autoFocus
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addTask(col.key);
                        if (e.key === 'Escape') setNewTaskStatus(null);
                      }}
                      placeholder="Nova tarefa..."
                      className="w-full bg-transparent text-white text-sm outline-none placeholder-slate-500"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => addTask(col.key)} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                        Adicionar
                      </button>
                      <button onClick={() => setNewTaskStatus(null)} className="px-3 py-1 text-slate-400 text-xs">
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

      <p className="text-center text-slate-500 text-xs mt-6 uppercase tracking-widest">
        Dica: passe o mouse sobre uma tarefa pra mover entre colunas
      </p>
    </div>
  );
}
