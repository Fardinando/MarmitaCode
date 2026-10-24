'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  LayoutGrid,
  Palette,
  Rocket,
  Globe,
  Check,
  ArrowRight,
  Layers,
  Wrench,
  Lock,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

const emptySubscribe = () => () => {};

const TIERS = [
  {
    key: 'basico',
    name: 'Básico',
    icon: Layers,
    desc: 'Um dos nossos templates, com o essencial trocado: logomarca, cores e textos.',
  },
  {
    key: 'intermediario',
    name: 'Intermediário',
    icon: Palette,
    desc: 'Template com mais liberdade: animações, ordem das seções e fluxos ajustáveis.',
  },
  {
    key: 'premium',
    name: '100% Personalizado',
    icon: Rocket,
    desc: 'Do zero, exatamente como você imaginou. Ou fortemente baseado em um template.',
  },
];

const STEPS = [
  { icon: LayoutGrid, title: 'Escolha', desc: 'Navegue pelos templates ou vá de personalizado.' },
  { icon: Palette, title: 'Briefing', desc: 'Responda o questionário: cores, layout, conteúdo.' },
  { icon: Rocket, title: 'Produção', desc: 'Criamos seu site com engenharia de alta performance.' },
  { icon: Globe, title: 'Domínio', desc: 'Cuidamos do registro e apontamento do seu domínio.' },
];

export default function Home() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const spotlight = useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(255,140,0,0.08), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative bg-black text-white min-h-screen selection:bg-[#FF8C00] selection:text-black font-sans overflow-x-hidden"
    >
      <WhatsAppWidget />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.06]" />
        {mounted && <motion.div className="absolute inset-0" style={{ background: spotlight }} />}
      </div>

      {/* HERO */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="mb-16 scale-125 drop-shadow-[0_0_30px_rgba(255,140,0,0.4)]">
            <Logo />
          </div>

          <h1 className="text-[11vw] md:text-[7.5rem] font-black tracking-tighter leading-[0.85] uppercase italic mb-8">
            Sites que <span className="text-[#FF8C00]">vendem.</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl font-black uppercase tracking-[0.3em] max-w-2xl mb-14">
            Templates prontos ou projetos 100% sob medida — do briefing ao ar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/templates"
              className="px-10 py-5 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700] transition-all flex items-center gap-3 justify-center"
            >
              Ver templates <ArrowRight size={16} />
            </Link>
            <Link
              href="/encomendar/personalizado?tier=personalizado"
              className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Quero do zero
            </Link>
          </div>
        </motion.div>

        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </section>

      {/* TIERS */}
      <section id="como-funciona" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-center mb-20">
            Três níveis de <span className="text-[#FF8C00]">customização.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-10 rounded-[2.5rem] border flex flex-col ${
                    i === 2 ? 'bg-[#FF8C00]/5 border-[#FF8C00]/30' : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <Icon size={34} className="text-[#FF8C00] mb-8" />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{t.name}</h3>
                  <p className="text-white/40 font-bold leading-relaxed">{t.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link href="/planos" className="text-[11px] font-black uppercase tracking-widest text-[#FF8C00] hover:underline">
              Comparar planos em detalhe →
            </Link>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="relative py-32 px-6 z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-center mb-20">
            Como <span className="text-[#FF8C00]">funciona.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">0{i + 1}</span>
                  <Icon size={30} className="text-[#FF8C00] my-6" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-3">{s.title}</h3>
                  <p className="text-white/40 text-sm font-bold leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOMAIN */}
      <section id="dominio" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Globe size={14} /> Domínio por nós
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-8">
              Nós cuidamos do seu <span className="text-[#FF8C00]">domínio.</span>
            </h2>
            <p className="text-white/50 text-lg font-bold leading-relaxed mb-8">
              Você escolhe o período e nós registramos no <b className="text-white">Registro.br</b> com as nossas
              credenciais como <b className="text-white">administrador</b>. Você permanece o <b className="text-white">dono</b> do domínio.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-sm font-bold text-white/70">
                <Check size={18} className="text-[#FF8C00]" /> Planos de 1, 2, 3, 5 e 10 anos
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-white/70">
                <Check size={18} className="text-[#FF8C00]" /> Taxa do Registro.br (anual) + mão de obra única
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-white/70">
                <Lock size={18} className="text-[#FF8C00]" /> Você ainda efetiva a compra no Registro.br
              </li>
            </ul>
            <Link
              href="/templates"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FF8C00] transition-all"
            >
              Começar agora <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-[#FF8C00]/10 blur-[100px] rounded-full" />
            <div className="relative bg-white/[0.03] border border-white/5 rounded-[3rem] p-12 flex items-center justify-center">
              <div className="text-center">
                <Wrench size={60} className="text-[#FF8C00] mx-auto mb-6" />
                <p className="text-white/40 font-bold">Mão de obra única + taxa anual controlada pelo Registro.br.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-40 px-6 z-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
            Pronto para <span className="text-[#FF8C00]">começar?</span>
          </h2>
          <p className="text-white/40 text-lg font-bold mb-12">
            Escolha um template, responda o briefing e receba sua solução entregue quentinha.
          </p>
          <Link
            href="/templates"
            className="inline-block px-12 py-6 rounded-full bg-[#FF8C00] text-black text-[12px] font-black uppercase tracking-widest hover:bg-[#FFD700] transition-all"
          >
            Ver todos os templates
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-24 px-6 z-10 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
          <Logo className="scale-125 grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full pt-16 border-t border-white/5">
            <div className="md:col-span-2 space-y-6">
              <h4 className="text-xs font-black tracking-[0.4em] uppercase text-[#FF8C00]">MarmitaCode • Sede Brasil</h4>
              <p className="text-white/30 text-lg font-medium italic max-w-sm">
                “Sua empresa inquebrável através de engenharia digital de alta performance.”
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-widest uppercase text-white/20">Contato</h4>
              <span className="block text-lg font-black">Fernando Sousa</span>
              <span className="block text-white/40 font-bold">+55 (83) 99653-2203</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-widest uppercase text-white/20">Plataforma</h4>
              <div className="flex flex-col gap-2 font-bold text-sm text-[#FF8C00]">
                <Link href="/templates" className="hover:underline">Templates</Link>
                <Link href="/planos" className="hover:underline">Planos</Link>
                <Link href="/conta" className="hover:underline">Minha conta</Link>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
            <span>SOLUÇÃO ENTREGUE QUENTINHA © 2026</span>
            <span className="text-blue-500/30">NEXTJS ENGINE</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
