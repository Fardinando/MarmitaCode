'use client';

import React, { useState } from 'react';
import { signIn, signUp } from '@/app/login/actions';
import { cn } from '@/lib/utils';

export function LoginForm({
  defaultMode = 'signin',
  next = '/conta',
}: {
  defaultMode?: 'signin' | 'signup';
  next?: string;
}) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);

  return (
    <div>
      <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-8">
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              'flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
              mode === m ? 'bg-[#FF8C00] text-black' : 'text-white/30 hover:text-white/60'
            )}
          >
            {m === 'signin' ? 'Entrar' : 'Criar conta'}
          </button>
        ))}
      </div>

      <form action={mode === 'signin' ? signIn : signUp} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {mode === 'signup' && (
          <Field name="name" label="Nome" type="text" placeholder="Seu nome" required />
        )}
        <Field name="email" label="E-mail" type="email" placeholder="voce@email.com" required />
        <Field name="password" label="Senha" type="password" placeholder="••••••••" required />

        <button
          type="submit"
          className="w-full py-5 mt-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#FF8C00] transition-all active:scale-95"
        >
          {mode === 'signin' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#FF8C00]/50 transition-colors"
      />
    </label>
  );
}
