import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Clock, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { BriefingForm } from '@/components/BriefingForm';

export const metadata = { title: 'Briefing' };
export const dynamic = 'force-dynamic';

export default async function BriefingPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/briefing/${encodeURIComponent(orderId)}`);
  }

  const admin = createAdminClient();
  const { data: order } = await admin
    .from('orders')
    .select('id, client_id, status, template_slug, briefing, templates(name)')
    .eq('id', orderId)
    .single();

  if (!order) notFound();
  if (order.client_id !== user.id) {
    return (
      <main className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black mb-3">Acesso negado</h1>
          <p className="text-white/60">Este pedido não pertence à sua conta.</p>
          <Link href="/conta" className="inline-block mt-6 px-6 py-3 bg-[#FF8C00] text-black font-black uppercase text-xs tracking-widest rounded-full">
            Ir pra minha conta
          </Link>
        </div>
      </main>
    );
  }

  // Pagamento não confirmado — aguardando.
  if (order.status === 'aguardando_pagamento') {
    return (
      <main className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="max-w-md text-center">
          <Clock size={60} className="text-[#FF8C00] mx-auto mb-6" />
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
            Pagamento em processamento
          </h1>
          <p className="text-white/60 mb-8">
            Assim que o Mercado Pago confirmar o pagamento (Pix pode levar até 5 min, cartão é instantâneo),
            esta página libera o briefing automaticamente.
          </p>
          <p className="text-white/40 text-sm mb-8">Pedido #{order.id.slice(0, 8)}</p>
          <Link href="/conta" className="inline-block px-6 py-3 bg-white/5 border border-white/10 font-black uppercase text-xs tracking-widest rounded-full hover:bg-white/10">
            Ver meus pedidos
          </Link>
          <p className="text-xs text-white/30 mt-6">
            Esta página atualiza sozinha quando o pagamento confirmar.{' '}
            <Link href={`/briefing/${orderId}`} className="text-[#FF8C00] underline">Atualizar agora</Link>
          </p>
        </div>
      </main>
    );
  }

  const briefingAlreadyFilled = order.briefing && typeof order.briefing === 'object' && 'confirmed_at' in order.briefing;

  if (briefingAlreadyFilled) {
    return (
      <main className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="max-w-md text-center">
          <CheckCircle2 size={60} className="text-emerald-500 mx-auto mb-6" />
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
            Briefing recebido!
          </h1>
          <p className="text-white/60 mb-8">
            Já estamos cuidando do seu site. Em breve você recebe o cronograma pelo WhatsApp.
          </p>
          <Link href="/conta" className="inline-block px-6 py-3 bg-[#FF8C00] text-black font-black uppercase text-xs tracking-widest rounded-full">
            Minha conta
          </Link>
        </div>
      </main>
    );
  }

  // Pode ser array (join) ou objeto único dependendo da config. Normaliza.
  const templateName =
    (Array.isArray(order.templates) ? order.templates[0]?.name : (order.templates as { name?: string } | null)?.name)
    ?? order.template_slug
    ?? 'Projeto personalizado';

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 md:py-20">
      <BriefingForm
        orderId={orderId}
        templateName={templateName}
        initialData={(order.briefing as Record<string, unknown>) ?? {}}
      />
    </main>
  );
}
