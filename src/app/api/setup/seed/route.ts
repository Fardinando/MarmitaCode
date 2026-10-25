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
  {
    slug: 'saas',
    name: 'Linear SaaS',
    category: 'SaaS',
    description: 'Landing page de produto SaaS com hero, features, social proof e planos.',
    long_description:
      'Landing moderna para produtos SaaS. Hero com screenshot do produto, lista de recursos, logos de clientes, depoimento forte e tabela de preços comparativa.',
    demo_url: '/exemplo/saas',
    featured: true,
    active: true,
    features: ['Hero com screenshot', 'Features destacadas', 'Social proof (logos)', 'Tabela de planos'],
    sort_order: 6,
  },
  {
    slug: 'fitness',
    name: 'Forge Fitness',
    category: 'Fitness',
    description: 'Site de academia com aulas, estrutura, planos e matrícula.',
    long_description:
      'Visual energético para academia, studio ou centro de treinamento. Grade de aulas com instrutores, galeria do espaço, planos com destaque e CTA pra aula experimental grátis.',
    demo_url: '/exemplo/fitness',
    featured: false,
    active: true,
    features: ['Grade de aulas', 'Galeria da estrutura', 'Planos destacados', 'Aula experimental'],
    sort_order: 7,
  },
  {
    slug: 'imobiliaria',
    name: 'Horizonte Imóveis',
    category: 'Imobiliária',
    description: 'Site de imobiliária com busca, catálogo e agendamento.',
    long_description:
      'Template para imobiliárias e corretores. Busca por filtros, grid de imóveis com preço e características, destaques, CTA pra avaliação gratuita de imóvel.',
    demo_url: '/exemplo/imobiliaria',
    featured: true,
    active: true,
    features: ['Busca por filtros', 'Cards de imóvel com fotos', 'Agendamento de visita', 'Captação de vendedores'],
    sort_order: 8,
  },
  {
    slug: 'restaurante-2',
    name: 'Comida Sincera',
    category: 'Restaurante',
    description: 'Restaurante de comida brasileira rústica, fogão a lenha e pratos do dia.',
    long_description: 'Variante calorosa e artesanal pra restaurantes de comida brasileira. Hero com prato do dia em destaque, cardápio com fotos, bloco de história familiar e endereço com horário.',
    demo_url: '/exemplo/restaurante-2',
    featured: false,
    active: true,
    features: ['Prato do dia em destaque', 'Cardápio com fotos', 'História da casa', 'Pedido pelo WhatsApp'],
    sort_order: 9,
  },
  {
    slug: 'barbearia-2',
    name: 'Barbearia Seu Henrique',
    category: 'Barbearia',
    description: 'Barbearia vintage tradicional com estética clássica e tipografia serifada.',
    long_description: 'Variante retrô para barbearias tradicionais. Tons terrosos, bordas marcadas, tipografia serifada, tabela de preços estilo cardápio antigo e galeria sepia da equipe.',
    demo_url: '/exemplo/barbearia-2',
    featured: false,
    active: true,
    features: ['Visual vintage', 'Tabela de preços clássica', 'Equipe em sepia', 'Agendamento WhatsApp'],
    sort_order: 10,
  },
  {
    slug: 'curso-2',
    name: 'Mentoria da Mariana',
    category: 'Cursos',
    description: 'Curso estilo creator individual, caloroso e pessoal com foco em prova social.',
    long_description: 'Variante estilo creator/infoproduto. Hero pessoal com foto do autor, badge de valor realizado por aluno, vídeo de apresentação, benefícios e preço com urgência de turma.',
    demo_url: '/exemplo/curso-2',
    featured: false,
    active: true,
    features: ['Hero pessoal com foto', 'Prova social forte', 'Vídeo de apresentação', 'Checkout com urgência'],
    sort_order: 11,
  },
  {
    slug: 'portfolio-2',
    name: 'nova.dev Portfolio',
    category: 'Portfólio',
    description: 'Portfólio tech dark com projetos alternados, acentos neon e feel futurista.',
    long_description: 'Variante tech/dev. Dark total, acento neon verde, projetos em zig-zag com case study, bloco sobre bilateral e CTA de contato chamativo.',
    demo_url: '/exemplo/portfolio-2',
    featured: false,
    active: true,
    features: ['Dark mode total', 'Projetos em zig-zag', 'Estética neon', 'Case studies'],
    sort_order: 12,
  },
  {
    slug: 'loja-2',
    name: 'Empório Direto',
    category: 'E-commerce',
    description: 'E-commerce de produtos artesanais e produtores locais com faixa de frete grátis.',
    long_description: 'Variante estilo mercado/empório. Barra de frete grátis fixa, destaque pra produtores, grid de produtos com badges, bloco de valores (frete/segurança/troca) e newsletter.',
    demo_url: '/exemplo/loja-2',
    featured: false,
    active: true,
    features: ['Barra de frete grátis', 'Grid com badges', 'Bloco de garantias', 'Newsletter'],
    sort_order: 13,
  },
  {
    slug: 'clinica',
    name: 'Clínica Vida+',
    category: 'Clínica',
    description: 'Clínica multiespecialidade com agendamento de consulta interativo.',
    long_description: 'Site completo pra clínicas e consultórios. 6 especialidades, perfis de médicos com CRM e avaliações, convênios aceitos e modal de agendamento em 4 passos (especialidade → médico → horário → dados).',
    demo_url: '/exemplo/clinica',
    featured: true,
    active: true,
    features: ['Agendamento multi-step', 'Especialidades e médicos', 'Convênios', 'Online ou presencial'],
    sort_order: 14,
  },
  {
    slug: 'advocacia',
    name: 'Alves & Martins Advocacia',
    category: 'Advocacia',
    description: 'Escritório de advocacia com formulário de consultoria e cases.',
    long_description: 'Visual sóbrio e profissional com tipografia serifada. 6 áreas de atuação, 3 sócios com OAB, cases anonimizados com resultado e modal multi-step de solicitação de consultoria gratuita.',
    demo_url: '/exemplo/advocacia',
    featured: true,
    active: true,
    features: ['Áreas de atuação', 'Perfil dos sócios OAB', 'Cases com resultados', 'Consultoria multi-step'],
    sort_order: 15,
  },
  {
    slug: 'petshop',
    name: 'AuAu+ Pet Shop',
    category: 'Pet shop',
    description: 'Pet shop com agendamento banho/tosa e loja de produtos.',
    long_description: 'Visual acolhedor pra pet shops e veterinárias. Serviços de banho, tosa, vet, vacinação e hospedagem com preço por porte do pet (P/M/G). Loja com produtos clicáveis e mini-carrinho em tempo real.',
    demo_url: '/exemplo/petshop',
    featured: true,
    active: true,
    features: ['Agendamento por porte', 'Serviços veterinários', 'Loja com carrinho', 'Visual acolhedor'],
    sort_order: 16,
  },
  {
    slug: 'eventos',
    name: 'Haut Événement',
    category: 'Eventos',
    description: 'Cerimonial de eventos com calculadora de orçamento ao vivo.',
    long_description: 'Site elegante para cerimonial, buffet e eventos. 4 tipos (casamento, 15 anos, formatura, corporativo) e calculadora que ajusta valor em tempo real conforme número de convidados, tipo de espaço e serviços extras.',
    demo_url: '/exemplo/eventos',
    featured: true,
    active: true,
    features: ['Calculadora de orçamento', '4 tipos de evento', 'Galeria', 'Solicitação de proposta'],
    sort_order: 17,
  },
];

const TIER_SEED = [
  {
    tier: 'basico',
    setup_price: 97,
    monthly_price: 47.9,
    features: ['Template do catálogo', 'Troca de logomarca', 'Troca de cores', 'Troca de fontes', 'Troca de textos'],
  },
  {
    tier: 'intermediario',
    setup_price: 197,
    monthly_price: 47.9,
    features: [
      'Tudo do Feijão com Arroz',
      'Mudança no fluxo de ações',
      'Adicionar ou remover funcionalidades',
      'Reordenação de seções',
      'Animações personalizadas',
    ],
  },
  {
    tier: 'premium',
    setup_price: 397,
    monthly_price: 47.9,
    features: [
      'Projeto 100% personalizado',
      'Desenvolvido do zero a partir do seu prompt',
      'Design exclusivo',
      'Lógica frontend sob medida',
    ],
  },
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

  // 1. Desativa templates antigos cujos slugs não estão na lista nova (não apaga).
  const newSlugs = TEMPLATES.map((t) => t.slug);
  const { data: oldTemplates } = await admin
    .from('templates')
    .select('slug')
    .not('slug', 'in', `(${newSlugs.join(',')})`);
  if (oldTemplates && oldTemplates.length > 0) {
    const slugsToDeactivate = oldTemplates.map((t) => t.slug);
    const { error: deactivateError } = await admin
      .from('templates')
      .update({ active: false })
      .in('slug', slugsToDeactivate);
    report.deactivated_old = deactivateError
      ? deactivateError.message
      : slugsToDeactivate;
  } else {
    report.deactivated_old = 'none';
  }

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
  try {
    const result = await runSeed();
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, step: 'exception', error: msg }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
