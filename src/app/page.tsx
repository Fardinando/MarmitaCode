'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Stars, PerspectiveCamera } from '@react-three/drei';
import { Marmita3D } from '@/components/Marmita3D';
import { Logo } from '@/components/Logo';
import { 
  ChefHat, Code2, Zap, Rocket, CheckCircle2, 
  MessageSquare, Star, ArrowRight, ChevronLeft, 
  ChevronRight, ShoppingCart, ShieldCheck, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  { id: 'site-modelo', title: "Site Modelo", price: 300, monthly: 75, features: ["Design Pré-aprovado", "Responsivo", "Suporte Mensal"] },
  { id: 'estoque-simples', title: "Controle de Estoque", price: 620, monthly: 120, features: ["Painel Administrativo", "Gestão de Items", "Relatórios"], recommended: true },
  { id: 'ecommerce', title: "E-commerce Full", price: 700, monthly: 140, features: ["Loja Completa", "Checkout Integrado", "Gestão de Pedidos"] },
  { id: 'kit-pro', title: "Kit Personalizado Pro", price: 1100, monthly: 140, features: ["Site + Estoque", "Compra Automática", "Integração Total"] },
  { id: 'automacao', title: "Automação", price: 350, features: ["WhatsApp Bots", "Integração API", "Redução de Tempo"] }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return smoothProgress.onChange(v => setProgress(v));
  }, [smoothProgress]);

  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.8]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenCheckout = (plan: typeof PLANS[0]) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  return (
    <main ref={containerRef} className="relative bg-[#050505] text-white selection:bg-[#FF8C00] selection:text-black">
      {/* Premium 3D Stage */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas shadows camera={{ position: [0, 0.5, 6], fov: 35 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <Environment preset="studio" />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow color="#FF8C00" />
          <pointLight position={[-10, -10, -10]} color="#444" intensity={1} />
          
          <Marmita3D scrollProgress={progress} />
          
          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.6} 
            scale={15} 
            blur={2.5} 
            far={5} 
            color="#FF8C00"
          />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all">
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl px-6 py-3 flex items-center gap-12">
          <Logo className="cursor-pointer" />
          <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-white/50">
            <button onClick={() => scrollTo('hero')} className="hover:text-[#FF8C00] transition-colors">Home</button>
            <button onClick={() => scrollTo('servicos')} className="hover:text-[#FF8C00] transition-colors">Diferenciais</button>
            <button onClick={() => scrollTo('precos')} className="hover:text-[#FF8C00] transition-colors">Cardápio</button>
          </div>
        </div>
        <button 
          onClick={() => scrollTo('precos')}
          className="group relative px-8 py-4 bg-white text-black font-black rounded-2xl overflow-hidden hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,140,0,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            PEDIR AGORA <ShoppingCart size={18} />
          </span>
          <div className="absolute inset-0 bg-[#FF8C00] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-[120vh] flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#FF8C00]/30 bg-[#FF8C00]/10 text-[#FF8C00] text-xs font-black tracking-widest mb-8"
          >
            SOFTWARE AS A SERVICE • PREMIUM HOT DELIVERY
          </motion.span>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] mix-blend-difference">
            SERVINDO A<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-white bg-[length:200%_auto] animate-gradient">SOLUÇÃO</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/40 max-w-3xl mx-auto font-medium leading-tight mb-12">
            Tecnologia personalizada e pronta para consumo. <br className="hidden md:block" />
            Sua empresa merece um sistema entregue quentinho.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollTo('precos')}
              className="px-12 py-6 bg-[#FF8C00] text-black font-black text-xl rounded-3xl flex items-center gap-3 hover:shadow-[0_0_50px_rgba(255,140,0,0.5)] hover:scale-105 transition-all"
            >
              Começar Degustação <ArrowRight />
            </button>
            <p className="text-white/30 text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="text-[#FF8C00]" size={16} /> Sem mensalidade no 1º mês
            </p>
          </div>
        </motion.div>
      </section>

      {/* Differential Section */}
      <section id="servicos" className="relative z-10 py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">O QUE NOS TORNA<br /><span className="text-[#FF8C00]">ELEGÍVEIS?</span></h2>
              <p className="text-white/40 text-xl font-medium">Não entregamos apenas código. Entregamos o sistema servido pronto para resolver os gargalos do seu negócio.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 border border-white/10 rounded-2xl bg-white/5">
                <span className="block text-3xl font-black text-[#FF8C00]">100%</span>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Funcional</span>
              </div>
              <div className="p-4 border border-white/10 rounded-2xl bg-white/5">
                <span className="block text-3xl font-black text-[#FF8C00]">0.0</span>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Setup Cost</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Zap />}
              title="Velocidade de Entrega"
              description="Seu negócio não pode esperar. Nossos sistemas personalizados chegam mais rápido que uma entrega de marmita."
            />
            <FeatureCard 
              icon={<Code2 />}
              title="Código Sob Medida"
              description="Automatização de estoques, integração de softwares e dashboards financeiros. Nós fazemos o que você precisa."
            />
            <FeatureCard 
              icon={<ChefHat />}
              title="Primeiro Mês Grátis"
              description="Acreditamos tanto na nossa solução que o tempero inicial é por nossa conta. Só pague se realmente gostar."
            />
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section id="precos" className="relative z-10 py-40 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">NOSSO<br /><span className="text-[#FF8C00]">CARDÁPIO</span></h2>
            <p className="text-white/40">Selecione o combo que mais combina com seu momento.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-black transition-all"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={() => setCarouselIndex(Math.min(PLANS.length - 1, carouselIndex + 1))}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FF8C00] hover:text-black transition-all"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>

        <div className="relative">
          <motion.div 
            animate={{ x: `calc(-${carouselIndex * 400}px)` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="flex gap-12 px-[10%] cursor-grab active:cursor-grabbing"
          >
            {PLANS.map((plan) => (
              <PriceCard 
                key={plan.id}
                plan={plan}
                onSelect={() => handleOpenCheckout(plan)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2">
            <Logo className="mb-12" />
            <h3 className="text-4xl font-black mb-8 leading-none">O Futuro do seu negócio está sendo cozinhado.</h3>
            <p className="text-white/30 text-lg max-w-md italic">"A gente cuida do software enquanto você cuida do que importa: crescer."</p>
          </div>
          <div>
            <h4 className="text-[#FF8C00] font-black tracking-widest text-xs mb-8 uppercase">Acesso Rápido</h4>
            <ul className="space-y-4 font-bold text-white/50">
              <li><button onClick={() => scrollTo('hero')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => scrollTo('servicos')} className="hover:text-white">Diferenciais</button></li>
              <li><button onClick={() => scrollTo('precos')} className="hover:text-white">Produtos</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#FF8C00] font-black tracking-widest text-xs mb-8 uppercase">Contato</h4>
            <ul className="space-y-4 font-bold text-white/50">
              <li><a href="https://wa.me/..." target="_blank" className="hover:text-white flex items-center gap-2 underline">WhatsApp Atendimento</a></li>
              <li><a href="mailto:..." className="hover:text-white">suporte@marmitacode.com</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Checkout Modal Overlay */}
      <AnimatePresence>
        {isCheckoutOpen && selectedPlan && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setIsCheckoutOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-12 bg-gradient-to-br from-[#1a1a1a] to-black">
                  <Logo className="mb-12" />
                  <h3 className="text-4xl font-black mb-4">{selectedPlan.title}</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-black text-[#FF8C00]">R$ {selectedPlan.price}</span>
                    <span className="text-white/30 font-bold">Investimento Único</span>
                  </div>
                  <ul className="space-y-4 mb-12">
                    {selectedPlan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70 font-medium">
                        <CheckCircle2 size={20} className="text-[#FF8C00]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                    <Clock className="text-[#FF8C00]" />
                    <p className="text-xs text-white/50 leading-relaxed">
                      Entrega estimada em até <span className="text-white font-bold">7 dias úteis</span> após o preenchimento do formulário técnico.
                    </p>
                  </div>
                </div>
                <div className="p-12 border-l border-white/5 flex flex-col justify-center">
                  <h4 className="text-2xl font-black mb-8 italic">Quase lá!</h4>
                  <p className="text-white/50 mb-12 font-medium">Para garantir sua vaga e iniciar o desenvolvimento, finalize o pagamento via <span className="text-[#005fb8] font-black">Asaas (Pix/Cartão)</span>.</p>
                  
                  <button 
                    disabled
                    className="w-full py-6 bg-white text-black font-black text-xl rounded-full flex items-center justify-center gap-3 mb-6 opacity-80 cursor-not-allowed"
                  >
                    FINALIZAR PEDIDO <ShoppingCart size={24} />
                  </button>
                  <p className="text-center text-[10px] text-white/20 uppercase tracking-widest font-black">Aguardando integração com API Asaas</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"
              >
                ✕ Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-[#FF8C00]/30 transition-all group"
    >
      <div className="mb-8 w-16 h-16 bg-[#FF8C00]/10 rounded-2xl flex items-center justify-center text-[#FF8C00] group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement, { size: 32 })}
      </div>
      <h3 className="text-3xl font-black mb-6 tracking-tighter">{title}</h3>
      <p className="text-white/40 text-lg leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
}

function PriceCard({ plan, onSelect }: { plan: typeof PLANS[0], onSelect: () => void }) {
  return (
    <div className="w-[350px] flex-shrink-0">
      <div className={cn(
        "h-full p-10 rounded-[3.5rem] flex flex-col border transition-all duration-500",
        plan.recommended 
          ? "bg-[#FF8C00] text-black border-transparent scale-105 shadow-[0_30px_60px_rgba(255,140,0,0.3)] shadow-inner" 
          : "bg-white/[0.03] text-white border-white/10 hover:border-white/20"
      )}>
        {plan.recommended && <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-black/50">Cozinha Recomenda</span>}
        <h3 className="text-3xl font-black tracking-tighter mb-4">{plan.title}</h3>
        <div className="mb-12">
          <span className="text-5xl font-black">R${plan.price}</span>
          {plan.monthly && <span className={cn("text-xs font-bold block", plan.recommended ? "text-black/60" : "text-white/40")}>+ R${plan.monthly}/mês suporte</span>}
        </div>
        <ul className="space-y-6 flex-1 mb-12">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-bold">
              <CheckCircle2 size={18} className={plan.recommended ? "text-black" : "text-[#FF8C00]"} /> {f}
            </li>
          ))}
        </ul>
        <button 
          onClick={onSelect}
          className={cn(
            "w-full py-5 rounded-2xl font-black transition-all active:scale-95",
            plan.recommended ? "bg-black text-white hover:bg-black/80" : "bg-white text-black hover:bg-white/90"
          )}
        >
          PEDIR COMBO
        </button>
      </div>
    </div>
  );
}
