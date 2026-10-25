import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTemplateBySlug, defaultCustomTiers } from '@/lib/data';
import { OrderWizard } from '@/components/OrderWizard';
import { mpEnabled } from '@/lib/payments/mercadopago';
import { getProfile } from '@/lib/auth';
import { TIER_WHITELIST } from '@/lib/security/schemas';
import type { Tier } from '@/lib/types';

export const metadata = { title: 'Encomendar | MarmitaCode' };

export default async function EncomendarPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tier?: string }>;
}) {
  const { slug } = await params;
  const { tier } = await searchParams;
  // Login NÃO é obrigatório — paga primeiro, cria conta depois.
  const profile = await getProfile();

  const isCustom = slug === 'personalizado';
  const template = isCustom ? null : await getTemplateBySlug(slug);
  if (!isCustom && !template) notFound();

  const wizardTemplate = template
    ? { slug: template.slug, name: template.name, tiers: template.tiers }
    : {
        slug: 'personalizado',
        name: 'Projeto 100% Personalizado',
        tiers: defaultCustomTiers(),
      };

  // Garante que o tier inicial casa com algum tier disponível no template.
  // Fallback: primeiro tier disponível ou 'basico'.
  const availableTiers = wizardTemplate.tiers.map((t) => t.tier);
  const requested = tier && (TIER_WHITELIST as readonly string[]).includes(tier) ? (tier as Tier) : null;
  const initialTier: Tier =
    (requested && availableTiers.includes(requested) ? requested : null) ??
    availableTiers[0] ??
    (isCustom ? 'personalizado' : 'basico');

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href={isCustom ? '/templates' : `/templates/${slug}`}
          className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white"
        >
          &larr; Voltar
        </Link>

        <div className="text-center my-12">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Encomende seu <span className="text-[#FF8C00]">site</span>
          </h1>
          <p className="text-white/40 font-bold mt-4">
            {template ? `Template: ${template.name}` : 'Projeto 100% personalizado'}
          </p>
          {profile && (
            <p className="text-white/30 text-xs mt-3">
              Logado como <b className="text-white">{profile.email ?? profile.name ?? 'você'}</b>
            </p>
          )}
        </div>

        <OrderWizard
          template={wizardTemplate}
          isCustom={isCustom}
          initialTier={initialTier}
          paymentMode={mpEnabled() ? 'mercadopago' : 'mock'}
          isLoggedIn={!!profile}
        />
      </div>
    </main>
  );
}
