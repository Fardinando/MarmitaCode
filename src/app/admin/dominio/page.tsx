import { createAdminClient } from '@/lib/supabase/admin';
import type { DomainPricing } from '@/lib/types';
import { saveDomainPricing, deleteDomainPricing } from '@/app/admin/actions';

export const metadata = { title: 'Domínio | Admin MarmitaCode' };

export default async function AdminDomainPage() {
  const admin = createAdminClient();
  const { data } = await admin.from('domain_pricing').select('*').order('sort_order', { ascending: true });
  const pricing = (data as DomainPricing[]) ?? [];

  const { data: setting } = await admin.from('settings').select('value').eq('key', 'domain_policy').single();

  return (
    <div>
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Domínio</h1>
      <p className="text-white/40 font-bold mb-10 max-w-2xl">
        Configure os preços do Registro.br por período. A taxa de mão de obra é única; a do Registro.br é anual.
      </p>

      <form action={saveDomainPricing} className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 mb-12">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#FF8C00] mb-6">Nova faixa</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <Field name="years" label="Anos" type="number" required />
          <Field name="registry_price" label="Preço Registro.br (R$)" type="number" />
          <Field name="labor_fee" label="Mão de obra (R$)" type="number" />
          <Field name="sort_order" label="Ordem" type="number" />
        </div>
        <div className="flex items-center gap-6 mt-6">
          <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/60">
            <input type="checkbox" name="active" defaultChecked className="w-4 h-4 accent-[#FF8C00]" /> Ativo
          </label>
          <button className="px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest">
            Adicionar
          </button>
        </div>
      </form>

      <div className="space-y-4 mb-16">
        {pricing.map((d) => (
          <div key={d.id} className="rounded-3xl bg-white/[0.02] border border-white/5 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-black uppercase text-sm">{d.years} ano{d.years > 1 ? 's' : ''}</p>
              <p className="text-white/40 text-xs font-bold">
                Registro.br: R$ {Number(d.registry_price).toFixed(2)} • Mão de obra: R$ {Number(d.labor_fee).toFixed(2)} •
                Total: R$ {(Number(d.registry_price) + Number(d.labor_fee)).toFixed(2)}
              </p>
            </div>
            <form action={deleteDomainPricing}>
              <input type="hidden" name="id" value={d.id} />
              <button className="px-5 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20">
                Excluir
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 p-8">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#FF8C00] mb-4">Aviso legal ao cliente</p>
        <pre className="text-xs text-white/60 whitespace-pre-wrap font-sans">
          {setting?.value ? JSON.stringify(setting.value, null, 2) : 'Configure o texto em settings.domain_policy'}
        </pre>
      </div>
    </div>
  );
}

function Field({ name, label, type, required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50"
      />
    </label>
  );
}
