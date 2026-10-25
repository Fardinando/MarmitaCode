'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scale, Check, ArrowRight, Shield, Award, Users, Mail, Phone, MapPin, Clock, BookOpen, Briefcase, FileText, Heart, Home } from 'lucide-react';

const AREAS = [
  { id: 'trabalhista', nome: 'Direito Trabalhista', icon: Briefcase, desc: 'Rescisões, horas extras, assédio moral, acordos.', cases: 240 },
  { id: 'civil', nome: 'Direito Civil', icon: FileText, desc: 'Contratos, indenizações, posses, responsabilidade civil.', cases: 180 },
  { id: 'familia', nome: 'Direito de Família', icon: Heart, desc: 'Divórcio, guarda, pensão alimentícia, inventário.', cases: 160 },
  { id: 'empresarial', nome: 'Direito Empresarial', icon: Scale, desc: 'Constituição, contratos, recuperação, sucessão.', cases: 140 },
  { id: 'tributario', nome: 'Direito Tributário', icon: BookOpen, desc: 'Planejamento fiscal, defesas, recuperação de tributos.', cases: 110 },
  { id: 'imobiliario', nome: 'Direito Imobiliário', icon: Home, desc: 'Locação, usucapião, regularização, inventário.', cases: 95 },
];

const ADVOGADOS = [
  { nome: 'Dr. Fernando Alves', oab: 'xxxxxx', foto: 'photo-1507003211169-0a1dd7228f2d', esp: 'Trabalhista & Empresarial', anos: 22 },
  { nome: 'Dra. Isabela Martins', oab: 'xxxxxx', foto: 'photo-1573496359142-b8d87734a5a2', esp: 'Civil & Família', anos: 18 },
  { nome: 'Dr. Rafael Souza', oab: 'xxxxxx', foto: 'photo-1560250097-0b93528c311a', esp: 'Tributário & Empresarial', anos: 15 },
];

const CASES = [
  { client: 'Metalúrgica S/A (anônimo)', area: 'Tributário', result: 'Recuperou R$ 2.3M em tributos pagos indevidamente.' },
  { client: 'Família de A.M.', area: 'Família', result: 'Inventário resolvido em 4 meses — média é 2 anos.' },
  { client: 'J. R. da Silva', area: 'Trabalhista', result: 'Indenização de R$ 180k por assédio moral e horas extras.' },
];

export function AdvocaciaTemplate() {
  const [formOpen, setFormOpen] = useState(false);
  const [area, setArea] = useState<string | null>(null);
  const [tipoCliente, setTipoCliente] = useState<'pf' | 'pj' | null>(null);
  const [urgencia, setUrgencia] = useState<'agora' | 'semana' | 'mes' | null>(null);
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'area' | 'tipo' | 'descricao' | 'dados' | 'done'>('area');

  const openForm = (preArea?: string) => {
    setArea(preArea ?? null);
    setTipoCliente(null);
    setUrgencia(null);
    setDescricao('');
    setNome('');
    setTel('');
    setEmail('');
    setStep(preArea ? 'tipo' : 'area');
    setFormOpen(true);
  };

  const areaObj = AREAS.find((a) => a.id === area);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
      <nav className="sticky top-10 z-40 bg-stone-50/95 backdrop-blur border-b-2 border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-stone-900 flex items-center justify-center">
              <Scale size={18} className="text-amber-400" />
            </div>
            <div>
              <div className="font-black text-base leading-none tracking-wide">ALVES & MARTINS</div>
              <div className="text-[9px] text-amber-700 tracking-[0.3em] mt-0.5">ADVOCACIA · DESDE 1998</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-stone-600" style={{ fontFamily: 'sans-serif' }}>
            <a href="#areas" className="hover:text-amber-700">Áreas</a>
            <a href="#equipe" className="hover:text-amber-700">Equipe</a>
            <a href="#cases" className="hover:text-amber-700">Resultados</a>
            <a href="#contato" className="hover:text-amber-700">Contato</a>
          </div>
          <button onClick={() => openForm()} className="px-5 py-2.5 bg-stone-900 text-amber-400 text-[11px] font-black uppercase tracking-widest" style={{ fontFamily: 'sans-serif' }}>
            Consultoria
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-amber-700 w-16" />
              <span className="text-amber-700 text-xs uppercase tracking-[0.3em] font-bold" style={{ fontFamily: 'sans-serif' }}>26 anos defendendo direitos</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8">
              Direito feito com <span className="italic text-amber-700">rigor</span> e <span className="italic text-amber-700">humanidade</span>.
            </h1>
            <p className="text-stone-700 text-lg leading-relaxed mb-10 max-w-xl" style={{ fontFamily: 'sans-serif' }}>
              Escritório boutique com 3 sócios especialistas, mais de 900 processos conduzidos
              e um foco: resolver seu problema com estratégia e transparência.
            </p>
            <div className="flex gap-4 flex-wrap" style={{ fontFamily: 'sans-serif' }}>
              <button onClick={() => openForm()} className="px-8 py-5 bg-stone-900 text-amber-400 font-black uppercase tracking-widest text-xs hover:bg-stone-800">
                Agendar consultoria gratuita
              </button>
              <a href="#areas" className="px-8 py-5 border border-stone-900 text-stone-900 font-black uppercase tracking-widest text-xs hover:bg-stone-900/5">
                Ver áreas de atuação
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden border-4 border-stone-900 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-amber-400 p-5 shadow-xl">
              <div className="text-[9px] uppercase tracking-widest text-stone-900">Taxa de êxito</div>
              <div className="text-4xl font-black text-stone-900 mt-1">92%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone-900 text-stone-50 py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['26', 'anos de atuação'], ['900+', 'processos'], ['92%', 'taxa de êxito'], ['3', 'sócios OAB-SP']].map(([n, l]) => (
            <div key={l}>
              <div className="text-4xl font-black text-amber-400">{n}</div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mt-2" style={{ fontFamily: 'sans-serif' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Áreas */}
      <section id="areas" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Nossas áreas</p>
        <h2 className="text-5xl font-black tracking-tight mb-12">Em que podemos te ajudar</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS.map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.id} onClick={() => openForm(a.id)} className="group text-left p-8 bg-white border-2 border-stone-200 hover:border-amber-700 transition">
                <Icon size={28} className="text-amber-700 mb-5" />
                <h3 className="text-xl font-black mb-3">{a.nome}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6" style={{ fontFamily: 'sans-serif' }}>{a.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs" style={{ fontFamily: 'sans-serif' }}>
                  <span className="text-stone-500">{a.cases}+ casos conduzidos</span>
                  <span className="text-amber-700 font-black group-hover:translate-x-1 transition">
                    Consultar →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="bg-stone-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Os sócios</p>
          <h2 className="text-5xl font-black tracking-tight mb-12">Quem defende seus direitos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ADVOGADOS.map((a) => (
              <article key={a.oab} className="bg-white">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={`https://images.unsplash.com/${a.foto}?w=600&auto=format&fit=crop`} alt={a.nome} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-6 border-l-4 border-amber-700">
                  <h3 className="font-black text-xl">{a.nome}</h3>
                  <div className="text-amber-700 text-xs font-bold mt-1" style={{ fontFamily: 'sans-serif' }}>OAB/SP {a.oab}</div>
                  <p className="text-stone-600 text-sm mt-3" style={{ fontFamily: 'sans-serif' }}>{a.esp}</p>
                  <p className="text-stone-500 text-xs mt-2" style={{ fontFamily: 'sans-serif' }}>{a.anos} anos de atuação</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Resultados reais</p>
        <h2 className="text-5xl font-black tracking-tight mb-12">Casos selecionados</h2>
        <div className="space-y-3">
          {CASES.map((c, i) => (
            <article key={i} className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-start p-8 bg-white border-2 border-stone-200">
              <div className="text-amber-700 font-black text-5xl" style={{ fontFamily: 'Georgia' }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-2" style={{ fontFamily: 'sans-serif' }}>
                  {c.area}
                </div>
                <h3 className="text-xl font-black mb-2">{c.client}</h3>
                <p className="text-stone-700 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>{c.result}</p>
              </div>
              <Shield size={24} className="text-amber-700" />
            </article>
          ))}
        </div>
        <p className="text-stone-500 text-xs mt-6 italic text-center" style={{ fontFamily: 'sans-serif' }}>
          Nomes dos clientes alterados conforme sigilo profissional (Art. 34 do Código de Ética da OAB).
        </p>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-stone-50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scale size={48} className="text-amber-400 mx-auto mb-8" />
          <h2 className="text-5xl font-black mb-6 italic">
            Sua primeira consultoria é <span className="text-amber-400">gratuita</span>.
          </h2>
          <p className="text-stone-300 text-lg mb-10" style={{ fontFamily: 'sans-serif' }}>
            30 minutos pra entender seu caso, direcionar a estratégia e dizer com transparência se podemos ajudar.
          </p>
          <button onClick={() => openForm()} className="px-10 py-5 bg-amber-400 text-stone-900 font-black uppercase tracking-widest text-xs" style={{ fontFamily: 'sans-serif' }}>
            Agendar agora
          </button>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10">
        <div className="space-y-6" style={{ fontFamily: 'sans-serif' }}>
          <Info icon={<MapPin size={18} />} title="Escritório">
            Av. Faria Lima, 2500 · 15º andar · Itaim Bibi · SP<br />
            <span className="text-stone-500 text-xs">Próximo ao metrô Faria Lima</span>
          </Info>
          <Info icon={<Clock size={18} />} title="Atendimento">
            Segunda a sexta · 9h — 18h<br />
            Plantão 24h para emergências criminais
          </Info>
          <Info icon={<Phone size={18} />} title="Telefone">
            (11) 3030-4040 · WhatsApp (11) 99090-0000
          </Info>
          <Info icon={<Mail size={18} />} title="E-mail">
            contato@alvesmartins.adv.br
          </Info>
        </div>
        <div className="aspect-square overflow-hidden">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-500 py-8 text-center text-xs" style={{ fontFamily: 'sans-serif' }}>
        © Alves & Martins Advocacia · OAB/SP · <Link href="/encomendar/advocacia" className="text-amber-400 hover:underline">Quero este site</Link>
      </footer>

      {/* Modal consultoria */}
      {formOpen && (
        <div className="fixed inset-0 z-[200] bg-stone-900/70 backdrop-blur flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={() => setFormOpen(false)} style={{ fontFamily: 'sans-serif' }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white max-w-lg w-full p-8 my-8 relative border-t-4 border-amber-700">
            <button onClick={() => setFormOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-2xl leading-none">×</button>

            {step !== 'done' && (
              <div className="flex items-center gap-2 mb-8 text-[9px] font-black uppercase tracking-widest">
                {['area','tipo','descricao','dados'].map((s, i) => {
                  const curr = ['area','tipo','descricao','dados'].indexOf(step);
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-sm flex items-center justify-center ${i <= curr ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-400'}`}>
                        {i < curr ? <Check size={12} /> : i + 1}
                      </div>
                      {i < 3 && <div className={`flex-1 h-px ${i < curr ? 'bg-amber-700' : 'bg-stone-200'}`} />}
                    </div>
                  );
                })}
              </div>
            )}

            {step === 'area' && (
              <div>
                <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Georgia' }}>Em que podemos ajudar?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {AREAS.map((a) => {
                    const Icon = a.icon;
                    return (
                      <button key={a.id} onClick={() => { setArea(a.id); setStep('tipo'); }}
                        className="p-4 border-2 border-stone-200 hover:border-amber-700 text-left">
                        <Icon size={20} className="text-amber-700 mb-2" />
                        <div className="font-black text-sm">{a.nome}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 'tipo' && (
              <div>
                <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">{areaObj?.nome}</div>
                <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Georgia' }}>Você é...</h3>
                <div className="space-y-3">
                  <button onClick={() => { setTipoCliente('pf'); }} className={`w-full p-5 border-2 text-left ${tipoCliente === 'pf' ? 'border-amber-700 bg-amber-50' : 'border-stone-200 hover:border-stone-400'}`}>
                    <div className="font-black">Pessoa Física</div>
                    <div className="text-xs text-stone-500 mt-1">Caso pessoal, familiar ou individual</div>
                  </button>
                  <button onClick={() => { setTipoCliente('pj'); }} className={`w-full p-5 border-2 text-left ${tipoCliente === 'pj' ? 'border-amber-700 bg-amber-50' : 'border-stone-200 hover:border-stone-400'}`}>
                    <div className="font-black">Pessoa Jurídica (Empresa)</div>
                    <div className="text-xs text-stone-500 mt-1">Caso empresarial, trabalhista PJ, tributário</div>
                  </button>
                </div>

                <div className="mt-6">
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-black mb-3">Urgência</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[['agora', 'Agora'], ['semana', 'Esta semana'], ['mes', 'Este mês']].map(([k, l]) => (
                      <button key={k} onClick={() => setUrgencia(k as 'agora' | 'semana' | 'mes')}
                        className={`p-3 border-2 text-xs font-bold ${urgencia === k ? 'border-amber-700 bg-amber-50 text-amber-900' : 'border-stone-200'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep('descricao')} disabled={!tipoCliente || !urgencia}
                  className="w-full mt-6 py-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-amber-400 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  Continuar <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 'descricao' && (
              <div>
                <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">{areaObj?.nome} · {tipoCliente === 'pf' ? 'Pessoa Física' : 'Empresa'}</div>
                <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Georgia' }}>Conte brevemente sobre o caso</h3>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={6}
                  placeholder="Em poucas linhas, descreva a situação. Tudo sob sigilo profissional."
                  className="w-full p-4 border-2 border-stone-200 focus:border-amber-700 outline-none text-sm" />
                <p className="text-[10px] text-stone-500 mt-2">
                  🔒 Sigilo profissional garantido (Art. 34 do Código de Ética da OAB)
                </p>
                <button onClick={() => setStep('dados')} disabled={descricao.length < 10}
                  className="w-full mt-6 py-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-amber-400 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  Continuar <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 'dados' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('done'); }}>
                <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Georgia' }}>Seus dados</h3>
                <Field label="Nome completo" value={nome} onChange={setNome} />
                <Field label="Telefone / WhatsApp" value={tel} onChange={setTel} placeholder="(11) 99999-9999" />
                <Field label="E-mail" value={email} onChange={setEmail} type="email" />
                <button type="submit" className="w-full mt-4 py-4 bg-stone-900 hover:bg-stone-800 text-amber-400 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  Enviar solicitação <Check size={14} />
                </button>
              </form>
            )}

            {step === 'done' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-6">
                  <Check size={28} className="text-amber-700" />
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'Georgia' }}>Solicitação recebida</h3>
                <p className="text-stone-600 text-sm mb-6">
                  Um de nossos advogados vai entrar em contato em até <b>4 horas úteis</b> para agendar sua
                  consultoria gratuita de 30 minutos.
                </p>
                <button onClick={() => setFormOpen(false)} className="w-full py-4 bg-stone-900 text-amber-400 font-black uppercase tracking-widest text-xs">
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
      <div className="w-10 h-10 shrink-0 rounded-sm bg-amber-700 text-amber-100 flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-amber-700 mb-1">{title}</h4>
        <p className="text-stone-700 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">{label}</span>
      <input required type={type ?? 'text'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-stone-200 text-sm outline-none focus:border-amber-700" />
    </label>
  );
}
