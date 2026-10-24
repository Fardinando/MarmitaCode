import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: `Política de privacidade e tratamento de dados da ${siteConfig.name} em conformidade com a LGPD.`,
};

export default function PrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 prose prose-invert">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">
        Política de Privacidade
      </h1>
      <p className="text-white/60 text-sm mb-10">
        Última atualização: 24 de outubro de 2026 · Em conformidade com a LGPD (Lei nº 13.709/2018)
      </p>

      <Section title="1. Quem somos">
        <p>
          A {siteConfig.name} é a controladora dos dados pessoais coletados
          nesta plataforma. Qualquer dúvida sobre tratamento de dados pode ser
          enviada para{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-[#FF8C00]">
            {siteConfig.email}
          </a>
          .
        </p>
      </Section>

      <Section title="2. Dados que coletamos">
        <ul className="list-disc pl-5 space-y-2">
          <li><b>Dados de contato:</b> nome, e-mail, telefone, empresa.</li>
          <li><b>Dados de pedido:</b> briefing do site, preferências de design, template escolhido.</li>
          <li><b>Dados técnicos:</b> endereço IP (para prevenção de abuso), navegador, dispositivo.</li>
          <li><b>Dados de autenticação:</b> quando você cria uma conta, armazenamos e-mail e senha criptografada.</li>
        </ul>
      </Section>

      <Section title="3. Finalidade do tratamento">
        <ul className="list-disc pl-5 space-y-2">
          <li>Executar o contrato de desenvolvimento do site.</li>
          <li>Comunicar atualizações do pedido via e-mail e WhatsApp.</li>
          <li>Emitir cobranças e documentos fiscais.</li>
          <li>Prevenir fraudes e abuso da plataforma.</li>
        </ul>
      </Section>

      <Section title="4. Base legal">
        <p>
          Tratamos seus dados com base em: <b>execução de contrato</b> (art. 7º, V da LGPD),
          <b> cumprimento de obrigação legal</b> (fiscal) e <b>legítimo interesse</b>
          (prevenção de fraude).
        </p>
      </Section>

      <Section title="5. Compartilhamento com terceiros">
        <p>Compartilhamos dados estritamente necessários com os seguintes operadores:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><b>Supabase</b> — armazenamento do banco de dados.</li>
          <li><b>Vercel</b> — hospedagem da aplicação.</li>
          <li><b>Resend</b> — envio de e-mails transacionais.</li>
          <li><b>Google Sheets</b> — registro interno dos pedidos.</li>
          <li><b>Mercado Pago</b> — processamento de pagamentos (quando ativo).</li>
          <li><b>Registro.br</b> — registro de domínio (quando contratado).</li>
        </ul>
        <p className="mt-3">
          Nenhum dado é vendido ou cedido para fins publicitários de terceiros.
        </p>
      </Section>

      <Section title="6. Retenção dos dados">
        <p>
          Mantemos os dados pelo tempo da relação contratual e por mais 5 anos
          após o encerramento, para fins fiscais e de defesa em eventuais
          litígios, conforme exigido por lei.
        </p>
      </Section>

      <Section title="7. Seus direitos (LGPD)">
        <ul className="list-disc pl-5 space-y-2">
          <li>Confirmar a existência de tratamento dos seus dados.</li>
          <li>Acessar e corrigir seus dados.</li>
          <li>Solicitar anonimização, bloqueio ou eliminação.</li>
          <li>Solicitar a portabilidade dos dados.</li>
          <li>Revogar o consentimento a qualquer momento.</li>
        </ul>
        <p className="mt-3">
          Para exercer qualquer direito, envie um e-mail para{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-[#FF8C00]">
            {siteConfig.email}
          </a>
          .
        </p>
      </Section>

      <Section title="8. Cookies">
        <p>
          Usamos apenas cookies estritamente necessários para funcionamento do
          site (sessão de login). Não utilizamos cookies de rastreamento
          publicitário.
        </p>
      </Section>

      <Section title="9. Segurança">
        <p>
          Aplicamos medidas técnicas e organizacionais para proteger seus
          dados: criptografia em trânsito (HTTPS), senhas com hash, controle
          de acesso baseado em papéis (RLS no Supabase) e rate limiting.
        </p>
      </Section>

      <Section title="10. Alterações desta política">
        <p>
          Esta política pode ser atualizada periodicamente. Alterações
          relevantes serão comunicadas por e-mail aos clientes ativos.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-black uppercase tracking-tight mb-3 text-white">
        {title}
      </h2>
      <div className="text-white/70 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}
