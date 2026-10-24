'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, Loader2, Globe, Palette, LayoutGrid, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isValidEmail, isValidPhoneBR, formatPhoneBR } from '@/lib/validation';
import {
  TIER_LABELS,
  type DomainPricing,
  type TemplateTier,
  type Tier,
} from '@/lib/types';

interface WizardTemplate {
  slug: string;
  name: string;
  tiers: TemplateTier[];
}

const LAYOUTS = ['Clássico', 'Moderno', 'Minimalista', 'Ousado', 'Corporativo'];

export function OrderWizard({
  template,
  isCustom = false,
  domainPricing,
  initialTier,
  paymentMode = 'mock',
}: {
  template: WizardTemplate;
  isCustom?: boolean;
  domainPricing: DomainPricing[];
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

  const [domainYears, setDomainYears] = useState<number | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [extras, setExtras] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const selectedTierRow = useMemo(
    () => template.tiers.find((t) => t.tier === tier) ?? null,
    [template, tier]
  );

  const setupPrice = selectedTierRow ? Number(selectedTierRow.setup_price) : 0;
  const monthlyPrice = selectedTierRow ? Number(selectedTierRow.monthly_price) : 0;

  const domainRow = domainPricing.find((d) => d.years === domainYears) ?? null;
  const domainCost = domainRow
    ? Number(domainRow.registry_price) + Number(domainRow.labor_fee)
    : 0;

  const total = Math.max(0, setupPrice + domainCost);

  const steps = ['Plano', 'Briefing', 'Domínio', 'Contato', 'Termos', 'Revisão'];

  const nameValid = name.trim().length >= 2;
  const emailValid = isValidEmail(email);
  const phoneValid = !phone || isValidPhoneBR(phone);

  const canAdvance = () => {
    if (step === 1) return business.trim().length > 0;
    if (step === 3) return nameValid && emailValid && phoneValid;
    if (step === 4) return acceptedTerms;
    return true;
  };

  const isBasico = tier === 'basico';
  const EXTRAS_AVAILABLE = [
    { key: 'db-login', label: 'Banco de dados (login/cadastro)', priceHint: '+ R$ 30-80/mês' },
    { key: 'video-host', label: 'Hospedagem de vídeos', priceHint: '+ R$ 25-70/mês' },
    { key: 'payment-api', label: 'Integração com pagamentos', priceHint: '+ R$ 20-50/mês' },
    { key: 'admin-area', label: 'Área administrativa customizada', priceHint: '+ R$ 40-100/mês' },
    { key: 'other', label: 'Outra funcionalidade (descreva no briefing)', priceHint: 'A combinar' },
  ];

  const toggleExtra = (k: string) => {
    setExtras((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const submit = async () => {
    setSaving(true);
    setError(null);
    try {
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
            extras: extras.length > 0 ? extras.join(', ') : undefined,
          },
          contact: { name, email, phone, company },
          domainYears,
          discountCode: discountCode || null,
          setupPrice,
          monthlyPrice,
          domainTotal: domainCost,
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
                  'w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black',
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

      <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5">
        {step === 0 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Escolha o plano</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
              Setup único + mensalidade de R$ 47,90
            </p>
            {!isBasico && (
              <div className="mb-6 p-5 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 text-xs text-white/70 leading-relaxed">
                <b className="text-[#FF8C00]">Funcionalidades extras aumentam a mensalidade.</b> Coisas como
                banco de dados (login/cadastro), hospedagem de vídeo, integrações pagas e áreas
                administrativas sob medida geram custo adicional. Você escolhe quais extras quer no
                passo <b className="text-white">Termos</b>.
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
                  <div className="flex justify-between items-center">
                    <span className="font-black uppercase text-sm">{TIER_LABELS[t.tier]}</span>
                    <span className="text-[#FF8C00] font-black">
                      R${Number(t.setup_price).toFixed(0)}{' '}
                      <span className="text-white/30 text-xs">+ R${Number(t.monthly_price).toFixed(0)}/mês</span>
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
              <Globe size={28} className="text-[#FF8C00]" /> Domínio (opcional)
            </h2>
            <div className="p-5 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 mb-8 text-xs font-bold text-white/60 leading-relaxed">
              Quer que a gente cuide do seu domínio? Nós registramos no <b className="text-white">Registro.br</b> com
              as <b className="text-white">nossas credenciais como administrador</b> — você permanece o
              <b className="text-white"> dono</b> do domínio. A taxa do Registro.br é <b className="text-white">anual</b> e
              controlada por eles; cobramos uma pequena taxa de mão de obra única.
              <br /><br />
              <span className="text-white/40">
                * Você ainda precisará acessar o Registro.br para efetivar a compra do domínio escolhido.
              </span>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setDomainYears(null)}
                className={cn(
                  'w-full text-left p-5 rounded-2xl border transition-all',
                  domainYears === null ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02]'
                )}
              >
                <span className="font-black text-sm uppercase">Não preciso</span>
                <span className="float-right text-white/40 text-xs font-bold">—</span>
              </button>

              {domainPricing.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDomainYears(d.years)}
                  className={cn(
                    'w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center',
                    domainYears === d.years ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                  )}
                >
                  <span className="font-black text-sm uppercase">{d.years} ano{d.years > 1 ? 's' : ''}</span>
                  <span className="text-[#FF8C00] font-black">
                    R${(Number(d.registry_price) + Number(d.labor_fee)).toFixed(0)}
                    <span className="text-white/30 text-[10px] ml-2">
                      (R${Number(d.registry_price).toFixed(0)} + R${Number(d.labor_fee).toFixed(0)} mão de obra)
                    </span>
                  </span>
                </button>
              ))}
            </div>
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
                  Marque o que quer no seu site. Cada extra adiciona um valor à mensalidade
                  — detalhamos o preço final após o briefing.
                </p>
                <div className="space-y-2">
                  {EXTRAS_AVAILABLE.map((ex) => (
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
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">
                        {ex.priceHint}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 text-xs text-white/70 leading-relaxed mb-8">
              <TermItem title="Mensalidade de R$ 47,90">
                Cobre apenas a <b className="text-white">mão de obra para instalação e controle do site</b>:
                hospedagem básica, pequenos ajustes e manutenção. Funcionalidades extras
                (banco de dados, hospedagem de vídeos, integrações) aumentam o valor mensal.
              </TermItem>
              <TermItem title="Responsabilidade pelo domínio">
                A compra e renovação do domínio é <b className="text-white">responsabilidade sua</b>.
                Após a compra do site, enviaremos um <b className="text-white">tutorial</b> explicando como
                fazer a compra no Registro.br. Você deve nos adicionar como{' '}
                <b className="text-white">administrador</b> do domínio para que a gente possa fazer
                a configuração técnica necessária.
              </TermItem>
              <TermItem title="Inadimplência">
                Se a mensalidade não for paga, o site <b className="text-white">sairá do ar</b> e
                os visitantes passarão a ver a tela de erro <b className="text-white">404 personalizada
                da MarmitaCode</b>. Assim que a mensalidade for regularizada, o site volta ao ar.
              </TermItem>
              <TermItem title="Pagamento inicial">
                O valor do setup é cobrado agora, no fechamento do pedido, via Mercado Pago (Pix,
                cartão de crédito ou débito). A primeira mensalidade é cobrada 30 dias depois
                da publicação do site.
              </TermItem>
            </div>

            <label className="flex items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 accent-[#FF8C00]"
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
              <Row label="Setup" value={`R$ ${setupPrice.toFixed(2)}`} />
              <Row label="Mensalidade" value={`R$ ${monthlyPrice.toFixed(2)}/mês`} />
              <Row label="Domínio" value={domainRow ? `${domainRow.years} ano(s) — R$ ${domainCost.toFixed(2)}` : 'Não'} />
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Código de desconto (opcional)"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <div className="flex items-baseline justify-between p-6 rounded-3xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">
                Total a pagar{paymentMode === 'mock' ? ' (mock)' : ''}
              </span>
              <span className="text-4xl font-black text-[#FF8C00]">R$ {total.toFixed(2)}</span>
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
    <div className="flex justify-between py-2 border-b border-white/5">
      <span className="text-white/40 font-bold">{label}</span>
      <span className="font-black">{value}</span>
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
