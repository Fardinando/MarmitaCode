import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { linkOrphanOrders } from '@/lib/link-orphan-orders';
import type { Profile } from '@/lib/types';

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    // Fallback: vincula pedidos órfãos ao user atual se o email bater.
    // Idempotente — se já está vinculado, não faz nada.
    await linkOrphanOrders(user.id, user.email);

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return (data as Profile) ?? null;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect('/login');
  return user;
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect('/login');
  if (profile.role !== 'admin') redirect('/conta');
  return profile;
}
