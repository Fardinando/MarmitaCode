import Link from 'next/link';

const MENU = [
  { cat: 'Entradas', items: [
    { name: 'Bruschetta de tomate', desc: 'Tomate confitado, manjericão, azeite siciliano', price: 'R$ 24' },
    { name: 'Pastéis de queijo', desc: '6 unidades, massa fininha, muçarela derretida', price: 'R$ 28' },
  ]},
  { cat: 'Pratos principais', items: [
    { name: 'Risoto de camarão', desc: 'Arroz arbóreo, camarões, limão siciliano', price: 'R$ 58' },
    { name: 'Fettuccine ao sugo', desc: 'Massa fresca, molho de tomate caseiro, parmesão', price: 'R$ 42' },
    { name: 'Filé ao molho madeira', desc: 'Mignon selado, cogumelos frescos, batata rústica', price: 'R$ 72' },
  ]},
  { cat: 'Sobremesas', items: [
    { name: 'Tiramisù', desc: 'Receita italiana da nona', price: 'R$ 22' },
    { name: 'Petit gâteau', desc: 'Com sorvete de creme', price: 'R$ 24' },
  ]},
];

export function RestauranteTemplate() {
  return (
    <main className="min-h-screen bg-[#1a0e05] text-amber-50 font-serif">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-[#1a0e05]/90 backdrop-blur border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-black tracking-widest text-amber-300">SABOR DA CASA</div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-amber-100/70">
            <a href="#cardapio" className="hover:text-amber-300">Cardápio</a>
            <a href="#horarios" className="hover:text-amber-300">Horários</a>
            <a href="#contato" className="hover:text-amber-300">Contato</a>
          </div>
          <a href="#" className="px-5 py-2.5 rounded-full bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-widest">
            Pedir agora
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.15),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-6">Culinária italiana</p>
            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight mb-6">
              Comida de <span className="italic text-amber-300">verdade</span>, feita com tempo.
            </h1>
            <p className="text-amber-100/70 text-lg leading-relaxed mb-10 max-w-md">
              Receitas de família, ingredientes selecionados, ambiente aconchegante no coração da cidade.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#cardapio" className="px-8 py-4 bg-amber-400 text-amber-950 font-bold uppercase tracking-widest text-xs rounded-full">
                Ver cardápio
              </a>
              <a href="#" className="px-8 py-4 border border-amber-400/40 text-amber-100 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-amber-400/10">
                Reservar mesa
              </a>
            </div>
          </div>
          <div className="aspect-square rounded-3xl bg-[linear-gradient(135deg,#78350f,#431407)] shadow-2xl flex items-center justify-center text-9xl">
            🍝
          </div>
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-amber-400 text-xs uppercase tracking-[0.3em] text-center mb-4">Nosso menu</p>
        <h2 className="text-5xl font-black text-center mb-16 italic">Cardápio</h2>
        <div className="space-y-16">
          {MENU.map((cat) => (
            <div key={cat.cat}>
              <h3 className="text-2xl font-bold text-amber-300 mb-8 border-b border-amber-900/40 pb-3 uppercase tracking-widest text-sm">
                {cat.cat}
              </h3>
              <div className="space-y-6">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex gap-6 items-baseline">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-bold text-lg">{item.name}</span>
                        <span className="flex-1 border-b border-dotted border-amber-900/40" />
                        <span className="text-amber-300 font-bold">{item.price}</span>
                      </div>
                      <p className="text-amber-100/60 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Horários */}
      <section id="horarios" className="bg-black/40 py-24">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">Nos encontre</p>
            <h2 className="text-4xl font-black italic mb-6">Horários</h2>
            <ul className="space-y-3 text-amber-100/80">
              <li className="flex justify-between"><span>Segunda a quinta</span><span>18h – 23h</span></li>
              <li className="flex justify-between"><span>Sexta e sábado</span><span>18h – 00h</span></li>
              <li className="flex justify-between"><span>Domingo</span><span>12h – 22h</span></li>
            </ul>
          </div>
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">Endereço</p>
            <h2 className="text-4xl font-black italic mb-6">Onde estamos</h2>
            <p className="text-amber-100/80 leading-relaxed">
              Rua das Oliveiras, 123<br />
              Centro histórico<br />
              Tel: (00) 0000-0000
            </p>
          </div>
        </div>
      </section>

      {/* Delivery CTA */}
      <section id="contato" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl md:text-6xl font-black italic mb-6">Peça pelo WhatsApp</h2>
        <p className="text-amber-100/70 text-lg mb-10">Entrega em até 50 minutos nas regiões centrais.</p>
        <a href="https://wa.me/" className="inline-block px-10 py-5 bg-green-500 text-white font-bold uppercase tracking-widest rounded-full">
          Chamar no WhatsApp
        </a>
      </section>

      <footer className="border-t border-amber-900/40 py-10 text-center text-amber-100/40 text-xs">
        © Sabor da Casa · <Link href="/encomendar/restaurante" className="text-amber-300 hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
