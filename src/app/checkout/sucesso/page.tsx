import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { STATUS_LABELS, TIER_LABELS, type Order } from '@/lib/types';

export const metadata = { title: '' };

export const dynamic = 'force-dynamic';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  let order: Order | null = null;
  if (orderId) {
    const admin = createAdminClient();
    const { data } = await admin.from('orders').select('*').eq('id', orderId).single();
    order = (data as Order) ?? null;
  }

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-24 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-10">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>

        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
          Pedido <span className="text-[#FF8C00]">confirmado!</span>
        </h1>
        <p className="text-white/40 font-bold text-lg mb-12">
          Recebemos seu pedido (pagamento simulado). Em breve entraremos em contato com os próximos passos.
        </p>

        {order && (
          <div className="text-left p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 mb-12 space-y-3 text-sm">
            <Row label="Pedido" value={order.id.slice(0, 8)} />
            <Row label="Template" value={order.template_slug ?? 'Personalizado'} />
            <Row label="Plano" value={TIER_LABELS[order.tier]} />
            <Row label="Status" value={STATUS_LABELS[order.status]} />
            <Row label="Setup" value={`R$ ${Number(order.setup_price).toFixed(2)}`} />
            <Row label="Mensalidade" value={`R$ ${Number(order.monthly_price).toFixed(2)}/mês`} />
            {order.domain_years && (
              <Row label="Domínio" value={`${order.domain_years} ano(s) — R$ ${Number(order.domain_total).toFixed(2)}`} />
            )}
            <Row label="Total pago" value={`R$ ${Number(order.total_paid).toFixed(2)}`} />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/conta"
            className="px-10 py-5 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
          >
            Acompanhar na minha conta
          </Link>
          <Link
            href="/templates"
            className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
          >
            Ver mais templates
          </Link>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-white/5">
      <span className="text-white/40 font-bold">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
