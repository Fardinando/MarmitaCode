import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { getProfile } from '@/lib/auth';
import { signOut } from '@/app/login/actions';

export async function SiteHeader() {
  const profile = await getProfile();

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3">
        <Link href="/" className="origin-left shrink min-w-0">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-white/50">
          <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
          <Link href="/planos" className="hover:text-white transition-colors">Planos</Link>
          <Link href="/#como-funciona" className="hover:text-white transition-colors">Como funciona</Link>
          <Link href="/#dominio" className="hover:text-white transition-colors">Domínio</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {profile ? (
            <>
              {profile.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-[#FF8C00] hover:underline"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/conta"
                className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white"
              >
                Minha conta
              </Link>
              <form action={signOut}>
                <button className="px-3 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Sair
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white"
              >
                Entrar
              </Link>
              <Link
                href="/templates"
                className="px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-[#FF8C00] text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-[#FFD700] transition-colors whitespace-nowrap"
              >
                Encomendar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
