import Link from 'next/link';
import { Sparkles, ArrowRight, ChefHat } from 'lucide-react';
import { getTemplates } from '@/lib/data';
import { TemplateCard } from '@/components/TemplateCard';
import {
  C,
  serif,
  sans,
  PageShell,
  Section,
  SectionHead,
  Display,
  Emph,
  Lead,
  Eyebrow,
  PrimaryBtn,
  Card,
} from '@/components/ui';

export const revalidate = 60;

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
  const categorias = Array.from(new Set(templates.map((t) => t.category))).sort();
  const filtered = cat ? templates.filter((t) => t.category === cat) : templates;

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>cardápio da casa</Eyebrow>
          <Display size="xl">
            Como você quer <Emph>começar?</Emph>
          </Display>
          <div className="mt-8 max-w-[52ch]">
            <Lead>
              Dois caminhos: um site do zero exatamente como você imagina, ou um
              dos nossos templates personalizados pra sua marca.
            </Lead>
          </div>
        </div>
      </section>

      {/* DESTAQUES: zero + fora */}
      <section className="relative px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Card accent className="group">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} style={{ color: C.accent }} />
              <span
                className="text-sm italic"
                style={{ ...serif, color: C.accent }}
              >
                à la carte · 100% do zero
              </span>
            </div>
            <Display size="md">
              Faça do <Emph>zero.</Emph>
            </Display>
            <p
              className="mt-5 text-[15px] leading-relaxed max-w-[48ch]"
              style={{ color: C.textMuted, ...serif }}
            >
              Projeto totalmente personalizado, desenvolvido a partir do seu
              briefing. Nada de template — a gente cozinha exclusivo pra você.
            </p>
            <div className="mt-8">
              <PrimaryBtn href="/encomendar/personalizado?tier=premium">
                Começar do zero <ArrowRight size={14} />
              </PrimaryBtn>
            </div>
          </Card>

          <div
            className="rounded-3xl p-8"
            style={{
              backgroundColor: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.3)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ChefHat size={16} style={{ color: '#34D399' }} />
              <span
                className="text-sm italic"
                style={{ ...serif, color: '#34D399' }}
              >
                fora do cardápio · sob encomenda
              </span>
            </div>
            <Display size="md">
              Não é <em style={{ color: '#34D399', fontStyle: 'italic' }}>site?</em>
            </Display>
            <p
              className="mt-5 text-[15px] leading-relaxed max-w-[48ch]"
              style={{ color: C.textMuted, ...serif }}
            >
              Sistema de estoque, bot de WhatsApp, automação, app mobile,
              software desktop — a gente também cozinha o que não está no menu.
            </p>
            <div className="mt-8">
              <Link
                href="/fora-do-cardapio"
                className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold transition-transform hover:translate-x-1 rounded-full"
                style={{ backgroundColor: '#10B981', color: '#00140A' }}
              >
                Conhecer <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LISTAGEM */}
      <Section divider>
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="pratos prontos"
            title={<>Os templates do <Emph>cardápio.</Emph></>}
          />

          <div className="mt-10 flex flex-wrap gap-2 md:gap-3">
            <FilterChip href="/templates" active={!cat}>Todos</FilterChip>
            {categorias.map((c) => (
              <FilterChip
                key={c}
                href={`/templates?cat=${encodeURIComponent(c)}`}
                active={cat === c}
              >
                {c}
              </FilterChip>
            ))}
          </div>

          <div className="mt-10">
            {filtered.length === 0 ? (
              <Card className="text-center py-16">
                <p
                  className="text-lg mb-6"
                  style={{ ...serif, color: C.textMuted, fontStyle: 'italic' }}
                >
                  Nenhum template nesta categoria ainda. Em breve!
                </p>
                <PrimaryBtn href="/encomendar/personalizado">
                  Encomendar personalizado
                </PrimaryBtn>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((t) => (
                  <TemplateCard key={t.id} template={t} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-5 py-2 text-sm transition-all rounded-full"
      style={{
        backgroundColor: active ? C.accent : 'transparent',
        color: active ? '#1A0E00' : C.textMuted,
        border: `1px solid ${active ? C.accent : C.border}`,
        ...serif,
        fontStyle: active ? 'normal' : 'italic',
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </Link>
  );
}
