'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Cria conta DEPOIS do pagamento e vincula o pedido ao novo usuário.
 *
 * Usa o admin API (service role) pra criar o user com email_confirm:true,
 * assim não precisa de confirmação de email (o pagamento já é prova).
 * Isso garante que o vínculo order.client_id acontece imediatamente,
 * evitando o bug de pedido órfão.
 */
export async function signUpAndLinkOrder(formData: FormData) {
  const orderId = String(formData.get('orderId') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const name = String(formData.get('name') ?? '').trim();

  if (!orderId) {
    redirect('/checkout/criar-conta?error=' + encodeURIComponent('Pedido não informado.'));
  }
  if (password.length < 6) {
    redirect(
      `/checkout/criar-conta?order=${orderId}&error=` +
        encodeURIComponent('Senha precisa ter pelo menos 6 caracteres.')
    );
  }

  const admin = createAdminClient();

  const { data: order } = await admin
    .from('orders')
    .select('id, client_id, contact_email, contact_name')
    .eq('id', orderId)
    .maybeSingle();

  if (!order || !order.contact_email) {
    redirect('/checkout/criar-conta?error=' + encodeURIComponent('Pedido não encontrado.'));
  }

  if (order.client_id) {
    redirect(`/login?next=${encodeURIComponent(`/briefing/${orderId}`)}`);
  }

  const email = order.contact_email.toLowerCase().trim();
  const displayName = name || order.contact_name || email.split('@')[0];

  // 1) Tenta criar o user via admin API (confirmado automaticamente)
  let userId: string | null = null;

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: displayName },
  });

  if (created?.user) {
    userId = created.user.id;
  } else if (createErr) {
    // Se já existe, tenta buscar o user existente por email via admin.
    // auth.admin.listUsers aceita filtro de email.
    const { data: list } = await admin.auth.admin.listUsers();
    const existing = list?.users.find((u) => u.email?.toLowerCase() === email);

    if (!existing) {
      redirect(
        `/checkout/criar-conta?order=${orderId}&error=` +
          encodeURIComponent('Não conseguimos criar sua conta. Fale com a gente.')
      );
    }

    // Já existe conta com esse email. Precisamos que o cliente use a senha
    // atual pra logar — se a senha informada não bater, pedimos pra ir pro login.
    userId = existing.id;
  }

  if (!userId) {
    redirect(
      `/checkout/criar-conta?order=${orderId}&error=` +
        encodeURIComponent('Erro inesperado ao criar conta.')
    );
  }

  // 2) Garante que o profile existe
  await admin.from('profiles').upsert(
    { id: userId, email, name: displayName, role: 'client' },
    { onConflict: 'id' }
  );

  // 3) Vincula o pedido e o site_project
  await admin.from('orders').update({ client_id: userId }).eq('id', orderId);
  await admin.from('site_projects').update({ client_id: userId }).eq('order_id', orderId);

  // 4) Loga o user na sessão
  const supabase = await createClient();
  const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });

  if (loginErr) {
    // Conta vinculada, mas a senha pode não bater com conta pré-existente.
    // Manda pro login — depois do login o briefing aparece normal.
    redirect(
      `/login?next=${encodeURIComponent(`/briefing/${orderId}`)}&message=` +
        encodeURIComponent('Sua conta foi vinculada ao pedido. Faça login pra continuar.')
    );
  }

  revalidatePath('/', 'layout');
  redirect(`/briefing/${orderId}`);
}
