'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, Loader2, Globe, Palette, LayoutGrid, User, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isValidEmail, isValidPhoneBR, formatPhoneBR } from '@/lib/validation';
import {
  TIER_LABELS,
  type TemplateTier,
  type Tier,
} from '@/lib/types';

interface WizardTemplate {
  slug: string;
  name: string;
  tiers: TemplateTier[];
}

const LAYOUTS = ['Clássico', 'Moderno', 'Minimalista', 'Ousado', 'Corporativo'];

// Valores adicionais na mensalidade por funcionalidade extra.
// Usamos o piso da faixa — o preço final sai no orçamento após o briefing.
const EXTRAS_CATALOG = [
  { key: 'db-login', label: 'Banco de dados (login/cadastro)', priceAdd: 30, hint: '+ R$ 30/mês' },
  { key: 'video-host', label: 'Hospedagem de vídeos', priceAdd: 25, hint: '+ R$ 25/mês' },
  { key: 'payment-api', label: 'Integração com pagamentos', priceAdd: 20, hint: '+ R$ 20/mês' },
  { key: 'admin-area', label: 'Área administrativa customizada', priceAdd: 40, hint: '+ R$ 40/mês' },
  { key: 'other', label: 'Outra funcionalidade (descreva no briefing)', priceAdd: 0, hint: 'A combinar' },
] as const;

export function OrderWizard({
  template,
  isCustom = false,
  initialTier,
  paymentMode = 'mock',
}: {
  template: WizardTemplate;
  isCustom?: boolean;
  initialTier: Tier;
  paymentMode?: 'mock' | 'mercadopago';
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<Tier>(initialTier);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [business, setBusiness] = useState('');
  const [segment, setSegment] = useState('');
  const [primary, setPrimary] = useState('#FF8C00');
  const [secondary, setSecondary] = useState('#FFFFFF');
  const [layout, setLayout] = useState(LAYOUTS[0]);
  const [about, setAbout] = useState('');
  const [references, setReferences] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // Domínio: sim/não. Cliente mesmo cuida no Registro.br.
  const [wantsDomain, setWantsDomain] = useState<boolean | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [extras, setExtras] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const selectedTierRow = useMemo(
    () => template.tiers.find((t) => t.tier === tier) ?? null,
    [template, tier]
  );

  const setupPrice = selectedTierRow ? Number(selectedTierRow.setup_price) : 0;
  const baseMonthly = selectedTierRow ? Number(selectedTierRow.monthly_price) : 0;

  const isBasico = tier === 'basico';

  // Extras adicionam valor à mensalidade (não ao setup).
  const extrasMonthlyAdd = extras.reduce((sum, k) => {
    const ex = EXTRAS_CATALOG.find((e) => e.key === k);
    return sum + (ex?.priceAdd ?? 0);
  }, 0);

  const finalMonthly = baseMonthly + extrasMonthlyAdd;

  // Total COBRADO AGORA: só o setup (mensalidade começa 30 dias depois).
  const totalNow = setupPrice;

  const steps = ['Plano', 'Briefing', 'Domínio', 'Contato', 'Termos', 'Revisão'];

  const nameValid = name.trim().length >= 2;
  const emailValid = isValidEmail(email);
  const phoneValid = !phone || isValidPhoneBR(phone);

  const canAdvance = () => {
    if (step === 1) return business.trim().length > 0;
    if (step === 2) return wantsDomain !== null;
    if (step === 3) return nameValid && emailValid && phoneValid;
    if (step === 4) return acceptedTerms;
    return true;
  };

  const toggleExtra = (k: string) => {
    setExtras((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const submit = async () => {
    setSaving(true);
    setError(null);
    try {
      const extrasDetail = extras
        .map((k) => EXTRAS_CATALOG.find((e) => e.key === k)?.label)
        .filter(Boolean)
        .join(', ');

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateSlug: isCustom ? null : template.slug,
          tier,
          briefing: {
            business_name: business,
            segment,
            primary_color: primary,
            secondary_color: secondary,
            layout,
            about,
            references,
            wants_domain: wantsDomain ? 'sim' : 'não',
            extras: extrasDetail || undefined,
          },
          contact: { name, email, phone, company },
          wantsDomain,
          discountCode: discountCode || null,
          setupPrice,
          monthlyPrice: finalMonthly,
          extras,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao enviar pedido.');
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      router.push(`/checkout/sucesso?order=${data.order.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado.');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-12">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black shrink-0',
                  i < step ? 'bg-[#FF8C00] text-black' : i === step ? 'bg-[#FF8C00] text-black' : 'bg-white/10 text-white/40'
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={cn('text-[10px] font-black uppercase tracking-widest hidden md:block', i === step ? 'text-white' : 'text-white/30')}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-[1px] bg-white/10" />}
          </React.Fragment>
        ))}
      </div>

      <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5">
        {step === 0 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Escolha o plano</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
              Setup único + mensalidade a partir de R$ 47,90
            </p>
            {!isBasico && (
              <div className="mb-6 p-5 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 text-xs text-white/70 leading-relaxed">
                <b className="text-[#FF8C00]">Funcionalidades extras aumentam a mensalidade.</b> Banco de dados,
                hospedagem de vídeo, integrações pagas e áreas administrativas sob medida geram custo adicional.
                Você escolhe no passo <b className="text-white">Termos</b>.
              </div>
            )}
            <div className="space-y-4">
              {template.tiers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.tier)}
                  className={cn(
                    'w-full text-left p-6 rounded-3xl border transition-all',
                    tier === t.tier ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                  )}
                >
                  <div className="flex justify-between items-center gap-2 flex-wrap">
                    <span className="font-black uppercase text-sm">{TIER_LABELS[t.tier]}</span>
                    <span className="text-[#FF8C00] font-black">
                      R${Number(t.setup_price).toFixed(0)}{' '}
                      <span className="text-white/30 text-xs">+ R${Number(t.monthly_price).toFixed(2).replace('.', ',')}/mês</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
              <Palette size={28} className="text-[#FF8C00]" /> Briefing
            </h2>
            <Field label="Nome do negócio" value={business} onChange={setBusiness} placeholder="Ex: Pizzaria do Zé" />
            <Field label="Segmento" value={segment} onChange={setSegment} placeholder="Ex: Restaurante, E-commerce, Curso..." />

            <div className="grid grid-cols-2 gap-6">
              <ColorField label="Cor primária" value={primary} onChange={setPrimary} />
              <ColorField label="Cor secundária" value={secondary} onChange={setSecondary} />
            </div>

            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                Disposição / estilo do site
              </span>
              <div className="flex flex-wrap gap-3">
                {LAYOUTS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayout(l)}
                    className={cn(
                      'px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2',
                      layout === l ? 'bg-[#FF8C00] text-black' : 'bg-white/5 text-white/40 hover:text-white'
                    )}
                  >
                    <LayoutGrid size={12} /> {l}
                  </button>
                ))}
              </div>
            </div>

            <TextArea label="Sobre o negócio / o que deve ter no site" value={about} onChange={setAbout} />
            <Field label="Referências (links, sites que gosta)" value={references} onChange={setReferences} placeholder="https://..." />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
              <Globe size={28} className="text-[#FF8C00]" /> Domínio próprio
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
              Você quer usar um domínio próprio (ex.: seusite.com.br)?
            </p>

            <div className="space-y-4 mb-6">
              <button
                onClick={() => setWantsDomain(true)}
                className={cn(
                  'w-full text-left p-6 rounded-3xl border transition-all',
                  wantsDomain === true ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                )}
              >
                <div className="font-black text-sm uppercase mb-2">Sim, quero domínio próprio</div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Você mesmo registra no Registro.br e nos avisa. Enviamos um tutorial passo a passo
                  após o fechamento do pedido. A gente faz toda a configuração técnica (DNS, apontamento, SSL).
                </p>
              </button>

              <button
                onClick={() => setWantsDomain(false)}
                className={cn(
                  'w-full text-left p-6 rounded-3xl border transition-all',
                  wantsDomain === false ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                )}
              >
                <div className="font-black text-sm uppercase mb-2">Não precisa — use o endereço gratuito</div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Seu site fica em um endereço do tipo <b className="text-white">seunome.marmitacode.com</b>.
                  Zero custo adicional, pronto no mesmo dia. Pode trocar pra domínio próprio depois.
                </p>
              </button>
            </div>

            {wantsDomain === true && (
              <div className="p-5 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 text-xs text-white/70 leading-relaxed">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-[#FF8C00] shrink-0 mt-0.5" />
                  <div>
                    <b className="text-[#FF8C00] block mb-2">Como funciona</b>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Depois do pedido, enviamos tutorial do Registro.br por e-mail.</li>
                      <li>Você escolhe e paga o domínio direto no Registro.br (a taxa é anual deles).</li>
                      <li>Nos informa o domínio registrado — a gente configura DNS e SSL.</li>
                      <li>Em até 24h o site está no ar no seu domínio.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
              <User size={28} className="text-[#FF8C00]" /> Seus dados
            </h2>
            <Field
              label="Nome completo"
              value={name}
              onChange={setName}
              placeholder="Seu nome"
              error={name.length > 0 && !nameValid ? 'Informe um nome válido.' : undefined}
            />
            <Field
              label="E-mail"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="voce@email.com"
              error={email.length > 0 && !emailValid ? 'E-mail inválido.' : undefined}
            />
            <Field
              label="Telefone / WhatsApp"
              value={phone}
              onChange={(v) => setPhone(formatPhoneBR(v))}
              type="tel"
              placeholder="(83) 99999-9999"
              error={phone.length > 0 && !phoneValid ? 'Telefone inválido.' : undefined}
            />
            <Field label="Empresa" value={company} onChange={setCompany} placeholder="Opcional" />
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
              Antes de finalizar
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
              Leia com atenção — você aceita estes termos ao concluir o pedido
            </p>

            {!isBasico && (
              <div className="mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#FF8C00] mb-3">
                  Funcionalidades extras (opcional)
                </h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">
                  Cada extra marcado adiciona um valor à mensalidade. O preço final sai no orçamento após o briefing.
                </p>
                <div className="space-y-2">
                  {EXTRAS_CATALOG.map((ex) => (
                    <label
                      key={ex.key}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all',
                        extras.includes(ex.key)
                          ? 'border-[#FF8C00]/50 bg-[#FF8C00]/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={extras.includes(ex.key)}
                        onChange={() => toggleExtra(ex.key)}
                        className="w-4 h-4 accent-[#FF8C00]"
                      />
                      <span className="flex-1 text-sm font-bold">{ex.label}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00] whitespace-nowrap">
                        {ex.hint}
                      </span>
                    </label>
                  ))}
                </div>
                {extrasMonthlyAdd > 0 && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/30 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FF8C00]">
                      Mensalidade com extras
                    </span>
                    <span className="text-2xl font-black text-[#FF8C00]">
                      R$ {finalMonthly.toFixed(2).replace('.', ',')}
                      <span className="text-xs text-white/50 ml-1">/mês</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4 text-xs text-white/70 leading-relaxed mb-8">
              <TermItem title="Setup e mensalidade">
                O <b className="text-white">setup</b> é cobrado <b className="text-white">agora</b>, uma única vez.
                A <b className="text-white">mensalidade</b> começa 30 dias após a publicação do site e cobre a
                mão de obra para manter o site no ar, pequenas edições e manutenção.
              </TermItem>
              <TermItem title="Responsabilidade pelo domínio">
                A compra e renovação do domínio é <b className="text-white">responsabilidade sua</b> — você compra
                direto no Registro.br. Após o pedido, enviamos um <b className="text-white">tutorial</b> explicando
                como fazer. Você também pode optar por usar o endereço gratuito{' '}
                <b className="text-white">seunome.marmitacode.com</b>.
              </TermItem>
              <TermItem title="Inadimplência">
                Se a mensalidade não for paga, o site <b className="text-white">sairá do ar</b> e
                os visitantes passarão a ver a tela de erro <b className="text-white">404 personalizada
                da MarmitaCode</b>. Assim que a mensalidade for regularizada, o site volta ao ar.
              </TermItem>
              <TermItem title="Pagamento">
                Via Mercado Pago (Pix, cartão de crédito ou débito). Primeira mensalidade cobrada 30 dias
                depois da publicação do site.
              </TermItem>
            </div>

            <label className="flex items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 accent-[#FF8C00] shrink-0"
              />
              <span className="text-xs text-white/80 leading-relaxed">
                Eu li e concordo com os termos acima, com os{' '}
                <a href="/termos" target="_blank" className="text-[#FF8C00] underline">
                  Termos de Uso
                </a>{' '}
                e a{' '}
                <a href="/privacidade" target="_blank" className="text-[#FF8C00] underline">
                  Política de Privacidade
                </a>
                .
              </span>
            </label>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Revisão do pedido</h2>

            <div className="space-y-3 text-sm mb-8">
              <Row label="Template" value={template?.name ?? '100% Personalizado'} />
              <Row label="Plano" value={TIER_LABELS[tier]} />
              <Row label="Domínio próprio" value={wantsDomain ? 'Sim (cliente registra no Registro.br)' : 'Usar endereço gratuito'} />
              {extras.length > 0 && (
                <Row
                  label="Extras"
                  value={extras.map((k) => EXTRAS_CATALOG.find((e) => e.key === k)?.label).filter(Boolean).join(', ')}
                />
              )}
            </div>

            {/* Resumo de valores */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 mb-6 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-sm font-bold">Setup (pago agora)</span>
                <span className="text-xl font-black text-white">R$ {setupPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-sm font-bold">Mensalidade base</span>
                <span className="text-white/80 font-bold">R$ {baseMonthly.toFixed(2).replace('.', ',')}/mês</span>
              </div>
              {extrasMonthlyAdd > 0 && (
                <div className="flex justify-between items-baseline">
                  <span className="text-white/60 text-sm font-bold">Extras na mensalidade</span>
                  <span className="text-white/80 font-bold">+ R$ {extrasMonthlyAdd.toFixed(2).replace('.', ',')}/mês</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/5 flex justify-between items-baseline">
                <span className="text-white font-black text-sm uppercase tracking-widest">Mensalidade total</span>
                <span className="text-2xl font-black text-[#FF8C00]">
                  R$ {finalMonthly.toFixed(2).replace('.', ',')}
                  <span className="text-xs text-white/40 ml-1 font-normal">/mês</span>
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Código de desconto (opcional)"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {/* Total a pagar AGORA */}
            <div className="p-6 rounded-3xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 mb-4">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#FF8C00] mb-1">
                    A pagar agora{paymentMode === 'mock' ? ' (mock)' : ''}
                  </span>
                  <span className="text-white/50 text-xs">Setup único · 1ª mensalidade em 30 dias</span>
                </div>
                <span className="text-4xl font-black text-[#FF8C00]">R$ {totalNow.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <p className="text-[10px] text-white/30 font-bold mb-6">
              {paymentMode === 'mercadopago'
                ? '* Você será redirecionado para o Mercado Pago. Aceitamos Pix, cartão de crédito e débito.'
                : '* Pagamento simulado (mockup). Nenhuma cobrança real será feita neste momento.'}
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                {error}
              </div>
            )}

            <button
              onClick={submit}
              disabled={saving}
              className="w-full py-6 bg-white text-black font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-[#FF8C00] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
              {saving
                ? 'Enviando pedido...'
                : paymentMode === 'mercadopago'
                ? 'Pagar com Mercado Pago'
                : 'Finalizar pedido (mock)'}
            </button>
          </div>
        )}

        {/* Nav */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          {step < steps.length - 1 && (
            <button
              onClick={() => canAdvance() && setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest disabled:opacity-30"
            >
              Continuar <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <input
        type={type ?? 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          'w-full px-5 py-4 bg-white/5 border rounded-2xl text-sm outline-none transition-colors',
          error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#FF8C00]/50'
        )}
      />
      {error && <span className="block mt-2 text-[10px] font-bold text-red-400">{error}</span>}
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#FF8C00]/50 resize-none"
      />
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg bg-transparent cursor-pointer"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm font-mono"
        />
      </div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-2 border-b border-white/5">
      <span className="text-white/40 font-bold shrink-0">{label}</span>
      <span className="font-black text-right">{value}</span>
    </div>
  );
}

function TermItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
      <h4 className="text-sm font-black uppercase tracking-wide text-white mb-2">
        {title}
      </h4>
      <p className="text-white/60">{children}</p>
    </div>
  );
}
