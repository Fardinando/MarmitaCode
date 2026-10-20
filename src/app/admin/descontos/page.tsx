import { createAdminClient } from '@/lib/supabase/admin';
import type { Discount } from '@/lib/types';
import { saveDiscount, deleteDiscount } from '@/app/admin/actions';

export const metadata = { title: 'Descontos | Admin MarmitaCode' };

export default async function AdminDiscountsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from('discounts').select('*').order('created_at', { ascending: false });
  const discounts = (data as Discount[]) ?? [];

  return (
    <div>
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Descontos</h1>

      <form action={saveDiscount} className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 mb-12">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#FF8C00] mb-6">Novo cupom</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <Field name="code" label="Código" placeholder="PROMO10" required />
          <Field name="percent" label="% desconto" type="number" placeholder="0" />
          <Field name="amount" label="R$ desconto" type="number" placeholder="0" />
          <Field name="expires_at" label="Expira em" type="date" />
        </div>
        <div className="flex items-center gap-6 mt-6">
          <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/60">
            <input type="checkbox" name="active" defaultChecked className="w-4 h-4 accent-[#FF8C00]" /> Ativo
          </label>
          <button className="px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest">
            Criar cupom
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {discounts.length === 0 && <p className="text-white/30 font-bold">Nenhum cupom.</p>}
        {discounts.map((d) => (
          <div key={d.id} className="rounded-3xl bg-white/[0.02] border border-white/5 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-black uppercase text-sm">{d.code}</p>
              <p className="text-white/40 text-xs font-bold">
                {d.percent > 0 && `${d.percent}% `}
                {d.amount > 0 && `R$${d.amount} `}
                {d.expires_at && `• expira ${new Date(d.expires_at).toLocaleDateString('pt-BR')}`}
                {d.active ? ' • ativo' : ' • inativo'}
              </p>
            </div>
            <form action={deleteDiscount}>
              <input type="hidden" name="id" value={d.id} />
              <button className="px-5 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20">
                Excluir
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ name, label, placeholder, required, type }: {
  name: string; label: string; placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <input
        name={name}
        type={type ?? 'text'}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50"
      />
    </label>
  );
}
