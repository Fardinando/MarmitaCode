import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Planos | MarmitaCode',
  description: 'Básico, Intermediário ou 100% Personalizado. Escolha o nível de customização do seu site.',
};

const PLANS = [
  {
    key: 'basico',
    name: 'Básico',
    desc: 'Um template nosso, com o essencial trocado para a sua marca.',
    features: ['Troca de logomarca', 'Cores do seu negócio', 'Textos e fotos', 'Publicação incluída'],
  },
  {
    key: 'intermediario',
    name: 'Intermediário',
    desc: 'Ainda um template, mas com mais liberdade para personalizar.',
    features: ['Tudo do Básico', 'Mudança de animações', 'Reordenação das seções', 'Ajuste de fluxos e processos'],
  },
  {
    key: 'premium',
    name: '100% Personalizado',
    desc: 'Um site feito do zero, exatamente como você pediu.',
    features: ['Tudo do Intermediário', 'Design exclusivo', 'Lógica sob medida', 'Ou baseado fortemente em um template'],
  },
];

export default function PlanosPage() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Escolha seu <span className="text-[#FF8C00]">nível</span>
          </h1>
          <p className="text-white/40 text-lg font-bold max-w-2xl mx-auto">
            Todos os planos incluem mensalidade de manutenção contínua. O setup é pago uma vez; a mensalidade mantém seu site vivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((p, i) => (
            <div
              key={p.key}
              className={`flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500 ${
                i === 2 ? 'bg-[#FF8C00]/5 border-[#FF8C00]/30 md:-translate-y-4' : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.3em] mb-6">
                {p.name}
              </span>
              <p className="text-white/50 font-bold leading-relaxed mb-8 flex-1">{p.desc}</p>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-xs font-bold text-white/70">
                    <Check size={16} className="text-[#FF8C00] mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/templates"
                className="w-full py-5 text-center bg-white text-black font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-[#FF8C00] transition-all"
              >
                Ver templates
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/encomendar/personalizado?tier=personalizado"
            className="inline-block px-10 py-5 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest"
          >
            Quero 100% do zero
          </Link>
        </div>
      </div>
    </main>
  );
}
