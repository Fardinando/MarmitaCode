import Link from 'next/link';
import { Play, CheckCircle2, Users, Heart, MessageCircle, ArrowRight } from 'lucide-react';

const BENEFICIOS = [
  'Mentoria em grupo semanal ao vivo',
  'Acesso vitalício a todas as atualizações',
  'Grupo exclusivo no Telegram',
  'Templates prontos pra você usar',
  'Projetos corrigidos pelo próprio autor',
];

export function Curso2Template() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F43F5E]/20 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-10 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-black text-xl">
            Mentoria <span className="italic text-[#F43F5E]">Mariana Lima</span>
          </div>
          <a className="px-5 py-2.5 rounded-full bg-[#F43F5E] text-white text-[10px] font-black uppercase tracking-widest">
            Entrar na turma
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_320px] gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F43F5E]">Oi, eu sou a Mariana</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase leading-[0.9] tracking-tighter mb-6">
            Vou te ensinar a <span className="bg-gradient-to-r from-[#F43F5E] to-amber-400 bg-clip-text text-transparent">viver de confeitaria</span> em casa.
          </h1>
          <p className="text-white/60 text-lg font-bold mb-8">
            Já formei <b className="text-white">mais de 1.400 confeiteiras</b> que hoje faturam de R$ 3.000 a R$ 15.000 por mês vendendo bolos pela janela da cozinha.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <a className="group inline-flex items-center gap-2 px-8 py-5 bg-[#F43F5E] text-white rounded-full text-xs font-black uppercase tracking-widest hover:gap-3 transition-all shadow-[0_0_40px_rgba(244,63,94,0.5)]">
              Quero começar <ArrowRight size={14} />
            </a>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {['photo-1544005313-94ddf0286df2', 'photo-1534751516642-a1af1ef26a56', 'photo-1573496359142-b8d87734a5a2'].map((p) => (
                  <img key={p} src={`https://images.unsplash.com/${p}?w=100&auto=format&fit=crop`} className="w-10 h-10 rounded-full border-2 border-[#0A0A0F] object-cover" alt="" />
                ))}
              </div>
              <span className="text-white/60 font-medium"><b className="text-white">+1.400 alunas</b></span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(244,63,94,0.4)] rotate-3">
            <img src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop" alt="Mariana" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white text-black rounded-2xl p-4 shadow-xl -rotate-6 max-w-[200px]">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#F43F5E]">Última aluna faturou</div>
            <div className="text-2xl font-black mt-1">R$ 12.800</div>
            <div className="text-[10px] text-black/50 mt-1">no 1º trimestre após o curso</div>
          </div>
        </div>
      </section>

      {/* Vídeo */}
      <section className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <div className="aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(244,63,94,0.3)] relative group cursor-pointer bg-black">
          <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#F43F5E] flex items-center justify-center group-hover:scale-110 transition shadow-2xl">
              <Play size={28} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-[10px] uppercase tracking-widest font-black opacity-80">Assista</div>
            <div className="text-xl font-black">Veja do que o curso trata (3 min)</div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-center leading-none mb-14">
          O que você <span className="text-[#F43F5E]">leva no pacote.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {BENEFICIOS.map((b) => (
            <div key={b} className="flex items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <CheckCircle2 size={20} className="text-[#F43F5E] shrink-0 mt-0.5" />
              <span className="font-bold">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Prova social */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          {[
            [<Users key="u" />, '1.400+', 'Alunas formadas'],
            [<Heart key="h" />, '4.9', 'Avaliação média'],
            [<MessageCircle key="m" />, '2.800+', 'Agradecimentos'],
          ].map(([icon, n, l]) => (
            <div key={l as string} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
              <div className="text-[#F43F5E] flex justify-center mb-3">{icon}</div>
              <div className="text-4xl font-black italic">{n}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-black mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Preço */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">
          <span className="text-[#F43F5E]">Investimento.</span>
        </h2>
        <p className="text-white/50 font-bold mb-10">A próxima turma começa em 1º de novembro.</p>
        <div className="p-10 bg-gradient-to-br from-[#F43F5E] to-rose-700 rounded-[2.5rem] shadow-[0_0_100px_rgba(244,63,94,0.5)]">
          <p className="text-white/70 line-through">De R$ 1.497</p>
          <div className="text-7xl font-black italic my-3">R$ 597</div>
          <p className="text-white/80 font-bold mb-8">ou 12x de R$ 59</p>
          <a className="block py-5 bg-white text-[#F43F5E] font-black uppercase tracking-widest rounded-full text-xs">
            Quero minha vaga
          </a>
          <p className="text-xs text-white/60 mt-4">Garantia incondicional de 7 dias</p>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-white/40 text-xs font-black uppercase tracking-widest relative z-10">
        © Mariana Lima · <Link href="/encomendar/curso-2" className="text-[#F43F5E] hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
