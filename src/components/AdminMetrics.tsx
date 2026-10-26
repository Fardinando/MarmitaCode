import { DollarSign, ClipboardList, Users, Rocket, LayoutGrid, TrendingUp, Clock, CheckCircle2, Globe } from 'lucide-react';
import { STATUS_LABELS, type OrderStatus } from '@/lib/types';

interface OrderLite {
  id: string;
  status: string;
  total_paid: number;
  created_at: string;
  template_slug: string | null;
  tier: string;
}

interface ProjectLite {
  id: string;
  status: string;
  monthly_status: string;
  created_at: string;
}

const PAID_STATUSES = ['pago', 'briefing_recebido', 'em_producao', 'publicado', 'manutencao'];

export function AdminMetrics({ orders, projects, clientsCount, templatesCount }: {
  orders: OrderLite[];
  projects: ProjectLite[];
  clientsCount: number;
  templatesCount: number;
}) {
  const paidOrders = orders.filter((o) => PAID_STATUSES.includes(o.status));
  const totalRevenue = paidOrders.reduce((s, o) => s + Number(o.total_paid), 0);
  const publishedCount = projects.filter((p) => p.status === 'publicado').length;
  const inProduction = orders.filter((o) => ['briefing_recebido', 'em_producao'].includes(o.status)).length;
  const awaitingBriefing = orders.filter((o) => o.status === 'pago').length;

  // Status distribution
  const statusCount: Record<string, number> = {};
  for (const o of orders) {
    statusCount[o.status] = (statusCount[o.status] ?? 0) + 1;
  }
  const statusEntries = Object.entries(statusCount).sort((a, b) => b[1] - a[1]);

  // Receita por mês (últimos 6 meses)
  const now = new Date();
  const monthlyRevenue: { label: string; value: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const sum = paidOrders
      .filter((o) => {
        const t = new Date(o.created_at);
        return t >= d && t < next;
      })
      .reduce((s, o) => s + Number(o.total_paid), 0);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    monthlyRevenue.push({ label: months[d.getMonth()], value: sum });
  }

  // Templates mais pedidos
  const templateCount: Record<string, number> = {};
  for (const o of orders) {
    const k = o.template_slug ?? 'Personalizado';
    templateCount[k] = (templateCount[k] ?? 0) + 1;
  }
  const topTemplates = Object.entries(templateCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const maxMonthlyRev = Math.max(...monthlyRevenue.map((m) => m.value), 100);
  const maxTemplate = Math.max(...topTemplates.map(([, v]) => v), 1);

  return (
    <>
      {/* Cards principais */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <MetricCard
          icon={<DollarSign size={22} />}
          label="Receita total"
          value={`R$ ${totalRevenue.toFixed(2).replace('.', ',')}`}
          sub={`${paidOrders.length} pagos`}
          highlight
        />
        <MetricCard
          icon={<ClipboardList size={22} />}
          label="Pedidos totais"
          value={String(orders.length)}
          sub={`${awaitingBriefing} aguardando briefing`}
        />
        <MetricCard
          icon={<Rocket size={22} />}
          label="Sites no ar"
          value={String(publishedCount)}
          sub={`${inProduction} em produção`}
        />
        <MetricCard
          icon={<Users size={22} />}
          label="Clientes"
          value={String(clientsCount)}
          sub={`${templatesCount} templates ativos`}
        />
      </section>

      {/* Receita mensal — gráfico de barras */}
      <section className="mb-10 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-1">
              Receita
            </p>
            <h3 className="text-2xl font-black italic">Últimos 6 meses</h3>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/40 font-bold">Total período</div>
            <div className="text-xl font-black text-[#FF8C00]">
              R$ {monthlyRevenue.reduce((s, m) => s + m.value, 0).toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>
        <div className="flex items-end gap-3 h-48">
          {monthlyRevenue.map((m, i) => {
            const h = (m.value / maxMonthlyRev) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-[#FF8C00] to-[#FFD700] rounded-t-lg transition-all min-h-[2px]"
                    style={{ height: `${h}%` }}
                    title={`R$ ${m.value.toFixed(2)}`}
                  />
                </div>
                <div className="text-[10px] font-black text-white/40 uppercase">{m.label}</div>
                <div className="text-[9px] text-white/60 font-mono">
                  {m.value > 0 ? (m.value >= 1000 ? `${(m.value / 1000).toFixed(1)}k` : m.value.toFixed(0)) : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Status dos pedidos */}
        <section className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-1">
            Status
          </p>
          <h3 className="text-2xl font-black italic mb-6">Pedidos por status</h3>
          {statusEntries.length === 0 ? (
            <p className="text-white/30 text-sm py-10 text-center">Nenhum pedido ainda.</p>
          ) : (
            <div className="space-y-3">
              {statusEntries.map(([status, count]) => {
                const pct = (count / orders.length) * 100;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-bold text-white/70">{STATUS_LABELS[status as OrderStatus] ?? status}</span>
                      <span className="font-black">{count} <span className="text-white/40">({pct.toFixed(0)}%)</span></span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${statusColor(status)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Templates mais pedidos */}
        <section className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00] mb-1">
            Ranking
          </p>
          <h3 className="text-2xl font-black italic mb-6">Templates mais pedidos</h3>
          {topTemplates.length === 0 ? (
            <p className="text-white/30 text-sm py-10 text-center">Nenhum pedido ainda.</p>
          ) : (
            <div className="space-y-3">
              {topTemplates.map(([slug, count], i) => (
                <div key={slug} className="flex items-center gap-3">
                  <span className="text-xl font-black text-white/20 w-6">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-sm truncate">{slug}</span>
                      <span className="font-black text-sm text-[#FF8C00]">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF8C00] to-[#FFD700]"
                        style={{ width: `${(count / maxTemplate) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Breakdown de ação */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionCard
          icon={<Clock size={18} />}
          label="Aguardando briefing"
          value={awaitingBriefing}
          color="amber"
        />
        <ActionCard
          icon={<TrendingUp size={18} />}
          label="Em produção"
          value={inProduction}
          color="blue"
        />
        <ActionCard
          icon={<CheckCircle2 size={18} />}
          label="Publicados"
          value={publishedCount}
          color="emerald"
        />
        <ActionCard
          icon={<LayoutGrid size={18} />}
          label="Templates ativos"
          value={templatesCount}
          color="slate"
        />
      </section>
    </>
  );
}

function MetricCard({ icon, label, value, sub, highlight }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div className={`p-6 rounded-3xl border ${highlight ? 'bg-[#FF8C00]/10 border-[#FF8C00]/30' : 'bg-white/[0.02] border-white/5'}`}>
      <div className={`mb-4 ${highlight ? 'text-[#FF8C00]' : 'text-white/40'}`}>{icon}</div>
      <div className={`text-2xl md:text-3xl font-black ${highlight ? 'text-[#FF8C00]' : ''}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1 font-bold">{label}</div>
      {sub && <div className="text-xs text-white/30 mt-2 font-bold">{sub}</div>}
    </div>
  );
}

function ActionCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number; color: 'amber' | 'blue' | 'emerald' | 'slate';
}) {
  const colors = {
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
    slate: { text: 'text-slate-300', bg: 'bg-white/[0.02]', border: 'border-white/5' },
  }[color];
  return (
    <div className={`p-5 rounded-2xl border ${colors.bg} ${colors.border}`}>
      <div className={`flex items-center gap-2 mb-3 ${colors.text}`}>
        {icon}
        <span className="text-[9px] uppercase tracking-widest font-black">{label}</span>
      </div>
      <div className={`text-3xl font-black ${colors.text}`}>{value}</div>
    </div>
  );
}

function statusColor(status: string): string {
  switch (status) {
    case 'publicado':
    case 'manutencao':
      return 'bg-emerald-500';
    case 'em_producao':
    case 'briefing_recebido':
      return 'bg-blue-500';
    case 'pago':
      return 'bg-[#FF8C00]';
    case 'aguardando_pagamento':
      return 'bg-amber-500';
    case 'cancelado':
      return 'bg-red-500';
    default:
      return 'bg-white/40';
  }
}
