import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LoginForm } from '@/components/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; mode?: string; next?: string }>;
}) {
  const { error, message, mode, next } = await searchParams;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <Link href="/" className="mb-16">
        <Logo />
      </Link>

      <div className="w-full max-w-md bg-white/[0.03] border border-white/5 rounded-[3rem] p-10">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-2">
          Acessar <span className="text-[#FF8C00]">plataforma</span>
        </h1>
        <p className="text-white/40 text-sm font-bold mb-8">
          Gerencie seus pedidos, sites e mensalidades.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
            {message}
          </div>
        )}

        <LoginForm defaultMode={mode === 'signup' ? 'signup' : 'signin'} next={next ?? '/conta'} />
      </div>

      <Link href="/" className="mt-10 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white">
        Voltar ao site
      </Link>
    </main>
  );
}
