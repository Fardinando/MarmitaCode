import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { C, serif, sans } from '@/components/ui';

export function SiteFooter() {
  return (
    <footer
      className="mt-24"
      style={{
        borderTop: `1px solid ${C.border}`,
        backgroundColor: C.bg,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div
            className="text-2xl"
            style={{ ...serif, fontWeight: 500, color: C.text }}
          >
            Marmita<em style={{ color: C.accent, fontStyle: 'italic' }}>Code</em>
          </div>
          <p
            className="mt-5 text-base leading-relaxed max-w-sm"
            style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
          >
            {siteConfig.description}
          </p>
          <p
            className="mt-6 text-sm"
            style={{ color: C.textFaint, ...sans }}
          >
            João Pessoa, PB · Brasil
          </p>
        </div>

        <FooterCol title="Produto">
          <FooterLink href="/templates">Templates</FooterLink>
          <FooterLink href="/cases">Cases</FooterLink>
          <FooterLink href="/fora-do-cardapio">Fora do cardápio</FooterLink>
          <FooterLink href="/planos">Planos</FooterLink>
        </FooterCol>

        <FooterCol title="Conta">
          <FooterLink href="/login">Entrar</FooterLink>
          <FooterLink href="/conta">Minha conta</FooterLink>
        </FooterCol>

        <FooterCol title="Contato">
          <FooterLink href="/termos">Termos de uso</FooterLink>
          <FooterLink href="/privacidade">Privacidade (LGPD)</FooterLink>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="text-base hover:opacity-100 transition-opacity"
            style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-base hover:opacity-100 transition-opacity"
            style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
          >
            E-mail
          </a>
        </FooterCol>
      </div>

      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <div
          className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm"
          style={{ ...serif, color: C.textFaint, fontStyle: 'italic' }}
        >
          <span>
            © {new Date().getFullYear()} {siteConfig.company.legalName}.
          </span>
          <span>Servido direto da cozinha, com carinho.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="text-xs tracking-[0.2em] uppercase mb-5"
        style={{ color: C.textFaint, ...sans, fontWeight: 700 }}
      >
        {title}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-base hover:text-[#F5EFE4] transition-colors"
      style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
    >
      {children}
    </Link>
  );
}
