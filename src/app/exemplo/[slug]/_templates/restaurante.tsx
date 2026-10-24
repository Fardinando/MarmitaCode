'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Users, Calendar, Phone, Check, ChevronRight, Star } from 'lucide-react';

type Categoria = 'entradas' | 'principais' | 'massas' | 'sobremesas' | 'vinhos';

interface Prato {
  name: string;
  desc: string;
  price: number;
  img: string;
  tags?: string[];
  highlight?: boolean;
}

const CARDAPIO: Record<Categoria, Prato[]> = {
  entradas: [
    { name: 'Burrata della casa', desc: 'Burrata cremosa, tomate confitado, azeite siciliano, pão artesanal', price: 48, img: 'photo-1572695157366-5e585ab2b69f', tags: ['Vegetariano'], highlight: true },
    { name: 'Carpaccio di manzo', desc: 'Fatias finas de filé, rúcula, parmesão e redução de balsâmico', price: 54, img: 'photo-1626200925024-1a1fe550d388' },
    { name: 'Antipasto misto', desc: 'Seleção de queijos, embutidos italianos e azeitonas marinadas', price: 68, img: 'photo-1544025162-d76694265947' },
  ],
  principais: [
    { name: 'Osso buco alla milanese', desc: 'Jarrete de vitelo braseado por 6 horas, risoto açafrão', price: 128, img: 'photo-1544025162-d76694265947', highlight: true },
    { name: 'Branzino al sale', desc: 'Robalo inteiro assado em crosta de sal, legumes grelhados', price: 112, img: 'photo-1527477396000-e27163b481c2' },
    { name: 'Bistecca alla Fiorentina', desc: 'T-bone 500g, batata rústica ao alecrim, molho chimichurri', price: 148, img: 'photo-1613844237701-8f3664fc2eff' },
  ],
  massas: [
    { name: 'Tagliatelle al tartufo', desc: 'Massa fresca, trufa negra, manteiga de ervas e parmesão de 24 meses', price: 82, img: 'photo-1621996346565-e3dbc646d9a9', highlight: true },
    { name: 'Lasagna della nonna', desc: 'Receita tradicional, ragù de carne, bechamel e muçarela de búfala', price: 68, img: 'photo-1619895092538-128f4d3f0f8b' },
    { name: 'Risotto ai frutti di mare', desc: 'Arroz arbóreo, camarões, lulas, mariscos frescos, limão siciliano', price: 92, img: 'photo-1633964913295-ceb43826a07f' },
    { name: 'Spaghetti alle vongole', desc: 'Massa fresca, vongoles, alho, vinho branco, salsinha', price: 72, img: 'photo-1551892374-ecf8754cf8b0' },
  ],
  sobremesas: [
    { name: 'Tiramisù della nonna', desc: 'Receita original italiana, mascarpone, café espresso, cacau', price: 32, img: 'photo-1571877227200-a0d98ea607e9' },
    { name: 'Panna cotta ai frutti rossi', desc: 'Pudim de baunilha com calda de frutas vermelhas', price: 28, img: 'photo-1488477181946-6428a0291777' },
    { name: 'Cannoli siciliani', desc: 'Massa crocante recheada com ricota doce e pistache', price: 26, img: 'photo-1606313564200-e75d5e30476c' },
  ],
  vinhos: [
    { name: 'Chianti Classico Riserva', desc: 'Toscana · tinto encorpado · 2019', price: 180, img: 'photo-1510812431401-41d2bd2722f3' },
    { name: 'Prosecco di Valdobbiadene', desc: 'Vêneto · espumante seco · brut', price: 150, img: 'photo-1569529465841-dfecdab7503b' },
    { name: 'Barolo DOCG', desc: 'Piemonte · tinto nobre · 2018', price: 320, img: 'photo-1553361371-9b22f78e8b1d', highlight: true },
  ],
};

const CATEGORIAS: { key: Categoria; label: string; emoji: string }[] = [
  { key: 'entradas', label: 'Entradas', emoji: '🥗' },
  { key: 'massas', label: 'Massas & Risotos', emoji: '🍝' },
  { key: 'principais', label: 'Pratos principais', emoji: '🥩' },
  { key: 'sobremesas', label: 'Sobremesas', emoji: '🍰' },
  { key: 'vinhos', label: 'Carta de vinhos', emoji: '🍷' },
];

export function RestauranteTemplate() {
  const [cat, setCat] = useState<Categoria>('entradas');
  const [reservaOpen, setReservaOpen] = useState(false);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('19:30');
  const [pessoas, setPessoas] = useState(2);
  const [nomeReserva, setNomeReserva] = useState('');
  const [telefoneReserva, setTelefoneReserva] = useState('');
  const [reservaFeita, setReservaFeita] = useState(false);

  const abertoAgora = (() => {
    const h = new Date().getHours();
    return h >= 18 && h < 23;
  })();

  const submitReserva = (e: React.FormEvent) => {
    e.preventDefault();
    setReservaFeita(true);
  };

  return (
    <main className="min-h-screen bg-[#140b05] text-amber-50">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-[#140b05]/95 backdrop-blur border-b border-amber-900/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="font-black tracking-widest text-amber-300" style={{ fontFamily: 'Georgia, serif' }}>
            SABOR DELLA CASA
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-amber-100/60">
            <a href="#cardapio" className="hover:text-amber-300">Cardápio</a>
            <a href="#historia" className="hover:text-amber-300">A casa</a>
            <a href="#visite" className="hover:text-amber-300">Visite</a>
          </div>
          <div className="flex items-center gap-2">
            <span className={`hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
              abertoAgora ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-900/30 text-amber-300/70'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${abertoAgora ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
              {abertoAgora ? 'Aberto agora' : 'Fechado'}
            </span>
            <button
              onClick={() => { setReservaOpen(true); setReservaFeita(false); }}
              className="px-5 py-2.5 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold uppercase tracking-widest"
            >
              Reservar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero cinematográfico */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#140b05]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140b05]/70 via-transparent to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-20 w-full">
          <div className="flex items-center gap-2 mb-4">
            {[1,2,3,4,5].map((i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
            <span className="text-amber-100/60 text-xs ml-2 uppercase tracking-widest">4.9 · 1.2k avaliações no Google</span>
          </div>
          <p className="text-amber-400 text-xs uppercase tracking-[0.4em] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Cucina Italiana · Desde 1998
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight mb-6 max-w-4xl" style={{ fontFamily: 'Georgia, serif' }}>
            A autêntica <span className="italic text-amber-300">dolce vita</span> no coração da cidade.
          </h1>
          <p className="text-amber-100/70 text-lg max-w-xl mb-10">
            Massa fresca feita diariamente, ingredientes importados da Itália, cozinha a lenha
            e uma carta com mais de 200 rótulos italianos.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => { setReservaOpen(true); setReservaFeita(false); }}
              className="px-10 py-5 bg-amber-400 text-amber-950 font-bold uppercase tracking-widest text-xs rounded-full flex items-center gap-2"
            >
              <Calendar size={16} /> Reservar mesa
            </button>
            <a href="#cardapio" className="px-10 py-5 border border-amber-400/40 text-amber-100 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-amber-400/10">
              Ver cardápio
            </a>
          </div>
        </div>
      </section>

      {/* Barras de valor */}
      <section className="border-y border-amber-900/40 bg-amber-950/40">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs uppercase tracking-widest text-amber-100/70">
          <div><div className="text-amber-300 font-black text-xl mb-1">26 anos</div>de tradição</div>
          <div><div className="text-amber-300 font-black text-xl mb-1">200+</div>rótulos de vinho</div>
          <div><div className="text-amber-300 font-black text-xl mb-1">Chef</div>Nicola Ferrara (IT)</div>
          <div><div className="text-amber-300 font-black text-xl mb-1">Massa</div>fresca diariamente</div>
        </div>
      </section>

      {/* Cardápio com tabs */}
      <section id="cardapio" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-amber-400 text-xs uppercase tracking-[0.4em] text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>Il nostro menu</p>
        <h2 className="text-5xl md:text-6xl font-black text-center mb-12 italic" style={{ fontFamily: 'Georgia, serif' }}>Cardápio</h2>

        {/* Tabs de categoria */}
        <div className="flex gap-2 justify-center flex-wrap mb-12">
          {CATEGORIAS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center gap-2 ${
                cat === c.key
                  ? 'bg-amber-400 text-amber-950'
                  : 'bg-white/5 text-amber-100/60 hover:bg-white/10'
              }`}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CARDAPIO[cat].map((p) => (
            <article
              key={p.name}
              className={`group relative rounded-3xl overflow-hidden transition-all ${
                p.highlight
                  ? 'bg-gradient-to-br from-amber-500/10 to-amber-900/10 border border-amber-400/30'
                  : 'bg-white/[0.02] border border-amber-900/30'
              }`}
            >
              <div className="flex gap-5 p-5">
                <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${p.img}?w=400&auto=format&fit=crop`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {p.highlight && (
                    <span className="inline-block text-[9px] font-black uppercase tracking-[0.3em] text-amber-400 mb-1">
                      ⭐ Sugestão do chef
                    </span>
                  )}
                  <h3 className="font-black text-lg leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                    {p.name}
                  </h3>
                  <p className="text-amber-100/60 text-xs leading-relaxed mb-2 line-clamp-2">{p.desc}</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-amber-300 font-black text-xl">R$ {p.price}</span>
                    {p.tags && (
                      <span className="text-[9px] uppercase tracking-widest text-amber-100/40">
                        {p.tags.join(' · ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* História com foto do chef */}
      <section id="historia" className="bg-black/40 py-24 border-y border-amber-900/40">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop"
              alt="Chef"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              O chef
            </p>
            <h2 className="text-5xl font-black mb-6 italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Nicola Ferrara, de Palermo.
            </h2>
            <p className="text-amber-100/70 leading-relaxed mb-6">
              Formado na Alma Scuola Internazionale di Cucina Italiana, Nicola trouxe pra cá receitas da família
              que atravessaram três gerações. Cada prato tem uma história — pergunte ao garçom.
            </p>
            <div className="flex gap-8 pt-6 border-t border-amber-900/40">
              <div>
                <div className="text-3xl font-black text-amber-300">26</div>
                <div className="text-amber-100/50 text-xs uppercase tracking-widest">anos de casa</div>
              </div>
              <div>
                <div className="text-3xl font-black text-amber-300">8</div>
                <div className="text-amber-100/50 text-xs uppercase tracking-widest">prêmios da crítica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visite */}
      <section id="visite" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Visite-nos</p>
            <h2 className="text-4xl font-black mb-10 italic" style={{ fontFamily: 'Georgia, serif' }}>Onde nos encontrar</h2>
            <div className="space-y-6">
              <InfoLine icon={<MapPin size={18} />} title="Endereço">
                Rua Augusta, 1247 · Jardins · São Paulo<br />
                <span className="text-amber-100/40 text-xs">A 5 min do metrô Consolação</span>
              </InfoLine>
              <InfoLine icon={<Clock size={18} />} title="Horários">
                Terça a quinta · 18h — 23h<br />
                Sexta e sábado · 18h — 00h<br />
                Domingo · 12h — 22h · Segundas fechados
              </InfoLine>
              <InfoLine icon={<Phone size={18} />} title="Reservas">
                (11) 3333-4444 · WhatsApp (11) 99999-0000
              </InfoLine>
            </div>
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop"
              alt="Fachada"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-amber-900/40 py-10 text-center text-amber-100/40 text-xs">
        © Sabor della Casa · <Link href="/encomendar/restaurante" className="text-amber-300 hover:underline">Quero este site</Link>
      </footer>

      {/* Modal de reserva */}
      {reservaOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setReservaOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1f1308] border border-amber-400/30 rounded-3xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => setReservaOpen(false)}
              className="absolute top-4 right-4 text-amber-100/50 hover:text-amber-100 text-2xl leading-none"
            >
              ×
            </button>

            {reservaFeita ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'Georgia, serif' }}>Reserva confirmada!</h3>
                <p className="text-amber-100/70 text-sm mb-6">
                  Mesa para <b className="text-amber-300">{pessoas}</b> pessoa{pessoas > 1 ? 's' : ''} em <b className="text-amber-300">{data || 'em breve'}</b> às <b className="text-amber-300">{horario}</b>.
                </p>
                <p className="text-amber-100/40 text-xs mb-6">
                  Enviamos a confirmação pro seu WhatsApp. Em caso de cancelamento, avise com 2h de antecedência.
                </p>
                <button
                  onClick={() => setReservaOpen(false)}
                  className="w-full py-4 bg-amber-400 text-amber-950 font-bold uppercase tracking-widest text-xs rounded-full"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={submitReserva}>
                <p className="text-amber-400 text-xs uppercase tracking-[0.4em] mb-2">Reservar mesa</p>
                <h3 className="text-3xl font-black mb-6 italic" style={{ fontFamily: 'Georgia, serif' }}>
                  Quando vai nos visitar?
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <ModalField label="Data">
                    <input
                      type="date"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      required
                      className="w-full bg-amber-950/40 border border-amber-900/40 rounded-xl px-3 py-3 text-sm outline-none focus:border-amber-400/50"
                    />
                  </ModalField>
                  <ModalField label="Horário">
                    <select
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                      className="w-full bg-amber-950/40 border border-amber-900/40 rounded-xl px-3 py-3 text-sm outline-none focus:border-amber-400/50"
                    >
                      {['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </ModalField>
                </div>

                <ModalField label="Pessoas">
                  <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-900/40 rounded-xl p-2">
                    <button type="button" onClick={() => setPessoas(Math.max(1, pessoas - 1))} className="w-10 h-10 rounded-lg bg-amber-900/40 text-amber-200 font-black">−</button>
                    <div className="flex-1 text-center font-black text-xl flex items-center justify-center gap-2">
                      <Users size={16} className="text-amber-400" />
                      {pessoas}
                    </div>
                    <button type="button" onClick={() => setPessoas(Math.min(12, pessoas + 1))} className="w-10 h-10 rounded-lg bg-amber-900/40 text-amber-200 font-black">+</button>
                  </div>
                </ModalField>

                <ModalField label="Seu nome">
                  <input
                    value={nomeReserva}
                    onChange={(e) => setNomeReserva(e.target.value)}
                    required
                    placeholder="Como vamos te chamar?"
                    className="w-full bg-amber-950/40 border border-amber-900/40 rounded-xl px-3 py-3 text-sm outline-none focus:border-amber-400/50"
                  />
                </ModalField>

                <ModalField label="WhatsApp">
                  <input
                    value={telefoneReserva}
                    onChange={(e) => setTelefoneReserva(e.target.value)}
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full bg-amber-950/40 border border-amber-900/40 rounded-xl px-3 py-3 text-sm outline-none focus:border-amber-400/50"
                  />
                </ModalField>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 mt-2"
                >
                  Confirmar reserva <ChevronRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function InfoLine({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-300">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-sm uppercase tracking-widest text-amber-300 mb-1">{title}</h4>
        <p className="text-amber-100/70 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function ModalField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] font-black uppercase tracking-widest text-amber-100/50 mb-2">{label}</span>
      {children}
    </label>
  );
}
