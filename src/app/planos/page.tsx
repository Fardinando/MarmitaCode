import Link from 'next/link';
import { Check, Info } from 'lucide-react';
import {
  C,
  serif,
  sans,
  PageShell,
  Section,
  SectionHead,
  Display,
  Emph,
  Lead,
  Eyebrow,
} from '@/components/ui';

export const metadata = {
  title: 'Planos',
  description:
    'Feijão com Arroz, Prato Feito ou À la Carte. Escolha o nível de personalização do seu site MarmitaCode.',
};

const PLANS = [
  {
    key: 'basico',
    name: 'Feijão com Arroz',
    tagline: 'o básico bem feito',
    setup: '97',
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
    tagline: 'a marmita turbinada',
    setup: '197',
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
    tagline: 'pedido do chef',
    setup: '397',
    monthly: 'a partir de R$ 47,90/mês*',
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
    <PageShell>
      <section className="relative px-6 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>o cardápio</Eyebrow>
          <Display size="xl">
            Escolha sua <Emph>marmita.</Emph>
          </Display>
          <div className="mt-8 max-w-[52ch]">
            <Lead>
              Setup único + mensalidade de manutenção. A mensalidade cobre a mão
              de obra para manter o site no ar e as pequenas edições do dia a dia.
            </Lead>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.key}
              className="flex flex-col rounded-3xl p-8"
              style={{
                backgroundColor: p.highlight ? C.accentSoft : C.bgElevated,
                border: `1px solid ${p.highlight ? 'rgba(249,115,22,0.35)' : C.border}`,
              }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <span
                  className="text-sm italic"
                  style={{ ...serif, color: p.highlight ? C.accent : C.textFaint }}
                >
                  {p.tagline}
                </span>
                {p.highlight && (
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ ...sans, color: C.accent, fontWeight: 700 }}
                  >
                    recomendado
                  </span>
                )}
              </div>
              <h3
                className="text-3xl md:text-4xl mb-6"
                style={{ ...serif, fontWeight: 500, color: C.text }}
              >
                {p.name}
              </h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs" style={{ color: C.textFaint, ...sans, fontWeight: 600 }}>
                    R$
                  </span>
                  <span
                    className="text-5xl md:text-6xl leading-none"
                    style={{
                      ...serif,
                      fontWeight: 500,
                      color: p.highlight ? C.accent : C.text,
                    }}
                  >
                    {p.setup}
                  </span>
                </div>
                <div
                  className="text-sm mt-2 italic"
                  style={{ ...serif, color: C.textFaint }}
                >
                  setup único · {p.monthly}
                </div>
              </div>
              <p
                className="text-[15px] leading-relaxed mb-8 flex-1"
                style={{ color: C.textMuted, ...serif }}
              >
                {p.desc}
              </p>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: C.textMuted, ...serif }}
                  >
                    <Check size={14} style={{ color: C.accent, marginTop: 4 }} className="shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.key === 'premium' ? '/encomendar/personalizado?tier=personalizado' : '/templates'}
                className="w-full py-4 text-center text-sm font-semibold transition-colors rounded-full"
                style={{
                  backgroundColor: p.highlight ? C.accent : C.text,
                  color: p.highlight ? '#1A0E00' : C.bg,
                }}
              >
                {p.key === 'premium' ? 'Quero do zero' : 'Ver templates'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Section divider>
        <div
          className="max-w-4xl mx-auto rounded-3xl p-8 md:p-10"
          style={{ backgroundColor: C.bgElevated, border: `1px solid ${C.border}` }}
        >
          <div className="flex items-start gap-4">
            <Info size={20} style={{ color: C.accent, marginTop: 4 }} className="shrink-0" />
            <div className="text-[15px] leading-relaxed" style={{ color: C.textMuted, ...serif }}>
              <p
                className="text-xl mb-4"
                style={{ ...serif, fontWeight: 500, color: C.text, fontStyle: 'normal' }}
              >
                O que está incluso na mensalidade
              </p>
              <p className="mb-4">
                A mensalidade de{' '}
                <strong style={{ color: C.text, fontWeight: 600 }}>R$ 47,90</strong> cobre apenas a{' '}
                <strong style={{ color: C.text, fontWeight: 600 }}>
                  mão de obra para instalação e controle do site
                </strong>
                : hospedagem básica, pequenos ajustes, publicação de novas versões e manutenção.
              </p>
              <p className="mb-3">
                Funcionalidades extras aumentam o preço mensal, por exemplo:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-4" style={{ color: C.textMuted }}>
                <li>Banco de dados (para login, cadastro de usuários, pedidos)</li>
                <li>Hospedagem de vídeos ou mídia pesada</li>
                <li>Integrações com APIs pagas</li>
                <li>Serviços adicionais sob demanda</li>
              </ul>
              <p className="text-sm italic" style={{ color: C.textFaint }}>
                * No plano À la Carte, por ser personalizado, o valor da mensalidade pode variar
                conforme as funcionalidades contratadas.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
