import Link from 'next/link';
import { Check, Info } from 'lucide-react';

export const metadata = {
  title: 'Planos',
  description:
    'Feijão com Arroz, Prato Feito ou À la Carte. Escolha o nível de personalização do seu site MarmitaCode.',
};

const PLANS = [
  {
    key: 'basico',
    name: 'Feijão com Arroz',
    tagline: 'O básico bem feito',
    setup: 'R$ 97',
    monthly: 'R$ 47,90/mês',
    desc:
      'Pegue um dos nossos templates prontos e troque apenas o visual: cores, marca, fontes e textos. Simples, rápido e suficiente.',
    features: [
      'Escolha de um template do catálogo',
      'Troca de logomarca e cores',
      'Troca de fontes e textos',
      'Publicação e domínio opcionais',
    ],
    highlight: false,
  },
  {
    key: 'intermediario',
    name: 'Prato Feito',
    tagline: 'A marmita turbinada',
    setup: 'R$ 197',
    monthly: 'R$ 47,90/mês',
    desc:
      'Template com liberdade pra mudar o fluxo de ações, adicionar ou tirar funcionalidades e ajustar seções. Ainda é marmita, só que com acompanhamento.',
    features: [
      'Tudo do Feijão com Arroz',
      'Mudança no fluxo de ações do site',
      'Adicionar ou remover funcionalidades',
      'Reordenação de seções',
      'Animações personalizadas',
    ],
    highlight: true,
  },
  {
    key: 'premium',
    name: 'À la Carte',
    tagline: 'Pedido do chef',
    setup: 'R$ 397',
    monthly: 'A partir de R$ 47,90/mês*',
    desc:
      'Site 100% personalizado, desenvolvido do zero a partir do seu prompt. Nada de template — você descreve e a gente cozinha.',
    features: [
      'Projeto do zero, sob medida',
      'Áreas pensadas pelo seu briefing',
      'Design exclusivo',
      'Lógica frontend sob medida',
      'Prioridade na entrega',
    ],
    highlight: false,
  },
];

export default function PlanosPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            O cardápio
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Escolha sua <span className="text-[#FF8C00]">marmita</span>
          </h1>
          <p className="text-white/50 text-lg font-bold max-w-2xl mx-auto leading-relaxed">
            Setup único + mensalidade de manutenção. A mensalidade cobre a mão
            de obra para manter o site no ar e as pequenas edições do dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((p) => (
            <div
              key={p.key}
              className={`flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500 ${
                p.highlight
                  ? 'bg-[#FF8C00]/5 border-[#FF8C00]/30 md:-translate-y-4 shadow-[0_30px_80px_-20px_rgba(255,140,0,0.3)]'
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.3em] mb-2">
                {p.tagline}
              </span>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6">
                {p.name}
              </h3>
              <div className="mb-6">
                <div className="text-5xl font-black text-[#FF8C00]">{p.setup}</div>
                <div className="text-white/50 text-sm font-bold mt-1">
                  setup único + {p.monthly}
                </div>
              </div>
              <p className="text-white/50 font-bold leading-relaxed mb-8 flex-1 text-sm">
                {p.desc}
              </p>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-xs font-bold text-white/70">
                    <Check size={16} className="text-[#FF8C00] mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.key === 'premium' ? '/encomendar/personalizado?tier=personalizado' : '/templates'}
                className={`w-full py-5 text-center font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all ${
                  p.highlight
                    ? 'bg-[#FF8C00] text-black hover:bg-[#FFD700]'
                    : 'bg-white text-black hover:bg-[#FF8C00]'
                }`}
              >
                {p.key === 'premium' ? 'Quero do zero' : 'Ver templates'}
              </Link>
            </div>
          ))}
        </div>

        {/* Nota sobre mensalidade */}
        <div className="mt-16 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <Info size={20} className="text-[#FF8C00] shrink-0 mt-1" />
            <div className="text-white/60 text-sm leading-relaxed">
              <p className="font-bold text-white mb-3">O que está incluso na mensalidade</p>
              <p className="mb-3">
                A mensalidade de <b className="text-white">R$ 47,90</b> cobre apenas a{' '}
                <b className="text-white">mão de obra para instalação e controle do site</b>:
                hospedagem básica, pequenos ajustes, publicação de novas versões e manutenção.
              </p>
              <p className="mb-3">
                Funcionalidades extras aumentam o preço mensal, por exemplo:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Banco de dados (para login, cadastro de usuários, pedidos)</li>
                <li>Hospedagem de vídeos ou mídia pesada</li>
                <li>Integrações com APIs pagas</li>
                <li>Serviços adicionais sob demanda</li>
              </ul>
              <p className="text-white/40 text-xs">
                * No plano À la Carte, por ser personalizado, o valor da mensalidade pode variar
                conforme as funcionalidades contratadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
