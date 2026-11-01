import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChefHat, Boxes, Bot, Zap, Workflow, Database, Smartphone, Monitor, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

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
  { num: '01', title: 'Conversa inicial', desc: 'Me conta no WhatsApp o que precisa. Em até 24h a gente marca uma call rápida.' },
  { num: '02', title: 'Escopo e orçamento', desc: 'Depois da call eu envio um documento com escopo claro, prazo e investimento.' },
  { num: '03', title: 'Aprovou? Começou', desc: 'Pagamento parcelado conforme entregas. Você acompanha cada etapa em primeira mão.' },
  { num: '04', title: 'Entrega e suporte', desc: 'Entrego funcionando, treino quem vai usar e deixo suporte pros primeiros meses.' },
];

function waLink(message: string) {
  const digits = siteConfig.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export default function ForaDoCardapioPage() {
  const defaultMsg = 'Oi Chef! Vim pela página Fora do Cardápio. Preciso de uma solução sob medida: ';

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF8C00]/15 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative px-6 pt-20 pb-20 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/30 mb-10">
            <ChefHat size={14} className="text-[#FF8C00]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00]">
              Fora do cardápio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
            Precisa de algo que{' '}
            <span className="bg-gradient-to-r from-[#FF8C00] via-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent">
              não está no menu
            </span>
            ?
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-10">
            Site é só uma das coisas que a gente cozinha. Software desktop pra controle de estoque,
            bot de WhatsApp, automação, app mobile, dashboard — se dá pra programar, a gente faz.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={waLink(defaultMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#25D366] text-white text-xs font-black uppercase tracking-widest hover:gap-3 transition-all shadow-[0_0_40px_rgba(37,211,102,0.4)]"
            >
              <MessageSquare size={14} /> Conversar com o Chef
            </a>
            <Link
              href="#exemplos"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/15 bg-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Ver o que já fizemos <ArrowRight size={14} />
            </Link>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-6">
            Resposta em até 24h · Primeira conversa sem compromisso
          </p>
        </div>
      </section>

      {/* EXEMPLOS */}
      <section id="exemplos" className="relative px-6 py-24 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                Alguns pratos possíveis
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Tudo que <span className="text-[#FF8C00]">dá pra programar.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXEMPLOS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF8C00]/50 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <Icon size={22} className="text-[#FF8C00]" />
                </div>
                <h3 className="text-xl font-black mb-2">{title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm font-bold mt-10">
            Não achou o seu caso aqui? Melhor ainda — <a href={waLink(defaultMsg)} target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] hover:underline">manda uma mensagem</a> e a gente conversa.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative px-6 py-24 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00]">
                Como a cozinha funciona
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Simples e <span className="text-[#FF8C00]">sem enrolação.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FLUXO.map((f) => (
              <div
                key={f.num}
                className="p-7 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="text-[#FF8C00] text-5xl font-black italic mb-3">{f.num}</div>
                <h3 className="text-xl font-black mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAIXA DE PREÇOS */}
      <section className="relative px-6 py-20 z-10">
        <div className="max-w-4xl mx-auto p-10 rounded-[2.5rem] bg-gradient-to-br from-[#FF8C00]/15 to-transparent border border-[#FF8C00]/30 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap size={14} className="text-[#FF8C00]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
              Investimento sob medida
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-5">
            Investimento <span className="text-[#FF8C00]">sob consulta.</span>
          </h2>
          <p className="text-white/60 font-bold max-w-2xl mx-auto leading-relaxed">
            Cada projeto tem seu escopo e sua complexidade. A primeira conversa é pra entender
            o que você precisa, montar uma proposta clara e um orçamento justo — sem compromisso.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative px-6 py-24 border-t border-white/5 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,140,0,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-none">
            Me conta a <span className="text-[#FF8C00]">ideia.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 font-bold">
            Resposta em até 24h. Call de 20min sem compromisso.
          </p>
          <a
            href={waLink(defaultMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-12 py-6 rounded-full bg-[#25D366] text-white text-sm font-black uppercase tracking-widest hover:gap-3 transition-all shadow-[0_0_60px_rgba(37,211,102,0.4)]"
          >
            <MessageSquare size={16} /> Chamar o Chef no WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
