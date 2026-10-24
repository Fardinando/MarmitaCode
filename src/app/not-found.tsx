import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-4">
          Erro 404
        </p>
        <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
          Marmita <span className="text-[#FF8C00]">não</span> encontrada
        </h1>
        <p className="text-white/60 mb-10 text-sm leading-relaxed">
          A página que você procura não existe ou foi movida. Que tal voltar
          para o catálogo?
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
          >
            Início
          </Link>
          <Link
            href="/templates"
            className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700]"
          >
            Ver templates
          </Link>
        </div>
      </div>
    </main>
  );
}
