'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scissors, Clock, Check, ChevronRight, Calendar, User, MapPin, Phone, Star } from 'lucide-react';

const SERVICOS = [
  { id: 'classico', name: 'Corte masculino', duration: 45, price: 50, desc: 'Tesoura, máquina, tudo que o cabelo pede.' },
  { id: 'combo', name: 'Corte + barba', duration: 75, price: 85, desc: 'Nosso combo mais pedido. Toalha quente inclusa.' },
  { id: 'barba', name: 'Barba desenhada', duration: 40, price: 45, desc: 'Navalha, desenho, hidratação. 100% precisão.' },
  { id: 'pigmentacao', name: 'Pigmentação de barba', duration: 60, price: 120, desc: 'Preenche falhas, resultado natural, dura semanas.' },
  { id: 'platinado', name: 'Platinado completo', duration: 150, price: 220, desc: 'Descoloração + tonalização em uma sessão.' },
  { id: 'infantil', name: 'Corte infantil', duration: 30, price: 40, desc: 'Para os pequenos, com paciência e carinho.' },
];

const BARBEIROS = [
  { id: 'rafael', name: 'Rafael', role: 'Master · 15 anos', rating: 4.9, img: 'photo-1583195764036-6dc248ac07d9' },
  { id: 'lucas', name: 'Lucas', role: 'Especialista em barba', rating: 4.9, img: 'photo-1522075469751-3a6694fb2f61' },
  { id: 'diego', name: 'Diego', role: 'Cor e pigmentação', rating: 4.8, img: 'photo-1618077360395-f3068be8e001' },
  { id: 'any', name: 'Qualquer um', role: 'O primeiro disponível', rating: 4.9, img: null },
];

// Mockup: horários disponíveis variam por dia da semana
function slotsForDay(_: number) {
  const base = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
  // Alguns horários "ocupados" aleatoriamente mas determinístico
  const occupied = new Set(['10:30', '15:00', '17:00']);
  return base.map((h) => ({ time: h, available: !occupied.has(h) }));
}

function nextDays(n: number) {
  const out: { date: Date; label: string; weekday: string }[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    out.push({
      date: d,
      label: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : `${d.getDate()}/${d.getMonth() + 1}`,
      weekday: weekdays[d.getDay()],
    });
  }
  return out;
}

export function BarbeariaTemplate() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'servico' | 'barbeiro' | 'horario' | 'dados' | 'confirmado'>('servico');
  const [servico, setServico] = useState<string | null>(null);
  const [barbeiro, setBarbeiro] = useState<string | null>(null);
  const [diaIdx, setDiaIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [bookNome, setBookNome] = useState('');
  const [bookTel, setBookTel] = useState('');

  const dias = nextDays(7);
  const slots = slotsForDay(dias[diaIdx]?.date.getDay() ?? 0);
  const servicoObj = SERVICOS.find((s) => s.id === servico);
  const barbeiroObj = BARBEIROS.find((b) => b.id === barbeiro);

  const openBooking = () => {
    setBookingStep('servico');
    setServico(null);
    setBarbeiro(null);
    setSlot(null);
    setBookNome('');
    setBookTel('');
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-black/80 backdrop-blur border-b border-yellow-500/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scissors size={20} className="text-yellow-500" />
            <span className="font-black tracking-widest">BARBER STUDIO</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-white/50">
            <a href="#servicos" className="hover:text-yellow-400">Serviços</a>
            <a href="#equipe" className="hover:text-yellow-400">Equipe</a>
            <a href="#contato" className="hover:text-yellow-400">Contato</a>
          </div>
          <button
            onClick={openBooking}
            className="px-5 py-2.5 bg-yellow-500 text-black text-[11px] font-black uppercase tracking-widest hover:bg-yellow-400"
          >
            Agendar
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1800&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
          <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-6 font-black">Desde 2010 · Zona Oeste · SP</p>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            Barba. <span className="text-yellow-500">Corte.</span><br />Atitude.
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed">
            Barbearia tradicional com estilo contemporâneo. Agende em menos de 1 minuto,
            escolha o barbeiro, pague no local. Simples assim.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <button
              onClick={openBooking}
              className="px-10 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs hover:bg-yellow-400 flex items-center gap-2"
            >
              <Calendar size={16} /> Agendar horário
            </button>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex">
                {[1,2,3,4,5].map((i) => <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />)}
              </div>
              <span className="text-white/60">4.9 · 2.3k avaliações</span>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4 font-black">O que fazemos</p>
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-16">
          Nossos<br />serviços
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SERVICOS.map((s) => (
            <div
              key={s.id}
              className="group p-6 border border-white/5 hover:border-yellow-500/40 transition cursor-pointer"
              onClick={() => { setServico(s.id); openBooking(); setBookingStep('barbeiro'); }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-black uppercase tracking-wide text-lg mb-1">{s.name}</h3>
                  <p className="text-white/50 text-xs mb-2">{s.desc}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest flex items-center gap-1">
                    <Clock size={11} /> {s.duration}min
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-yellow-500">R$ {s.price}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition text-[9px] uppercase tracking-widest text-yellow-500 mt-2">
                    Agendar →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="bg-white/[0.02] py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4 font-black">Os caras</p>
          <h2 className="text-5xl font-black uppercase tracking-tight mb-16">A equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {BARBEIROS.slice(0, 3).map((b) => (
              <div key={b.id} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-yellow-500/20">
                  <img src={`https://images.unsplash.com/${b.img}?w=600&auto=format&fit=crop`} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black uppercase tracking-wide text-xl">{b.name}</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{b.role}</p>
                <div className="flex items-center justify-center gap-1 mt-3 text-xs">
                  <Star size={12} className="fill-yellow-500 text-yellow-500" />
                  <span className="text-white/60">{b.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-yellow-500 text-xs uppercase tracking-[0.4em] mb-4 font-black">Nosso trabalho</p>
        <h2 className="text-5xl font-black uppercase tracking-tight mb-12">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['photo-1503951914875-452162b0f3f1','photo-1521590832167-7bcbfaa6381f','photo-1599351431202-1e0f0137899a','photo-1585747860715-2ba37e788b70','photo-1596728325488-58c87691e9af','photo-1562004760-aceed7bb0fe3'].map((p) => (
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
      <section id="contato" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">
              Agende <span className="text-yellow-500">agora.</span>
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Reserve seu horário em segundos. Chegou, cortou, pagou. Sem fila, sem espera.
            </p>
            <button
              onClick={openBooking}
              className="px-10 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs hover:bg-yellow-400 inline-flex items-center gap-2"
            >
              <Calendar size={16} /> Agendar meu horário
            </button>
          </div>
          <div className="space-y-6">
            <InfoLine icon={<MapPin size={18} />} title="Endereço">
              Rua dos Barbeiros, 42 · Centro · SP
            </InfoLine>
            <InfoLine icon={<Clock size={18} />} title="Horário">
              Terça a sábado · 9h — 20h · Domingo e segunda fechados
            </InfoLine>
            <InfoLine icon={<Phone size={18} />} title="Contato">
              (11) 99999-0000 · WhatsApp
            </InfoLine>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-xs uppercase tracking-widest">
        © Barber Studio · <Link href="/encomendar/barbearia" className="text-yellow-500 hover:underline">Quero este site</Link>
      </footer>

      {/* Modal de agendamento multi-step */}
      {bookingOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur flex items-start md:items-center justify-center p-4 overflow-y-auto"
          onClick={() => setBookingOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-950 border border-yellow-500/30 rounded-3xl max-w-lg w-full p-8 relative my-8"
          >
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl leading-none"
            >
              ×
            </button>

            {/* Steps progress */}
            {bookingStep !== 'confirmado' && (
              <div className="flex items-center gap-2 mb-8 text-[9px] font-black uppercase tracking-widest">
                {[
                  { k: 'servico', l: 'Serviço' },
                  { k: 'barbeiro', l: 'Barbeiro' },
                  { k: 'horario', l: 'Horário' },
                  { k: 'dados', l: 'Dados' },
                ].map((s, i) => {
                  const steps = ['servico', 'barbeiro', 'horario', 'dados'];
                  const curr = steps.indexOf(bookingStep);
                  const active = i === curr;
                  const done = i < curr;
                  return (
                    <div key={s.k} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        done ? 'bg-yellow-500 text-black' : active ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white/40'
                      }`}>
                        {done ? <Check size={12} /> : i + 1}
                      </div>
                      {i < 3 && <div className={`flex-1 h-px ${done ? 'bg-yellow-500' : 'bg-white/10'}`} />}
                    </div>
                  );
                })}
              </div>
            )}

            {bookingStep === 'servico' && (
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Escolha o serviço</h3>
                <p className="text-white/50 text-xs mb-6 uppercase tracking-widest">Passo 1 de 4</p>
                <div className="space-y-2">
                  {SERVICOS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setServico(s.id); setBookingStep('barbeiro'); }}
                      className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${
                        servico === s.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                      }`}
                    >
                      <div>
                        <div className="font-black uppercase text-sm">{s.name}</div>
                        <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{s.duration}min</div>
                      </div>
                      <span className="text-yellow-500 font-black">R$ {s.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 'barbeiro' && (
              <div>
                <div className="text-xs text-white/50 uppercase tracking-widest mb-2">{servicoObj?.name} · R$ {servicoObj?.price}</div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Com qual barbeiro?</h3>
                <div className="space-y-2">
                  {BARBEIROS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => { setBarbeiro(b.id); setBookingStep('horario'); }}
                      className={`w-full p-4 rounded-xl border transition flex items-center gap-4 ${
                        barbeiro === b.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                      }`}
                    >
                      {b.img ? (
                        <img src={`https://images.unsplash.com/${b.img}?w=200&auto=format&fit=crop`} alt={b.name} className="w-14 h-14 rounded-full object-cover" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <User size={20} className="text-yellow-500" />
                        </div>
                      )}
                      <div className="flex-1 text-left">
                        <div className="font-black uppercase text-sm">{b.name}</div>
                        <div className="text-white/40 text-[10px] uppercase tracking-widest">{b.role}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Star size={12} className="fill-yellow-500 text-yellow-500" />
                        {b.rating}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 'horario' && (
              <div>
                <div className="text-xs text-white/50 uppercase tracking-widest mb-2">{servicoObj?.name} · {barbeiroObj?.name}</div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Escolha o horário</h3>

                {/* Carrossel de dias */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {dias.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => { setDiaIdx(i); setSlot(null); }}
                      className={`shrink-0 px-4 py-3 rounded-xl text-center border transition ${
                        diaIdx === i ? 'bg-yellow-500 text-black border-yellow-500' : 'border-white/10 bg-white/[0.02] text-white/80 hover:border-white/30'
                      }`}
                    >
                      <div className="text-[9px] uppercase tracking-widest">{d.weekday}</div>
                      <div className="font-black text-sm mt-1">{d.label}</div>
                    </button>
                  ))}
                </div>

                {/* Grid de horários */}
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((sl) => (
                    <button
                      key={sl.time}
                      disabled={!sl.available}
                      onClick={() => setSlot(sl.time)}
                      className={`py-3 rounded-xl text-sm font-bold transition ${
                        !sl.available
                          ? 'bg-white/[0.02] text-white/20 line-through cursor-not-allowed'
                          : slot === sl.time
                          ? 'bg-yellow-500 text-black'
                          : 'bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {sl.time}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setBookingStep('dados')}
                  disabled={!slot}
                  className="w-full mt-6 py-4 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-30 text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  Continuar <ChevronRight size={14} />
                </button>
              </div>
            )}

            {bookingStep === 'dados' && (
              <form
                onSubmit={(e) => { e.preventDefault(); setBookingStep('confirmado'); }}
              >
                <div className="text-xs text-white/50 uppercase tracking-widest mb-2">
                  {dias[diaIdx]?.label} às {slot} · {servicoObj?.name}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Seus dados</h3>

                <label className="block mb-4">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Nome</span>
                  <input
                    required
                    value={bookNome}
                    onChange={(e) => setBookNome(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-500"
                  />
                </label>
                <label className="block mb-6">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">WhatsApp</span>
                  <input
                    required
                    value={bookTel}
                    onChange={(e) => setBookTel(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-500"
                  />
                </label>

                <div className="p-4 bg-white/5 rounded-xl mb-6 text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-white/50">Serviço</span><b>{servicoObj?.name}</b></div>
                  <div className="flex justify-between"><span className="text-white/50">Barbeiro</span><b>{barbeiroObj?.name}</b></div>
                  <div className="flex justify-between"><span className="text-white/50">Quando</span><b>{dias[diaIdx]?.label}, {slot}</b></div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-white/10">
                    <span className="text-white/50">A pagar no local</span>
                    <b className="text-yellow-500 text-lg">R$ {servicoObj?.price}</b>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  Confirmar agendamento <Check size={14} />
                </button>
              </form>
            )}

            {bookingStep === 'confirmado' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Horário reservado!</h3>
                <p className="text-white/60 text-sm mb-6">
                  <b className="text-white">{servicoObj?.name}</b> com <b className="text-white">{barbeiroObj?.name}</b><br />
                  <b className="text-yellow-500">{dias[diaIdx]?.label}, {slot}</b>
                </p>
                <p className="text-white/40 text-xs mb-6">
                  Enviamos a confirmação pro seu WhatsApp. Em caso de atraso superior a 15min, o horário pode ser cancelado.
                </p>
                <button
                  onClick={() => setBookingOpen(false)}
                  className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs"
                >
                  Fechar
                </button>
              </div>
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
      <div className="w-10 h-10 shrink-0 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-yellow-500 mb-1">{title}</h4>
        <p className="text-white/70 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
