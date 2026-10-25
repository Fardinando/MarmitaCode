import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, Globe, UserCheck, Settings, Mail, Shield, Lightbulb, AlertTriangle, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Tutorial: domínio próprio no Registro.br',
  description: 'Passo a passo pra registrar seu domínio .com.br no Registro.br e nos adicionar como contato técnico.',
};

export default function TutorialDominioPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 md:py-20">
      <article className="max-w-3xl mx-auto">
        <Link href="/conta" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white mb-10">
          <ArrowLeft size={12} /> Voltar à minha conta
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            <Globe size={14} /> Tutorial · Domínio próprio
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.95] mb-6">
            Seu domínio no <span className="text-[#FF8C00]">Registro.br</span>, do seu jeito.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Esse guia te leva do zero ao seu domínio funcionando, mantendo <b className="text-white">você como dono</b>{' '}
            e adicionando a <b className="text-white">MarmitaCode como contato técnico</b> pra cuidar da configuração.
          </p>
        </div>

        {/* Resumo rápido */}
        <section className="mb-16 p-8 rounded-[2rem] bg-[#FF8C00]/5 border border-[#FF8C00]/20">
          <h2 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            <Lightbulb size={14} /> Resumo em 1 minuto
          </h2>
          <ol className="space-y-3 text-sm text-white/80 leading-relaxed">
            {[
              'Crie sua conta no Registro.br com seu CPF ou CNPJ',
              'Escolha e registre seu domínio (.com.br, .com, .net...) — você paga a anuidade direto pra eles',
              'No cadastro, você é o Titular (dono). Preencha com seus dados',
              'Adicione a MarmitaCode como Contato Técnico — isso nos permite configurar DNS e SSL',
              'Nos avise por e-mail/WhatsApp que o domínio está registrado. A gente faz todo o resto',
            ].map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF8C00] text-black font-black text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Papéis explicados */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-6">
            Antes de começar: entenda os papéis
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            No Registro.br, cada domínio tem quatro tipos de contato. Entenda cada um pra não confundir:
          </p>
          <div className="space-y-4">
            <RoleCard
              icon={<UserCheck size={20} />}
              title="Titular (Dono)"
              who="Você · cliente"
              color="emerald"
            >
              É o <b className="text-white">dono legal</b> do domínio. Pode transferir, vender, cancelar.
              Seus dados (nome, CPF/CNPJ, endereço) ficam vinculados ao registro.
              <b className="text-emerald-400"> Esse papel é SEMPRE seu — nunca abra mão.</b>
            </RoleCard>

            <RoleCard
              icon={<Settings size={20} />}
              title="Contato Técnico"
              who="MarmitaCode"
              color="orange"
            >
              Quem configura <b className="text-white">DNS, apontamento e SSL</b>. Recebe notificações técnicas e pode
              fazer alterações nos registros DNS. É esse papel que vamos ocupar — é como se fôssemos seu
              &ldquo;mecânico&rdquo; técnico, enquanto você continua dono do carro.
            </RoleCard>

            <RoleCard
              icon={<Mail size={20} />}
              title="Contato Administrativo"
              who="Você ou MarmitaCode"
              color="slate"
            >
              Recebe comunicações sobre renovações e questões cadastrais. Normalmente você mesmo —
              assim fica avisado de tudo.
            </RoleCard>

            <RoleCard
              icon={<Shield size={20} />}
              title="Contato de Cobrança"
              who="Você"
              color="slate"
            >
              Recebe as cobranças da anuidade do Registro.br. Deve ficar <b className="text-white">com você</b>,
              já que é você quem paga.
            </RoleCard>
          </div>
        </section>

        {/* Passos */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-10">
            Passo a passo
          </h2>

          <Step n={1} title="Crie sua conta no Registro.br">
            <p>Acesse <ExtLink href="https://registro.br">registro.br</ExtLink> e clique em <b>Entrar</b> → <b>Criar nova conta</b>.</p>
            <p>Você pode criar com:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
              <li><b className="text-white">Pessoa Física</b> — use seu CPF (mais simples).</li>
              <li><b className="text-white">Pessoa Jurídica</b> — use o CNPJ da empresa.</li>
            </ul>
            <p className="text-sm text-white/60 italic">
              Dica: se seu negócio tem CNPJ, prefira registrar como PJ. Fica mais profissional no cabeçalho
              das comunicações e evita problemas futuros de transferência.
            </p>
            <ImgPlaceholder label="Tela de cadastro do Registro.br — 'Criar nova conta'" />
          </Step>

          <Step n={2} title="Verifique seu e-mail e faça login">
            <p>O Registro.br envia um link de confirmação pro e-mail cadastrado. Clica, confirma a conta e faz login.</p>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200">
              <AlertTriangle size={14} className="inline mr-2" />
              <b>Guarde a senha com cuidado.</b> Perdeu? Dá pra recuperar, mas é um processo chato que
              pode levar dias e exigir documentos. Use um gerenciador de senhas.
            </div>
          </Step>

          <Step n={3} title="Pesquise se o domínio está disponível">
            <p>
              Na página principal, use o campo de busca pra verificar se o domínio que você quer está livre.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
              <li>Prefira <code className="text-[#FF8C00]">.com.br</code> se seu negócio é no Brasil (padrão de mercado).</li>
              <li><code className="text-[#FF8C00]">.com</code> também é opção forte, mas é registrado em outro operador — não é o Registro.br.</li>
              <li>Evite nomes muito longos, com hífens ou que parecem outra marca.</li>
              <li>Teste <b className="text-white">pronunciar o nome em voz alta</b>: tem que ser fácil de passar no telefone.</li>
            </ul>
            <ImgPlaceholder label="Resultado da busca mostrando domínio disponível / indisponível" />
          </Step>

          <Step n={4} title="Clique em registrar e revise os dados do Titular">
            <p>
              Com o domínio disponível, clique em <b>Registrar</b>. O Registro.br vai mostrar os dados que vão aparecer no WHOIS
              (o cadastro público do domínio).
            </p>
            <div className="p-4 rounded-xl bg-[#FF8C00]/5 border border-[#FF8C00]/20">
              <p className="text-sm font-bold text-[#FF8C00] mb-2">⚠ Dados do Titular — IMPORTANTE</p>
              <p className="text-xs text-white/70 leading-relaxed">
                <b className="text-white">Deixe seu próprio nome/CNPJ aqui.</b> O Titular é o dono legal. Se você preencher o nosso
                nome, você está nos entregando a propriedade do domínio — nunca faça isso.
              </p>
            </div>
            <ImgPlaceholder label="Tela de dados do Titular com campo CPF/CNPJ destacado" />
          </Step>

          <Step n={5} title="Escolha o período (1 a 10 anos) e pague">
            <p>
              O Registro.br cobra uma <b className="text-white">anuidade</b>. Em 2026 o <code>.com.br</code> custa cerca de{' '}
              <b className="text-white">R$ 40/ano</b>. Você pode pagar por 1, 2, 3, 5 ou 10 anos de uma vez (quanto mais, melhor o preço).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
              <li>Formas de pagamento: boleto, Pix, cartão.</li>
              <li>Boleto demora até 2 dias úteis pra compensar. Pix é instantâneo.</li>
              <li>Antes do pagamento confirmar, o domínio fica &ldquo;em homologação&rdquo; — ainda não é oficialmente seu.</li>
            </ul>
            <p className="text-sm text-white/60">
              💡 <b className="text-white">Nossa dica:</b> pague pelo menos 2 anos. Dá mais tempo pra se organizar e o Google
              valoriza domínios com mais tempo de registro.
            </p>
          </Step>

          <Step n={6} title="Adicione a MarmitaCode como Contato Técnico">
            <p>
              Depois que o domínio for pago e confirmado, entre nas configurações do domínio no Registro.br:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-white/70">
              <li>Vai em <b className="text-white">Meus Domínios</b> → clica no seu domínio.</li>
              <li>Procura a aba <b className="text-white">Contatos</b> ou <b className="text-white">Dados do Domínio</b>.</li>
              <li>No campo <b className="text-white">Contato Técnico</b>, altera pra o nosso ID (que a gente te envia).</li>
            </ol>
            <div className="p-5 rounded-xl bg-[#FF8C00]/5 border border-[#FF8C00]/30">
              <p className="text-sm font-black text-[#FF8C00] mb-3">📩 Nossos dados pra Contato Técnico</p>
              <div className="space-y-1 text-sm text-white/80">
                <p><b className="text-white">ID do Registro.br:</b> <span className="font-mono">(a gente envia por WhatsApp depois do pedido)</span></p>
                <p><b className="text-white">Nome:</b> MarmitaCode</p>
                <p><b className="text-white">E-mail:</b> <code className="text-[#FF8C00]">{siteConfig.email}</code></p>
              </div>
              <p className="text-xs text-white/50 mt-3 italic">
                Enviamos essas informações exatas por WhatsApp assim que você fechar o pedido — basta copiar e colar no cadastro.
              </p>
            </div>
            <ImgPlaceholder label="Tela de Contatos do domínio mostrando onde alterar o Contato Técnico" />
          </Step>

          <Step n={7} title="Apontamento DNS — a gente cuida">
            <p>
              Com você como Titular e a gente como Contato Técnico, podemos entrar e configurar os <b className="text-white">registros DNS</b>:
              o apontamento que faz <code>www.seudominio.com.br</code> abrir o seu site.
            </p>
            <p>Normalmente a gente cria os seguintes registros:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
              <li><b className="text-white">A</b> ou <b className="text-white">ALIAS</b> apontando pro IP/host da hospedagem.</li>
              <li><b className="text-white">CNAME</b> pro <code>www</code> apontando pro domínio principal.</li>
              <li><b className="text-white">MX / TXT</b> se você precisar de e-mail profissional (opcional).</li>
            </ul>
            <p className="text-sm text-white/60">
              Esse passo é 100% nosso. Você só precisa esperar — pode ser instantâneo ou levar até 24h pra propagar na internet toda.
            </p>
          </Step>

          <Step n={8} title="SSL (cadeado verde) — também é nosso">
            <p>
              Assim que o DNS propagar, a gente ativa o certificado SSL (Let&apos;s Encrypt, gratuito) pra seu site
              carregar com HTTPS. Isso é obrigatório pra:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
              <li>Google não marcar seu site como &ldquo;não seguro&rdquo;.</li>
              <li>Formulários e checkouts funcionarem corretamente.</li>
              <li>Clientes confiarem no seu site.</li>
            </ul>
            <p className="text-sm text-white/60">O certificado se renova sozinho a cada 60 dias, pra sempre.</p>
          </Step>

          <Step n={9} title="Nos envie o domínio registrado">
            <p>
              Depois de registrar e configurar, mande pro nosso WhatsApp:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-white/70">
              <li>O <b className="text-white">domínio exato</b> (ex: <code>pizzariadoze.com.br</code>).</li>
              <li>Confirmação de que você adicionou a gente como Contato Técnico.</li>
              <li>Qualquer preferência: usar <code>www.</code> na frente ou não, redirecionar outros domínios, etc.</li>
            </ol>
            <div className="flex gap-3 flex-wrap mt-6">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black text-xs font-black uppercase tracking-widest hover:bg-emerald-400"
              >
                Falar no WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10"
              >
                Mandar e-mail
              </a>
            </div>
          </Step>

          <Step n={10} title="Pronto! Seu site no ar" done>
            <p>
              Depois de tudo configurado, seu site vai estar disponível em <b className="text-white">seudominio.com.br</b> com SSL,
              DNS otimizado e tudo mais.
            </p>
            <p className="text-sm text-white/60">
              O <b className="text-white">prazo total</b> depende do tempo de propagação do DNS (varia entre instantâneo e 24h)
              e vai ser informado logo que a gente iniciar o processo.
            </p>
          </Step>
        </section>

        {/* Checklist final */}
        <section className="mb-16 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
          <h2 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            <CheckCircle2 size={14} /> Checklist final
          </h2>
          <ul className="space-y-3 text-sm text-white/80">
            {[
              'Conta criada no Registro.br com seu CPF/CNPJ',
              'Domínio escolhido e disponível',
              'Dados do Titular preenchidos CORRETAMENTE com seus dados',
              'Pagamento feito e confirmado (status: ativo)',
              'MarmitaCode adicionada como Contato Técnico',
              'Domínio enviado pro nosso WhatsApp',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#FF8C00] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-6">
            Perguntas frequentes
          </h2>
          <div className="space-y-3">
            <FAQ q="E se eu quiser trocar de empresa que cuida do site no futuro?">
              Como você é Titular do domínio, pode mudar quando quiser. É só remover a gente do Contato
              Técnico e colocar quem você escolher. O domínio continua seu, sempre.
            </FAQ>
            <FAQ q="Preciso renovar o domínio todo ano?">
              Sim — a anuidade é obrigatória. Se não pagar, o domínio é liberado e qualquer um pode registrar.
              O Registro.br envia lembretes por e-mail. Também recomendamos pagar 2 ou mais anos de uma vez
              pra reduzir risco de esquecimento.
            </FAQ>
            <FAQ q="Posso ter várias extensões (ex: .com.br e .com)?">
              Pode e às vezes é bom. Normalmente registramos a <code>.com.br</code> como principal e redirecionamos
              a <code>.com</code> (se você tiver) pra ela. Protege sua marca contra concorrentes.
            </FAQ>
            <FAQ q="E se eu já tenho um domínio comprado em outro lugar (GoDaddy, Hostgator)?">
              Pode usar sim. É só nos informar e configuramos o apontamento do seu lado. Se preferir, dá pra
              transferir o domínio pro Registro.br depois (mas isso é opcional).
            </FAQ>
            <FAQ q="O que acontece se eu esquecer de adicionar vocês como Contato Técnico?">
              A gente não consegue fazer a configuração sozinha e vai te pedir pra adicionar. Como você é
              o Titular, só você consegue fazer essa alteração. É um processo rápido de 2 minutos no painel do Registro.br.
            </FAQ>
            <FAQ q="Vocês têm acesso aos meus dados do Registro.br?">
              Não. Só ao painel técnico do domínio, pra configurar DNS. Login, senha e dados cadastrais ficam
              100% com você.
            </FAQ>
          </div>
        </section>

        <div className="p-8 rounded-[2rem] bg-[#FF8C00]/10 border border-[#FF8C00]/30 text-center">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-3">
            Alguma dúvida?
          </h3>
          <p className="text-white/60 mb-6">
            Chama a gente — a gente te ajuda em cada passo.
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full bg-[#FF8C00] text-black text-xs font-black uppercase tracking-widest hover:bg-[#FFD700]"
          >
            Falar no WhatsApp
          </a>
        </div>
      </article>
    </main>
  );
}

function RoleCard({ icon, title, who, color, children }: {
  icon: React.ReactNode; title: string; who: string;
  color: 'emerald' | 'orange' | 'slate'; children: React.ReactNode;
}) {
  const colors = {
    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    orange: { bg: 'bg-[#FF8C00]/5', border: 'border-[#FF8C00]/30', text: 'text-[#FF8C00]' },
    slate: { bg: 'bg-white/[0.02]', border: 'border-white/5', text: 'text-white/70' },
  }[color];
  return (
    <div className={`p-6 rounded-2xl border ${colors.bg} ${colors.border}`}>
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={colors.text}>{icon}</div>
          <h3 className="font-black text-lg">{title}</h3>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${colors.text}`}>
          {who}
        </span>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{children}</p>
    </div>
  );
}

function Step({ n, title, children, done }: {
  n: number; title: string; children: React.ReactNode; done?: boolean;
}) {
  return (
    <div className="relative pl-16 pb-10 last:pb-0">
      <div className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center font-black text-sm ${
        done ? 'bg-emerald-500 text-black' : 'bg-[#FF8C00] text-black'
      }`}>
        {done ? <CheckCircle2 size={18} /> : n}
      </div>
      {n < 10 && (
        <div className="absolute left-5 top-11 bottom-0 w-px bg-white/10" />
      )}
      <h3 className="text-xl md:text-2xl font-black mb-4">{title}</h3>
      <div className="space-y-4 text-white/70 leading-relaxed">{children}</div>
    </div>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#FF8C00] font-bold underline hover:text-[#FFD700]">
      {children}
    </a>
  );
}

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5">
      <summary className="cursor-pointer font-black text-sm flex items-center justify-between gap-4">
        <span>{q}</span>
        <span className="text-[#FF8C00] text-xl group-open:rotate-45 transition-transform">+</span>
      </summary>
      <div className="mt-4 text-sm text-white/60 leading-relaxed">{children}</div>
    </details>
  );
}

function ImgPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-4 p-6 rounded-xl bg-white/[0.015] border-2 border-dashed border-white/10 text-center">
      <div className="text-white/20 text-xs font-black uppercase tracking-widest mb-1">Imagem</div>
      <div className="text-white/40 text-xs italic">{label}</div>
    </div>
  );
}
