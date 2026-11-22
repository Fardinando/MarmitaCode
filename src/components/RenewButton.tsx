'use client';

import { useState } from 'react';

export function RenewButton({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch('/api/billing/renew', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ project_id: projectId }),
      });
      const j = await r.json();
      if (!r.ok) {
        setErr(j.error ?? 'erro');
        setLoading(false);
        return;
      }
      if (j.init_point) {
        window.location.href = j.init_point;
        return;
      }
      if (j.mock && j.new_due_date) {
        window.location.href = `/conta?renew=ok&newdue=${j.new_due_date}`;
        return;
      }
      setLoading(false);
    } catch {
      setErr('falha de conexao');
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        disabled={loading}
        onClick={go}
        className="px-5 py-3 rounded-full bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#FFD700] disabled:opacity-50"
      >
        {loading ? 'Abrindo pagamento…' : 'Antecipar mensalidade (+30 dias)'}
      </button>
      {err && <p className="mt-2 text-[11px] font-bold text-red-400">{err}</p>}
    </div>
  );
}
