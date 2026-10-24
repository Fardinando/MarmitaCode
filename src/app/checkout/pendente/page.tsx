import Link from 'next/link';

export const metadata = { title: 'Pagamento pendente' };

export default function PendentePage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20 text-center">
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-4xl">
        ⏳
      </div>
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
        Pagamento pendente
      </h1>
      <p className="text-white/60 mb-10 leading-relaxed">
        Recebemos seu pedido mas o pagamento ainda não foi confirmado. Isso é
        comum com Pix: assim que o Mercado Pago confirmar, você recebe um e-mail
        e seu site entra em produção.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/conta"
          className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10"
        >
          Minha conta
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
