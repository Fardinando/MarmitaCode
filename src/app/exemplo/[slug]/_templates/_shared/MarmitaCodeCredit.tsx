export function MarmitaCodeCredit({ className = '' }: { className?: string }) {
  return (
    <div className={`mt-3 flex items-center justify-center gap-2 ${className}`}>
      <span className="text-[11px] font-normal normal-case tracking-normal opacity-70">
        Site feito por
      </span>
      <a
        href="https://marmitacode.dev.br"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 no-underline hover:opacity-80 transition-opacity"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/marmitacode-logo.png"
          alt="MarmitaCode"
          width={22}
          height={22}
          style={{ display: 'block' }}
        />
        <span className="font-bold text-[13px] normal-case tracking-normal" style={{ color: '#F97316' }}>
          MarmitaCode
        </span>
      </a>
    </div>
  );
}
