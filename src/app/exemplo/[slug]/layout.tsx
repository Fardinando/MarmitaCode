import Link from 'next/link';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Esconde o header/footer global apenas nas páginas de demonstração */}
      <style>{`
        header.fixed { display: none !important; }
        footer { display: none !important; }
        body > div.pt-20 { padding-top: 0 !important; }
      `}</style>

      <div className="fixed top-0 inset-x-0 z-[100] bg-[#FF8C00] text-black">
        <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-widest">
          <Link href="/templates" className="hover:underline shrink-0">
            ← Voltar ao catálogo MarmitaCode
          </Link>
          <span className="hidden md:block opacity-80">
            Esta é uma demonstração — você pode encomendar com cores, textos e imagens personalizadas.
          </span>
        </div>
      </div>

      <div className="pt-10">{children}</div>
    </>
  );
}
