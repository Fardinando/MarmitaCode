import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: `Termos de uso da plataforma ${siteConfig.name}.`,
};

export default function TermosPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 prose prose-invert">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">
        Termos de Uso
      </h1>
      <p className="text-white/60 text-sm mb-10">
        Última atualização: 24 de outubro de 2026
      </p>

      <Section title="1. Aceitação">
        <p>
          Ao contratar os serviços da {siteConfig.name} você concorda com estes
          Termos de Uso. Caso não concorde, por favor não utilize nossos
          serviços.
        </p>
      </Section>

      <Section title="2. Serviços oferecidos">
        <p>
          A {siteConfig.name} oferece o desenvolvimento, personalização e
          hospedagem de sites a partir de templates pré-definidos, mediante
          pagamento de uma taxa de setup única e, quando aplicável, uma
          mensalidade de manutenção/hospedagem. Também oferecemos, como serviço
          auxiliar, o registro de domínio no Registro.br em nome do cliente,
          cobrando apenas uma taxa de mão de obra.
        </p>
      </Section>

      <Section title="3. Pagamento">
        <p>
          Os valores de setup são cobrados no momento da contratação. A
          mensalidade, quando aplicável, é cobrada mensalmente pelo meio de
          pagamento informado. Em caso de inadimplência superior a 15 dias, o
          site poderá ser suspenso.
        </p>
      </Section>

      <Section title="4. Entrega e prazos">
        <p>
          O prazo de entrega varia conforme o plano contratado e o tempo de
          resposta do cliente ao briefing. Alterações extensas após a entrega
          podem ser cobradas separadamente.
        </p>
      </Section>

      <Section title="5. Propriedade intelectual">
        <p>
          Após a quitação integral do pedido, o cliente possui direito de uso
          irrestrito sobre o site entregue. A {siteConfig.name} mantém a
          propriedade dos códigos genéricos e componentes de template
          reutilizáveis.
        </p>
      </Section>

      <Section title="6. Domínio">
        <p>
          O domínio contratado pelo serviço de registro permanece em nome do
          cliente, com a {siteConfig.name} atuando como administradora técnica.
          O cliente é responsável pela renovação anual junto ao Registro.br.
        </p>
      </Section>

      <Section title="7. Cancelamento e reembolso">
        <p>
          O cliente pode solicitar o cancelamento a qualquer momento. Caso o
          cancelamento ocorra antes do início do desenvolvimento, 90% do valor
          será reembolsado. Após o início, não há reembolso do setup. A
          mensalidade pode ser cancelada a qualquer momento, sem multa, com
          desligamento do site ao final do ciclo pago.
        </p>
      </Section>

      <Section title="8. Limitação de responsabilidade">
        <p>
          A {siteConfig.name} não se responsabiliza por danos indiretos,
          lucros cessantes ou qualquer prejuízo decorrente de indisponibilidade
          temporária, ataques externos ou falhas de terceiros (provedores de
          hospedagem, registro de domínio, etc).
        </p>
      </Section>

      <Section title="9. Alterações nestes termos">
        <p>
          Estes termos podem ser atualizados a qualquer momento. A versão mais
          recente estará sempre disponível nesta página.
        </p>
      </Section>

      <Section title="10. Contato">
        <p>
          Dúvidas? Fale com a gente pelo WhatsApp ou pelo e-mail{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-[#FF8C00]">
            {siteConfig.email}
          </a>
          .
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
