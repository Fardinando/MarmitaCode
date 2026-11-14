import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Profile } from '@/lib/types';
import { updateClient } from '@/app/admin/actions';

export const metadata = { title: '' };

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 25;

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageStr, q } = await searchParams;
  const page = Math.max(1, Number(pageStr) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const admin = createAdminClient();
  let query = admin
    .from('profiles')
    .select('id, role, name, email, phone, created_at', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (q && q.trim()) {
    const term = `%${q.trim()}%`;
    query = query.or(`name.ilike.${term},email.ilike.${term},phone.ilike.${term}`);
  }

  const { data, count } = await query.range(from, to);
  const profiles = (data as Profile[]) ?? [];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const qs = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined || v === '') params.delete(k);
      else params.set(k, String(v));
    }
    const s = params.toString();
    return s ? `?${s}` : '';
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Contratantes</h1>
        <span className="text-[11px] font-black uppercase tracking-widest text-white/40">
          {total} total · página {page} de {totalPages}
        </span>
      </div>

      <form action="/admin/contratantes" method="get" className="mb-8 flex gap-3 max-w-xl">
        <input
          name="q"
          defaultValue={q ?? ''}
          placeholder="Buscar por nome, e-mail ou telefone..."
          className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm outline-none focus:border-[#FF8C00]/50"
        />
        <button className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest">
          Buscar
        </button>
        {q && (
          <Link
            href="/admin/contratantes"
            className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10"
          >
            Limpar
          </Link>
        )}
      </form>

      {profiles.length === 0 ? (
        <p className="text-white/30 font-bold">Nenhum usuário encontrado.</p>
      ) : (
        <div className="space-y-4">
          {profiles.map((p) => (
            <form key={p.id} action={updateClient} className="rounded-3xl bg-white/[0.02] border border-white/5 p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <input type="hidden" name="id" value={p.id} />
              <div>
                <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">E-mail</span>
                <span className="text-xs font-bold break-all">{p.email}</span>
              </div>
              <Field name="name" label="Nome" defaultValue={p.name ?? ''} />
              <Field name="phone" label="Telefone" defaultValue={p.phone ?? ''} />
              <div className="flex gap-3">
                <select
                  name="role"
                  defaultValue={p.role}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none"
                >
                  <option value="client" className="bg-black">Cliente</option>
                  <option value="admin" className="bg-black">Admin</option>
                </select>
                <button className="px-5 py-3 rounded-xl bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest">
                  Salvar
                </button>
              </div>
            </form>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          {page > 1 && (
            <Link
              href={`/admin/contratantes${qs({ page: page - 1 })}`}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
            >
              ← Anterior
            </Link>
          )}
          <span className="text-[11px] font-black uppercase tracking-widest text-white/40">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/contratantes${qs({ page: page + 1 })}`}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
            >
              Próxima →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50"
      />
    </label>
  );
}
