import Link from 'next/link';
import { Play, CheckCircle2, Users, Heart, MessageCircle } from 'lucide-react';

const BENEFICIOS = [
  'Mentoria em grupo semanal ao vivo',
  'Acesso vitalício a todas as atualizações',
  'Grupo exclusivo no Telegram',
  'Templates prontos pra você usar',
  'Projetos corrigidos pelo próprio autor',
];

export function Curso2Template() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fef3c7] via-[#fed7aa] to-[#fecaca] text-[#431407]">
      <nav className="sticky top-10 z-40 bg-[#fef3c7]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-black text-xl">
            Mentoria <span className="italic text-[#dc2626]">Mariana Lima</span>
          </div>
          <a className="px-5 py-2.5 rounded-full bg-[#dc2626] text-white text-sm font-bold">
            Entrar na turma
          </a>
        </div>
      </nav>

      {/* Hero pessoal */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_320px] gap-12 items-center">
        <div>
          <p className="text-[#dc2626] text-xs uppercase tracking-widest font-bold mb-6">👋 Oi, eu sou a Mariana</p>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
            Eu vou te ensinar a <span className="italic text-[#dc2626]">viver de confeitaria</span> em casa.
          </h1>
          <p className="text-[#431407]/70 text-lg mb-8">
            Já formei <b>mais de 1.400 confeiteiras</b> que hoje faturam de R$ 3.000 a R$ 15.000 por mês vendendo bolos pela janela da cozinha.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <a className="px-8 py-5 bg-[#dc2626] text-white rounded-full font-bold flex items-center gap-2 shadow-lg">
              Quero começar <Heart size={18} />
            </a>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {['photo-1544005313-94ddf0286df2', 'photo-1534751516642-a1af1ef26a56', 'photo-1573496359142-b8d87734a5a2'].map((p) => (
                  <img key={p} src={`https://images.unsplash.com/${p}?w=100&auto=format&fit=crop`} className="w-10 h-10 rounded-full border-2 border-[#fef3c7] object-cover" alt="" />
                ))}
              </div>
              <span className="text-[#431407]/70"><b>+1.400 alunas</b> no curso</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3">
            <img src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop" alt="Mariana" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl -rotate-6 max-w-[200px]">
            <div className="text-xs font-bold text-[#dc2626]">Última aluna que faturou</div>
            <div className="text-2xl font-black mt-1">R$ 12.800</div>
            <div className="text-[10px] text-[#431407]/50 mt-1">no 1º trimestre após o curso</div>
          </div>
        </div>
      </section>

      {/* Vídeo */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer bg-black">
          <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#dc2626] flex items-center justify-center group-hover:scale-110 transition shadow-2xl">
              <Play size={28} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-xs uppercase tracking-widest font-bold opacity-80">Assista</div>
            <div className="text-xl font-black">Veja do que o curso trata (3 min)</div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-center mb-12">O que você leva no pacote</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {BENEFICIOS.map((b) => (
            <div key={b} className="flex items-start gap-3 p-5 bg-white/60 backdrop-blur rounded-2xl">
              <CheckCircle2 size={20} className="text-[#dc2626] shrink-0 mt-0.5" />
              <span className="font-bold">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Prova social */}
      <section className="bg-[#431407] text-[#fef3c7] py-20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          {[
            [<Users key="u" />, '1.400+', 'Alunas formadas'],
            [<Heart key="h" />, '4.9', 'Avaliação média'],
            [<MessageCircle key="m" />, '2.800+', 'Mensagens de agradecimento'],
          ].map(([icon, n, l]) => (
            <div key={l as string}>
              <div className="text-[#ff9a56] flex justify-center mb-3">{icon}</div>
              <div className="text-4xl font-black">{n}</div>
              <div className="text-xs uppercase tracking-widest text-[#fef3c7]/60 mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Preço final */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-black mb-4">Investimento</h2>
        <p className="text-[#431407]/60 mb-10">A próxima turma começa em 1º de novembro.</p>
        <div className="p-10 bg-white rounded-[2.5rem] shadow-2xl">
          <p className="text-[#431407]/50 line-through">De R$ 1.497</p>
          <div className="text-6xl font-black text-[#dc2626] my-3">R$ 597</div>
          <p className="text-[#431407]/60 mb-8">ou 12x de R$ 59</p>
          <a className="block py-5 bg-[#dc2626] text-white font-black uppercase tracking-widest rounded-xl">
            Quero minha vaga
          </a>
          <p className="text-xs text-[#431407]/40 mt-4">Garantia incondicional de 7 dias</p>
        </div>
      </section>

      <footer className="py-8 text-center text-[#431407]/50 text-sm">
        © Mariana Lima · <Link href="/encomendar/curso-2" className="text-[#dc2626] font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
