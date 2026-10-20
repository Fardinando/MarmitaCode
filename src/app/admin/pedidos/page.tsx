import { createAdminClient } from '@/lib/supabase/admin';
import { STATUS_LABELS, TIER_LABELS, type Order, type OrderStatus } from '@/lib/types';
import { updateOrderStatus } from '@/app/admin/actions';

export const metadata = { title: '' };

export const dynamic = 'force-dynamic';

const STATUSES: OrderStatus[] = [
  'aguardando_pagamento',
  'pago',
  'briefing_recebido',
  'em_producao',
  'publicado',
  'manutencao',
  'cancelado',
];

export default async function AdminOrdersPage() {
  const admin = createAdminClient();
  const { data } = await admin.from('orders').select('*').order('created_at', { ascending: false });
  const orders = (data as Order[]) ?? [];

  return (
    <div>
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Pedidos</h1>

      {orders.length === 0 ? (
        <p className="text-white/30 font-bold">Nenhum pedido ainda.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => (
            <details key={o.id} className="rounded-3xl bg-white/[0.02] border border-white/5 p-7">
              <summary className="cursor-pointer flex flex-wrap items-center gap-5 justify-between">
                <span className="font-black uppercase text-sm">
                  {o.template_slug ?? 'Personalizado'}{' '}
                  <span className="text-white/30">• {TIER_LABELS[o.tier]}</span>
                </span>
                <span className="text-white/40 text-xs font-bold">{o.contact_name} — {o.contact_email}</span>
                <span className="font-black text-[#FF8C00]">R$ {Number(o.total_paid).toFixed(2)}</span>
              </summary>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 text-sm">
                  <Info label="ID" value={o.id} />
                  <Info label="Status" value={STATUS_LABELS[o.status as OrderStatus]} />
                  <Info label="Telefone" value={o.contact_phone ?? '-'} />
                  <Info label="Empresa" value={o.company_name ?? '-'} />
                  <Info label="Setup" value={`R$ ${Number(o.setup_price).toFixed(2)}`} />
                  <Info label="Mensalidade" value={`R$ ${Number(o.monthly_price).toFixed(2)}/mês`} />
                  <Info label="Domínio" value={o.domain_years ? `${o.domain_years} ano(s) — R$ ${Number(o.domain_total).toFixed(2)}` : 'Não'} />
                  <Info label="Desconto" value={o.discount_code ? `${o.discount_code}` : '-'} />
                  <Info label="IP" value={o.client_ip ?? '-'} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Briefing</p>
                  <pre className="text-[11px] text-white/50 bg-black/40 rounded-2xl p-4 overflow-auto max-h-52">
                    {JSON.stringify(o.briefing, null, 2)}
                  </pre>

                  <form action={updateOrderStatus} className="flex gap-3 mt-5">
                    <input type="hidden" name="id" value={o.id} />
                    <select
                      name="status"
                      defaultValue={o.status}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-black">{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                    <button className="px-6 py-3 rounded-xl bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest">
                      Atualizar
                    </button>
                  </form>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-white/5">
      <span className="text-white/30 font-bold text-xs">{label}</span>
      <span className="font-bold text-xs text-right break-all">{value}</span>
    </div>
  );
}
