import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import {
  MONTHLY_LABELS,
  STATUS_LABELS,
  TIER_LABELS,
  type MonthlyStatus,
  type Order,
  type OrderStatus,
  type SiteProject,
} from '@/lib/types';

export const metadata = { title: 'Minha conta | MarmitaCode' };

export default async function AccountPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  const { data: projects } = await supabase
    .from('site_projects')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  const orderList = (orders as Order[]) ?? [];
  const projectList = (projects as SiteProject[]) ?? [];

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
          Minha <span className="text-[#FF8C00]">conta</span>
        </h1>
        <p className="text-white/40 font-bold mb-16">{user.email}</p>

        <section className="mb-20">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-8">Meus pedidos</h2>
          {orderList.length === 0 ? (
            <Empty text="Você ainda não fez nenhum pedido." />
          ) : (
            <div className="space-y-4">
              {orderList.map((o) => (
                <div key={o.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center gap-6 justify-between">
                  <div>
                    <p className="font-black uppercase text-sm">{o.template_slug ?? 'Personalizado'}</p>
                    <p className="text-white/40 text-xs font-bold">
                      {TIER_LABELS[o.tier]} • {new Date(o.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge label={STATUS_LABELS[o.status as OrderStatus]} />
                  <div className="text-right">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Total</p>
                    <p className="font-black text-[#FF8C00]">R$ {Number(o.total_paid).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-8">Meus sites</h2>
          {projectList.length === 0 ? (
            <Empty text="Nenhum site em produção ainda." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectList.map((p) => (
                <div key={p.id} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      Projeto
                    </span>
                    <Badge label={MONTHLY_LABELS[p.monthly_status as MonthlyStatus]} highlight={p.monthly_status === 'ativo'} />
                  </div>
                  <p className="font-black uppercase text-sm mb-2">{p.status}</p>
                  {p.site_url ? (
                    <a href={p.site_url} target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] text-xs font-bold hover:underline break-all">
                      {p.site_url}
                    </a>
                  ) : (
                    <p className="text-white/30 text-xs font-bold">URL ainda não definida</p>
                  )}
                  {p.next_due_date && (
                    <p className="text-white/40 text-xs font-bold mt-4">
                      Próxima mensalidade: {new Date(p.next_due_date).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-20 text-center">
          <Link
            href="/templates"
            className="inline-block px-10 py-5 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
          >
            Encomendar novo site
          </Link>
        </div>
      </div>
    </main>
  );
}

function Badge({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
      highlight ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/50'
    }`}>
      {label}
    </span>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
      <p className="text-white/30 font-bold">{text}</p>
    </div>
  );
}
