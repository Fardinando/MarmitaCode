import Link from 'next/link';
import type { Metadata } from 'next';
import { Globe, ArrowLeft, Copy, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { TutorialImageClient } from './TutorialImageClient';

export const metadata: Metadata = {
  title: 'Tutorial: domínio próprio no Registro.br',
  description: 'Passo a passo pra registrar seu domínio e nos autorizar como contato técnico.',
};

const PASSOS = [
  {
    n: 1,
    title: 'Entre na sua conta',
    img: '/tutorial/passo1.png',
    bullets: [
      <>Acesse o site <ExtLink href="https://registro.br">registro.br</ExtLink>.</>,
      <>Clique no botão verde <b>“Acessar Conta”</b> no canto superior direito.</>,
      <>Digite seu <b>CPF, CNPJ ou o nome do seu site</b>, coloque sua senha e clique em <b>“Avançar”</b>.</>,
    ],
  },
  {
    n: 2,
    title: 'Escolha o seu site',
    img: '/tutorial/passo2.png',
    bullets: [
      <>Assim que entrar, você verá a lista com os seus domínios.</>,
      <>Procure o nome do seu site na lista.</>,
      <>Na mesma linha do site, lá no lado direito, clique no <b>ícone do bonequinho com o lápis</b>.</>,
    ],
  },
  {
    n: 3,
    title: 'Altere o Contato Técnico',
    img: '/tutorial/passo3.png',
    bullets: [
      <>Role a página um pouco para baixo até achar o bloco <b>“Contatos”</b>.</>,
      <>Onde está escrito <b>Contato técnico</b>, clique no <b>lápis</b> ao lado para conseguir editar.</>,
    ],
  },
  {
    n: 4,
    title: 'Cole o nosso código e salve',
    img: '/tutorial/passo4.png',
    bullets: [
      <>No caixote que vai abrir, <b>apague</b> o que estiver escrito.</>,
      <>Digite o nosso código: <CodeInline code="FAASO601" />.</>,
      <>Para finalizar, clique no botão <b>“Salvar Alterações”</b> lá embaixo.</>,
    ],
  },
];

// Marcador de 5:11 em segundos = 311
const YT_ID = 'dbx1wI8OP6c';
const YT_END = 311;

export default function TutorialDominioPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 md:py-20">
      <article className="max-w-3xl mx-auto">
        <Link href="/conta" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white mb-10">
          <ArrowLeft size={12} /> Voltar à minha conta
        </Link>

        {/* Header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            <Globe size={14} /> Tutorial · Domínio próprio
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.95] mb-6">
            Seu domínio no <span className="text-[#FF8C00]">Registro.br</span>, do seu jeito.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Dois passos: primeiro você compra o domínio (vídeo abaixo), depois você nos autoriza como
            contato técnico pra gente cuidar da parte técnica (passo a passo com imagens).
          </p>
        </div>

        {/* PARTE 1: VÍDEO HOST2B */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#FF8C00] text-black flex items-center justify-center font-black text-sm">
              1
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none">
                Compre o domínio
              </h2>
              <p className="text-white/50 text-sm font-bold mt-1">
                Esse tutorial do canal <b className="text-white">Host2B</b> ensina do zero. Assista até <b className="text-[#FF8C00]">5:11</b>.
              </p>
            </div>
          </div>

          <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/5">
            <iframe
              src={`https://www.youtube.com/embed/${YT_ID}?end=${YT_END}&rel=0`}
              title="Como registrar domínio no Registro.br — Host2B"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 text-xs text-white/70">
            <Clock size={14} className="text-[#FF8C00] shrink-0 mt-0.5" />
            <div>
              Assista <b className="text-white">até o minuto 5:11</b> — ali já é o suficiente pra ter seu domínio comprado.
              O resto do vídeo trata de serviços que você <b className="text-white">não precisa fazer</b>, porque somos nós
              que cuidamos da configuração técnica no próximo passo.
            </div>
          </div>
        </section>

        {/* PARTE 2: PASSO A PASSO */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#FF8C00] text-black flex items-center justify-center font-black text-sm">
              2
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none">
                Nos autorize no painel
              </h2>
              <p className="text-white/50 text-sm font-bold mt-1">
                Com o domínio comprado, siga esses 4 passos pra adicionar a MarmitaCode como contato técnico.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {PASSOS.map((p) => (
              <div key={p.n} className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-full bg-white/5 border-2 border-[#FF8C00] text-[#FF8C00] flex items-center justify-center font-black">
                    {p.n}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black">{p.title}</h3>
                </div>

                <ul className="space-y-3 text-white/70 leading-relaxed mb-6 pl-4 border-l-2 border-white/5">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[15px]">
                      <span className="text-[#FF8C00] mt-1 shrink-0">•</span>
                      <div>{b}</div>
                    </li>
                  ))}
                </ul>

                {/* Imagem de apoio — graceful fallback se ainda não enviada */}
                <TutorialImage src={p.img} alt={`Passo ${p.n}: ${p.title}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Conclusão */}
        <section className="mb-12 p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">
            Pronto!
          </h3>
          <p className="text-white/80 leading-relaxed mb-6">
            Assim que você salvar, já teremos a autorização necessária pra cuidar da parte técnica
            pra você. Se tiver <b className="text-white">qualquer dúvida</b>, é só nos chamar.
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Oi! Preciso de ajuda com o tutorial de domínio.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-400"
          >
            Chamar no WhatsApp
          </a>
        </section>
      </article>
    </main>
  );
}

function CodeInline({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FF8C00]/15 border border-[#FF8C00]/40 font-mono text-[#FF8C00] font-black">
      {code}
      <Copy size={12} className="opacity-60" />
    </span>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] font-bold underline hover:text-[#FFD700]">
      {children}
    </a>
  );
}

/**
 * Mostra a imagem de apoio quando ela existe em /public/tutorial/,
 * ou um placeholder discreto enquanto você não enviou ainda.
 * Como é server component, não dá pra detectar 404 — usamos um
 * <picture> com onError no client-side via <TutorialImageClient>.
 */
function TutorialImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]">
      <TutorialImageClient src={src} alt={alt} />
    </div>
  );
}
