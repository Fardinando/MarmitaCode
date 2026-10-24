import Link from 'next/link';

const SERVICOS = [
  { name: 'Corte masculino', price: 'R$ 50', time: '45min' },
  { name: 'Corte + barba', price: 'R$ 80', time: '1h' },
  { name: 'Barba desenhada', price: 'R$ 40', time: '30min' },
  { name: 'Pigmentação', price: 'R$ 120', time: '1h30' },
  { name: 'Platinado', price: 'R$ 220', time: '2h' },
  { name: 'Combo premium', price: 'R$ 150', time: '2h' },
];

const EQUIPE = [
  { name: 'Rafael Costa', role: 'Barbeiro master', img: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=600&auto=format&fit=crop' },
  { name: 'Lucas Dias', role: 'Especialista em barba', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop' },
  { name: 'Diego Souza', role: 'Pigmentação & coloração', img: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=600&auto=format&fit=crop' },
];

const GALERIA = [
  'photo-1503951914875-452162b0f3f1',
  'photo-1521590832167-7bcbfaa6381f',
  'photo-1599351431202-1e0f0137899a',
  'photo-1585747860715-2ba37e788b70',
  'photo-1596728325488-58c87691e9af',
  'photo-1562004760-aceed7bb0fe3',
];

export function BarbeariaTemplate() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-black/80 backdrop-blur border-b border-yellow-500/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✂</span>
            <span className="font-black tracking-widest">BARBER STUDIO</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-white/50">
            <a href="#servicos" className="hover:text-yellow-400">Serviços</a>
            <a href="#equipe" className="hover:text-yellow-400">Equipe</a>
            <a href="#contato" className="hover:text-yellow-400">Contato</a>
          </div>
          <a href="#contato" className="px-5 py-2.5 bg-yellow-500 text-black text-[11px] font-black uppercase tracking-widest">
            Agendar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-6">Desde 2010</p>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            Barba. <span className="text-yellow-500">Corte.</span><br />Atitude.
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10">
            Barbearia tradicional com estilo contemporâneo. Agende em menos de 1 minuto.
          </p>
          <a href="#contato" className="inline-block px-10 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest hover:bg-yellow-400">
            Marcar horário
          </a>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4">O que fazemos</p>
        <h2 className="text-5xl font-black uppercase tracking-tight mb-16">Serviços</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SERVICOS.map((s) => (
            <div key={s.name} className="group p-6 border border-white/5 hover:border-yellow-500/40 transition flex items-center justify-between">
              <div>
                <h3 className="font-black uppercase tracking-wide text-lg">{s.name}</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.time}</p>
              </div>
              <span className="text-2xl font-black text-yellow-500">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="bg-white/[0.02] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4">Os caras</p>
          <h2 className="text-5xl font-black uppercase tracking-tight mb-16">Equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {EQUIPE.map((e) => (
              <div key={e.name} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-yellow-500/20">
                  <img src={e.img} alt={e.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black uppercase tracking-wide text-xl">{e.name}</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{e.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4">Nosso trabalho</p>
        <h2 className="text-5xl font-black uppercase tracking-tight mb-12">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALERIA.map((p) => (
            <div key={p} className="aspect-square overflow-hidden">
              <img
                src={`https://images.unsplash.com/${p}?w=600&auto=format&fit=crop`}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-6xl font-black uppercase tracking-tight mb-6">
          Agende <span className="text-yellow-500">agora</span>
        </h2>
        <p className="text-white/60 mb-10">Rua dos Barbeiros, 42 · Centro · Tel (00) 0000-0000</p>
        <a href="https://wa.me/" className="inline-block px-10 py-5 bg-green-500 text-black font-black uppercase tracking-widest">
          WhatsApp
        </a>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-xs uppercase tracking-widest">
        © Barber Studio · <Link href="/encomendar/barbearia" className="text-yellow-500 hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
