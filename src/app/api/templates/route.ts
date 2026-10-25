import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('templates')
    .select('slug, name, category, description, image_url, demo_url, featured')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  return NextResponse.json({ templates: data ?? [] });
}
