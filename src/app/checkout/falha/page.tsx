import Link from 'next/link';

export const metadata = { title: 'Pagamento não aprovado' };

export default async function FalhaPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  return (
    <main className="max-w-xl mx-auto px-6 py-20 text-center">
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-4xl">
        ⚠
      </div>
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
        Pagamento não aprovado
      </h1>
      <p className="text-white/60 mb-10 leading-relaxed">
        Não conseguimos processar seu pagamento. Isso pode acontecer por falta
        de limite, dados incorretos ou recusa do banco. Seu pedido continua
        salvo — você pode tentar novamente a qualquer momento.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        {order && (
          <Link
            href={`/conta`}
            className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
          >
            Tentar de novo
          </Link>
        )}
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
