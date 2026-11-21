import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Boxes, Bot, Workflow, Database, Smartphone, Monitor, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { ForaIllustration } from '@/components/HeroIllustrations';
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
  PrimaryBtn,
  GhostBtn,
  Numero,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Fora do Cardápio · Soluções sob medida | MarmitaCode',
  description:
    'Precisa de algo que não está no cardápio? Software desktop, app mobile, automação, bot, integração — a gente cozinha sob encomenda.',
};

const EXEMPLOS = [
  { icon: Boxes, title: 'Sistema de estoque', desc: 'Desktop ou web interno pra controlar entrada, saída e inventário.' },
  { icon: Bot, title: 'Bot de WhatsApp', desc: 'Atendimento automatizado, FAQ, agendamento ou notificações.' },
  { icon: Workflow, title: 'Automação de processos', desc: 'Integrações entre planilhas, APIs, e-mail e sistemas que você já usa.' },
  { icon: Smartphone, title: 'App mobile', desc: 'iOS ou Android a partir de uma base única (React Native).' },
  { icon: Monitor, title: 'Software desktop', desc: 'Windows/Mac/Linux pra uso interno ou produto de prateleira.' },
  { icon: Database, title: 'Painel administrativo', desc: 'Dashboard customizado conectado aos seus dados reais.' },
];

const FLUXO = [
  { n: 1, title: 'Conversa inicial', desc: 'Me conta no WhatsApp o que precisa. Em até 24h a gente marca uma call rápida.' },
  { n: 2, title: 'Escopo e orçamento', desc: 'Depois da call eu envio um documento com escopo claro, prazo e investimento.' },
  { n: 3, title: 'Aprovou? Começou', desc: 'Pagamento parcelado conforme entregas. Você acompanha cada etapa em primeira mão.' },
  { n: 4, title: 'Entrega e suporte', desc: 'Entrego funcionando, treino quem vai usar e deixo suporte pros primeiros meses.' },
];

function waLink(message: string) {
  const digits = siteConfig.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export default function ForaDoCardapioPage() {
  const defaultMsg = 'Oi Chef! Vim pela página Fora do Cardápio. Preciso de uma solução sob medida: ';

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative px-6 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <Eyebrow>fora do cardápio · sob encomenda</Eyebrow>
            <Display size="xl">
              Precisa de algo que <Emph>não está no menu?</Emph>
            </Display>
            <div className="mt-8 max-w-[52ch]">
              <Lead>
                Site é só uma das coisas que a gente cozinha. Software desktop
                pra controle de estoque, bot de WhatsApp, automação, app mobile,
                dashboard — se dá pra programar, a gente faz.
              </Lead>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={waLink(defaultMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold transition-transform hover:translate-x-1 rounded-full"
                style={{ backgroundColor: '#25D366', color: '#00140A' }}
              >
                <MessageSquare size={14} /> Conversar com o Chef
              </a>
              <GhostBtn href="#exemplos">
                Ver o que já fizemos <ArrowRight size={14} />
              </GhostBtn>
            </div>
            <p
              className="mt-6 text-sm italic"
              style={{ ...serif, color: C.textFaint }}
            >
              Resposta em até 24h · primeira conversa sem compromisso.
            </p>
          </div>
          <div className="order-first md:order-last">
            <ForaIllustration className="w-full h-auto max-w-[460px] mx-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </section>

      {/* EXEMPLOS */}
      <Section id="exemplos" divider>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="alguns pratos possíveis"
            title={<>Tudo que dá pra <Emph>programar.</Emph></>}
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXEMPLOS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-7 rounded-3xl transition-colors"
                style={{
                  backgroundColor: C.bgElevated,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: C.accentSoft,
                    color: C.accent,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ ...serif, fontWeight: 500, color: C.text }}
                >
                  {title}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: C.textMuted, ...serif }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-center mt-10 text-base italic"
            style={{ color: C.textMuted, ...serif }}
          >
            Não achou o seu caso? Melhor ainda —{' '}
            <a
              href={waLink(defaultMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
              style={{ color: C.accent }}
            >
              manda uma mensagem
            </a>{' '}
            e a gente conversa.
          </p>
        </div>
      </Section>

      {/* FLUXO */}
      <Section divider>
        <div className="max-w-5xl mx-auto">
          <SectionHead
            eyebrow="como a cozinha funciona"
            title={<>Simples e <Emph>sem enrolação.</Emph></>}
          />
          <ul className="mt-14 space-y-0">
            {FLUXO.map((f, i) => (
              <li
                key={f.n}
                className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline py-8"
                style={{
                  borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <Numero n={f.n} />
                <div>
                  <h3
                    className="text-2xl md:text-3xl"
                    style={{ ...serif, fontWeight: 500, color: C.text }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-2 text-[15px] leading-relaxed max-w-[52ch]"
                    style={{ color: C.textMuted, ...serif }}
                  >
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* PRECOS */}
      <Section>
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10"
          style={{
            backgroundColor: C.accentSoft,
            border: '1px solid rgba(249,115,22,0.3)',
          }}
        >
          <Eyebrow>investimento</Eyebrow>
          <Display size="md">
            Investimento <Emph>sob consulta.</Emph>
          </Display>
          <p
            className="mt-6 text-[15px] leading-relaxed max-w-[56ch]"
            style={{ color: C.textMuted, ...serif }}
          >
            Cada projeto tem seu escopo e sua complexidade. A primeira conversa
            é pra entender o que você precisa, montar uma proposta clara e um
            orçamento justo — sem compromisso.
          </p>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section divider>
        <div className="max-w-4xl mx-auto">
          <Display size="xl">
            Me conta a <Emph>ideia.</Emph>
          </Display>
          <p
            className="mt-6 text-lg italic"
            style={{ ...serif, color: C.textMuted }}
          >
            Resposta em até 24h. Call de 20 min sem compromisso.
          </p>
          <div className="mt-10">
            <a
              href={waLink(defaultMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 text-sm font-semibold transition-transform hover:translate-x-1 rounded-full"
              style={{ backgroundColor: '#25D366', color: '#00140A' }}
            >
              <MessageSquare size={14} /> Chamar o Chef no WhatsApp
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
