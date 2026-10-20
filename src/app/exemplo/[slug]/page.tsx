import Link from 'next/link';
import { getTemplateBySlug } from '@/lib/data';

export const metadata = { title: 'Demonstração | MarmitaCode' };

export default async function TemplateDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-6">
        Demonstração
      </span>
      <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
        {template?.name ?? 'Template'}
      </h1>
      <p className="text-white/40 font-bold max-w-xl mb-12">
        Este é o espaço reservado para a demonstração ao vivo deste template. Os sub-sites reais
        serão montados aqui quando estiverem prontos.
      </p>
      <div className="flex gap-4">
        <Link
          href={template ? `/templates/${template.slug}` : '/templates'}
          className="px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
        >
          Ver detalhes
        </Link>
        <Link
          href={template ? `/encomendar/${template.slug}` : '/templates'}
          className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
        >
          Encomendar
        </Link>
      </div>
    </main>
  );
}
