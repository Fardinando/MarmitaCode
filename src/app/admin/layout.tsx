import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/templates', label: 'Templates' },
  { href: '/admin/pedidos', label: 'Pedidos' },
  { href: '/admin/contratantes', label: 'Contratantes' },
  { href: '/admin/descontos', label: 'Descontos' },
  { href: '/admin/dominio', label: 'Domínio' },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 shrink-0 border-r border-white/5 p-8 hidden lg:block">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF8C00] mb-10">
          Admin
        </p>
        <nav className="space-y-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex gap-3 overflow-x-auto p-4 border-b border-white/5">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-white/50">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="p-8 lg:p-12">{children}</div>
      </div>
    </div>
  );
}
