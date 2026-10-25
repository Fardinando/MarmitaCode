import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getTemplates } from '@/lib/data';
import { TemplateCard } from '@/components/TemplateCard';

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
  // Categorias são derivadas das categorias reais dos templates ativos
  const categorias = Array.from(new Set(templates.map((t) => t.category))).sort();
  const filtered = cat ? templates.filter((t) => t.category === cat) : templates;

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-[0.95] mb-6">
            Como você quer <span className="text-[#FF8C00]">começar?</span>
          </h1>
          <p className="text-white/40 text-base md:text-lg font-bold max-w-2xl">
            Dois caminhos: um site do zero exatamente como você imagina, ou um dos nossos templates
            personalizados pra sua marca.
          </p>
        </div>

        {/* FAÇA DO ZERO — DESTAQUE NO TOPO */}
        <section className="mb-16">
          <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#FF8C00]/20 via-[#FF8C00]/5 to-transparent border border-[#FF8C00]/40 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#FF8C00]/20 rounded-full blur-[100px]" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={18} className="text-[#FF8C00]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF8C00]">
                    À la Carte · 100% do zero
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
                  Faça do <span className="text-[#FF8C00]">zero</span>.
                </h2>
                <p className="text-white/60 text-sm md:text-base font-bold max-w-xl leading-relaxed">
                  Projeto totalmente personalizado, desenvolvido a partir do seu briefing.
                  Nada de template — a gente cozinha exclusivo pra você.
                </p>
              </div>
              <Link
                href="/encomendar/personalizado?tier=premium"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-[#FF8C00] text-black text-xs font-black uppercase tracking-widest hover:bg-[#FFD700] transition-colors whitespace-nowrap"
              >
                Começar do zero <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* OU — divisor */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40">
            ou veja nossos templates
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
          <Link
            href="/templates"
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              !cat ? 'bg-[#FF8C00] text-black' : 'bg-white/5 text-white/40 hover:text-white'
            }`}
          >
            Todos
          </Link>
          {categorias.map((c) => (
            <Link
              key={c}
              href={`/templates?cat=${encodeURIComponent(c)}`}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
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
