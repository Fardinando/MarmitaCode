'use client';

import { useState } from 'react';
import { Percent, DollarSign, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  action: (formData: FormData) => void | Promise<void>;
}

export function DiscountForm({ action }: Props) {
  const [tipo, setTipo] = useState<'percent' | 'amount'>('percent');
  const [valor, setValor] = useState('');
  const [codigo, setCodigo] = useState('');

  const preview = valor && Number(valor) > 0
    ? tipo === 'percent'
      ? `${Math.min(100, Number(valor))}% de desconto`
      : `R$ ${Number(valor).toFixed(2).replace('.', ',')} de desconto`
    : null;

  return (
    <form action={action} className="rounded-3xl bg-white/[0.02] border border-white/5 p-8">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#FF8C00]">Criar novo cupom</p>
        {preview && (
          <div className="px-5 py-2 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/30 text-[#FF8C00] font-black text-sm">
            Preview: <span className="uppercase tracking-wide">{codigo || 'SEU-CODIGO'}</span> → {preview}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Código */}
        <label className="block">
          <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
            Código do cupom
          </span>
          <input
            name="code"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 40))}
            placeholder="Ex: BLACKFRIDAY25"
            required
            autoComplete="off"
            maxLength={40}
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50 uppercase tracking-wide font-black"
          />
          <span className="block text-[10px] text-white/30 mt-2">Letras, números, hífen e underscore. Vira maiúsculo automático.</span>
        </label>

        {/* Expiração */}
        <label className="block">
          <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
            Expira em (opcional)
          </span>
          <input
            name="expires_at"
            type="date"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50"
          />
          <span className="block text-[10px] text-white/30 mt-2">Deixa em branco pra cupom sem validade.</span>
        </label>
      </div>

      {/* Toggle tipo + valor */}
      <div className="mb-6">
        <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
          Tipo de desconto
        </span>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => setTipo('percent')}
            className={cn(
              'p-5 rounded-2xl border text-left transition-all',
              tipo === 'percent'
                ? 'border-[#FF8C00] bg-[#FF8C00]/10'
                : 'border-white/10 bg-white/[0.02] hover:border-white/30'
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <Percent size={18} className={tipo === 'percent' ? 'text-[#FF8C00]' : 'text-white/50'} />
              <span className="font-black uppercase text-sm">Porcentagem</span>
            </div>
            <p className="text-white/50 text-xs">
              Ex: 10% OFF — desconta esse % do setup.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTipo('amount')}
            className={cn(
              'p-5 rounded-2xl border text-left transition-all',
              tipo === 'amount'
                ? 'border-[#FF8C00] bg-[#FF8C00]/10'
                : 'border-white/10 bg-white/[0.02] hover:border-white/30'
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={18} className={tipo === 'amount' ? 'text-[#FF8C00]' : 'text-white/50'} />
              <span className="font-black uppercase text-sm">Valor fixo (R$)</span>
            </div>
            <p className="text-white/50 text-xs">
              Ex: R$ 50 OFF — desconta esse valor fixo em reais.
            </p>
          </button>
        </div>

        <label className="block">
          <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
            {tipo === 'percent' ? 'Porcentagem (%)' : 'Valor em reais (R$)'}
          </span>
          <div className="relative">
            <input
              name="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder={tipo === 'percent' ? '10' : '50'}
              required
              min="0"
              max={tipo === 'percent' ? '100' : '10000'}
              step={tipo === 'percent' ? '1' : '0.01'}
              className="w-full px-5 py-4 pr-14 bg-white/5 border border-white/10 rounded-xl text-lg font-black outline-none focus:border-[#FF8C00]/50"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 font-black">
              {tipo === 'percent' ? '%' : 'R$'}
            </span>
          </div>
          <input type="hidden" name="tipo" value={tipo} />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap pt-6 border-t border-white/5">
        <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/60 cursor-pointer">
          <input
            type="checkbox"
            name="active"
            defaultChecked
            className="w-5 h-5 accent-[#FF8C00]"
          />
          Ativar imediatamente
        </label>

        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700]">
          <Plus size={14} /> Criar cupom
        </button>
      </div>
    </form>
  );
}
