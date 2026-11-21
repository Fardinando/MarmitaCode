export function MarmitaCodeCredit({ className = '' }: { className?: string }) {
  return (
    <div className={`mt-4 flex justify-center ${className}`}>
      <a
        href="https://marmitacode.dev.br"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Site feito por MarmitaCode — marmitacode.dev.br"
        className="group inline-block hover:rotate-0 transition-transform"
        style={{ transform: 'rotate(-4deg)' }}
      >
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5"
          style={{
            border: '1.5px solid #F97316',
            borderRadius: '9999px',
            color: '#F97316',
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            letterSpacing: '0.05em',
            fontSize: '11px',
            backgroundColor: 'rgba(249, 115, 22, 0.06)',
          }}
        >
          <picture>
            <source srcSet="/marmitacode-logo.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marmitacode-logo.png"
              alt=""
              width={18}
              height={18}
              loading="lazy"
              decoding="async"
              style={{ display: 'block' }}
            />
          </picture>
          <span style={{ fontWeight: 600 }}>feito em</span>
          <span style={{ fontWeight: 700, fontStyle: 'italic' }}>MarmitaCode</span>
        </span>
      </a>
    </div>
  );
}
