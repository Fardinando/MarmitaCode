'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, Link as LinkIcon } from 'lucide-react';

export function LinkButton({ count }: { count: number }) {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ linked: number; skipped: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setRunning(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/link-orphans', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao vincular.');
      setResult({ linked: data.linked, skipped: data.skipped });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setRunning(false);
    }
  };

  if (result) {
    return (
      <div className="px-5 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
        <Check size={14} /> {result.linked} vinculado{result.linked !== 1 ? 's' : ''}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={run}
        disabled={running || count === 0}
        className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700] disabled:opacity-30 flex items-center gap-2"
      >
        {running ? <Loader2 size={14} className="animate-spin" /> : <LinkIcon size={14} />}
        {running ? 'Vinculando...' : `Vincular ${count} pedido${count !== 1 ? 's' : ''}`}
      </button>
      {error && <div className="text-xs text-red-400 font-bold">{error}</div>}
    </div>
  );
}
