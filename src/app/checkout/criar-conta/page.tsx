import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Clock, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { signUpAndLinkOrder } from './actions';

export const metadata = { title: 'Criar conta — Pedido confirmado' };
export const dynamic = 'force-dynamic';

export default async function CriarContaPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; error?: string }>;
}) {
  const { order: orderId, error } = await searchParams;

  if (!orderId) notFound();

  const admin = createAdminClient();
  const { data: order } = await admin
    .from('orders')
    .select('id, client_id, status, contact_email, contact_name, template_slug, total_paid')
    .eq('id', orderId)
    .maybeSingle();

  if (!order) notFound();

  // Se já tem user logado, redireciona direto pro briefing.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Garante vínculo e vai pro briefing.
    if (!order.client_id) {
      await admin.from('orders').update({ client_id: user.id }).eq('id', orderId);
      await admin.from('site_projects').update({ client_id: user.id }).eq('order_id', orderId);
    }
    redirect(`/briefing/${orderId}`);
  }

  // Se o pedido já tem client_id (conta existente), manda logar.
  if (order.client_id) {
    redirect(`/login?next=${encodeURIComponent(`/briefing/${orderId}`)}`);
  }

  const isPending = order.status === 'aguardando_pagamento';

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 md:py-24">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          {isPending ? (
            <>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Clock size={28} className="text-amber-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-3">
                Pagamento em processamento
              </h1>
              <p className="text-white/60 text-sm">
                Enquanto o pagamento confirma, já pode criar sua conta.
                Assim que confirmar, você vai direto pro briefing.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-3">
                Pagamento confirmado!
              </h1>
              <p className="text-white/60 text-sm">
                Último passo: crie sua conta pra acessar o briefing e acompanhar o site.
              </p>
            </>
          )}
        </div>

        {/* Resumo do pedido */}
        <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-white/40">Pedido</span>
            <span className="font-black">#{order.id.slice(0, 8)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-white/40">Template</span>
            <span className="font-black">{order.template_slug ?? 'Personalizado'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-white/40">Pago</span>
            <span className="font-black text-[#FF8C00]">
              R$ {Number(order.total_paid).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
            {error}
          </div>
        )}

        <form action={signUpAndLinkOrder} className="space-y-4">
          <input type="hidden" name="orderId" value={orderId} />

          <label className="block">
            <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
              Seu e-mail (do pagamento)
            </span>
            <input
              type="email"
              value={order.contact_email ?? ''}
              disabled
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none opacity-60"
            />
            <span className="block text-[10px] text-white/30 mt-2">
              Pra manter o vínculo com o pagamento, usamos o mesmo email.
            </span>
          </label>

          <label className="block">
            <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
              Nome
            </span>
            <input
              name="name"
              type="text"
              defaultValue={order.contact_name ?? ''}
              placeholder="Seu nome"
              required
              maxLength={120}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#FF8C00]/50"
            />
          </label>

          <label className="block">
            <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
              Crie uma senha
            </span>
            <input
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              maxLength={200}
              autoComplete="new-password"
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#FF8C00]/50"
            />
            <span className="block text-[10px] text-white/30 mt-2 flex items-center gap-1.5">
              <Lock size={10} /> Use pra entrar depois em /conta.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-5 bg-[#FF8C00] text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#FFD700] transition-all"
          >
            Criar conta e ir pro briefing →
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href={`/login?next=${encodeURIComponent(`/briefing/${orderId}`)}`}
            className="text-xs text-white/40 hover:text-white"
          >
            Já tem conta com esse e-mail? <span className="text-[#FF8C00] underline">Faça login</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
