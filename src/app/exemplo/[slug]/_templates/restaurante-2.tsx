import Link from 'next/link';

const PRATOS = [
  { name: 'Feijoada completa', desc: 'Com couve, farofa, torresmo e laranja', price: 'R$ 45', img: 'photo-1613844237701-8f3664fc2eff' },
  { name: 'Picanha na brasa', desc: '400g, acompanha arroz, feijão tropeiro e vinagrete', price: 'R$ 78', img: 'photo-1544025162-d76694265947' },
  { name: 'Moqueca de peixe', desc: 'Tradição baiana, dende e leite de coco', price: 'R$ 62', img: 'photo-1527477396000-e27163b481c2' },
  { name: 'Galinha caipira', desc: 'Cozida no fogão à lenha com angu e quiabo', price: 'R$ 52', img: 'photo-1598515213692-5f252f75d785' },
];

export function Restaurante2Template() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#2a1810]">
      <nav className="sticky top-10 z-40 bg-[#f5f0e8]/95 backdrop-blur border-b-2 border-[#2a1810]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl">🍲</span>
            <span className="font-black text-xl tracking-tight">Comida Sincera</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#2a1810]/60">
            <a href="#pratos" className="hover:text-[#8b2500]">Pratos do dia</a>
            <a href="#historia" className="hover:text-[#8b2500]">Nossa história</a>
            <a href="#visite" className="hover:text-[#8b2500]">Visite-nos</a>
          </div>
          <a href="https://wa.me/" className="px-5 py-2.5 rounded-full bg-[#8b2500] text-white text-xs font-bold uppercase tracking-widest">
            Pedir
          </a>
        </div>
      </nav>

      {/* Hero rústico */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#8b2500] text-xs uppercase tracking-[0.3em] font-bold mb-6">Fogão a lenha · Desde 1982</p>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              Comida da <span className="italic text-[#8b2500]">roça</span> no coração da cidade.
            </h1>
            <p className="text-[#2a1810]/70 text-lg mb-8 max-w-md">
              Receitas de três gerações, ingredientes direto do produtor, panelas de ferro e o tempo que a comida boa pede.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#pratos" className="px-7 py-4 bg-[#2a1810] text-[#f5f0e8] rounded-full text-xs font-bold uppercase tracking-widest">
                Ver cardápio
              </a>
              <a href="#visite" className="px-7 py-4 border-2 border-[#2a1810] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2a1810] hover:text-[#f5f0e8]">
                Como chegar
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&auto=format&fit=crop"
                alt="Comida brasileira"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#8b2500] text-white p-4 rounded-2xl shadow-xl rotate-[-3deg]">
              <div className="text-xs uppercase tracking-widest">Prato do dia</div>
              <div className="text-xl font-black">Feijoada!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pratos */}
      <section id="pratos" className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-[#8b2500] text-xs uppercase tracking-[0.3em] font-bold mb-3 text-center">O cardápio da semana</p>
        <h2 className="text-5xl font-black text-center mb-16">Pratos da casa</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PRATOS.map((p) => (
            <article key={p.name} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={`https://images.unsplash.com/${p.img}?w=800&auto=format&fit=crop`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-black">{p.name}</h3>
                  <span className="text-[#8b2500] font-black">{p.price}</span>
                </div>
                <p className="text-[#2a1810]/60 text-sm">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* História */}
      <section id="historia" className="bg-[#2a1810] text-[#f5f0e8] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#ff9a56] text-xs uppercase tracking-[0.3em] mb-4">Nossa história</p>
          <h2 className="text-5xl font-black italic mb-8">Três gerações cozinhando com amor.</h2>
          <p className="text-[#f5f0e8]/70 text-lg leading-relaxed">
            Começou com a vovó Teresa em 1982, numa cozinha pequena nos fundos da casa. Hoje, com netos e bisnetos cuidando do negócio,
            mantemos cada receita como ela ensinou — no fogão a lenha, com o tempo que a comida pede.
          </p>
        </div>
      </section>

      {/* Visite */}
      <section id="visite" className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-[#8b2500] text-xs uppercase tracking-[0.3em] mb-4 font-bold">Visite-nos</p>
          <h2 className="text-4xl font-black mb-6">Rua Vovó Teresa, 42</h2>
          <p className="text-[#2a1810]/70 mb-6">Bairro histórico · Em frente à igreja matriz</p>
          <ul className="space-y-2 text-sm text-[#2a1810]/80">
            <li>Terça a sexta · 11h30 — 15h / 18h — 23h</li>
            <li>Sábado e domingo · 11h30 — 00h</li>
            <li>Segunda · fechados</li>
          </ul>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop" alt="Fachada" className="w-full h-full object-cover" />
        </div>
      </section>

      <footer className="border-t-2 border-[#2a1810]/10 py-8 text-center text-[#2a1810]/50 text-sm">
        © Comida Sincera · <Link href="/encomendar/restaurante-2" className="text-[#8b2500] font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
