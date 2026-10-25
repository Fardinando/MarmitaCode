import { createAdminClient } from '@/lib/supabase/admin';
import type { Discount } from '@/lib/types';
import { saveDiscount, deleteDiscount, toggleDiscount } from '@/app/admin/actions';
import { DiscountForm } from './DiscountForm';

export const metadata = { title: '' };
export const dynamic = 'force-dynamic';

interface DiscountWithUsage extends Discount {
  usage_count: number;
}

export default async function AdminDiscountsPage() {
  const admin = createAdminClient();
  const { data: discounts } = await admin
    .from('discounts')
    .select('*')
    .order('created_at', { ascending: false });

  // Conta quantas vezes cada cupom foi usado.
  const list = ((discounts as Discount[]) ?? []).slice();
  const codes = list.map((d) => d.code);
  const usageMap: Record<string, number> = {};
  if (codes.length > 0) {
    const { data: orders } = await admin
      .from('orders')
      .select('discount_code')
      .in('discount_code', codes);
    for (const o of orders ?? []) {
      if (!o.discount_code) continue;
      usageMap[o.discount_code] = (usageMap[o.discount_code] ?? 0) + 1;
    }
  }

  const withUsage: DiscountWithUsage[] = list.map((d) => ({
    ...d,
    usage_count: usageMap[d.code] ?? 0,
  }));

  const activeCount = withUsage.filter((d) => d.active).length;
  const totalUsage = withUsage.reduce((s, d) => s + d.usage_count, 0);

  const now = Date.now();
  const isExpired = (d: Discount) => d.expires_at && new Date(d.expires_at).getTime() < now;

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Cupons de desconto</h1>
          <p className="text-white/40 font-bold text-sm mt-2">
            Crie códigos de <b className="text-white">% de desconto</b> ou <b className="text-white">R$ fixo</b> no setup do pedido.
          </p>
        </div>
        <div className="flex gap-3">
          <MiniStat label="Total" value={withUsage.length} />
          <MiniStat label="Ativos" value={activeCount} highlight />
          <MiniStat label="Usos" value={totalUsage} />
        </div>
      </div>

      <DiscountForm action={saveDiscount} />

      <div className="mt-12">
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
          Cupons existentes
        </h2>

        {withUsage.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center text-white/30 font-bold">
            Nenhum cupom criado ainda. Use o formulário acima pra criar o primeiro.
          </div>
        ) : (
          <div className="space-y-3">
            {withUsage.map((d) => {
              const expired = isExpired(d);
              const tipoLabel = d.percent > 0 ? `${d.percent}% OFF` : `R$ ${d.amount},00 OFF`;
              return (
                <div
                  key={d.id}
                  className={`rounded-3xl border p-6 flex flex-wrap items-center justify-between gap-4 ${
                    d.active && !expired
                      ? 'bg-white/[0.02] border-white/5'
                      : 'bg-white/[0.01] border-white/5 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-5 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-black uppercase text-xl tracking-wide">{d.code}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            d.percent > 0
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {tipoLabel}
                        </span>
                        {!d.active && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-white/40">
                            Inativo
                          </span>
                        )}
                        {expired && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
                            Expirado
                          </span>
                        )}
                      </div>
                      <div className="text-white/40 text-xs font-bold mt-2 flex items-center gap-3 flex-wrap">
                        <span>Usado {d.usage_count}×</span>
                        {d.expires_at && (
                          <>
                            <span>·</span>
                            <span>Expira {new Date(d.expires_at).toLocaleDateString('pt-BR')}</span>
                          </>
                        )}
                        <span>·</span>
                        <span>Criado {new Date(d.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <form action={toggleDiscount}>
                      <input type="hidden" name="id" value={d.id} />
                      <input type="hidden" name="active" value={d.active ? 'false' : 'true'} />
                      <button
                        className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          d.active
                            ? 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {d.active ? 'Desativar' : 'Ativar'}
                      </button>
                    </form>
                    <form action={deleteDiscount}>
                      <input type="hidden" name="id" value={d.id} />
                      <button className="px-5 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20">
                        Excluir
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-16 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 text-xs text-white/60 leading-relaxed">
        <p className="font-black text-blue-400 uppercase tracking-widest text-[10px] mb-2">Como funciona</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cupom de <b className="text-white">%</b> aplica a porcentagem sobre o valor do setup.</li>
          <li>Cupom de <b className="text-white">R$</b> desconta o valor fixo em reais do setup.</li>
          <li>Cupons só funcionam enquanto estiverem <b className="text-white">ativos</b> e dentro da data de expiração.</li>
          <li>Deletar um cupom é definitivo — pedidos anteriores que já usaram esse código continuam válidos.</li>
          <li>Códigos só aceitam letras, números, hífen e underscore (ex.: <code className="text-[#FF8C00]">BLACKFRIDAY25</code>).</li>
        </ul>
      </div>
    </div>
  );
}

function MiniStat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`px-5 py-3 rounded-2xl border ${highlight ? 'bg-[#FF8C00]/10 border-[#FF8C00]/30' : 'bg-white/[0.02] border-white/5'}`}>
      <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${highlight ? 'text-[#FF8C00]' : 'text-white/40'}`}>
        {label}
      </div>
      <div className={`text-2xl font-black ${highlight ? 'text-[#FF8C00]' : 'text-white'}`}>{value}</div>
    </div>
  );
}
