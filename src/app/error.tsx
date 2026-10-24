'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app error]', error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-4">
          Algo deu errado
        </p>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
          A cozinha <span className="text-[#FF8C00]">pifou</span>
        </h1>
        <p className="text-white/60 mb-10 text-sm leading-relaxed">
          Tivemos um erro inesperado. Você pode tentar novamente ou voltar
          para o início.
        </p>
        {error.digest && (
          <p className="text-white/30 text-[10px] font-mono mb-6">
            ref: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
          >
            Tentar de novo
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
