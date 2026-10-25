'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Phone, Mail, Check, Stethoscope, Award, GraduationCap, Users, Star, Heart } from 'lucide-react';

const AREAS = [
  { icon: '🩺', nome: 'Consulta de rotina', desc: 'Check-up completo com conversa aprofundada.' },
  { icon: '📋', nome: 'Pré e pós operatório', desc: 'Acompanhamento cirúrgico com atenção.' },
  { icon: '💊', nome: 'Acompanhamento crônico', desc: 'Diabetes, hipertensão, tireoide.' },
  { icon: '🧬', nome: 'Medicina preventiva', desc: 'Rastreamentos e prevenção personalizada.' },
];

const FORMACAO = [
  { ano: '2008', titulo: 'Graduação em Medicina', inst: 'USP · Faculdade de Medicina' },
  { ano: '2011', titulo: 'Residência em Clínica Médica', inst: 'Hospital das Clínicas · USP' },
  { ano: '2013', titulo: 'Especialização em Endocrinologia', inst: 'Hospital Albert Einstein' },
  { ano: '2018', titulo: 'Fellowship em Medicina Preventiva', inst: 'Johns Hopkins Hospital · EUA' },
  { ano: '2023', titulo: 'Mestrado em Longevidade', inst: 'UNIFESP' },
];

const DEPOIMENTOS = [
  { nome: 'Marina S.', texto: 'Primeira médica que me escutou de verdade. Mudou meu diagnóstico e minha vida.', idade: '42 anos · Paciente há 3 anos' },
  { nome: 'Carlos R.', texto: 'Atendimento humanizado, consultas longas, nunca me senti apressado. Recomendo demais.', idade: '58 anos · Paciente há 5 anos' },
  { nome: 'Juliana M.', texto: 'A Dra. Luiza transformou meu entendimento sobre saúde preventiva. Vale cada centavo.', idade: '36 anos · Paciente há 2 anos' },
];

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
      disabled: d.getDay() === 0 || d.getDay() === 6,
    });
  }
  return out;
}

export function MedicoTemplate() {
  const [bookOpen, setBookOpen] = useState(false);
  const [step, setStep] = useState<'tipo' | 'horario' | 'dados' | 'done'>('tipo');
  const [tipo, setTipo] = useState<string | null>(null);
  const [modalidade, setModalidade] = useState<'presencial' | 'online'>('presencial');
  const [diaIdx, setDiaIdx] = useState(1);
  const [hora, setHora] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [queixa, setQueixa] = useState('');

  const dias = nextDays(14);
  const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const ocupados = new Set(['10:00', '15:00']);

  const open = () => {
    setStep('tipo'); setTipo(null); setHora(null); setNome(''); setTel(''); setEmail(''); setQueixa('');
    setBookOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f3] text-[#1a2a3a]" style={{ fontFamily: 'Georgia, serif' }}>
      <nav className="sticky top-10 z-40 bg-[#f8f6f3]/95 backdrop-blur border-b border-[#1a2a3a]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a2a3a] text-[#f8f6f3] flex items-center justify-center">
              <Stethoscope size={18} />
            </div>
            <div>
              <div className="font-black text-base leading-none">Dra. Luiza Montenegro</div>
              <div className="text-[10px] text-[#1a2a3a]/60 mt-0.5 uppercase tracking-widest" style={{ fontFamily: 'sans-serif' }}>
                Endocrinologia · Medicina Preventiva · CRM-SP 123.456
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#1a2a3a]/60" style={{ fontFamily: 'sans-serif' }}>
            <a href="#sobre" className="hover:text-[#c69749]">Sobre</a>
            <a href="#areas" className="hover:text-[#c69749]">Atendimento</a>
            <a href="#formacao" className="hover:text-[#c69749]">Formação</a>
            <a href="#visite" className="hover:text-[#c69749]">Contato</a>
          </div>
          <button onClick={open} className="px-5 py-2.5 bg-[#1a2a3a] text-[#f8f6f3] text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-[#2a3a4a]" style={{ fontFamily: 'sans-serif' }}>
            Agendar consulta
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-px bg-[#c69749]" />
              <span className="text-[#c69749] text-xs uppercase tracking-[0.4em] font-bold" style={{ fontFamily: 'sans-serif' }}>
                CRM-SP 123.456 · RQE 54321
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-8">
              Medicina com <span className="italic text-[#c69749]">tempo</span> para ouvir você.
            </h1>
            <p className="text-[#1a2a3a]/70 text-lg mb-10 max-w-md leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
              Consultas de 60 minutos, abordagem integrativa de endocrinologia e medicina preventiva.
              Atendimento particular e por convênios selecionados.
            </p>
            <div className="flex gap-4 flex-wrap" style={{ fontFamily: 'sans-serif' }}>
              <button onClick={open} className="px-8 py-5 bg-[#1a2a3a] text-[#f8f6f3] font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#2a3a4a] flex items-center gap-2">
                <Calendar size={14} /> Agendar consulta
              </button>
              <div className="flex items-center gap-3 text-sm text-[#1a2a3a]/70">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={14} className="fill-[#c69749] text-[#c69749]" />)}
                </div>
                4.9 · 320 avaliações no Doctoralia
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl border-8 border-white">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop" alt="Dra. Luiza" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#c69749] text-white p-5 rounded-full shadow-xl -rotate-6" style={{ fontFamily: 'sans-serif' }}>
              <div className="text-[10px] uppercase tracking-widest opacity-80">+ de</div>
              <div className="text-3xl font-black">2.800</div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">pacientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Faixa valores */}
      <section className="bg-[#1a2a3a] text-[#f8f6f3] py-10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center" style={{ fontFamily: 'sans-serif' }}>
          {[['16+', 'anos de prática'], ['60min', 'duração média'], ['2.800+', 'pacientes'], ['5★', 'avaliação']].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-black text-[#c69749]">{n}</div>
              <div className="text-xs uppercase tracking-widest text-[#f8f6f3]/60 mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-[1fr_1.5fr] gap-16">
        <div>
          <div className="aspect-[3/4] rounded-tl-[60px] rounded-br-[60px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
          </div>
        </div>
        <div>
          <p className="text-[#c69749] text-sm uppercase tracking-[0.3em] mb-6 font-bold" style={{ fontFamily: 'sans-serif' }}>Sobre a Dra. Luiza</p>
          <h2 className="text-5xl font-black italic mb-8 leading-tight">
            Formada pela USP. Especializada em escutar.
          </h2>
          <div className="space-y-5 text-[#1a2a3a]/75 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
            <p>
              Entrei pra medicina porque acreditava que escutar é a parte mais importante do diagnóstico.
              Depois de 16 anos de prática, confirmei: 70% dos problemas que vejo seriam resolvidos com
              consultas mais longas e menos pressa.
            </p>
            <p>
              Por isso meu consultório funciona com consultas de 60 minutos, no máximo 6 pacientes por dia.
              Prefiro atender poucas pessoas e muito bem, do que correr com uma agenda cheia.
            </p>
            <p className="italic text-xl text-[#1a2a3a] pt-4" style={{ fontFamily: 'Georgia, serif' }}>
              &ldquo;A medicina moderna esqueceu que a conversa já é parte do tratamento.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Áreas de atendimento */}
      <section id="areas" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#c69749] text-sm uppercase tracking-[0.3em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Como posso te ajudar</p>
          <h2 className="text-5xl font-black italic mb-12">Áreas de atendimento</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map((a) => (
              <button key={a.nome} onClick={open}
                className="group text-left p-8 bg-[#f8f6f3] rounded-2xl border-2 border-transparent hover:border-[#c69749] transition">
                <div className="text-4xl mb-5">{a.icon}</div>
                <h3 className="text-lg font-black mb-2">{a.nome}</h3>
                <p className="text-[#1a2a3a]/60 text-sm leading-relaxed" style={{ fontFamily: 'sans-serif' }}>{a.desc}</p>
                <div className="mt-5 text-xs font-black text-[#c69749] uppercase tracking-widest group-hover:translate-x-1 transition" style={{ fontFamily: 'sans-serif' }}>
                  Agendar →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Formação */}
      <section id="formacao" className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[#c69749] text-sm uppercase tracking-[0.3em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Credenciais</p>
        <h2 className="text-5xl font-black italic mb-12">Formação & experiência</h2>
        <div className="relative pl-10">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-[#c69749]/40" />
          {FORMACAO.map((f) => (
            <div key={f.ano} className="relative pb-10 last:pb-0">
              <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-[#c69749] border-4 border-[#f8f6f3] flex items-center justify-center">
                <GraduationCap size={10} className="text-white" />
              </div>
              <div className="text-[#c69749] text-xs font-black uppercase tracking-widest mb-2" style={{ fontFamily: 'sans-serif' }}>{f.ano}</div>
              <h3 className="text-xl font-black mb-1">{f.titulo}</h3>
              <p className="text-[#1a2a3a]/60 text-sm" style={{ fontFamily: 'sans-serif' }}>{f.inst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-[#1a2a3a] text-[#f8f6f3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#c69749] text-sm uppercase tracking-[0.3em] text-center mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Pacientes dizem</p>
          <h2 className="text-5xl font-black italic text-center mb-16">O que me motiva</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {DEPOIMENTOS.map((d) => (
              <div key={d.nome} className="p-8 bg-[#f8f6f3]/[0.05] rounded-2xl border border-[#f8f6f3]/10">
                <div className="text-[#c69749] text-2xl mb-4">❝</div>
                <p className="leading-relaxed mb-6" style={{ fontFamily: 'sans-serif' }}>{d.texto}</p>
                <div className="pt-4 border-t border-[#f8f6f3]/10">
                  <div className="font-black">{d.nome}</div>
                  <div className="text-[#f8f6f3]/50 text-xs" style={{ fontFamily: 'sans-serif' }}>{d.idade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Convênios */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-[#c69749] text-xs uppercase tracking-[0.4em] font-bold mb-4" style={{ fontFamily: 'sans-serif' }}>Aceito</p>
        <h2 className="text-3xl font-black italic mb-10">Convênios e particular</h2>
        <div className="flex items-center justify-center gap-x-10 gap-y-4 flex-wrap text-[#1a2a3a]/50 font-black text-sm" style={{ fontFamily: 'sans-serif' }}>
          {['UNIMED', 'BRADESCO SAÚDE', 'PORTO SEGURO', 'SULAMÉRICA', 'AMIL', 'OMINT'].map((c) => <span key={c}>{c}</span>)}
        </div>
      </section>

      {/* Contato */}
      <section id="visite" className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#c69749] text-sm uppercase tracking-[0.3em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Visite o consultório</p>
            <h2 className="text-5xl font-black italic mb-10">Onde me encontrar</h2>
            <div className="space-y-5" style={{ fontFamily: 'sans-serif' }}>
              <Info icon={<MapPin size={18} />} title="Consultório">
                Alameda Santos, 1800 · 12º andar, cj 122<br />
                Jardim Paulista · São Paulo
              </Info>
              <Info icon={<Clock size={18} />} title="Horários">
                Seg, Qua, Sex · 9h — 17h<br />
                Ter e Qui · 14h — 20h
              </Info>
              <Info icon={<Phone size={18} />} title="Secretária">
                (11) 3085-0000 · Seg-Sex 8h30 — 18h
              </Info>
              <Info icon={<Mail size={18} />} title="E-mail">
                contato@draluizamontenegro.com.br
              </Info>
            </div>
          </div>
          <div>
            <div className="aspect-square rounded-tl-[80px] rounded-br-[80px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a2a3a] text-[#f8f6f3]/60 py-8 text-center text-xs" style={{ fontFamily: 'sans-serif' }}>
        © Dra. Luiza Montenegro · CRM-SP 123.456 ·{' '}
        <Link href="/encomendar/medico" className="text-[#c69749] hover:underline">Quero este site</Link>
      </footer>

      {/* Modal agendamento */}
      {bookOpen && (
        <div className="fixed inset-0 z-[200] bg-[#1a2a3a]/80 backdrop-blur flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={() => setBookOpen(false)} style={{ fontFamily: 'sans-serif' }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white max-w-lg w-full p-8 my-8 relative rounded-3xl">
            <button onClick={() => setBookOpen(false)} className="absolute top-4 right-4 text-[#1a2a3a]/40 hover:text-[#1a2a3a] text-2xl leading-none">×</button>

            {step === 'tipo' && (
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Georgia' }}>Qual tipo de consulta?</h3>
                <p className="text-[#1a2a3a]/60 text-xs mb-6">Passo 1 de 3</p>
                <div className="space-y-3 mb-6">
                  {['Primeira consulta (60 min)', 'Retorno (30 min)', 'Teleconsulta (30 min)', 'Resultado de exames (30 min)'].map((t) => (
                    <button key={t} onClick={() => setTipo(t)}
                      className={`w-full p-4 rounded-xl border-2 text-left ${tipo === t ? 'border-[#c69749] bg-[#c69749]/5' : 'border-[#1a2a3a]/10 hover:border-[#1a2a3a]/30'}`}>
                      <div className="font-black text-sm">{t}</div>
                    </button>
                  ))}
                </div>
                <div className="mb-6">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a2a3a]/60 mb-3">Modalidade</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setModalidade('presencial')}
                      className={`p-3 rounded-xl text-xs font-black ${modalidade === 'presencial' ? 'bg-[#1a2a3a] text-white' : 'bg-[#f8f6f3] text-[#1a2a3a]'}`}>
                      🏥 Presencial
                    </button>
                    <button onClick={() => setModalidade('online')}
                      className={`p-3 rounded-xl text-xs font-black ${modalidade === 'online' ? 'bg-[#1a2a3a] text-white' : 'bg-[#f8f6f3] text-[#1a2a3a]'}`}>
                      💻 Teleconsulta
                    </button>
                  </div>
                </div>
                <button onClick={() => setStep('horario')} disabled={!tipo}
                  className="w-full py-4 bg-[#1a2a3a] hover:bg-[#2a3a4a] disabled:opacity-30 text-white font-black uppercase tracking-widest text-xs rounded-xl">
                  Continuar →
                </button>
              </div>
            )}

            {step === 'horario' && (
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Georgia' }}>Dia e horário</h3>
                <p className="text-[#1a2a3a]/60 text-xs mb-6">{tipo} · {modalidade}</p>
                <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                  {dias.map((d, i) => (
                    <button key={i} onClick={() => !d.disabled && setDiaIdx(i)} disabled={d.disabled}
                      className={`shrink-0 px-4 py-3 rounded-xl text-center border text-xs ${
                        d.disabled ? 'opacity-30 cursor-not-allowed' :
                        diaIdx === i ? 'bg-[#c69749] text-white border-[#c69749]' : 'border-[#1a2a3a]/10 hover:border-[#1a2a3a]/30'
                      }`}>
                      <div className="uppercase tracking-widest">{d.weekday}</div>
                      <div className="font-black text-sm mt-1">{d.label}</div>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {horarios.map((h) => {
                    const ocup = ocupados.has(h);
                    return (
                      <button key={h} onClick={() => !ocup && setHora(h)} disabled={ocup}
                        className={`py-3 rounded-lg text-sm font-bold ${
                          ocup ? 'bg-[#f8f6f3] text-[#1a2a3a]/30 line-through cursor-not-allowed' :
                          hora === h ? 'bg-[#1a2a3a] text-white' :
                          'bg-[#f8f6f3] text-[#1a2a3a] hover:bg-[#1a2a3a]/10'
                        }`}>
                        {h}
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => setStep('dados')} disabled={!hora}
                  className="w-full mt-6 py-4 bg-[#1a2a3a] hover:bg-[#2a3a4a] disabled:opacity-30 text-white font-black uppercase tracking-widest text-xs rounded-xl">
                  Continuar →
                </button>
              </div>
            )}

            {step === 'dados' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('done'); }}>
                <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Georgia' }}>Seus dados</h3>
                <p className="text-[#1a2a3a]/60 text-xs mb-6">{dias[diaIdx]?.label} às {hora}</p>
                <F label="Nome completo" value={nome} onChange={setNome} />
                <F label="WhatsApp" value={tel} onChange={setTel} placeholder="(11) 99999-9999" />
                <F label="E-mail" value={email} onChange={setEmail} type="email" />
                <label className="block mb-6">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#1a2a3a]/60 mb-2">Queixa principal (opcional)</span>
                  <textarea value={queixa} onChange={(e) => setQueixa(e.target.value)} rows={3}
                    placeholder="Em poucas palavras, o que te traz à consulta?"
                    className="w-full px-4 py-3 border border-[#1a2a3a]/10 rounded-xl text-sm outline-none focus:border-[#c69749]" />
                </label>
                <button type="submit" className="w-full py-4 bg-[#1a2a3a] hover:bg-[#2a3a4a] text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2">
                  Confirmar agendamento <Check size={14} />
                </button>
              </form>
            )}

            {step === 'done' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Heart size={28} className="text-emerald-600 fill-emerald-600" />
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'Georgia' }}>Consulta agendada!</h3>
                <p className="text-[#1a2a3a]/60 text-sm mb-6">
                  <b>{tipo}</b> ({modalidade})<br />
                  <b className="text-[#c69749]">{dias[diaIdx]?.label} às {hora}</b>
                </p>
                <p className="text-[#1a2a3a]/50 text-xs mb-6">
                  A secretária confirmará seu agendamento em até 2h úteis pelo WhatsApp.
                </p>
                <button onClick={() => setBookOpen(false)} className="w-full py-4 bg-[#1a2a3a] text-white font-black uppercase tracking-widest text-xs rounded-xl">
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
      <div className="w-10 h-10 shrink-0 rounded-full bg-[#c69749] text-white flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-[#c69749] mb-1">{title}</h4>
        <p className="text-[#1a2a3a] text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function F({ label, value, onChange, type, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] font-black uppercase tracking-widest text-[#1a2a3a]/60 mb-2">{label}</span>
      <input required type={type ?? 'text'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 border border-[#1a2a3a]/10 rounded-xl text-sm outline-none focus:border-[#c69749]" />
    </label>
  );
}
