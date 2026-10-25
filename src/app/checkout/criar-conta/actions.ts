'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Cria conta DEPOIS do pagamento e vincula o pedido ao novo usuário.
 * Usa o email do pedido como email da conta — valida que bate.
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

  // Busca o pedido pra pegar o email usado no pagamento.
  const { data: order } = await admin
    .from('orders')
    .select('id, client_id, contact_email, contact_name')
    .eq('id', orderId)
    .maybeSingle();

  if (!order || !order.contact_email) {
    redirect('/checkout/criar-conta?error=' + encodeURIComponent('Pedido não encontrado.'));
  }

  // Se o pedido já tem client_id, só manda logar.
  if (order.client_id) {
    redirect(`/login?next=${encodeURIComponent(`/briefing/${orderId}`)}`);
  }

  const email = order.contact_email;
  const displayName = name || order.contact_name || email.split('@')[0];

  // Cria o usuário.
  const supabase = await createClient();
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name: displayName } },
  });

  if (signUpError) {
    // Se já existe, tenta logar com a senha informada.
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      redirect(
        `/checkout/criar-conta?order=${orderId}&error=` +
          encodeURIComponent(
            'Já existe uma conta com esse e-mail. Faça login com a senha que você usou antes.'
          )
      );
    }
  }

  // Busca o user recém-criado (ou autenticado).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Vincula o pedido e o site_project ao novo user.
    await admin.from('orders').update({ client_id: user.id }).eq('id', orderId);
    await admin.from('site_projects').update({ client_id: user.id }).eq('order_id', orderId);

    // Garante que o profile existe.
    await admin.from('profiles').upsert(
      { id: user.id, email, name: displayName, role: 'client' },
      { onConflict: 'id' }
    );
  }

  revalidatePath('/', 'layout');
  redirect(`/briefing/${orderId}`);
}
