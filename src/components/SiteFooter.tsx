import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-black italic text-xl uppercase tracking-tighter">
            Marmita<span className="text-[#FF8C00]">Code</span>
          </div>
          <p className="mt-3 text-xs text-white/50 leading-relaxed max-w-xs">
            {siteConfig.description}
          </p>
        </div>

        <FooterCol title="Produto">
          <FooterLink href="/templates">Templates</FooterLink>
          <FooterLink href="/planos">Planos</FooterLink>
          <FooterLink href="/#como-funciona">Como funciona</FooterLink>
          <FooterLink href="/#dominio">Domínio</FooterLink>
        </FooterCol>

        <FooterCol title="Conta">
          <FooterLink href="/login">Entrar</FooterLink>
          <FooterLink href="/conta">Minha conta</FooterLink>
        </FooterCol>

        <FooterCol title="Legal & contato">
          <FooterLink href="/termos">Termos de uso</FooterLink>
          <FooterLink href="/privacidade">Privacidade (LGPD)</FooterLink>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-[#FF8C00]"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-[#FF8C00]"
          >
            E-mail
          </a>
        </FooterCol>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
          <span>
            © {new Date().getFullYear()} {siteConfig.company.legalName}. Todos os direitos reservados.
          </span>
          <span>Feito com ♥ no Brasil.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">
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
      className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-[#FF8C00]"
    >
      {children}
    </Link>
  );
}
