import Link from 'next/link';
import { Check, Zap, Shield, Users, BarChart3, ArrowRight } from 'lucide-react';

const FEATURES = [
  { icon: Zap, title: 'Rápido como pensamento', desc: 'Resposta média de 80ms em qualquer região do Brasil.' },
  { icon: Shield, title: 'Segurança bancária', desc: 'ISO 27001, LGPD-ready e criptografia ponta a ponta.' },
  { icon: Users, title: 'Multi-usuário', desc: 'Convide seu time, defina papéis e permissões.' },
  { icon: BarChart3, title: 'Analytics em tempo real', desc: 'Veja o que importa, sem precisar exportar nada.' },
];

const PLANS = [
  {
    name: 'Starter',
    price: 'R$ 49',
    desc: 'Para começar com o pé direito.',
    features: ['Até 3 usuários', '5GB de armazenamento', 'Suporte por e-mail', 'Relatórios básicos'],
    featured: false,
  },
  {
    name: 'Pro',
    price: 'R$ 149',
    desc: 'Para equipes em crescimento.',
    features: ['Até 15 usuários', '100GB armazenamento', 'Suporte prioritário', 'Analytics avançado', 'API completa'],
    featured: true,
  },
  {
    name: 'Business',
    price: 'R$ 349',
    desc: 'Para operações robustas.',
    features: ['Usuários ilimitados', '1TB armazenamento', 'Suporte 24/7', 'SSO corporativo', 'SLA 99.9%'],
    featured: false,
  },
];

export function SaasTemplate() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <nav className="sticky top-10 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
            Linear<span className="text-blue-600">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-slate-600 font-medium">
            <a href="#features" className="hover:text-slate-900">Recursos</a>
            <a href="#precos" className="hover:text-slate-900">Preços</a>
            <a href="#" className="hover:text-slate-900">Clientes</a>
            <a href="#" className="hover:text-slate-900">Blog</a>
          </div>
          <div className="flex gap-3">
            <a className="text-sm font-bold">Entrar</a>
            <a className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-700">
              Teste grátis
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-8 border border-blue-200">
            ✨ Novo: integração com Slack e Linear
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent">
            Gerencie projetos<br />com clareza cirúrgica.
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto mb-10">
            A plataforma de gestão que seu time vai realmente usar. Rápida, simples e integrada.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#precos" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2">
              Começar grátis <ArrowRight size={16} />
            </a>
            <a href="#" className="px-8 py-4 border border-slate-300 rounded-xl font-bold hover:bg-slate-50">
              Ver demonstração
            </a>
          </div>
          <p className="text-slate-500 text-xs mt-6">14 dias grátis · sem cartão de crédito</p>
        </div>

        {/* Hero screenshot */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop"
              alt="Dashboard"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-16 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 font-bold mb-10">
            Mais de 2.000 times usam Linear
          </p>
          <div className="flex items-center justify-around flex-wrap gap-10 opacity-50">
            {['NUBANK', 'LOGGI', 'IFOOD', 'MERCADO LIVRE', 'STONE', 'HOTMART'].map((l) => (
              <span key={l} className="font-black text-xl text-slate-400 tracking-widest">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-32">
        <p className="text-blue-600 text-sm uppercase tracking-widest font-bold mb-4 text-center">O que entregamos</p>
        <h2 className="text-5xl font-black text-center mb-20">Tudo que seu time precisa.</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-10 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-blue-400 text-5xl mb-8">❝</div>
          <p className="text-3xl md:text-4xl font-bold leading-tight mb-10">
            Em três meses, cortamos pela metade o tempo que o time passava em reuniões.
            Linear virou a espinha dorsal da nossa operação.
          </p>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop"
              alt="CEO"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="font-bold">Mariana Oliveira</div>
              <div className="text-slate-400 text-sm">COO · Hotmart</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-black text-center mb-6">Preços transparentes.</h2>
        <p className="text-slate-600 text-center mb-16">Sem letras miúdas. Cancele quando quiser.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`p-10 rounded-3xl ${
                p.featured
                  ? 'bg-slate-900 text-white border-2 border-slate-900 scale-105 shadow-2xl'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div className={`text-xs font-black uppercase tracking-widest mb-3 ${p.featured ? 'text-blue-400' : 'text-blue-600'}`}>
                {p.name}
              </div>
              <div className="text-5xl font-black mb-2">{p.price}</div>
              <p className={`mb-8 text-sm ${p.featured ? 'text-slate-300' : 'text-slate-500'}`}>{p.desc}</p>
              <ul className="space-y-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={p.featured ? 'text-blue-400' : 'text-blue-600'} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className={`block py-3 text-center rounded-xl font-bold ${
                  p.featured ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                }`}
              >
                Começar
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 text-center text-slate-500 text-sm">
        © Linear · <Link href="/encomendar/saas" className="text-blue-600 font-bold hover:underline">Quero este site</Link>
      </footer>
    </main>
  );
}
