'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight, Loader2, Plus, Minus, Palette, LayoutGrid, Users, Phone, Image as ImageIcon, Sparkles } from 'lucide-react';

interface Offering { name: string; description: string; price: string }
interface TeamMember { name: string; role: string; bio: string }
interface Testimonial { author: string; role: string; text: string }

const SECOES_DISPONIVEIS = [
  'Home / Início', 'Sobre', 'Serviços', 'Produtos', 'Equipe', 'Depoimentos',
  'Portfólio / Galeria', 'Blog', 'FAQ', 'Preços', 'Contato', 'Formulário', 'Agendamento',
];

const FEATURES_DISPONIVEIS = [
  'Formulário de contato', 'Botão WhatsApp flutuante', 'Google Maps',
  'Área de agendamento', 'Chat ao vivo', 'Newsletter', 'Blog',
  'Loja virtual simples', 'Carrossel de imagens', 'Vídeo embarcado',
  'Depoimentos', 'FAQ expansível', 'Login/cadastro',
];

const VISUAL_TONES = [
  { k: 'elegante', l: 'Elegante' },
  { k: 'moderno', l: 'Moderno' },
  { k: 'minimalista', l: 'Minimalista' },
  { k: 'ousado', l: 'Ousado' },
  { k: 'casual', l: 'Casual' },
  { k: 'luxuoso', l: 'Luxuoso' },
  { k: 'tecnico', l: 'Técnico' },
] as const;

interface Props {
  orderId: string;
  templateName: string;
  initialData?: Record<string, unknown>;
}

export function BriefingForm({ orderId, templateName, initialData }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Marca
  const [businessName, setBusinessName] = useState((initialData?.business_name as string) ?? '');
  const [tagline, setTagline] = useState((initialData?.business_tagline as string) ?? '');
  const [about, setAbout] = useState((initialData?.business_about as string) ?? '');
  const [segment, setSegment] = useState((initialData?.business_segment as string) ?? '');
  const [targetAudience, setTargetAudience] = useState((initialData?.business_target_audience as string) ?? '');
  const [logoDesc, setLogoDesc] = useState((initialData?.logo_description as string) ?? '');

  // Visual
  // Cores ilimitadas, ordenadas por prioridade (do mais importante pro menos).
  // Compatibilidade: se vier dado antigo (primary/secondary/accent) junta num array.
  const [colors, setColors] = useState<string[]>(() => {
    const stored = initialData?.colors as string[] | undefined;
    if (Array.isArray(stored) && stored.length > 0) return stored;
    const legacy: string[] = [];
    const p = initialData?.primary_color as string | undefined;
    const s = initialData?.secondary_color as string | undefined;
    const a = initialData?.accent_color as string | undefined;
    if (p) legacy.push(p);
    if (s) legacy.push(s);
    if (a) legacy.push(a);
    return legacy.length > 0 ? legacy : ['#FF8C00', '#000000', '#FFFFFF'];
  });
  const [fontStyle, setFontStyle] = useState((initialData?.font_style as string) ?? '');
  const [visualTone, setVisualTone] = useState<string>((initialData?.visual_tone as string) ?? '');
  const [visualRefs, setVisualRefs] = useState((initialData?.visual_references as string) ?? '');

  const addColor = () => setColors((p) => [...p, '#999999']);
  const removeColor = (i: number) => setColors((p) => p.filter((_, idx) => idx !== i));
  const updateColor = (i: number, v: string) => setColors((p) => p.map((c, idx) => (idx === i ? v : c)));
  const moveColor = (i: number, dir: -1 | 1) => {
    setColors((p) => {
      const j = i + dir;
      if (j < 0 || j >= p.length) return p;
      const next = [...p];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  // Estrutura
  const [pages, setPages] = useState<string[]>((initialData?.pages_desired as string[]) ?? ['Home / Início', 'Sobre', 'Serviços', 'Contato']);
  const [heroHeadline, setHeroHeadline] = useState((initialData?.hero_headline as string) ?? '');
  const [heroSub, setHeroSub] = useState((initialData?.hero_subheadline as string) ?? '');
  const [heroCta, setHeroCta] = useState((initialData?.hero_cta_label as string) ?? '');
  const [heroAction, setHeroAction] = useState((initialData?.hero_cta_action as string) ?? '');

  // Ofertas
  const [offerings, setOfferings] = useState<Offering[]>(
    (initialData?.offerings as Offering[]) ?? [{ name: '', description: '', price: '' }]
  );

  // Equipe
  const [team, setTeam] = useState<TeamMember[]>(
    (initialData?.team as TeamMember[]) ?? []
  );

  // Depoimentos
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    (initialData?.testimonials as Testimonial[]) ?? []
  );

  // Features
  const [features, setFeatures] = useState<string[]>(
    (initialData?.features_desired as string[]) ?? ['Formulário de contato', 'Botão WhatsApp flutuante']
  );

  // Contato
  const [cPhone, setCPhone] = useState((initialData?.contact_phone as string) ?? '');
  const [cWhats, setCWhats] = useState((initialData?.contact_whatsapp as string) ?? '');
  const [cEmail, setCEmail] = useState((initialData?.contact_email as string) ?? '');
  const [cAddress, setCAddress] = useState((initialData?.contact_address as string) ?? '');
  const [cHours, setCHours] = useState((initialData?.contact_hours as string) ?? '');

  // Social
  const [ig, setIg] = useState((initialData?.instagram_url as string) ?? '');
  const [fb, setFb] = useState((initialData?.facebook_url as string) ?? '');
  const [li, setLi] = useState((initialData?.linkedin_url as string) ?? '');

  // Imagens
  const [imagesPolicy, setImagesPolicy] = useState<string>((initialData?.images_policy as string) ?? '');
  const [imagesDesc, setImagesDesc] = useState((initialData?.images_description as string) ?? '');

  // Domínio
  const [domainName, setDomainName] = useState((initialData?.domain_name as string) ?? '');

  // Final
  const [finalNotes, setFinalNotes] = useState((initialData?.final_notes as string) ?? '');

  const togglePage = (p: string) =>
    setPages((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const toggleFeature = (f: string) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const addOffering = () => setOfferings((p) => [...p, { name: '', description: '', price: '' }]);
  const removeOffering = (i: number) => setOfferings((p) => p.filter((_, idx) => idx !== i));
  const updateOffering = (i: number, k: keyof Offering, v: string) =>
    setOfferings((p) => p.map((o, idx) => (idx === i ? { ...o, [k]: v } : o)));

  const addTeam = () => setTeam((p) => [...p, { name: '', role: '', bio: '' }]);
  const removeTeam = (i: number) => setTeam((p) => p.filter((_, idx) => idx !== i));
  const updateTeam = (i: number, k: keyof TeamMember, v: string) =>
    setTeam((p) => p.map((o, idx) => (idx === i ? { ...o, [k]: v } : o)));

  const addTesti = () => setTestimonials((p) => [...p, { author: '', role: '', text: '' }]);
  const removeTesti = (i: number) => setTestimonials((p) => p.filter((_, idx) => idx !== i));
  const updateTesti = (i: number, k: keyof Testimonial, v: string) =>
    setTestimonials((p) => p.map((o, idx) => (idx === i ? { ...o, [k]: v } : o)));

  const steps = ['Marca', 'Visual', 'Estrutura', 'Oferta', 'Equipe', 'Prova social', 'Funções', 'Contato', 'Imagens', 'Final'];

  const submit = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        orderId,
        briefing: {
          business_name: businessName, business_tagline: tagline, business_about: about,
          business_segment: segment, business_target_audience: targetAudience, logo_description: logoDesc,
          // Mantém colors (array ilimitado por prioridade) e os 3 primeiros em legacy
          // pra compat com uso antigo (admin/export).
          colors,
          primary_color: colors[0], secondary_color: colors[1], accent_color: colors[2],
          font_style: fontStyle, visual_tone: visualTone || undefined, visual_references: visualRefs,
          pages_desired: pages,
          hero_headline: heroHeadline, hero_subheadline: heroSub,
          hero_cta_label: heroCta, hero_cta_action: heroAction,
          offerings: offerings.filter((o) => o.name.trim()),
          team: team.filter((t) => t.name.trim()),
          testimonials: testimonials.filter((t) => t.author.trim()),
          features_desired: features,
          contact_phone: cPhone, contact_whatsapp: cWhats, contact_email: cEmail,
          contact_address: cAddress, contact_hours: cHours,
          instagram_url: ig, facebook_url: fb, linkedin_url: li,
          images_policy: imagesPolicy || undefined,
          images_description: imagesDesc,
          domain_name: domainName,
          final_notes: finalNotes,
        },
      };
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao salvar briefing.');
      router.push('/conta?briefing=ok');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado.');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.3em]">
          Pedido confirmado · Briefing
        </span>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mt-3 mb-3">
          Agora conta tudo pra gente.
        </h1>
        <p className="text-white/50 font-bold text-sm md:text-base max-w-2xl">
          Esse briefing é o que vamos usar pra montar o mockup do seu <b className="text-white">{templateName}</b>.
          Capriche nas respostas — quanto mais detalhe, mais o site vai parecer feito pra você.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <button
              onClick={() => setStep(i)}
              className={cn('shrink-0 flex items-center gap-2',
                i === step ? 'opacity-100' : 'opacity-50 hover:opacity-80')}
            >
              <span className={cn('w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black',
                i < step ? 'bg-[#FF8C00] text-black' :
                i === step ? 'bg-[#FF8C00] text-black' : 'bg-white/10 text-white/40')}>
                {i < step ? <Check size={12} /> : i + 1}
              </span>
              <span className={cn('text-[10px] font-black uppercase tracking-widest hidden md:block',
                i === step ? 'text-white' : 'text-white/40')}>{s}</span>
            </button>
            {i < steps.length - 1 && <div className="w-6 h-px bg-white/10 shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5">
        {step === 0 && (
          <Section title="Sobre sua marca" subtitle="O essencial pra o site saber o que vende">
            <Field label="Nome do negócio *" value={businessName} onChange={setBusinessName} placeholder="Ex: Pizzaria do Zé" />
            <Field label="Slogan / frase de impacto" value={tagline} onChange={setTagline} placeholder="Ex: Sabor artesanal desde 1998" />
            <Field label="Segmento *" value={segment} onChange={setSegment} placeholder="Ex: Restaurante italiano" />
            <TextArea label="Sobre o negócio *" value={about} onChange={setAbout} rows={5}
              placeholder="Conte sua história em 3-5 linhas: quando começou, quem são vocês, o que entregam de diferente." />
            <TextArea label="Público-alvo *" value={targetAudience} onChange={setTargetAudience} rows={3}
              placeholder="Quem são seus clientes? Idade, perfil, o que buscam?" />
            <TextArea label="Descrição da logo" value={logoDesc} onChange={setLogoDesc} rows={2}
              placeholder="Já tem logo? Descreva. Vai enviar depois? Nos conte o estilo que quer." />
          </Section>
        )}

        {step === 1 && (
          <Section title="Identidade visual" subtitle="Como seu site deve parecer">
            <div>
              <SmallLabel>Tom visual *</SmallLabel>
              <div className="flex flex-wrap gap-2">
                {VISUAL_TONES.map((v) => (
                  <button key={v.k} onClick={() => setVisualTone(v.k)}
                    className={cn('px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest',
                      visualTone === v.k ? 'bg-[#FF8C00] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10')}>
                    {v.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              {/* Lista de cores ordenadas por prioridade de uso */}
              <div>
                <SmallLabel>Paleta de cores (ordem = prioridade de uso)</SmallLabel>
                <p className="text-white/40 text-xs mb-4">
                  A primeira cor é a mais importante (predominante no site). As demais são usadas como complementares.
                  Adicione quantas quiser e use ↑↓ pra ordenar.
                </p>
                <div className="space-y-2">
                  {colors.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white/[0.02] border border-white/10 rounded-2xl">
                      <span className="w-7 h-7 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] font-black text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <input
                        type="color"
                        value={c}
                        onChange={(e) => updateColor(i, e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer bg-transparent shrink-0"
                        aria-label={`Cor ${i + 1}`}
                      />
                      <input
                        value={c}
                        onChange={(e) => updateColor(i, e.target.value)}
                        maxLength={9}
                        className="flex-1 bg-transparent outline-none text-xs font-mono"
                      />
                      <div className="flex gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveColor(i, -1)}
                          disabled={i === 0}
                          className="w-7 h-7 rounded bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-20 text-xs font-black"
                          aria-label="Mover pra cima"
                        >↑</button>
                        <button
                          type="button"
                          onClick={() => moveColor(i, 1)}
                          disabled={i === colors.length - 1}
                          className="w-7 h-7 rounded bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-20 text-xs font-black"
                          aria-label="Mover pra baixo"
                        >↓</button>
                        <button
                          type="button"
                          onClick={() => removeColor(i)}
                          disabled={colors.length <= 1}
                          className="w-7 h-7 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-20 text-xs font-black"
                          aria-label="Remover"
                        >×</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addColor}
                  className="mt-3 w-full py-3 border-2 border-dashed border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white/50 hover:border-[#FF8C00]/40 hover:text-[#FF8C00]"
                >
                  + adicionar cor
                </button>
              </div>
            </div>
            <Field label="Preferência de fontes" value={fontStyle} onChange={setFontStyle}
              placeholder="Ex: Serifada clássica, sans-serif moderna, manuscrita, deixar com vocês..." />
            <TextArea label="Sites/marcas que inspiram você" value={visualRefs} onChange={setVisualRefs} rows={3}
              placeholder="Cole links ou nomes de marcas cujo visual te agrada." />
          </Section>
        )}

        {step === 2 && (
          <Section title="Páginas e hero" subtitle="O que o visitante vê primeiro">
            <div>
              <SmallLabel>Páginas que quer ter *</SmallLabel>
              <div className="flex flex-wrap gap-2">
                {SECOES_DISPONIVEIS.map((p) => (
                  <button key={p} onClick={() => togglePage(p)}
                    className={cn('px-4 py-2 rounded-full text-xs font-bold',
                      pages.includes(p) ? 'bg-[#FF8C00] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10')}>
                    {pages.includes(p) ? '✓ ' : ''}{p}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-white/5">
              <SmallLabel>Hero (primeira dobra)</SmallLabel>
              <Field label="Título principal" value={heroHeadline} onChange={setHeroHeadline}
                placeholder="Ex: Sua pizza artesanal, entregue quentinha" />
              <Field label="Subtítulo" value={heroSub} onChange={setHeroSub}
                placeholder="Ex: 20 anos servindo a melhor pizza da zona sul" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Texto do botão CTA" value={heroCta} onChange={setHeroCta}
                  placeholder="Ex: Pedir agora" />
                <Field label="O botão leva para" value={heroAction} onChange={setHeroAction}
                  placeholder="Ex: WhatsApp, cardápio, formulário..." />
              </div>
            </div>
          </Section>
        )}

        {step === 3 && (
          <Section title="Serviços / produtos" subtitle="O que você vende?">
            {offerings.map((o, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
                {offerings.length > 1 && (
                  <button onClick={() => removeOffering(i)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center">
                    <Minus size={12} />
                  </button>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">Item #{i + 1}</div>
                <Field label="Nome *" value={o.name} onChange={(v) => updateOffering(i, 'name', v)}
                  placeholder="Ex: Pizza Marguerita" compact />
                <TextArea label="Descrição" value={o.description} onChange={(v) => updateOffering(i, 'description', v)} rows={2}
                  placeholder="Breve descrição do que é o produto/serviço" />
                <Field label="Preço (opcional)" value={o.price} onChange={(v) => updateOffering(i, 'price', v)}
                  placeholder="R$ 45,00 ou 'Sob consulta'" compact />
              </div>
            ))}
            <button onClick={addOffering} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white/50 hover:border-[#FF8C00]/40 hover:text-[#FF8C00] flex items-center justify-center gap-2">
              <Plus size={14} /> Adicionar outro item
            </button>
          </Section>
        )}

        {step === 4 && (
          <Section title="Equipe" subtitle="Opcional — se quer mostrar quem está por trás">
            {team.length === 0 && (
              <p className="text-white/40 text-sm text-center py-6">Nenhum membro adicionado. Pule esta etapa se não precisa.</p>
            )}
            {team.map((m, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
                <button onClick={() => removeTeam(i)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center">
                  <Minus size={12} />
                </button>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">Pessoa #{i + 1}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nome" value={m.name} onChange={(v) => updateTeam(i, 'name', v)} compact />
                  <Field label="Cargo/função" value={m.role} onChange={(v) => updateTeam(i, 'role', v)} compact />
                </div>
                <TextArea label="Mini bio" value={m.bio} onChange={(v) => updateTeam(i, 'bio', v)} rows={2}
                  placeholder="Uma frase descrevendo o que ela faz" />
              </div>
            ))}
            <button onClick={addTeam} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white/50 hover:border-[#FF8C00]/40 hover:text-[#FF8C00] flex items-center justify-center gap-2">
              <Plus size={14} /> {team.length === 0 ? 'Adicionar primeiro membro' : 'Adicionar mais um'}
            </button>
          </Section>
        )}

        {step === 5 && (
          <Section title="Depoimentos" subtitle="Opcional — para prova social">
            {testimonials.length === 0 && (
              <p className="text-white/40 text-sm text-center py-6">Nenhum depoimento. Pule se não tiver.</p>
            )}
            {testimonials.map((t, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3 relative">
                <button onClick={() => removeTesti(i)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center">
                  <Minus size={12} />
                </button>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">Depoimento #{i + 1}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Autor" value={t.author} onChange={(v) => updateTesti(i, 'author', v)} compact />
                  <Field label="Função/relação" value={t.role} onChange={(v) => updateTesti(i, 'role', v)} placeholder="Ex: Cliente, aluna" compact />
                </div>
                <TextArea label="Texto *" value={t.text} onChange={(v) => updateTesti(i, 'text', v)} rows={3}
                  placeholder="O que a pessoa disse" />
              </div>
            ))}
            <button onClick={addTesti} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white/50 hover:border-[#FF8C00]/40 hover:text-[#FF8C00] flex items-center justify-center gap-2">
              <Plus size={14} /> {testimonials.length === 0 ? 'Adicionar primeiro depoimento' : 'Adicionar mais um'}
            </button>
          </Section>
        )}

        {step === 6 && (
          <Section title="Funcionalidades" subtitle="O que o site precisa fazer, além de ser uma vitrine">
            <div>
              <SmallLabel>Marque as que precisa</SmallLabel>
              <div className="grid md:grid-cols-2 gap-2">
                {FEATURES_DISPONIVEIS.map((f) => (
                  <label key={f} className={cn('flex items-center gap-3 p-3 rounded-xl border cursor-pointer',
                    features.includes(f) ? 'border-[#FF8C00]/50 bg-[#FF8C00]/10' : 'border-white/10 bg-white/[0.02]')}>
                    <input type="checkbox" checked={features.includes(f)} onChange={() => toggleFeature(f)}
                      className="w-4 h-4 accent-[#FF8C00]" />
                    <span className="text-sm font-bold">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </Section>
        )}

        {step === 7 && (
          <Section title="Contato e redes" subtitle="Como seus clientes falam com você">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Telefone" value={cPhone} onChange={setCPhone} placeholder="(11) 3000-0000" compact />
              <Field label="WhatsApp" value={cWhats} onChange={setCWhats} placeholder="(11) 99999-9999" compact />
            </div>
            <Field label="E-mail de contato" value={cEmail} onChange={setCEmail} type="email" placeholder="contato@seusite.com.br" compact />
            <Field label="Endereço (se tem ponto físico)" value={cAddress} onChange={setCAddress}
              placeholder="Rua, número, bairro, cidade — UF" compact />
            <TextArea label="Horário de atendimento" value={cHours} onChange={setCHours} rows={2}
              placeholder="Ex: Seg-Sex 9h-18h · Sáb 9h-14h" />
            <div className="pt-5 border-t border-white/5 space-y-3">
              <SmallLabel>Redes sociais (opcional)</SmallLabel>
              <Field label="Instagram URL" value={ig} onChange={setIg} placeholder="https://instagram.com/..." compact />
              <Field label="Facebook URL" value={fb} onChange={setFb} placeholder="https://facebook.com/..." compact />
              <Field label="LinkedIn URL" value={li} onChange={setLi} placeholder="https://linkedin.com/..." compact />
            </div>
          </Section>
        )}

        {step === 8 && (
          <Section title="Imagens do site" subtitle="Como vamos preencher visualmente">
            <div>
              <SmallLabel>De onde vêm as imagens?</SmallLabel>
              <div className="space-y-3">
                {[
                  ['vou-enviar', 'Vou enviar minhas próprias fotos', 'Após o briefing, você envia as fotos por e-mail/WhatsApp.'],
                  ['voces-escolhem', 'Vocês escolhem bancos de imagem gratuitos', 'Usamos Unsplash/Pexels — fotos profissionais, uso livre.'],
                  ['misto', 'Mistura — tenho algumas, resto vocês escolhem', 'Você envia o que tem, completamos o resto.'],
                ].map(([k, l, d]) => (
                  <button key={k} onClick={() => setImagesPolicy(k)}
                    className={cn('w-full text-left p-5 rounded-2xl border transition',
                      imagesPolicy === k ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02]')}>
                    <div className="font-black text-sm">{l}</div>
                    <div className="text-xs text-white/50 mt-1">{d}</div>
                  </button>
                ))}
              </div>
            </div>
            <TextArea label="Descreva as imagens que quer / referências" value={imagesDesc} onChange={setImagesDesc} rows={4}
              placeholder="Ex: Fotos do nosso restaurante, dos pratos; imagens vibrantes com cores quentes; close-ups dos ingredientes..." />
            <div className="pt-5 border-t border-white/5 space-y-4">
              <Field label="Nome do domínio (se já comprou)" value={domainName} onChange={setDomainName}
                placeholder="seusite.com.br" compact />
              <a
                href="/tutorial/dominio-proprio"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/30 hover:bg-[#FF8C00]/20 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF8C00]/20 flex items-center justify-center text-xl">🌐</div>
                  <div className="flex-1">
                    <div className="font-black text-sm text-[#FF8C00]">Quer ajuda pra registrar o domínio?</div>
                    <div className="text-xs text-white/60 mt-1">
                      Tutorial completo: Registro.br passo a passo, com a MarmitaCode como contato técnico.
                    </div>
                  </div>
                  <div className="text-[#FF8C00] text-xl">→</div>
                </div>
              </a>
            </div>
          </Section>
        )}

        {step === 9 && (
          <Section title="Finalizando" subtitle="Última chance de contar qualquer coisa importante">
            <TextArea label="Observações finais, pedidos especiais, referências extras..." value={finalNotes}
              onChange={setFinalNotes} rows={8}
              placeholder="Qualquer coisa que achar relevante pra gente saber e que não coube nos campos anteriores." />
            <div className="p-5 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 text-xs text-white/70 leading-relaxed">
              <b className="text-[#FF8C00] block mb-2">Depois de enviar</b>
              Nossa equipe recebe o briefing automaticamente e, em até <b className="text-white">1 dia útil</b>,
              você recebe por WhatsApp o cronograma de desenvolvimento. Qualquer dúvida que surgir, a gente
              chama você antes de começar a montar o mockup.
            </div>
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                {error}
              </div>
            )}
            <button onClick={submit} disabled={saving || !businessName.trim() || !about.trim()}
              className="w-full py-6 bg-[#FF8C00] text-black font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-[#FFD700] disabled:opacity-50 flex items-center justify-center gap-3">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
              {saving ? 'Enviando briefing...' : 'Enviar briefing final'}
            </button>
          </Section>
        )}

        <div className="flex justify-between mt-10">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0">
            <ChevronLeft size={16} /> Voltar
          </button>
          {step < steps.length - 1 && (
            <button onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest">
              Continuar <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">{title}</h2>
        <p className="text-white/40 text-sm mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function SmallLabel({ children }: { children: React.ReactNode }) {
  return <span className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-3">{children}</span>;
}

function Field({ label, value, onChange, placeholder, type, compact }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; compact?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <input type={type ?? 'text'} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} maxLength={500} autoComplete="off"
        className={cn('w-full bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#FF8C00]/50',
          compact ? 'px-4 py-3' : 'px-5 py-4')} />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        maxLength={5000}
        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#FF8C00]/50 resize-none" />
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer bg-transparent" />
        <input value={value} onChange={(e) => onChange(e.target.value)}
          maxLength={9}
          className="flex-1 bg-transparent outline-none text-xs font-mono" />
      </div>
    </label>
  );
}
