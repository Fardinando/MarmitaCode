import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTemplateBySlug, getDomainPricing, defaultCustomTiers } from '@/lib/data';
import { OrderWizard } from '@/components/OrderWizard';
import { mpEnabled } from '@/lib/payments/mercadopago';
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

  const isCustom = slug === 'personalizado';
  const template = isCustom ? null : await getTemplateBySlug(slug);
  if (!isCustom && !template) notFound();

  const domainPricing = await getDomainPricing();

  const initialTier: Tier =
    (tier as Tier) ?? (isCustom ? 'personalizado' : 'basico');

  const wizardTemplate = template
    ? { slug: template.slug, name: template.name, tiers: template.tiers }
    : {
        slug: 'personalizado',
        name: 'Projeto 100% Personalizado',
        tiers: defaultCustomTiers(),
      };

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
        </div>

        <OrderWizard
          template={wizardTemplate}
          isCustom={isCustom}
          domainPricing={domainPricing}
          initialTier={initialTier}
          paymentMode={mpEnabled() ? 'mercadopago' : 'mock'}
        />
      </div>
    </main>
  );
}
