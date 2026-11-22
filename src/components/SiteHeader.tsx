import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { getProfile } from '@/lib/auth';
import { signOut } from '@/app/login/actions';
import { C, serif } from '@/components/ui';

export async function SiteHeader() {
  const profile = await getProfile();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(11,9,8,0.72)',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="shrink min-w-0">
          <Logo />
        </Link>

        <nav
          className="hidden lg:flex items-center gap-7 text-sm"
          style={{ ...serif, color: C.textMuted, fontStyle: 'italic' }}
        >
          <Link href="/templates" className="hover:text-[#F5EFE4] transition-colors">Templates</Link>
          <Link href="/cases" className="hover:text-[#F5EFE4] transition-colors">Cases</Link>
          <Link
            href="/planos"
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all"
            style={{
              backgroundColor: 'rgba(249,115,22,0.12)',
              border: `1px solid ${C.accent}`,
              color: C.text,
              fontStyle: 'italic',
              boxShadow: '0 6px 24px -10px rgba(249,115,22,0.6)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: C.accent, boxShadow: `0 0 10px ${C.accent}` }}
            />
            Planos
            <span
              className="text-[9px] not-italic font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: C.accent, color: '#1A0E00' }}
            >
              comprar
            </span>
          </Link>
          <Link
            href="/fora-do-cardapio"
            className="hover:text-[#F5EFE4] transition-colors"
          >
            Fora do cardápio
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {profile ? (
            <>
              {profile.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hidden sm:inline text-xs tracking-wide"
                  style={{ color: C.accent, ...serif, fontStyle: 'italic' }}
                >
                  admin
                </Link>
              )}
              <Link
                href="/conta"
                className="text-sm hover:text-[#F5EFE4] transition-colors"
                style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
              >
                minha conta
              </Link>
              <form action={signOut}>
                <button
                  className="px-4 py-2 text-xs transition-colors rounded-full"
                  style={{
                    color: C.text,
                    border: `1px solid ${C.border}`,
                    ...serif,
                    fontStyle: 'italic',
                  }}
                >
                  sair
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline text-sm hover:text-[#F5EFE4] transition-colors"
                style={{ color: C.textMuted, ...serif, fontStyle: 'italic' }}
              >
                entrar
              </Link>
              <Link
                href="/planos"
                className="lg:hidden px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-transform hover:translate-x-0.5 rounded-full"
                style={{
                  backgroundColor: C.accent,
                  color: '#1A0E00',
                  letterSpacing: '0.01em',
                }}
              >
                Ver planos
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
