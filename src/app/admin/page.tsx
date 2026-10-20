import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { STATUS_LABELS, type Order, type OrderStatus } from '@/lib/types';

export const metadata = { title: '' };

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const admin = createAdminClient();

  const [{ count: templates }, { count: orders }, { count: clients }, { data: recent }] =
    await Promise.all([
      admin.from('templates').select('*', { count: 'exact', head: true }),
      admin.from('orders').select('*', { count: 'exact', head: true }),
      admin.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
      admin.from('orders').select('*').order('created_at', { ascending: false }).limit(8),
    ]);

  const recentOrders = (recent as Order[]) ?? [];
  const revenue = recentOrders.reduce((sum, o) => sum + Number(o.total_paid), 0);

  return (
    <div>
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        <Stat label="Templates" value={String(templates ?? 0)} />
        <Stat label="Pedidos" value={String(orders ?? 0)} />
        <Stat label="Contratantes" value={String(clients ?? 0)} />
        <Stat label="Receita (últimos)" value={`R$ ${revenue.toFixed(0)}`} highlight />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00]">Pedidos recentes</h2>
        <Link href="/admin/pedidos" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">
          Ver todos
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center text-white/30 font-bold">
          Nenhum pedido ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((o) => (
            <Link
              key={o.id}
              href="/admin/pedidos"
              className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF8C00]/30 transition-all"
            >
              <span className="font-black uppercase text-sm">{o.template_slug ?? 'Personalizado'}</span>
              <span className="text-white/40 text-xs font-bold">{o.contact_name}</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 text-[9px] font-black uppercase tracking-widest">
                {STATUS_LABELS[o.status as OrderStatus]}
              </span>
              <span className="font-black text-[#FF8C00]">R$ {Number(o.total_paid).toFixed(2)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-3xl border ${highlight ? 'bg-[#FF8C00]/10 border-[#FF8C00]/20' : 'bg-white/[0.02] border-white/5'}`}>
      <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mb-3">{label}</span>
      <span className={`text-3xl font-black ${highlight ? 'text-[#FF8C00]' : ''}`}>{value}</span>
    </div>
  );
}
