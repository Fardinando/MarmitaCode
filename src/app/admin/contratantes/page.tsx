import { createAdminClient } from '@/lib/supabase/admin';
import type { Profile } from '@/lib/types';
import { updateClient } from '@/app/admin/actions';

export const metadata = { title: 'Contratantes | Admin MarmitaCode' };

export default async function AdminClientsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from('profiles').select('*').order('created_at', { ascending: false });
  const profiles = (data as Profile[]) ?? [];

  return (
    <div>
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Contratantes</h1>

      {profiles.length === 0 ? (
        <p className="text-white/30 font-bold">Nenhum usuário ainda.</p>
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
