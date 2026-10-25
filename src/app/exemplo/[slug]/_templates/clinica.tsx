'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Calendar, Clock, MapPin, Phone, Stethoscope, Heart, Shield, Users, ChevronRight, Star } from 'lucide-react';

const ESPECIALIDADES = [
  { id: 'clinica-geral', nome: 'Clínica Geral', icon: '🩺', desc: 'Consultas preventivas e tratamentos gerais.', duracao: 30 },
  { id: 'cardiologia', nome: 'Cardiologia', icon: '❤️', desc: 'Avaliação cardíaca, eletro, mapa.', duracao: 45 },
  { id: 'dermatologia', nome: 'Dermatologia', icon: '✨', desc: 'Pele, cabelo e tratamentos estéticos.', duracao: 30 },
  { id: 'nutricao', nome: 'Nutrição', icon: '🥗', desc: 'Reeducação alimentar e planos personalizados.', duracao: 60 },
  { id: 'psicologia', nome: 'Psicologia', icon: '🧠', desc: 'Terapia individual, casal e grupo.', duracao: 50 },
  { id: 'pediatria', nome: 'Pediatria', icon: '👶', desc: 'Acompanhamento do nascimento à adolescência.', duracao: 40 },
];

const MEDICOS = [
  { id: 'dra-helena', nome: 'Dra. Helena Costa', especialidade: 'clinica-geral', crm: '12345-SP', foto: 'photo-1559839734-2b71ea197ec2', rating: 4.9, anos: 18 },
  { id: 'dr-ricardo', nome: 'Dr. Ricardo Alves', especialidade: 'cardiologia', crm: '23456-SP', foto: 'photo-1612349317150-e413f6a5b16d', rating: 4.9, anos: 22 },
  { id: 'dra-paula', nome: 'Dra. Paula Monteiro', especialidade: 'dermatologia', crm: '34567-SP', foto: 'photo-1594824476967-48c8b964273f', rating: 4.8, anos: 12 },
  { id: 'dra-marina', nome: 'Dra. Marina Reis', especialidade: 'nutricao', crm: '45678-SP', foto: 'photo-1573496359142-b8d87734a5a2', rating: 5.0, anos: 10 },
  { id: 'dr-eduardo', nome: 'Dr. Eduardo Lima', especialidade: 'psicologia', crm: '56789-SP', foto: 'photo-1537368910025-700350fe46c7', rating: 4.9, anos: 15 },
  { id: 'dra-camila', nome: 'Dra. Camila Souza', especialidade: 'pediatria', crm: '67890-SP', foto: 'photo-1631217868264-e5b90bb7e133', rating: 5.0, anos: 20 },
];

const CONVENIOS = ['Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'Hapvida', 'NotreDame', 'Porto Seguro', 'Prevent Senior'];

function nextDays(n: number) {
  const out: { date: Date; label: string; weekday: string; disabled: boolean }[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    out.push({
      date: d,
      label: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : `${d.getDate()}/${d.getMonth() + 1}`,
      weekday: weekdays[d.getDay()],
      disabled: d.getDay() === 0,
    });
  }
  return out;
}

export function ClinicaTemplate() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'esp' | 'med' | 'horario' | 'dados' | 'done'>('esp');
  const [esp, setEsp] = useState<string | null>(null);
  const [med, setMed] = useState<string | null>(null);
  const [diaIdx, setDiaIdx] = useState(1);
  const [hora, setHora] = useState<string | null>(null);
  const [tipoConsulta, setTipoConsulta] = useState<'presencial' | 'online'>('presencial');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [convenio, setConvenio] = useState('Particular');

  const dias = nextDays(14);
  const horarios = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
  const ocupados = new Set(['09:00','15:00']);

  const espObj = ESPECIALIDADES.find((e) => e.id === esp);
  const medObj = MEDICOS.find((m) => m.id === med);
  const medicosFiltrados = esp ? MEDICOS.filter((m) => m.especialidade === esp) : [];

  const openAgendar = () => {
    setStep('esp'); setEsp(null); setMed(null); setHora(null); setNome(''); setTel('');
    setOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="sticky top-10 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            Vida<span className="text-teal-600">+</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-slate-600">
            <a href="#especialidades" className="hover:text-slate-900">Especialidades</a>
            <a href="#medicos" className="hover:text-slate-900">Médicos</a>
            <a href="#convenios" className="hover:text-slate-900">Convênios</a>
            <a href="#contato" className="hover:text-slate-900">Contato</a>
          </div>
          <button onClick={openAgendar} className="px-5 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 flex items-center gap-2">
            <Calendar size={14} /> Agendar
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 text-xs font-bold rounded-full mb-6">
              <Shield size={12} /> Credenciado em 8 convênios
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-slate-900">
              Cuidado médico<br />
              <span className="text-teal-600">feito com atenção.</span>
            </h1>
            <p className="text-slate-600 text-lg mb-10 max-w-md">
              Clínica multiespecialidade em São Paulo. 6 especialidades, atendimento humanizado,
              estrutura moderna e horários sem fila.
            </p>
            <div className="flex gap-4 flex-wrap items-center">
              <button onClick={openAgendar} className="px-10 py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center gap-2">
                <Calendar size={16} /> Agendar consulta
              </button>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex">{[1,2,3,4,5].map((i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>
                <span className="text-slate-600">4.9 · 1.5k avaliações</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop" alt="Clínica" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-5 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center">
                  <Heart size={18} className="text-teal-600 fill-teal-600" />
                </div>
                <div>
                  <div className="font-black text-slate-900">25.000+</div>
                  <div className="text-xs text-slate-500">pacientes atendidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['6', 'Especialidades'], ['8', 'Convênios'], ['15', 'Médicos'], ['Seg-Sáb', 'Horário']].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-black text-teal-600">{n}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Especialidades */}
      <section id="especialidades" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-teal-600 text-sm uppercase tracking-widest font-bold mb-4">O que atendemos</p>
        <h2 className="text-5xl font-black tracking-tight mb-12">Especialidades</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ESPECIALIDADES.map((e) => (
            <button
              key={e.id}
              onClick={() => { setEsp(e.id); openAgendar(); setStep('med'); }}
              className="group text-left p-8 bg-white rounded-3xl border border-slate-200 hover:border-teal-400 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-5">{e.icon}</div>
              <h3 className="text-xl font-black mb-2">{e.nome}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{e.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock size={11} /> {e.duracao}min
                </span>
                <span className="text-teal-600 font-bold group-hover:translate-x-1 transition">
                  Agendar →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Médicos */}
      <section id="medicos" className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-teal-600 text-sm uppercase tracking-widest font-bold mb-4">Nossa equipe</p>
          <h2 className="text-5xl font-black tracking-tight mb-12">Médicos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDICOS.map((m) => (
              <article key={m.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={`https://images.unsplash.com/${m.foto}?w=600&auto=format&fit=crop`} alt={m.nome} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-lg">{m.nome}</h3>
                  <p className="text-teal-600 text-sm font-bold mt-1">
                    {ESPECIALIDADES.find((e) => e.id === m.especialidade)?.nome}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                      <div>CRM {m.crm}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        {m.rating} · {m.anos} anos
                      </div>
                    </div>
                    <button
                      onClick={() => { setEsp(m.especialidade); setMed(m.id); openAgendar(); setStep('horario'); }}
                      className="text-xs font-bold text-teal-600 border-b-2 border-teal-600"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Convênios */}
      <section id="convenios" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-teal-600 text-sm uppercase tracking-widest font-bold mb-4">Aceitamos</p>
        <h2 className="text-5xl font-black tracking-tight mb-12">Convênios</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONVENIOS.map((c) => (
            <div key={c} className="p-6 bg-slate-50 rounded-2xl text-center">
              <span className="font-black text-slate-700">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 text-sm mt-8">
          Não encontrou seu convênio? <a className="text-teal-600 font-bold hover:underline">Fale conosco</a>, estamos sempre ampliando.
        </p>
      </section>

      {/* Diferenciais */}
      <section className="bg-teal-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            [<Users key="u" size={28} />, 'Atendimento humanizado', 'Consultas de 30 a 60min, sem pressa, com escuta real.'],
            [<Shield key="s" size={28} />, 'Estrutura moderna', 'Equipamentos atualizados e exames no local em algumas especialidades.'],
            [<Heart key="h" size={28} />, 'Prontuário integrado', 'Seu histórico fica acessível pra todos os médicos da clínica.'],
          ].map(([icon, t, d]) => (
            <div key={t as string}>
              <div className="text-cyan-200 mb-5">{icon}</div>
              <h3 className="text-2xl font-black mb-3">{t}</h3>
              <p className="text-teal-50/80 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-black tracking-tight mb-12">Onde estamos</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <Info icon={<MapPin size={18} />} title="Endereço">
              Av. Paulista, 1500 · 8º andar · Bela Vista · SP<br />
              <span className="text-slate-500 text-xs">Em frente ao Parque Trianon · Estacionamento conveniado</span>
            </Info>
            <Info icon={<Clock size={18} />} title="Horário">
              Segunda a sexta · 7h — 20h<br />
              Sábado · 8h — 14h
            </Info>
            <Info icon={<Phone size={18} />} title="Contato">
              (11) 3000-4000 · WhatsApp (11) 99000-0000
            </Info>
          </div>
          <div className="aspect-video rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&auto=format&fit=crop" alt="Fachada" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        © Vida+ · <Link href="/encomendar/clinica" className="text-teal-600 font-bold hover:underline">Quero este site</Link>
      </footer>

      {/* Modal agendamento */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl max-w-lg w-full p-8 relative my-8 shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-2xl leading-none">×</button>

            {step !== 'done' && (
              <div className="flex items-center gap-2 mb-8 text-[9px] font-bold uppercase tracking-widest">
                {['esp','med','horario','dados'].map((s, i) => {
                  const curr = ['esp','med','horario','dados'].indexOf(step);
                  const done = i < curr;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${done || i === curr ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {done ? <Check size={12} /> : i + 1}
                      </div>
                      {i < 3 && <div className={`flex-1 h-px ${done ? 'bg-teal-600' : 'bg-slate-200'}`} />}
                    </div>
                  );
                })}
              </div>
            )}

            {step === 'esp' && (
              <div>
                <h3 className="text-2xl font-black mb-2">Qual especialidade?</h3>
                <p className="text-slate-500 text-sm mb-6">Passo 1 de 4</p>
                <div className="grid grid-cols-2 gap-2">
                  {ESPECIALIDADES.map((e) => (
                    <button key={e.id} onClick={() => { setEsp(e.id); setStep('med'); }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 text-left">
                      <div className="text-2xl mb-2">{e.icon}</div>
                      <div className="font-black text-sm">{e.nome}</div>
                      <div className="text-xs text-slate-500 mt-1">{e.duracao}min</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'med' && (
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">{espObj?.nome}</div>
                <h3 className="text-2xl font-black mb-6">Com qual médico?</h3>
                {medicosFiltrados.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {medicosFiltrados.map((m) => (
                      <button key={m.id} onClick={() => { setMed(m.id); setStep('horario'); }}
                        className="w-full p-4 rounded-xl border border-slate-200 hover:border-teal-400 flex items-center gap-4 text-left">
                        <img src={`https://images.unsplash.com/${m.foto}?w=200&auto=format&fit=crop`} alt={m.nome} className="w-14 h-14 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="font-black text-sm">{m.nome}</div>
                          <div className="text-xs text-slate-500">CRM {m.crm} · {m.anos} anos</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Star size={12} className="fill-amber-400 text-amber-400" />{m.rating}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={() => { setMed(null); setStep('horario'); }}
                  className="w-full p-4 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:border-teal-400 hover:text-teal-700 text-sm font-bold">
                  Qualquer médico disponível
                </button>
              </div>
            )}

            {step === 'horario' && (
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                  {espObj?.nome}{medObj ? ` · ${medObj.nome}` : ''}
                </div>
                <h3 className="text-2xl font-black mb-6">Escolha dia e horário</h3>

                <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                  {dias.map((d, i) => (
                    <button key={i} onClick={() => !d.disabled && setDiaIdx(i)} disabled={d.disabled}
                      className={`shrink-0 px-4 py-3 rounded-xl text-center border text-xs ${
                        d.disabled ? 'opacity-30 cursor-not-allowed' :
                        diaIdx === i ? 'bg-teal-600 text-white border-teal-600' : 'border-slate-200 hover:border-slate-400'
                      }`}>
                      <div className="uppercase tracking-widest">{d.weekday}</div>
                      <div className="font-black text-sm mt-1">{d.label}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mb-5">
                  <button onClick={() => setTipoConsulta('presencial')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold ${tipoConsulta === 'presencial' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    🏥 Presencial
                  </button>
                  <button onClick={() => setTipoConsulta('online')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold ${tipoConsulta === 'online' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    💻 Online
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {horarios.map((h) => {
                    const ocup = ocupados.has(h);
                    return (
                      <button key={h} onClick={() => !ocup && setHora(h)} disabled={ocup}
                        className={`py-3 rounded-lg text-sm font-bold ${
                          ocup ? 'bg-slate-50 text-slate-300 line-through cursor-not-allowed' :
                          hora === h ? 'bg-teal-600 text-white' :
                          'bg-slate-100 text-slate-800 hover:bg-slate-200'
                        }`}>
                        {h}
                      </button>
                    );
                  })}
                </div>

                <button onClick={() => setStep('dados')} disabled={!hora}
                  className="w-full mt-6 py-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-30 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  Continuar <ChevronRight size={14} />
                </button>
              </div>
            )}

            {step === 'dados' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('done'); }}>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                  {dias[diaIdx]?.label} às {hora} · {tipoConsulta}
                </div>
                <h3 className="text-2xl font-black mb-6">Seus dados</h3>

                <Field label="Nome completo" value={nome} onChange={setNome} />
                <Field label="WhatsApp" value={tel} onChange={setTel} placeholder="(11) 99999-9999" />

                <label className="block mb-6">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Convênio</span>
                  <select value={convenio} onChange={(e) => setConvenio(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:border-teal-500 outline-none">
                    <option>Particular</option>
                    {CONVENIOS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>

                <div className="p-4 bg-slate-50 rounded-xl mb-6 text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-slate-500">Especialidade</span><b>{espObj?.nome}</b></div>
                  {medObj && <div className="flex justify-between"><span className="text-slate-500">Médico</span><b>{medObj.nome}</b></div>}
                  <div className="flex justify-between"><span className="text-slate-500">Quando</span><b>{dias[diaIdx]?.label}, {hora}</b></div>
                  <div className="flex justify-between"><span className="text-slate-500">Modalidade</span><b className="capitalize">{tipoConsulta}</b></div>
                </div>

                <button type="submit" className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  Confirmar agendamento <Check size={14} />
                </button>
              </form>
            )}

            {step === 'done' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Check size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black mb-3">Consulta agendada!</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Enviamos a confirmação pelo WhatsApp. Em caso de cancelamento, avise com 24h de antecedência.
                </p>
                <div className="p-4 bg-teal-50 rounded-xl mb-6 text-left text-sm">
                  <div className="font-black text-teal-900 mb-2">Resumo</div>
                  <div>{espObj?.nome} · {medObj?.nome ?? 'Médico a definir'}</div>
                  <div className="text-teal-700 font-bold mt-1">{dias[diaIdx]?.label} às {hora}</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl">
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

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-teal-600 mb-1">{title}</h4>
        <p className="text-slate-700 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{label}</span>
      <input required value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" />
    </label>
  );
}
