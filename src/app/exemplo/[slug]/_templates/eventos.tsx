'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Heart, Calendar, Users, Sparkles, MapPin, Phone, ArrowRight } from 'lucide-react';

type TipoEvento = 'casamento' | 'formatura' | 'corporativo' | '15-anos';

const TIPOS = [
  { k: 'casamento' as TipoEvento, l: 'Casamento', icon: '💍', base: 450 },
  { k: '15-anos' as TipoEvento, l: '15 anos', icon: '👑', base: 380 },
  { k: 'formatura' as TipoEvento, l: 'Formatura', icon: '🎓', base: 320 },
  { k: 'corporativo' as TipoEvento, l: 'Corporativo', icon: '🏢', base: 290 },
];

const ESPACOS = [
  { k: 'salao', l: 'Salão de festas', mult: 1.0 },
  { k: 'ar-livre', l: 'Ar livre / Fazenda', mult: 1.15 },
  { k: 'praia', l: 'Praia', mult: 1.25 },
];

const EXTRAS = [
  { k: 'open-bar', l: 'Open bar premium', add: 85 },
  { k: 'fotografo', l: 'Fotógrafo profissional', add: 45 },
  { k: 'dj', l: 'DJ + iluminação', add: 55 },
  { k: 'decoracao', l: 'Decoração completa', add: 75 },
  { k: 'brinde', l: 'Lembrancinhas', add: 20 },
];

const GALERIA = [
  'photo-1519741497674-611481863552',
  'photo-1511795409834-ef04bbd61622',
  'photo-1465495976277-4387d4b0b4c6',
  'photo-1519225421980-715cb0215aed',
  'photo-1529543544282-ea669407fca3',
  'photo-1464366400600-7168b8af9bc3',
];

export function EventosTemplate() {
  const [tipo, setTipo] = useState<TipoEvento>('casamento');
  const [convidados, setConvidados] = useState(100);
  const [espaco, setEspaco] = useState('salao');
  const [extras, setExtras] = useState<string[]>([]);
  const [orcOpen, setOrcOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [data, setData] = useState('');
  const [enviado, setEnviado] = useState(false);

  const tipoObj = TIPOS.find((t) => t.k === tipo)!;
  const espacoObj = ESPACOS.find((e) => e.k === espaco)!;
  const extrasAdd = extras.reduce((s, k) => s + (EXTRAS.find((e) => e.k === k)?.add ?? 0), 0);
  const porPessoa = Math.round((tipoObj.base + extrasAdd) * espacoObj.mult);
  const total = porPessoa * convidados;

  const toggle = (k: string) => setExtras((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b1f1a]" style={{ fontFamily: 'Georgia, serif' }}>
      <nav className="sticky top-10 z-40 bg-[#faf7f2]/95 backdrop-blur border-b border-[#2b1f1a]/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2b1f1a] flex items-center justify-center text-rose-300">
              <Sparkles size={16} />
            </div>
            <div className="font-black italic text-xl leading-none">Haut Événement</div>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#2b1f1a]/60" style={{ fontFamily: 'sans-serif' }}>
            <a href="#servicos" className="hover:text-rose-700">Serviços</a>
            <a href="#galeria" className="hover:text-rose-700">Galeria</a>
            <a href="#orcamento" className="hover:text-rose-700">Orçamento</a>
          </div>
          <a href="#orcamento" className="px-5 py-2.5 bg-[#2b1f1a] text-[#faf7f2] text-[11px] font-black uppercase tracking-widest rounded-full" style={{ fontFamily: 'sans-serif' }}>
            Simular
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-rose-700 w-12" />
              <span className="text-rose-700 text-xs uppercase tracking-[0.4em] font-bold" style={{ fontFamily: 'sans-serif' }}>Cerimonial · Desde 2008</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.95] mb-8">
              Transformamos <span className="italic text-rose-700">momentos</span> em memórias eternas.
            </h1>
            <p className="text-[#2b1f1a]/70 text-lg mb-10 max-w-md" style={{ fontFamily: 'sans-serif' }}>
              Casamentos, 15 anos, formaturas e eventos corporativos. Mais de 400 eventos realizados em todo o Brasil.
            </p>
            <div className="flex gap-3 flex-wrap" style={{ fontFamily: 'sans-serif' }}>
              <a href="#orcamento" className="px-8 py-5 bg-rose-700 hover:bg-rose-800 text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center gap-2">
                <Calendar size={14} /> Calcular meu evento
              </a>
              <a href="#galeria" className="px-8 py-5 border-2 border-[#2b1f1a] text-[#2b1f1a] font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#2b1f1a] hover:text-[#faf7f2]">
                Ver galeria
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-4 bg-rose-700 text-white p-5 rounded-full shadow-xl rotate-6" style={{ fontFamily: 'sans-serif' }}>
              <div className="text-[10px] uppercase tracking-widest opacity-80">+ de</div>
              <div className="text-3xl font-black">400</div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">eventos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-rose-700 text-xs uppercase tracking-[0.4em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>O que fazemos</p>
        <h2 className="text-5xl font-black mb-12">Tipos de evento</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIPOS.map((t) => (
            <button key={t.k} onClick={() => { setTipo(t.k); document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group text-left p-8 bg-white rounded-3xl border-2 border-[#2b1f1a]/10 hover:border-rose-700 transition">
              <div className="text-5xl mb-5">{t.icon}</div>
              <h3 className="text-xl font-black mb-2">{t.l}</h3>
              <p className="text-[#2b1f1a]/50 text-xs" style={{ fontFamily: 'sans-serif' }}>A partir de R$ {t.base}/pessoa</p>
              <div className="mt-4 text-xs font-black text-rose-700 group-hover:translate-x-1 transition" style={{ fontFamily: 'sans-serif' }}>
                Calcular →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CALCULADORA DE ORÇAMENTO */}
      <section id="orcamento" className="bg-[#2b1f1a] text-[#faf7f2] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-rose-300 text-xs uppercase tracking-[0.4em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Calculadora instantânea</p>
          <h2 className="text-5xl font-black mb-6">Simule seu evento agora</h2>
          <p className="text-[#faf7f2]/60 mb-12 max-w-xl" style={{ fontFamily: 'sans-serif' }}>
            Ajuste as opções abaixo e veja o orçamento aproximado em tempo real. Depois a gente te chama pra personalizar.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-6" style={{ fontFamily: 'sans-serif' }}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-rose-300 mb-3">Tipo de evento</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIPOS.map((t) => (
                    <button key={t.k} onClick={() => setTipo(t.k)}
                      className={`p-3 rounded-xl text-xs font-bold border transition ${tipo === t.k ? 'bg-rose-700 border-rose-700 text-white' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      {t.icon} {t.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-rose-300">Convidados</label>
                  <span className="text-2xl font-black text-rose-300">{convidados}</span>
                </div>
                <input type="range" min="30" max="500" step="10" value={convidados} onChange={(e) => setConvidados(parseInt(e.target.value))} className="w-full accent-rose-500" />
                <div className="flex justify-between text-[10px] text-white/40 mt-1 uppercase">
                  <span>30</span><span>500</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-rose-300 mb-3">Tipo de espaço</label>
                <div className="grid grid-cols-3 gap-2">
                  {ESPACOS.map((e) => (
                    <button key={e.k} onClick={() => setEspaco(e.k)}
                      className={`p-3 rounded-xl text-xs font-bold border transition ${espaco === e.k ? 'bg-rose-700 border-rose-700 text-white' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      {e.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-rose-300 mb-3">Serviços extras</label>
                <div className="space-y-2">
                  {EXTRAS.map((e) => (
                    <label key={e.k} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${extras.includes(e.k) ? 'border-rose-500 bg-rose-500/10' : 'border-white/10 bg-white/[0.02]'}`}>
                      <input type="checkbox" checked={extras.includes(e.k)} onChange={() => toggle(e.k)} className="w-4 h-4 accent-rose-500" />
                      <span className="flex-1 text-sm">{e.l}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">+R$ {e.add}/pessoa</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado em tempo real */}
            <div className="relative">
              <div className="sticky top-28 p-10 rounded-3xl bg-gradient-to-br from-rose-700/20 to-rose-500/5 border border-rose-500/30" style={{ fontFamily: 'sans-serif' }}>
                <p className="text-rose-300 text-xs uppercase tracking-[0.4em] font-black mb-4">Seu orçamento estimado</p>
                <div className="mb-8">
                  <div className="text-6xl font-black">
                    R$ {total.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-rose-300/80 text-sm mt-2">
                    ≈ R$ {porPessoa.toLocaleString('pt-BR')}/pessoa
                  </div>
                </div>

                <div className="space-y-3 pb-6 border-b border-white/10 mb-6 text-sm">
                  <Row label="Tipo" val={`${tipoObj.icon} ${tipoObj.l}`} />
                  <Row label="Convidados" val={`${convidados} pessoas`} />
                  <Row label="Espaço" val={espacoObj.l} />
                  {extras.length > 0 && (
                    <Row label="Extras" val={`${extras.length} serviço${extras.length > 1 ? 's' : ''}`} />
                  )}
                </div>

                <button onClick={() => { setOrcOpen(true); setEnviado(false); }}
                  className="w-full py-5 bg-rose-500 hover:bg-rose-400 text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2">
                  Solicitar proposta <ArrowRight size={14} />
                </button>
                <p className="text-[10px] text-white/40 text-center mt-4">
                  Valor estimado. Orçamento final depende de visita técnica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-rose-700 text-xs uppercase tracking-[0.4em] mb-4 font-bold" style={{ fontFamily: 'sans-serif' }}>Momentos</p>
        <h2 className="text-5xl font-black mb-12">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALERIA.map((p) => (
            <div key={p} className="aspect-square overflow-hidden rounded-2xl">
              <img src={`https://images.unsplash.com/${p}?w=700&auto=format&fit=crop`} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-rose-50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Heart size={32} className="text-rose-700 mx-auto mb-6 fill-rose-700" />
          <h2 className="text-4xl md:text-5xl font-black italic mb-8">
            &ldquo;Nossa festa foi tudo que a gente sonhou e mais. Elas pensaram em cada detalhe.&rdquo;
          </h2>
          <div className="text-sm uppercase tracking-widest text-rose-700 font-bold" style={{ fontFamily: 'sans-serif' }}>
            Marina & Rafael · Casamento Fazenda · 2025
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-5xl font-black mb-8 italic">Vamos conversar?</h2>
          <div className="space-y-5" style={{ fontFamily: 'sans-serif' }}>
            <Info icon={<MapPin size={18} />} title="Atelier">
              Rua dos Pinheiros, 200 · Pinheiros · SP
            </Info>
            <Info icon={<Phone size={18} />} title="Contato">
              (11) 3000-6000 · WhatsApp (11) 99000-7000
            </Info>
            <Info icon={<Users size={18} />} title="Atendimento">
              Agende visita pelo WhatsApp · 7 dias por semana
            </Info>
          </div>
        </div>
        <div className="aspect-square rounded-tr-[80px] rounded-bl-[80px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      <footer className="border-t border-[#2b1f1a]/10 py-8 text-center text-[#2b1f1a]/50 text-xs">
        © Haut Événement · <Link href="/encomendar/eventos" className="text-rose-700 font-black hover:underline">Quero este site</Link>
      </footer>

      {/* Modal orçamento */}
      {orcOpen && (
        <div className="fixed inset-0 z-[200] bg-[#2b1f1a]/80 backdrop-blur flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={() => setOrcOpen(false)} style={{ fontFamily: 'sans-serif' }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl max-w-md w-full p-8 my-8 relative">
            <button onClick={() => setOrcOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-2xl leading-none">×</button>

            {enviado ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center mb-6">
                  <Heart size={28} className="text-rose-700 fill-rose-700" />
                </div>
                <h3 className="text-2xl font-black italic mb-3" style={{ fontFamily: 'Georgia' }}>Recebemos sua solicitação!</h3>
                <p className="text-stone-600 text-sm mb-6">
                  Vamos entrar em contato em até <b>24h</b> pra agendar uma visita presencial e refinar sua proposta.
                </p>
                <button onClick={() => setOrcOpen(false)} className="w-full py-4 bg-rose-700 text-white font-black uppercase tracking-widest text-xs rounded-full">
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setEnviado(true); }}>
                <h3 className="text-2xl font-black italic mb-2" style={{ fontFamily: 'Georgia' }}>Solicitar proposta</h3>
                <div className="text-sm text-stone-600 mb-6">
                  {tipoObj.l} · {convidados} convidados · <b className="text-rose-700">R$ {total.toLocaleString('pt-BR')}</b>
                </div>

                <Field label="Seu nome" value={nome} onChange={setNome} />
                <Field label="WhatsApp" value={tel} onChange={setTel} placeholder="(11) 99999-9999" />
                <label className="block mb-6">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">Data pretendida (opcional)</span>
                  <input type="date" value={data} onChange={(e) => setData(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm outline-none focus:border-rose-700" />
                </label>

                <button type="submit" className="w-full py-4 bg-rose-700 hover:bg-rose-800 text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2">
                  Enviar <Check size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Row({ label, val }: { label: string; val: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-rose-300/60">{label}</span>
      <span className="font-black text-white">{val}</span>
    </div>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-rose-700 text-white flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-rose-700 mb-1">{title}</h4>
        <p className="text-[#2b1f1a] text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">{label}</span>
      <input required value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm outline-none focus:border-rose-700" />
    </label>
  );
}
