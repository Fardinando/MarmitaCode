import Link from 'next/link';
import { getTemplates } from '@/lib/data';
import { TemplateCard } from '@/components/TemplateCard';
import { TEMPLATE_CATEGORIES } from '@/lib/types';

export const metadata = {
  title: 'Templates | MarmitaCode',
  description: 'Escolha um template pronto ou encomende um site 100% personalizado.',
};

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const templates = await getTemplates();
  const filtered = cat ? templates.filter((t) => t.category === cat) : templates;

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none mb-6">
            Nossos <span className="text-[#FF8C00]">templates.</span>
          </h1>
          <p className="text-white/40 text-lg font-bold max-w-2xl">
            Modelos prontos que você personaliza, ou um projeto do zero feito sob medida para o seu negócio.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/templates"
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              !cat ? 'bg-[#FF8C00] text-black' : 'bg-white/5 text-white/40 hover:text-white'
            }`}
          >
            Todos
          </Link>
          {TEMPLATE_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/templates?cat=${encodeURIComponent(c)}`}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                cat === c ? 'bg-[#FF8C00] text-black' : 'bg-white/5 text-white/40 hover:text-white'
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 text-center">
            <p className="text-white/40 font-bold">
              Nenhum template nesta categoria ainda. Em breve!
            </p>
            <Link
              href="/encomendar/personalizado"
              className="inline-block mt-8 px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
            >
              Encomendar personalizado
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
