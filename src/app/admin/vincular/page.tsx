import { createAdminClient } from '@/lib/supabase/admin';
import { AlertTriangle, Mail } from 'lucide-react';
import { LinkButton } from './LinkButton';

export const metadata = { title: '' };
export const dynamic = 'force-dynamic';

interface OrphanOrder {
  id: string;
  contact_email: string | null;
  contact_name: string | null;
  status: string;
  total_paid: number;
  created_at: string;
  template_slug: string | null;
}

export default async function LinkOrphansPage() {
  const admin = createAdminClient();

  const { data: orphans } = await admin
    .from('orders')
    .select('id, contact_email, contact_name, status, total_paid, created_at, template_slug')
    .is('client_id', null)
    .order('created_at', { ascending: false });

  const list = (orphans as OrphanOrder[]) ?? [];

  // Lista todos os users pra mostrar quais vão casar.
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailSet = new Set(
    (usersPage?.users ?? [])
      .map((u) => u.email?.toLowerCase().trim())
      .filter((e): e is string => !!e)
  );

  const willMatch = list.filter((o) =>
    o.contact_email && emailSet.has(o.contact_email.toLowerCase().trim())
  );
  const wontMatch = list.filter(
    (o) => !o.contact_email || !emailSet.has(o.contact_email.toLowerCase().trim())
  );

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Vincular pedidos órfãos
          </h1>
          <p className="text-white/40 font-bold text-sm mt-2 max-w-xl">
            Pedidos que foram feitos sem conta vinculada. Normalmente são clientes que pagaram antes
            de criar conta — ao criar a conta com o mesmo email, o vínculo é feito automaticamente,
            mas você pode forçar aqui.
          </p>
        </div>
        <div className="flex gap-3">
          <Stat label="Total órfãos" value={list.length} />
          <Stat label="Pode vincular" value={willMatch.length} highlight />
          <Stat label="Sem conta ainda" value={wontMatch.length} />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="p-16 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <p className="text-emerald-400 font-black text-lg">✓ Nenhum pedido órfão.</p>
          <p className="text-white/40 text-sm mt-2">Todos os pedidos estão vinculados a contas.</p>
        </div>
      ) : (
        <>
          {willMatch.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00]">
                  Prontos pra vincular
                </h2>
                <LinkButton count={willMatch.length} />
              </div>
              <div className="space-y-2">
                {willMatch.map((o) => (
                  <OrphanRow key={o.id} order={o} match />
                ))}
              </div>
            </section>
          )}

          {wontMatch.length > 0 && (
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 mb-5">
                Sem conta criada ainda
              </h2>
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-white/70 mb-5">
                <AlertTriangle size={14} className="inline mr-2 text-amber-400" />
                Esses clientes pagaram mas ainda não criaram conta. Mande o link{' '}
                <code className="text-[#FF8C00]">/checkout/criar-conta?order=&lt;ID&gt;</code> pra
                eles pelo WhatsApp pra concluírem.
              </div>
              <div className="space-y-2">
                {wontMatch.map((o) => (
                  <OrphanRow key={o.id} order={o} match={false} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function OrphanRow({ order, match }: { order: OrphanOrder; match: boolean }) {
  return (
    <div
      className={`p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
        match ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/5'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-black uppercase text-sm">{order.contact_name ?? 'Sem nome'}</span>
          <span className="text-xs text-white/40 flex items-center gap-1">
            <Mail size={10} /> {order.contact_email ?? '(sem email)'}
          </span>
        </div>
        <div className="text-white/40 text-xs font-bold mt-1 flex gap-3 flex-wrap">
          <span>#{order.id.slice(0, 8)}</span>
          <span>·</span>
          <span>{order.template_slug ?? 'Personalizado'}</span>
          <span>·</span>
          <span>{order.status}</span>
          <span>·</span>
          <span>R$ {Number(order.total_paid).toFixed(2).replace('.', ',')}</span>
          <span>·</span>
          <span>{new Date(order.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      {match && (
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
          Conta encontrada
        </span>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-2xl border ${highlight ? 'bg-[#FF8C00]/10 border-[#FF8C00]/30' : 'bg-white/[0.02] border-white/5'}`}>
      <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${highlight ? 'text-[#FF8C00]' : 'text-white/40'}`}>
        {label}
      </div>
      <div className={`text-2xl font-black ${highlight ? 'text-[#FF8C00]' : 'text-white'}`}>{value}</div>
    </div>
  );
}
