'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Loader2, User, Info, LogIn } from 'lucide-react';
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

// Valores adicionais na mensalidade por funcionalidade extra.
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
  isLoggedIn = false,
}: {
  template: WizardTemplate;
  isCustom?: boolean;
  initialTier: Tier;
  paymentMode?: 'mock' | 'mercadopago';
  isLoggedIn?: boolean;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<Tier>(initialTier);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

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

  const extrasMonthlyAdd = extras.reduce((sum, k) => {
    const ex = EXTRAS_CATALOG.find((e) => e.key === k);
    return sum + (ex?.priceAdd ?? 0);
  }, 0);

  const finalMonthly = baseMonthly + extrasMonthlyAdd;
  const totalNow = setupPrice;

  const steps = ['Plano', 'Seus dados', 'Domínio & extras', 'Termos', 'Pagar'];

  const nameValid = name.trim().length >= 2;
  const emailValid = isValidEmail(email);
  const phoneValid = !phone || isValidPhoneBR(phone);

  const canAdvance = () => {
    if (step === 1) return nameValid && emailValid && phoneValid;
    if (step === 2) return wantsDomain !== null;
    if (step === 3) return acceptedTerms;
    return true;
  };

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
            business_name: '', // briefing completo vem pós-pagamento
            wants_domain: wantsDomain ? 'sim' : 'não',
            extras: extras.length > 0 ? extras.join(', ') : undefined,
          },
          contact: { name, email, phone, company },
          wantsDomain,
          discountCode: discountCode || null,
          setupPrice,
          monthlyPrice: finalMonthly,
          extras,
          _hp: honeypot, // honeypot
        }),
      });
      const data = await res.json();
      if (res.status === 401 && data.requireLogin) {
        // Precisa de login — manda pra signup com retorno pra encomendar.
        router.push(`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}&signup=1`);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? 'Erro ao enviar pedido.');
      if (data.checkoutUrl) {
        // Mercado Pago → após pagamento, redireciona pra /briefing/[orderId]
        window.location.href = data.checkoutUrl;
        return;
      }
      // Mock: pagamento é considerado aprovado — vai direto pro briefing
      router.push(data.briefingUrl || `/briefing/${data.order.id}`);
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

      {/* Aviso de novo fluxo */}
      <div className="mb-6 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-xs text-white/70 flex items-start gap-3">
        <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <b className="text-white">Como funciona:</b> você escolhe o plano, cria sua conta, paga,
          preenche o briefing completo e recebe seu site pronto.
        </div>
      </div>

      <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5">
        {/* Honeypot invisível pra bots */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          className="absolute left-[-9999px]"
          aria-hidden="true"
        />

        {step === 0 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Escolha o plano</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
              Setup único + mensalidade a partir de R$ 47,90
            </p>
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
              <User size={28} className="text-[#FF8C00]" /> Seus dados
            </h2>
            {!isLoggedIn && (
              <div className="p-4 rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 text-xs text-white/70 flex items-center gap-3">
                <LogIn size={14} className="text-[#FF8C00]" />
                <span>
                  Já tem conta?{' '}
                  <Link
                    href={`/login?next=${encodeURIComponent('/encomendar/' + template.slug)}`}
                    className="text-[#FF8C00] font-bold underline"
                  >
                    Faça login
                  </Link>{' '}
                  — se não, criamos uma pra você automaticamente no próximo passo.
                </span>
              </div>
            )}
            <Field label="Nome completo" value={name} onChange={setName} placeholder="Seu nome"
              error={name.length > 0 && !nameValid ? 'Informe um nome válido.' : undefined} />
            <Field label="E-mail" value={email} onChange={setEmail} type="email" placeholder="voce@email.com"
              error={email.length > 0 && !emailValid ? 'E-mail inválido.' : undefined} />
            <Field label="Telefone / WhatsApp" value={phone} onChange={(v) => setPhone(formatPhoneBR(v))}
              type="tel" placeholder="(83) 99999-9999"
              error={phone.length > 0 && !phoneValid ? 'Telefone inválido.' : undefined} />
            <Field label="Empresa" value={company} onChange={setCompany} placeholder="Opcional" />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Domínio & extras</h2>

            <div className="mb-8">
              <p className="text-white/60 text-sm mb-4 font-bold">Quer usar um domínio próprio (ex.: seusite.com.br)?</p>
              <div className="space-y-3">
                <button onClick={() => setWantsDomain(true)}
                  className={cn('w-full text-left p-5 rounded-2xl border',
                    wantsDomain === true ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02]')}>
                  <div className="font-black text-sm uppercase mb-1">Sim, quero domínio próprio</div>
                  <p className="text-white/50 text-xs">
                    Você registra no Registro.br. Enviamos tutorial e cuidamos de DNS/SSL.
                  </p>
                </button>
                <button onClick={() => setWantsDomain(false)}
                  className={cn('w-full text-left p-5 rounded-2xl border',
                    wantsDomain === false ? 'border-[#FF8C00] bg-[#FF8C00]/10' : 'border-white/5 bg-white/[0.02]')}>
                  <div className="font-black text-sm uppercase mb-1">Não — use o endereço gratuito</div>
                  <p className="text-white/50 text-xs">
                    <b className="text-white">marmitacode.com.br/seunome</b>. Zero custo adicional.
                  </p>
                </button>
              </div>
            </div>

            {!isBasico && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#FF8C00] mb-3">
                  Funcionalidades extras (opcional)
                </h3>
                <p className="text-white/50 text-xs mb-4">
                  Cada extra adiciona valor à mensalidade.
                </p>
                <div className="space-y-2">
                  {EXTRAS_CATALOG.map((ex) => (
                    <label key={ex.key}
                      className={cn('flex items-center gap-3 p-4 rounded-2xl border cursor-pointer',
                        extras.includes(ex.key) ? 'border-[#FF8C00]/50 bg-[#FF8C00]/10' : 'border-white/10 bg-white/[0.02]')}>
                      <input type="checkbox" checked={extras.includes(ex.key)}
                        onChange={() => toggleExtra(ex.key)} className="w-4 h-4 accent-[#FF8C00]" />
                      <span className="flex-1 text-sm font-bold">{ex.label}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">{ex.hint}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Antes de pagar</h2>

            <div className="space-y-4 text-xs text-white/70 leading-relaxed mb-8">
              <TermItem title="O que acontece agora">
                Você <b className="text-white">cria sua conta</b>, <b className="text-white">paga</b> o setup,
                e logo em seguida é levado pro <b className="text-white">briefing completo</b> onde você vai
                detalhar tudo que seu site precisa ter.
              </TermItem>
              <TermItem title="Setup e mensalidade">
                O <b className="text-white">setup</b> é cobrado agora. A <b className="text-white">mensalidade</b>
                {' '}de R$ {finalMonthly.toFixed(2).replace('.', ',')} começa 30 dias após a publicação do site.
              </TermItem>
              <TermItem title="Responsabilidade pelo domínio">
                A compra e renovação do domínio é sua, direto no Registro.br. A gente envia tutorial e cuida
                de toda configuração técnica.
              </TermItem>
              <TermItem title="Inadimplência">
                Se a mensalidade não for paga, o site <b className="text-white">sai do ar</b> e vira a tela
                de erro <b className="text-white">404 personalizada da MarmitaCode</b>.
              </TermItem>
            </div>

            <label className="flex items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 accent-[#FF8C00] shrink-0" />
              <span className="text-xs text-white/80 leading-relaxed">
                Eu li e concordo com os termos acima, com os{' '}
                <Link href="/termos" target="_blank" className="text-[#FF8C00] underline">Termos de Uso</Link>{' '}
                e a <Link href="/privacidade" target="_blank" className="text-[#FF8C00] underline">Política de Privacidade</Link>.
              </span>
            </label>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Revisão & pagamento</h2>

            <div className="space-y-3 text-sm mb-6">
              <Row label="Template" value={template?.name ?? '100% Personalizado'} />
              <Row label="Plano" value={TIER_LABELS[tier]} />
              <Row label="Domínio" value={wantsDomain ? 'Próprio (você registra)' : 'Endereço gratuito'} />
              {extras.length > 0 && (
                <Row label="Extras" value={`${extras.length} funcionalidade(s)`} />
              )}
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 mb-6 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-sm font-bold">Setup (pago agora)</span>
                <span className="text-xl font-black text-white">R$ {setupPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-baseline">
                <span className="text-white font-black text-sm uppercase tracking-widest">Mensalidade</span>
                <span className="text-2xl font-black text-[#FF8C00]">
                  R$ {finalMonthly.toFixed(2).replace('.', ',')}
                  <span className="text-xs text-white/40 ml-1 font-normal">/mês (a partir de 30 dias)</span>
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Código de desconto (opcional)"
                maxLength={60}
                className="w-full bg-transparent outline-none text-sm" />
            </div>

            <div className="p-6 rounded-3xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 mb-4">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#FF8C00] mb-1">
                    A pagar agora{paymentMode === 'mock' ? ' (mock)' : ''}
                  </span>
                  <span className="text-white/50 text-xs">Setup único · depois: briefing</span>
                </div>
                <span className="text-4xl font-black text-[#FF8C00]">R$ {totalNow.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                {error}
              </div>
            )}

            <button onClick={submit} disabled={saving}
              className="w-full py-6 bg-white text-black font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-[#FF8C00] transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
              {saving
                ? 'Processando...'
                : paymentMode === 'mercadopago'
                ? 'Pagar com Mercado Pago'
                : 'Pagar (mock) e ir pro briefing'}
            </button>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0">
            <ChevronLeft size={16} /> Voltar
          </button>
          {step < steps.length - 1 && (
            <button onClick={() => canAdvance() && setStep((s) => s + 1)} disabled={!canAdvance()}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest disabled:opacity-30">
              Continuar <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type, error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <input type={type ?? 'text'} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} aria-invalid={!!error}
        maxLength={200}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
        className={cn('w-full px-5 py-4 bg-white/5 border rounded-2xl text-sm outline-none transition-colors',
          error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#FF8C00]/50')} />
      {error && <span className="block mt-2 text-[10px] font-bold text-red-400">{error}</span>}
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
      <h4 className="text-sm font-black uppercase tracking-wide text-white mb-2">{title}</h4>
      <p className="text-white/60">{children}</p>
    </div>
  );
}
