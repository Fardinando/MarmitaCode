'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { AIObserver } from '@/components/AIObserver';
import { 
  Zap, Code2, Rocket, CheckCircle2, 
  ArrowRight, Search, LayoutPanelLeft, Box, ShoppingBag, 
  Settings, Layers, MousePointer2, ShieldAlert, Cpu, Lock, Globe,
  HelpCircle, Sparkles, Terminal, ChevronRight, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Optimized Product List
const PRODUCTS = [
    { cat: 'SITES', title: "Site Personalizado", price: 400, monthly: 75, desc: "Sua visão, nosso código. Identidade exclusiva projetada para converter.", type: 'personalizado', tag: 'Top Vendas' },
    { cat: 'SITES', title: "Site Modelo", price: 300, monthly: 75, desc: "Estrutura ágil e refinada. O ponto de partida ideal para o seu sucesso.", type: 'modelo', tag: 'Econômico' },
    { cat: 'ESTOQUE', title: "Estoque Personalizado", price: 620, monthly: 120, desc: "Gestão inteligente de inventário desenhada para o seu fluxo logístico.", type: 'personalizado' },
    { cat: 'ESTOQUE', title: "Estoque + Automação", price: 800, monthly: 140, desc: "O sistema que pensa: reposição automática quando o item atinge o limite.", type: 'personalizado', tag: 'Escala' },
    { cat: 'ESTOQUE', title: "Estoque Modelo", price: 450, monthly: 120, desc: "Organização padrão de alto nível. Simplicidade que funciona.", type: 'modelo' },
    { cat: 'ESTOQUE', title: "Estoque Modelo + Auto", price: 600, monthly: 140, desc: "Reposição automática em um pacote acessível e estável.", type: 'modelo' },
    { cat: 'KITS', title: "Kit Total Personalizado", price: 900, monthly: 125, desc: "A união definitiva: Site + Gestão sem automações externas.", type: 'personalizado' },
    { cat: 'KITS', title: "Kit Total + Automação", price: 1100, monthly: 125, desc: "O auge da engenharia: Tudo integrado com automação industrial.", type: 'personalizado', tag: 'Premium' },
    { cat: 'KITS', title: "Kit Total Modelo", price: 620, monthly: 125, desc: "Combo padrão otimizado. Profissionalismo instantâneo.", type: 'modelo' },
    { cat: 'KITS', title: "Kit Total Modelo + Auto", price: 820, monthly: 125, desc: "Combo padrão com o poder da reposição inteligente.", type: 'modelo' },
    { cat: 'ESPECIAL', title: "E-commerce Pro", price: 700, monthly: 140, desc: "Plataforma de vendas robusta com catálogo e checkout integrado.", type: 'especial' },
    { cat: 'ESPECIAL', title: "Automações", price: 200, monthly: 0, desc: "Micro-engenharia sob demanda. Resolva problemas via Zap.", type: 'especial', prefix: 'a partir de' },
    { cat: 'ESPECIAL', title: "Kit Necessidades", price: 'Variável', monthly: 'Consultar', desc: "Consultoria pura. Construímos o que você imaginar.", type: 'especial' }
];

const MENSALIDADES = [
    { title: "Kits", price: 125 },
    { title: "Sites Simples", price: 75 },
    { title: "Estoque s/ Auto", price: 120 },
    { title: "Estoque c/ Auto", price: 140 },
    { title: "E-commerce", price: 140 }
];

export default function Home() {
  const [filter, setFilter] = useState<'todos' | 'personalizado' | 'modelo'>('todos');
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => filter === 'todos' || p.type === filter || p.type === 'especial');

  return (
    <main className="relative bg-[#000] text-white min-h-screen selection:bg-[#FF8C00] selection:text-black font-sans leading-relaxed active-cursor-none overflow-x-hidden">
      <AIObserver />
      <WhatsAppWidget />
      
      {/* Custom Magnetic Cursor */}
      {mounted && (
          <motion.div 
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#FF8C00] pointer-events-none z-[999] mix-blend-difference hidden md:block"
            style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
          />
      )}

      {/* Cinematic Environmental Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] contrast-200" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ 
                background: `radial-gradient(1200px circle at var(--x) var(--y), rgba(255,140,0,0.1), transparent 70%)`,
                // @ts-ignore
                '--x': useTransform(mouseX, x => `${x}px`),
                '--y': useTransform(mouseY, y => `${y}px`)
            } as any}
          />
      </div>

      {/* Hero Section: The "Wow" Opener */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center flex flex-col items-center"
          >
              <div className="mb-20 scale-125 drop-shadow-[0_0_30px_rgba(255,140,0,0.4)]">
                 <Logo />
              </div>

              <div className="relative">
                  <motion.h1 
                    className="text-[10vw] md:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase italic mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                  >
                    Marmita<span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1.5px white' }}>Code</span>
                  </motion.h1>
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    className="h-1 bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent mb-16" 
                  />
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                  <p className="text-white/40 text-xl font-black uppercase tracking-[0.4em] max-w-xl">
                      Engenharia Digital <span className="text-[#FF8C00]">Sem Precedentes.</span>
                  </p>
                  <div className="flex gap-4">
                      <div className="w-12 h-[1px] bg-white/20 mt-3" />
                      <div className="text-left">
                          <span className="block text-[10px] font-black text-white/20 uppercase tracking-widest">Status: Ready</span>
                          <span className="text-[#FF8C00] font-mono text-sm leading-none tracking-tighter">SOLUÇÃO ENTREGUE QUENTINHA</span>
                      </div>
                  </div>
              </div>
          </motion.div>

          {/* Decorative Floating Elements */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </section>

      {/* Feature Section: The AI Sentience */}
      <section className="relative py-60 px-6 z-10">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-32">
                  <div className="flex-1 space-y-12">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <ShieldAlert size={14} /> Exclusividade MarmitaCode
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 uppercase leading-none">A IA QUE <br /> <span className="text-[#FF8C00]">NUNCA DORME.</span></h2>
                    <p className="text-white/50 text-xl font-medium leading-relaxed mb-12">
                          Nossos sistemas são vivos. Implementamos uma camada de inteligência que monitora, analisa e executa correções em tempo real. Você não compra apenas software, você adquire uma <span className="text-white underline decoration-[#FF8C00] decoration-8">sentinela digital.</span>
                      </p>
                      <div className="grid grid-cols-2 gap-8">
                          <FeatureMini icon={<ShieldAlert />} label="IMUNE A FALHAS" />
                          <FeatureMini icon={<Cpu />} label="CORE ATIVO" />
                      </div>
                  </div>
                  <div className="flex-1 w-full relative">
                      <div className="absolute -inset-10 bg-[#FF8C00]/20 blur-[100px] rounded-full" />
                      <div className="relative bg-white/[0.03] border border-white/5 backdrop-blur-3xl rounded-[4rem] p-16 shadow-2xl overflow-hidden">
                          <div className="absolute top-0 right-0 p-12 opacity-5"><Activity size={180} /></div>
                          <div className="relative z-10 space-y-12">
                              <div className="flex items-center gap-4">
                                  <div className="w-4 h-4 bg-green-500 rounded-full animate-ping" />
                                  <span className="font-mono text-xs tracking-widest uppercase">Guard Status: Pulsing</span>
                              </div>
                              <TerminalText />
                              <div className="pt-12 border-t border-white/5 flex gap-8">
                                  <div>
                                      <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Fixes (24h)</span>
                                      <span className="text-4xl font-black text-[#FF8C00]">12.4k</span>
                                  </div>
                                  <div>
                                      <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Latency</span>
                                      <span className="text-4xl font-black text-[#FF8C00]">0.4ms</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Decision Wizard: Model vs Custom */}
      <section className="relative py-40 px-6 z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-20 text-center uppercase italic">Qual Marmita <span className="text-[#FF8C00]">Escolher?</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <DecisionPanel 
                    title="PERSONALIZADO" 
                    type="premium"
                    desc="Para marcas que buscam soberania. Um sistema forjado exclusivamente para suas regras de negócio."
                    features={["Design Único sob-medida", "Lógica de negócio complexa", "Consultoria de arquitetura"]}
                />
                <DecisionPanel 
                    title="MODELO" 
                    type="standard"
                    desc="Para negócios que buscam agilidade. Nossa infraestrutura premium pronta para escala imediata."
                    features={["Implementação em tempo recorde", "Estrutura validada pelo mercado", "Custo-benefício otimizado"]}
                />
            </div>
        </div>
      </section>

      {/* Monthly Structure (Above Menu) */}
      <section className="relative py-40 px-6 z-10 bg-[#050505]">
          <div className="max-w-7xl mx-auto text-center">
              <h3 className="text-[10px] font-black tracking-[0.8em] text-[#FF8C00] uppercase mb-8">Base de Manutenção Mensal</h3>
              <div className="flex flex-wrap justify-center gap-12">
                  {MENSALIDADES.map(m => (
                      <motion.div 
                        key={m.title}
                        whileHover={{ scale: 1.05 }}
                        className="text-center group"
                      >
                          <span className="block text-[9px] font-black text-white/20 uppercase tracking-widest mb-3 group-hover:text-white transition-colors">{m.title}</span>
                          <div className="text-5xl font-black tabular-nums">R${m.price}<span className="text-[10px] text-white/10 uppercase font-black ml-2 tracking-tighter">/mês</span></div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* The Menu (Cardápio) */}
      <section id="menu" className="relative py-60 px-6 z-10">
        <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 px-4">
                <div className="max-w-3xl">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">O <span className="text-[#FF8C00]">MENU.</span></h2>
                    <p className="text-white/40 text-lg font-bold mt-4">Soluções tecnológicas prontas para servir.</p>
                </div>
                <div className="flex p-3 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                    {['todos', 'personalizado', 'modelo'].map((t) => (
                        <button key={t} onClick={() => setFilter(t as any)} className={cn("px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-widest transition-all", filter === t ? "bg-[#FF8C00] text-black shadow-2xl shadow-[#FF8C00]/40" : "text-white/30 hover:text-white/60")}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((p, i) => (
                        <ModuleCard key={p.title} product={p} i={i} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Footer: The Last Impression */}
      <footer className="relative py-40 px-6 z-10 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center gap-20">
                  <Logo className="scale-[2] grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 cursor-pointer" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-20 w-full pt-20 border-t border-white/5">
                      <div className="md:col-span-2 space-y-8">
                          <h4 className="text-xs font-black tracking-[0.4em] uppercase text-[#FF8C00]">MarmitaCode • Sede Brasil</h4>
                          <p className="text-white/30 text-lg font-medium leading-relaxed italic max-w-sm">
                              "Nossa missão é simples: tornar sua empresa inquebrável através de engenharia digital de alta performance."
                          </p>
                      </div>
                      <div className="space-y-6">
                           <h4 className="text-xs font-black tracking-widest uppercase text-white/20">Contato</h4>
                           <span className="block text-xl font-black">Fernando Sousa</span>
                           <span className="block text-white/40 font-bold">+55 (83) 99653-2203</span>
                      </div>
                      <div className="space-y-6">
                           <h4 className="text-xs font-black tracking-widest uppercase text-white/20">Sociais</h4>
                           <div className="flex flex-col gap-2 font-bold text-sm text-[#FF8C00]">
                               <a href="#" className="hover:underline">INSTAGRAM</a>
                               <a href="#" className="hover:underline">LINKEDIN</a>
                               <a href="#" className="hover:underline">REPOSITÓRIO</a>
                           </div>
                      </div>
                  </div>

                  <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/10 mt-20">
                      <span>SOLUÇÃO ENTREGUE QUENTINHA © 2026</span>
                      <div className="flex gap-4">
                          <span className="text-green-500/30">IA GUARD ACTIVE</span>
                          <span className="text-blue-500/30">NEXTJS ENGINE</span>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
    </main>
  );
}

function FeatureMini({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col gap-6 group hover:border-[#FF8C00]/30 transition-all">
            <div className="text-[#FF8C00] group-hover:scale-110 transition-transform">{icon}</div>
            <span className="text-[10px] font-black tracking-widest text-white/60">{label}</span>
        </div>
    );
}

function TerminalText() {
    return (
        <div className="font-mono text-sm text-white/30 space-y-1">
            <p><span className="text-[#FF8C00]">➜</span> system_integrity: [SCANNING...]</p>
            <p><span className="text-[#FF8C00]">➜</span> code_analysis: COMPLETED</p>
            <p><span className="text-green-500 font-bold">➜ [SUCCESS] No leaks detected.</span></p>
            <p><span className="text-[#FF8C00]">➜</span> latency_check: [OPTIMIZING...]</p>
        </div>
    );
}

function DecisionPanel({ title, type, desc, features }: { title: string, type: 'premium' | 'standard', desc: string, features: string[] }) {
    return (
        <div className={cn(
            "p-16 flex flex-col justify-center gap-12 group transition-all duration-700",
            type === 'premium' ? "hover:bg-[#FF8C00]/10" : "hover:bg-blue-500/10"
        )}>
            <h3 className="text-5xl font-black italic tracking-tighter uppercase">{title}</h3>
            <p className="text-white/40 text-xl font-bold leading-relaxed">{desc}</p>
            <ul className="space-y-6">
                {features.map(f => (
                    <li key={f} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/80">
                        <div className={cn("w-2 h-2 rounded-full", type === 'premium' ? "bg-[#FF8C00]" : "bg-blue-500")} /> {f}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ModuleCard({ product, i }: { product: typeof PRODUCTS[0], i: number }) {
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 hover:bg-white/[0.05] hover:border-[#FF8C00]/30 transition-all duration-500 overflow-hidden min-h-[620px]"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8C00]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.4em]">{product.cat}</span>
                {product.tag && (
                    <span className="bg-[#FF8C00] text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(255,140,0,0.2)]">
                        {product.tag}
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
                <h3 className="text-3xl font-black tracking-tighter leading-[0.9] uppercase italic group-hover:text-[#FF8C00] transition-colors">
                    {product.title}
                </h3>
                <p className="text-white/30 text-sm font-bold leading-relaxed">{product.desc}</p>
            </div>

            <div className="mt-auto space-y-8 pt-12 border-t border-white/5">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Setup Único</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-black text-white/40 italic">R$</span>
                                <span className="text-5xl font-black tabular-nums">{typeof product.price === 'number' ? `${product.price}` : product.price}</span>
                            </div>
                        </div>
                    </div>
                    {product.monthly !== 0 && (
                        <div className="p-6 bg-[#FF8C00]/10 border border-[#FF8C00]/20 rounded-[2rem] flex flex-col gap-1">
                            <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.2em]">Mensalidade do Sistema</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-[#FF8C00]">R${product.monthly}</span>
                                <span className="text-[8px] font-black text-[#FF8C00]/60 uppercase italic">Suporte Vitalício</span>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => window.open(`https://wa.me/5583996532203?text=Olá equipe! Gostaria de encomendar o ${product.title}`, '_blank')}
                    className="w-full py-6 bg-white text-black font-black text-xs rounded-3xl flex items-center justify-center gap-3 hover:gap-8 transition-all hover:bg-[#FF8C00] active:scale-95 shadow-2xl"
                >
                    ENCOMENDAR SISTEMA <ChevronRight size={20} />
                </button>
            </div>
        </motion.div>
    );
}
