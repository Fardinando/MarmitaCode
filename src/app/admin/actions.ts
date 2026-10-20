'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import type { OrderStatus, Tier } from '@/lib/types';

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveTemplate(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const id = String(formData.get('id') ?? '');
  const payload = {
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    description: String(formData.get('description') ?? ''),
    long_description: String(formData.get('long_description') ?? ''),
    image_url: String(formData.get('image_url') ?? '') || null,
    demo_url: String(formData.get('demo_url') ?? '') || null,
    featured: formData.get('featured') === 'on',
    active: formData.get('active') === 'on',
    features: linesToArray(formData.get('features')),
    sort_order: Number(formData.get('sort_order') ?? 0),
    updated_at: new Date().toISOString(),
  };

  let templateId = id;

  if (id) {
    await admin.from('templates').update(payload).eq('id', id);
  } else {
    const { data } = await admin.from('templates').insert(payload).select('id').single();
    templateId = data?.id ?? '';
    // default tiers
    if (templateId) {
      await admin.from('template_tiers').insert([
        { template_id: templateId, tier: 'basico', setup_price: 300, monthly_price: 75 },
        { template_id: templateId, tier: 'intermediario', setup_price: 500, monthly_price: 100 },
        { template_id: templateId, tier: 'premium', setup_price: 900, monthly_price: 125 },
      ]);
    }
  }

  // tiers
  if (templateId) {
    for (const tier of ['basico', 'intermediario', 'premium'] as Tier[]) {
      const setup = formData.get(`setup_${tier}`);
      const monthly = formData.get(`monthly_${tier}`);
      if (setup === null && monthly === null) continue;
      await admin
        .from('template_tiers')
        .update({
          setup_price: Number(setup ?? 0),
          monthly_price: Number(monthly ?? 0),
          features: linesToArray(formData.get(`features_${tier}`)),
        })
        .eq('template_id', templateId)
        .eq('tier', tier);
    }
  }

  revalidatePath('/admin/templates');
  revalidatePath('/templates');
}

export async function deleteTemplate(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  if (id) await admin.from('templates').delete().eq('id', id);
  revalidatePath('/admin/templates');
  revalidatePath('/templates');
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as OrderStatus;
  if (id && status) {
    await admin.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  }
  revalidatePath('/admin/pedidos');
}

export async function saveDiscount(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  const payload = {
    code: String(formData.get('code') ?? '').trim().toUpperCase(),
    percent: Number(formData.get('percent') ?? 0),
    amount: Number(formData.get('amount') ?? 0),
    active: formData.get('active') === 'on',
    expires_at: String(formData.get('expires_at') ?? '') || null,
  };
  if (id) await admin.from('discounts').update(payload).eq('id', id);
  else await admin.from('discounts').insert(payload);
  revalidatePath('/admin/descontos');
}

export async function deleteDiscount(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  if (id) await admin.from('discounts').delete().eq('id', id);
  revalidatePath('/admin/descontos');
}

export async function saveDomainPricing(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  const payload = {
    years: Number(formData.get('years') ?? 0),
    registry_price: Number(formData.get('registry_price') ?? 0),
    labor_fee: Number(formData.get('labor_fee') ?? 0),
    active: formData.get('active') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  };
  if (id) await admin.from('domain_pricing').update(payload).eq('id', id);
  else await admin.from('domain_pricing').insert(payload);
  revalidatePath('/admin/dominio');
}

export async function deleteDomainPricing(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  if (id) await admin.from('domain_pricing').delete().eq('id', id);
  revalidatePath('/admin/dominio');
}

export async function updateClient(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get('id') ?? '');
  const payload = {
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    role: String(formData.get('role') ?? 'client') as 'admin' | 'client',
  };
  if (id) await admin.from('profiles').update(payload).eq('id', id);
  revalidatePath('/admin/contratantes');
}
