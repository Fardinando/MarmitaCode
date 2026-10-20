import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ExternalLink, Check } from 'lucide-react';
import { getTemplateBySlug } from '@/lib/data';
import { TIER_LABELS, type Tier } from '@/lib/types';

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) notFound();

  const tiers = (['basico', 'intermediario', 'premium'] as Tier[])
    .map((t) => template.tiers.find((x) => x.tier === t))
    .filter(Boolean);

  const demoSrc = template.demo_url || `/exemplo/${template.slug}`;

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <Link href="/templates" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white">
          &larr; Todos os templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 mb-24">
          <div className="relative aspect-[16/11] rounded-[3rem] overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/5">
            {template.image_url ? (
              <Image src={template.image_url} alt={template.name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black uppercase tracking-widest">
                {template.category}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.3em] mb-4">
              {template.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-6">
              {template.name}
            </h1>
            <p className="text-white/50 text-lg font-bold leading-relaxed mb-10">
              {template.long_description || template.description}
            </p>

            {template.features?.length > 0 && (
              <ul className="space-y-3 mb-10">
                {template.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <Check size={18} className="text-[#FF8C00]" /> {f}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={demoSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#FF8C00] hover:underline w-fit"
            >
              Ver demonstração <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Escolha seu plano</h2>
        <p className="text-white/40 font-bold mb-12 max-w-2xl">
          Do básico ao 100% sob medida. Todos os planos incluem mensalidade de manutenção contínua.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier!.id}
              className={`flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500 ${
                tier!.tier === 'premium'
                  ? 'bg-[#FF8C00]/5 border-[#FF8C00]/30'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.3em] mb-4">
                {TIER_LABELS[tier!.tier]}
              </span>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-black text-white/40 italic">R$</span>
                <span className="text-5xl font-black tabular-nums">{Number(tier!.setup_price).toFixed(0)}</span>
              </div>
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">
                setup único
              </span>
              <div className="p-4 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 mb-8">
                <span className="block text-[9px] font-black text-[#FF8C00] uppercase tracking-widest mb-1">
                  Mensalidade
                </span>
                <span className="text-2xl font-black text-[#FF8C00]">
                  R${Number(tier!.monthly_price).toFixed(0)}
                  <span className="text-[10px] ml-1">/mês</span>
                </span>
              </div>

              {tier!.features?.length > 0 && (
                <ul className="space-y-3 mb-8 flex-1">
                  {tier!.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-xs font-bold text-white/60">
                      <Check size={14} className="text-[#FF8C00] mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/encomendar/${template.slug}?tier=${tier!.tier}`}
                className="w-full py-5 text-center bg-white text-black font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-[#FF8C00] transition-all"
              >
                Encomendar
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">
            Quer algo 100% do zero?
          </h3>
          <p className="text-white/40 font-bold mb-8">
            Podemos criar um site totalmente personalizado, do jeitinho que você pedir.
          </p>
          <Link
            href="/encomendar/personalizado?tier=personalizado"
            className="inline-block px-10 py-5 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
          >
            Encomendar personalizado
          </Link>
        </div>
      </div>
    </main>
  );
}
