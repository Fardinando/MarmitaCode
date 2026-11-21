import Link from 'next/link';
import type { ReactNode } from 'react';

/* ──────────────────────────────────────────────────────────────
   Design tokens — consistentes em TODO o site.
   Dark warm, Fraunces serif para display, laranja único.
   ────────────────────────────────────────────────────────────── */

export const C = {
  bg: '#0B0908',
  bgElevated: '#141110',
  bgSoft: '#1A1614',
  border: 'rgba(245,239,228,0.08)',
  borderStrong: 'rgba(245,239,228,0.14)',
  text: '#F5EFE4',
  textMuted: '#A89B8A',
  textFaint: '#6B6253',
  accent: '#F97316',
  accentInk: '#C84C09',
  accentSoft: 'rgba(249,115,22,0.10)',
} as const;

export const serif = {
  fontFamily: 'var(--font-fraunces), Georgia, serif',
} as const;

export const sans = {
  fontFamily: 'var(--font-plus-jakarta), system-ui, sans-serif',
} as const;

/* ──────────────────────────────────────────────────────────────
   PageShell — wrapper padrao de toda pagina
   ────────────────────────────────────────────────────────────── */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundColor: C.bg,
        color: C.text,
        ...sans,
      }}
    >
      {children}
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────
   Section — espacamento vertical padrao
   ────────────────────────────────────────────────────────────── */
export function Section({
  children,
  id,
  className = '',
  divider,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-20 md:py-28 ${className}`}
      style={divider ? { borderTop: `1px solid ${C.border}` } : undefined}
    >
      {children}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Eyebrow — serif italic pequeno, substitui ALL-CAPS pill
   ────────────────────────────────────────────────────────────── */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-sm mb-5 flex items-center gap-3"
      style={{ ...serif, color: C.accent, fontStyle: 'italic' }}
    >
      <span
        aria-hidden
        className="inline-block w-8 h-px"
        style={{ backgroundColor: C.accent }}
      />
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Display — titulo grande em Fraunces serif
   formato: "Texto normal <em>com enfase italica</em>"
   ────────────────────────────────────────────────────────────── */
export function Display({
  children,
  size = 'lg',
  className = '',
}: {
  children: ReactNode;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizes = {
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl lg:text-8xl',
  };
  return (
    <h2
      className={`${sizes[size]} leading-[1.02] tracking-[-0.02em] ${className}`}
      style={{
        ...serif,
        fontWeight: 400,
        color: C.text,
        fontVariationSettings: '"opsz" 144, "SOFT" 40',
      }}
    >
      {children}
    </h2>
  );
}

/* ──────────────────────────────────────────────────────────────
   Lead — paragrafo introdutorio
   ────────────────────────────────────────────────────────────── */
export function Lead({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-lg md:text-xl leading-relaxed max-w-[52ch] ${className}`}
      style={{ color: C.textMuted }}
    >
      {children}
    </p>
  );
}

/* ──────────────────────────────────────────────────────────────
   SectionHead — eyebrow + display + lead juntos
   ────────────────────────────────────────────────────────────── */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'left',
  size = 'lg',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  size?: 'md' | 'lg' | 'xl';
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <div className={align === 'center' ? 'flex justify-center' : ''}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <Display size={size}>{title}</Display>
      {lead && <div className="mt-6"><Lead>{lead}</Lead></div>}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Emph — enfase italica laranja dentro de um Display
   ────────────────────────────────────────────────────────────── */
export function Emph({ children }: { children: ReactNode }) {
  return (
    <em
      style={{
        fontStyle: 'italic',
        color: C.accent,
        fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
      }}
    >
      {children}
    </em>
  );
}

/* ──────────────────────────────────────────────────────────────
   PrimaryBtn — botao principal, sem glow
   ────────────────────────────────────────────────────────────── */
export function PrimaryBtn({
  href,
  children,
  external,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes =
    `inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold ` +
    `transition-transform hover:translate-x-1 rounded-full ${className}`;
  const style = {
    backgroundColor: C.accent,
    color: '#1A0E00',
    letterSpacing: '0.01em',
  };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style}>
      {children}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────
   GhostBtn — botao secundario outline
   ────────────────────────────────────────────────────────────── */
export function GhostBtn({
  href,
  children,
  external,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes =
    `inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold ` +
    `transition-colors rounded-full ${className}`;
  const style = {
    color: C.text,
    border: `1px solid ${C.borderStrong}`,
    backgroundColor: 'transparent',
  };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style}>
      {children}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────
   Card — padrao unico, sem gradient background nem blur orbs
   ────────────────────────────────────────────────────────────── */
export function Card({
  children,
  className = '',
  accent,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={`rounded-3xl p-8 ${className}`}
      style={{
        backgroundColor: accent ? C.accentSoft : C.bgElevated,
        border: `1px solid ${accent ? 'rgba(249,115,22,0.3)' : C.border}`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ──────────────────────────────────────────────────────────────
   Numero — N.º 01 em caps compactas, tipografia de cardapio
   ────────────────────────────────────────────────────────────── */
export function Numero({ n }: { n: number }) {
  return (
    <span
      className="text-xs tracking-[0.2em]"
      style={{ ...sans, color: C.textFaint, fontWeight: 600 }}
    >
      N.º {String(n).padStart(2, '0')}
    </span>
  );
}
