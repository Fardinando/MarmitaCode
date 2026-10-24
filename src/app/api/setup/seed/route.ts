import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TEMPLATES = [
  {
    slug: 'restaurante',
    name: 'Sabor da Casa',
    category: 'Restaurante',
    description: 'Site para restaurantes e delivery com cardápio e pedido pelo WhatsApp.',
    long_description:
      'Template completo para restaurantes: hero com destaque, cardápio categorizado, horários, endereço e botão de pedido direto no WhatsApp.',
    demo_url: '/exemplo/restaurante',
    featured: true,
    active: true,
    features: ['Cardápio categorizado', 'Pedido pelo WhatsApp', 'Horários e endereço', 'Visual aconchegante'],
    sort_order: 1,
  },
  {
    slug: 'barbearia',
    name: 'Barber Studio',
    category: 'Barbearia',
    description: 'Site de barbearia e salão com serviços, equipe e agendamento.',
    long_description:
      'Visual moderno preto e dourado, serviços com preços, equipe, agendamento rápido pelo WhatsApp. Perfeito para barbearias e salões.',
    demo_url: '/exemplo/barbearia',
    featured: true,
    active: true,
    features: ['Serviços com preços', 'Perfis da equipe', 'Agendamento WhatsApp', 'Visual masculino premium'],
    sort_order: 2,
  },
  {
    slug: 'curso',
    name: 'Academia Online',
    category: 'Cursos',
    description: 'Página de curso online com módulos, depoimentos e inscrição.',
    long_description:
      'Landing page completa para venda de curso: hero convertedor, módulos, depoimentos, preço e CTA. Pensada para alta conversão.',
    demo_url: '/exemplo/curso',
    featured: true,
    active: true,
    features: ['Hero de alta conversão', 'Módulos detalhados', 'Depoimentos', 'Checkout do curso'],
    sort_order: 3,
  },
  {
    slug: 'portfolio',
    name: 'Portfolio Studio',
    category: 'Portfólio',
    description: 'Portfólio profissional minimalista com projetos, bio e contato.',
    long_description:
      'Portfólio elegante e minimalista para designers, criativos e consultores. Grid de projetos, bio completa e contato direto.',
    demo_url: '/exemplo/portfolio',
    featured: false,
    active: true,
    features: ['Grid de projetos', 'Bio detalhada', 'Design minimalista', 'Contato direto'],
    sort_order: 4,
  },
  {
    slug: 'loja',
    name: 'Loja Boutique',
    category: 'E-commerce',
    description: 'Vitrine de produtos com pedido via WhatsApp.',
    long_description:
      'Vitrine moderna para pequenos lojistas. Grade de produtos, destaques, promoções e pedido via WhatsApp. Sem complicação de pagamento online.',
    demo_url: '/exemplo/loja',
    featured: true,
    active: true,
    features: ['Vitrine de produtos', 'Pedido via WhatsApp', 'Destaques e promoções', 'Fácil de atualizar'],
    sort_order: 5,
  },
];

const TIER_SEED = [
  { tier: 'basico', setup_price: 300, monthly_price: 75, features: ['Troca de logomarca', 'Troca de cores', 'Troca de textos'] },
  { tier: 'intermediario', setup_price: 500, monthly_price: 100, features: ['Tudo do Básico', 'Animações personalizadas', 'Reordenação de seções', 'Ajuste de fluxos'] },
  { tier: 'premium', setup_price: 900, monthly_price: 125, features: ['Tudo do Intermediário', 'Design exclusivo', 'Lógica sob medida', 'Baseado ou não em template'] },
];

const DOMAIN_SEED = [
  { years: 1, registry_price: 40, labor_fee: 10, sort_order: 1 },
  { years: 2, registry_price: 80, labor_fee: 10, sort_order: 2 },
  { years: 3, registry_price: 120, labor_fee: 10, sort_order: 3 },
  { years: 5, registry_price: 200, labor_fee: 10, sort_order: 5 },
  { years: 10, registry_price: 400, labor_fee: 10, sort_order: 10 },
];

async function runSeed() {
  const admin = createAdminClient();
  const report: Record<string, unknown> = {};

  // 1. Deactivate templates antigos que não estão na lista nova (não apaga, só desativa).
  const newSlugs = TEMPLATES.map((t) => t.slug);
  const { error: deactivateError } = await admin
    .from('templates')
    .update({ active: false })
    .not('slug', 'in', `(${newSlugs.map((s) => `"${s}"`).join(',')})`);
  report.deactivated_old = deactivateError ? deactivateError.message : 'ok';

  // 2. Upsert templates novos.
  const { data: upserted, error: upsertError } = await admin
    .from('templates')
    .upsert(TEMPLATES, { onConflict: 'slug' })
    .select('id, slug');
  if (upsertError) {
    return { ok: false, step: 'upsert_templates', error: upsertError.message };
  }
  report.upserted_templates = upserted?.map((t) => t.slug);

  // 3. Para cada template, upsert dos tiers.
  for (const tmpl of upserted ?? []) {
    for (const tier of TIER_SEED) {
      const { error } = await admin
        .from('template_tiers')
        .upsert(
          {
            template_id: tmpl.id,
            tier: tier.tier,
            setup_price: tier.setup_price,
            monthly_price: tier.monthly_price,
            features: tier.features,
            active: true,
          },
          { onConflict: 'template_id,tier' }
        );
      if (error) {
        return { ok: false, step: `tier_${tmpl.slug}_${tier.tier}`, error: error.message };
      }
    }
  }
  report.tiers_seeded = (upserted?.length ?? 0) * TIER_SEED.length;

  // 4. Domain pricing.
  const { error: domainError } = await admin
    .from('domain_pricing')
    .upsert(DOMAIN_SEED, { onConflict: 'years' });
  if (domainError) {
    return { ok: false, step: 'domain_pricing', error: domainError.message };
  }
  report.domain_pricing = 'ok';

  return { ok: true, report };
}

export async function GET() {
  // Idempotência pública: a rota só executa enquanto o seed inicial não rodou.
  // Depois de popular 'restaurante', ela fica inerte — qualquer um que chame
  // recebe só uma resposta informativa.
  const admin = createAdminClient();
  const { data: existing } = await admin
    .from('templates')
    .select('slug, active')
    .eq('slug', 'restaurante')
    .maybeSingle();

  if (existing?.active) {
    return NextResponse.json({
      ok: true,
      alreadySeeded: true,
      message: 'Seed já rodou. Para re-popular, use o painel /admin/templates.',
    });
  }

  const result = await runSeed();
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

export async function POST() {
  return GET();
}
