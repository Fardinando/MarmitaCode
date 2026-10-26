import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Vincula pedidos "órfãos" (client_id null) ao usuário atual quando
 * o email bate. Executado após login/getProfile pra garantir que
 * pedidos feitos sem conta aparecem pro cliente que acabou de criar
 * uma conta com o mesmo email.
 *
 * Idempotente: se já estão vinculados, não faz nada.
 */
export async function linkOrphanOrders(userId: string, email?: string | null) {
  if (!userId || !email) return;
  try {
    const admin = createAdminClient();
    const normalized = email.toLowerCase().trim();

    // Pedidos com mesmo email mas sem client_id.
    const { data: orphans } = await admin
      .from('orders')
      .select('id')
      .is('client_id', null)
      .eq('contact_email', normalized)
      .limit(50);

    if (!orphans || orphans.length === 0) return;

    const ids = orphans.map((o) => o.id);
    await admin.from('orders').update({ client_id: userId }).in('id', ids);
    await admin.from('site_projects').update({ client_id: userId }).in('order_id', ids);
  } catch (e) {
    console.error('[linkOrphanOrders]', e);
  }
}
