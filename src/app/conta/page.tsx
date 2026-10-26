import Link from 'next/link';
import { ClipboardList, CheckCircle2, Globe, Rocket, Clock } from 'lucide-react';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminMetrics } from '@/components/AdminMetrics';
import {
  MONTHLY_LABELS,
  STATUS_LABELS,
  TIER_LABELS,
  type MonthlyStatus,
  type Order,
  type OrderStatus,
  type Profile,
  type SiteProject,
} from '@/lib/types';

export const metadata = { title: 'Minha conta | MarmitaCode' };
export const dynamic = 'force-dynamic';

const PAID_STATUSES: OrderStatus[] = [
  'pago',
  'briefing_recebido',
  'em_producao',
  'publicado',
  'manutencao',
];

export default async function AccountPage() {
  const user = await requireUser();
  const supabase = await createClient();

  // Verifica se é admin
  const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const profile = profileData as Profile | null;
  const isAdmin = profile?.role === 'admin';

  // Se é admin, mostra gráficos de métricas globais em vez dos pedidos pessoais.
  if (isAdmin) {
    const admin = createAdminClient();
    const [{ data: allOrders }, { data: allProjects }, { count: clientsCount }, { count: templatesCount }] =
      await Promise.all([
        admin.from('orders').select('id, status, total_paid, created_at, template_slug, tier'),
        admin.from('site_projects').select('id, status, monthly_status, created_at'),
        admin.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
        admin.from('templates').select('*', { count: 'exact', head: true }).eq('active', true),
      ]);

    return (
      <main className="relative min-h-screen bg-black text-white px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
            Minha <span className="text-[#FF8C00]">conta</span>
          </h1>
          <p className="text-white/40 font-bold mb-10">
            {user.email} · <span className="text-[#FF8C00]">Administrador</span>
          </p>

          <AdminMetrics
            orders={allOrders ?? []}
            projects={allProjects ?? []}
            clientsCount={clientsCount ?? 0}
            templatesCount={templatesCount ?? 0}
          />

          <div className="mt-12 flex gap-3 flex-wrap">
            <Link href="/admin" className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700]">
              Ir pro painel admin
            </Link>
            <Link href="/admin/pedidos" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10">
              Ver pedidos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Cliente comum
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

  // Pedidos pagos SEM briefing confirmado = precisam de briefing.
  const pendingBriefings = orderList.filter(
    (o) =>
      PAID_STATUSES.includes(o.status) &&
      o.status === 'pago' &&
      !(o.briefing && typeof o.briefing === 'object' && 'confirmed_at' in o.briefing)
  );

  // Pedidos com briefing enviado, aguardando/em produção
  const inProduction = orderList.filter(
    (o) => o.status === 'briefing_recebido' || o.status === 'em_producao'
  );

  const published = projectList.filter((p) => p.status === 'publicado' || p.site_url);

  const hasDomainOrder = orderList.some((o) => {
    const b = o.briefing as Record<string, unknown> | null;
    return b && (b.wants_domain === 'sim' || b.domain_name);
  });

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
          Minha <span className="text-[#FF8C00]">conta</span>
        </h1>
        <p className="text-white/40 font-bold mb-10">{user.email}</p>

        {/* AÇÃO PRIORITÁRIA: briefing pendente */}
        {pendingBriefings.length > 0 && (
          <section className="mb-16">
            {pendingBriefings.map((o) => (
              <Link
                key={o.id}
                href={`/briefing/${o.id}`}
                className="group block mb-4 p-8 rounded-[2rem] bg-gradient-to-br from-[#FF8C00] to-[#FFD700] text-black hover:scale-[1.01] transition-all shadow-2xl"
              >
                <div className="flex items-start gap-5 flex-wrap">
                  <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                    <ClipboardList size={26} />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">
                      Pedido pago · Aguardando seu briefing
                    </div>
                    <div className="text-2xl md:text-3xl font-black italic leading-tight">
                      Responda este questionário pra começarmos seu site
                    </div>
                    <div className="text-sm font-bold mt-2 opacity-80">
                      Template: {o.template_slug ?? 'Personalizado'} · Pedido #{o.id.slice(0, 8)}
                    </div>
                  </div>
                  <div className="text-3xl group-hover:translate-x-1 transition">→</div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Tutorial de domínio se escolheu domínio próprio */}
        {hasDomainOrder && (
          <Link
            href="/tutorial/dominio-proprio"
            className="group block mb-10 p-6 rounded-3xl bg-gradient-to-br from-[#FF8C00]/20 to-[#FF8C00]/5 border border-[#FF8C00]/30 hover:border-[#FF8C00]/60 transition"
          >
            <div className="flex items-center gap-5 flex-wrap">
              <div className="w-12 h-12 rounded-full bg-[#FF8C00]/20 flex items-center justify-center text-xl shrink-0">
                🌐
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-1">
                  Domínio próprio
                </div>
                <div className="font-black">Tutorial: Registro.br passo a passo</div>
              </div>
              <div className="text-[#FF8C00] text-2xl group-hover:translate-x-1 transition shrink-0">→</div>
            </div>
          </Link>
        )}

        {/* Status geral */}
        <section className="mb-12">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            Resumo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusCard icon={<ClipboardList size={20} />} label="Pedidos" value={orderList.length} />
            <StatusCard icon={<Clock size={20} />} label="Em produção" value={inProduction.length} highlight />
            <StatusCard icon={<Rocket size={20} />} label="No ar" value={published.length} />
            <StatusCard icon={<Globe size={20} />} label="Com domínio" value={hasDomainOrder ? 1 : 0} />
          </div>
        </section>

        {/* Meus pedidos */}
        <section className="mb-14">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
            Meus pedidos
          </h2>
          {orderList.length === 0 ? (
            <Empty text="Você ainda não fez nenhum pedido." cta={{ href: '/templates', label: 'Ver templates' }} />
          ) : (
            <div className="space-y-3">
              {orderList.map((o) => {
                const needsBriefing = o.status === 'pago' && !(o.briefing && typeof o.briefing === 'object' && 'confirmed_at' in o.briefing);
                return (
                  <div key={o.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center gap-4 justify-between">
                    <div>
                      <p className="font-black uppercase text-sm">{o.template_slug ?? 'Personalizado'}</p>
                      <p className="text-white/40 text-xs font-bold mt-1">
                        {TIER_LABELS[o.tier]} · {new Date(o.created_at).toLocaleDateString('pt-BR')} · #{o.id.slice(0, 8)}
                      </p>
                    </div>
                    <Badge
                      label={STATUS_LABELS[o.status as OrderStatus]}
                      kind={
                        o.status === 'publicado' ? 'success' :
                        o.status === 'em_producao' ? 'highlight' :
                        o.status === 'cancelado' ? 'danger' : 'default'
                      }
                    />
                    <div className="text-right">
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Total pago</p>
                      <p className="font-black text-[#FF8C00]">R$ {Number(o.total_paid).toFixed(2).replace('.', ',')}</p>
                    </div>
                    {needsBriefing && (
                      <Link
                        href={`/briefing/${o.id}`}
                        className="px-5 py-3 rounded-full bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#FFD700]"
                      >
                        Responder briefing
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Meus sites publicados */}
        {projectList.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
              Meus sites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projectList.map((p) => (
                <div key={p.id} className="p-7 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      Projeto
                    </span>
                    <Badge
                      label={MONTHLY_LABELS[p.monthly_status as MonthlyStatus]}
                      kind={p.monthly_status === 'ativo' ? 'success' : 'default'}
                    />
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
          </section>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/templates"
            className="inline-block px-10 py-5 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700]"
          >
            Encomendar outro site
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatusCard({ icon, label, value, highlight }: {
  icon: React.ReactNode; label: string; value: number; highlight?: boolean;
}) {
  return (
    <div className={`p-5 rounded-2xl border ${highlight ? 'bg-[#FF8C00]/10 border-[#FF8C00]/30' : 'bg-white/[0.02] border-white/5'}`}>
      <div className={`mb-3 ${highlight ? 'text-[#FF8C00]' : 'text-white/40'}`}>{icon}</div>
      <div className={`text-3xl font-black ${highlight ? 'text-[#FF8C00]' : 'text-white'}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1 font-bold">{label}</div>
    </div>
  );
}

function Badge({ label, kind }: { label: string; kind: 'default' | 'success' | 'highlight' | 'danger' }) {
  const colors = {
    default: 'bg-white/5 text-white/50',
    success: 'bg-emerald-500/10 text-emerald-400',
    highlight: 'bg-[#FF8C00]/10 text-[#FF8C00]',
    danger: 'bg-red-500/10 text-red-400',
  }[kind];
  return (
    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${colors}`}>
      {label}
    </span>
  );
}

function Empty({ text, cta }: { text: string; cta?: { href: string; label: string } }) {
  return (
    <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
      <p className="text-white/40 font-bold mb-6">{text}</p>
      {cta && (
        <Link href={cta.href} className="inline-block px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest">
          {cta.label}
        </Link>
      )}
    </div>
  );
}
