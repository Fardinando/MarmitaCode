'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
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
  UtensilsCrossed,
  ChefHat,
  Shield,
  Gift,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { SLOGANS } from '@/lib/site-config';

const emptySubscribe = () => () => {};

const TIERS = [
  {
    key: 'basico',
    name: 'Feijão com Arroz',
    price: 'R$ 97',
    icon: Layers,
    desc: 'O básico bem feito: pegue um dos nossos templates e troque cores, marca, fontes e textos. Pronto pra servir.',
    bonus: '+ Integração com WhatsApp grátis',
  },
  {
    key: 'intermediario',
    name: 'Prato Feito',
    price: 'R$ 197',
    icon: UtensilsCrossed,
    desc: 'Template com mais liberdade: mude o fluxo, adicione ou tire funcionalidades, ajuste seções. Ainda é marmita, só que turbinada.',
    bonus: '+ 1 mês de ajustes ilimitados',
  },
  {
    key: 'premium',
    name: 'À la Carte',
    price: 'R$ 397',
    icon: ChefHat,
    desc: 'Site 100% personalizado, desenvolvido do zero a partir do seu prompt. Nada de template — o chef prepara exclusivo pra você.',
    bonus: '+ 3 meses de ajustes ilimitados',
  },
];

const STEPS = [
  { icon: LayoutGrid, title: 'Escolha', desc: 'Navegue pelos templates ou vá de personalizado.' },
  { icon: Palette, title: 'Briefing', desc: 'Responda o questionário: cores, layout, conteúdo.' },
  { icon: Rocket, title: 'Produção', desc: 'Criamos seu site com engenharia de alta performance.' },
  { icon: Globe, title: 'Domínio', desc: 'Cuidamos do registro e apontamento do seu domínio.' },
];

const FAQ = [
  {
    q: 'Isso funciona de verdade?',
    a: 'Já colocamos sites no ar com usuários reais pagando (ApexEnem, AgoraMed). Não é demo nem portfólio: é site em produção, com domínio, SSL e suporte.',
  },
  {
    q: 'Funciona pro meu negócio?',
    a: 'Se você é um pequeno negócio que precisa de presença profissional online — barbearia, clínica, restaurante, loja, prestador de serviço — funciona. Temos template pro seu nicho ou fazemos do zero.',
  },
  {
    q: 'Vou conseguir usar sem entender de código?',
    a: 'Você não mexe em código. Responde um briefing simples (cores, textos, imagens) e entregamos o site pronto. Mudanças depois é só nos chamar no WhatsApp.',
  },
  {
    q: 'Vale o preço comparado a uma agência?',
    a: 'Agência cobra R$ 3.000 a R$ 10.000 e leva 2 a 3 meses. Freelancer é roleta russa. Construtor drag-and-drop te prende numa plataforma cara. A gente entrega em 7 dias a partir de R$ 97.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Garantia de 7 dias. Se não aprovar o site, devolvemos 100% do valor pago. Sem letrinha miúda.',
  },
  {
    q: 'Por que começar agora?',
    a: 'Cada dia sem site é um cliente pesquisando no Google e achando seu concorrente. Em 7 dias o seu está no ar.',
  },
  {
    q: 'Por que MarmitaCode e não outro?',
    a: 'Dev solo, atendimento direto comigo no WhatsApp (nada de "fulano saiu da agência"), código enxuto e performático, e um processo de "cozinha industrial" que entrega em 7 dias sem perder qualidade.',
  },
];

export default function Home() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [sloganIndex, setSloganIndex] = useState(0);
  useEffect(() => {
    // Picking the random slogan client-side avoids SSR/hydration mismatch;
    // we only run it once per visit so the choice is stable within a session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSloganIndex(Math.floor(Math.random() * SLOGANS.length));
  }, []);
  const slogan = SLOGANS[sloganIndex];

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

          <h1 className="text-[9vw] md:text-[5.5rem] font-black tracking-tighter leading-[0.9] uppercase italic mb-6 max-w-5xl">
            Seu site profissional no ar em <span className="text-[#FF8C00]">7 dias</span>.
          </h1>
          <p className="text-white/70 text-lg md:text-2xl font-bold max-w-3xl mb-4 leading-snug">
            Do briefing ao domínio, entregue quentinho. Templates a partir de <b className="text-white">R$ 97</b> ou projetos sob medida — para pequenos negócios que precisam vender online sem virar refém de agência.
          </p>
          <p className="text-white/40 text-xs md:text-sm font-black uppercase tracking-[0.3em] max-w-2xl mb-10 italic">
            {slogan}
          </p>

          <div className="flex flex-col items-center gap-5">
            <Link
              href="/templates"
              className="px-14 py-6 rounded-full bg-[#FF8C00] text-black text-sm font-black uppercase tracking-widest hover:bg-[#FFD700] transition-all flex items-center gap-3 justify-center shadow-[0_0_60px_rgba(255,140,0,0.5)]"
            >
              Ver templates e começar <ArrowRight size={18} />
            </Link>
            <Link
              href="/encomendar/personalizado?tier=personalizado"
              className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white underline underline-offset-4"
            >
              ou quero um site 100% do zero →
            </Link>
          </div>

          {/* Selo de garantia */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Shield size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
              Garantia de 7 dias · Não aprovou? Devolvemos 100%
            </span>
          </div>

          {/* Prova social acima da dobra */}
          <div className="mt-14 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sites nossos no ar agora
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              <Link href="/cases#apexenem" className="text-lg md:text-xl font-black italic uppercase tracking-tight bg-gradient-to-r from-white/80 to-[#5B6CFF]/80 bg-clip-text text-transparent hover:from-white hover:to-[#5B6CFF] transition-all">
                ApexEnem
              </Link>
              <span className="text-white/20">·</span>
              <Link href="/cases#agoramed" className="text-lg md:text-xl font-black italic uppercase tracking-tight bg-gradient-to-r from-white/80 to-[#2DD4BF]/80 bg-clip-text text-transparent hover:from-white hover:to-[#2DD4BF] transition-all">
                AgoraMed
              </Link>
              <span className="text-white/20">·</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                +negócios no ar
              </span>
            </div>
          </div>
        </motion.div>

        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </section>

      {/* PAS — Problema / Agitação / Solução */}
      <section className="relative py-32 px-6 z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-[#FF8C00] mb-5">
              Por que a marmita existe
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95]">
              Site não precisa ser <span className="text-[#FF8C00]">drama.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 mb-4">
                O problema
              </div>
              <p className="text-white/70 font-bold text-[15px] leading-relaxed">
                Agência cobra <b className="text-white">R$ 5.000</b> e some no meio do projeto. Freelancer é roleta russa. Construtor drag-and-drop te prende numa plataforma cara que fica lenta.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 mb-4">
                O que acontece enquanto isso
              </div>
              <p className="text-white/70 font-bold text-[15px] leading-relaxed">
                Enquanto você espera o site ficar pronto, <b className="text-white">seu concorrente está pegando os clientes</b> que pesquisam no Google agora. Cada semana sem site é faturamento perdido.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FF8C00]/5 border border-[#FF8C00]/30">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-4">
                A solução marmita
              </div>
              <p className="text-white/70 font-bold text-[15px] leading-relaxed">
                Padronizamos a produção como uma <b className="text-white">cozinha industrial</b> — mesma qualidade de agência, fração do tempo. Em 7 dias no ar, com domínio, SSL e suporte no WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="como-funciona" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-center mb-6">
            Escolha sua <span className="text-[#FF8C00]">marmita.</span>
          </h2>
          <p className="text-center text-white/50 font-bold text-sm mb-20 max-w-xl mx-auto">
            Pagamento único + manutenção mensal de R$ 47,90 (hospedagem, SSL, backups e suporte).
          </p>
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
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{t.name}</h3>
                  <div className="mb-6">
                    <div className="text-[#FF8C00] font-black text-4xl leading-none">{t.price}</div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-2">
                      Pagamento único · depois R$ 47,90/mês
                    </div>
                  </div>
                  <p className="text-white/50 font-bold leading-relaxed mb-5">{t.desc}</p>
                  <div className="mt-auto flex items-start gap-2 pt-5 border-t border-white/5">
                    <Gift size={16} className="text-[#FF8C00] mt-0.5 shrink-0" />
                    <span className="text-xs font-black text-white/80 leading-snug">{t.bonus}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Faixa de garantia */}
          <div className="mt-12 max-w-3xl mx-auto p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Shield size={22} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-black uppercase tracking-wider text-emerald-300 mb-1">
                Garantia de 7 dias
              </div>
              <p className="text-white/70 text-sm font-bold leading-snug">
                Se em 7 dias você não aprovar o site, devolvemos <b className="text-white">100% do valor pago</b>. Sem letrinha miúda.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/planos" className="text-[11px] font-black uppercase tracking-widest text-[#FF8C00] hover:underline">
              Comparar planos em detalhe →
            </Link>
          </div>
        </div>
      </section>

      {/* FORA DO CARDÁPIO — destaque grande */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-black p-10 md:p-16">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/30 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-[120px]" />
            <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">
                    Fora do Cardápio
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                  Não é site? <span className="bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent">A gente faz também.</span>
                </h2>
                <p className="text-white/70 text-base md:text-lg font-bold leading-relaxed mb-8 max-w-xl">
                  Sistema de estoque, bot de WhatsApp, automação, app mobile, software desktop,
                  dashboard administrativo — se dá pra programar, está no menu.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Sistema de estoque', 'Bot WhatsApp', 'App Mobile', 'Software Desktop', 'Automação', 'Dashboard'].map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/fora-do-cardapio"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-emerald-500 text-black text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_60px_rgba(16,185,129,0.5)]"
                >
                  Conhecer Fora do Cardápio <ArrowRight size={14} />
                </Link>
              </div>
              <div className="relative hidden md:block">
                <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">🍲</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">
                      Prato especial
                    </div>
                    <div className="text-3xl font-black italic uppercase tracking-tighter mt-2 text-white">
                      Sob encomenda
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* CASES — sites reais */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                Sites nossos no ar agora
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
              Trabalhos <span className="text-[#FF8C00]">em produção.</span>
            </h2>
            <p className="text-white/50 text-lg font-bold max-w-2xl mx-auto">
              Não é só template bonito — a gente lança e mantém sites no ar com usuários reais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Link
              href="/cases#apexenem"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#5B6CFF]/20 to-black p-10 hover:border-[#5B6CFF]/50 transition-all"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#5B6CFF]/20 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5B6CFF] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B6CFF] animate-pulse" />
                  No ar · EdTech
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-3 bg-gradient-to-r from-white to-[#5B6CFF] bg-clip-text text-transparent">
                  ApexEnem
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Plataforma inteligente para o ENEM — correção de redação por IA, simulados adaptativos e acompanhamento de evolução.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-black text-[#5B6CFF]">7d</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">entrega</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-black text-[#5B6CFF]">99,9%</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">uptime</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-black text-[#5B6CFF]">IA</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">redação</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#5B6CFF] group-hover:gap-3 transition-all">
                  Ver case completo <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link
              href="/cases#agoramed"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2DD4BF]/20 to-black p-10 hover:border-[#2DD4BF]/50 transition-all"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2DD4BF]/20 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2DD4BF] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                  No ar · Área de membros
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-3 bg-gradient-to-r from-white to-[#2DD4BF] bg-clip-text text-transparent">
                  AgoraMed
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Área de membros pra médicos residentes — cursos, trilhas e acompanhamento, com UX pensada para o ambiente de plantão.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-black text-[#2DD4BF]">14d</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">entrega</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-black text-[#2DD4BF]">24/7</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">acesso</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-black text-[#2DD4BF]">LGPD</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">médico</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2DD4BF] group-hover:gap-3 transition-all">
                  Ver case completo <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white"
            >
              Todos os cases <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* DOMAIN */}
      <section id="dominio" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Globe size={14} /> Domínio próprio
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-8">
              Seu site, seu <span className="text-[#FF8C00]">domínio.</span>
            </h2>
            <p className="text-white/50 text-lg font-bold leading-relaxed mb-8">
              Você registra o seu domínio direto no <b className="text-white">Registro.br</b> — simples e rápido. Enviamos
              um <b className="text-white">tutorial passo a passo</b> depois do pedido, e cuidamos de toda a configuração
              técnica (DNS, apontamento, SSL).
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-sm font-bold text-white/70">
                <Check size={18} className="text-[#FF8C00]" /> Você escolhe e registra no Registro.br
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-white/70">
                <Check size={18} className="text-[#FF8C00]" /> Tutorial completo enviado por e-mail
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-white/70">
                <Lock size={18} className="text-[#FF8C00]" /> Nós fazemos toda a configuração técnica
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
                <p className="text-white/40 font-bold">Você compra o domínio direto no Registro.br. A gente faz a configuração técnica.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — responde as 7 objeções */}
      <section id="faq" className="relative py-32 px-6 z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.35em] text-[#FF8C00] mb-5">
              Perguntas que a gente ouve toda semana
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95]">
              Tira a <span className="text-[#FF8C00]">dúvida.</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-6">
                  <span className="text-base md:text-lg font-black text-white pr-2">{item.q}</span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/30 flex items-center justify-center text-[#FF8C00] text-xl font-black transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-white/60 font-bold text-[15px] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-40 px-6 z-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
            Pronto para <span className="text-[#FF8C00]">começar?</span>
          </h2>
          <p className="text-white/50 text-lg font-bold mb-12 max-w-2xl mx-auto">
            Escolha um template, responda o briefing e receba seu site no ar em 7 dias. Se não aprovar, devolvemos 100%.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-[#FF8C00] text-black text-[12px] font-black uppercase tracking-widest hover:bg-[#FFD700] transition-all shadow-[0_0_60px_rgba(255,140,0,0.4)]"
          >
            Ver templates e começar <ArrowRight size={16} />
          </Link>
          <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400/80">
            <Shield size={12} />
            Garantia de 7 dias · Sem letrinha miúda
          </div>
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
