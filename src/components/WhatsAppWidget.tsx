'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MoreVertical, CheckCheck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MiniTemplate {
  slug: string;
  name: string;
  category: string;
  description: string | null;
}

type Msg =
  | { role: 'bot' | 'user'; text: string }
  | { role: 'bot'; recommendations: MiniTemplate[] };

const emptySubscribe = () => () => {};

const QUICK_QUESTIONS = [
  'Quero uma loja online',
  'Quero um site pra vender cursos',
  'Preciso de um site institucional',
  'Quero algo 100% personalizado',
];

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [templates, setTemplates] = useState<MiniTemplate[]>([]);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: 'Olá! Sou o assistente da MarmitaCode. Me conte o que você precisa que eu recomendo o template e o plano ideais pra você.',
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!isOpen || templates.length > 0) return;
    fetch('/api/templates')
      .then((r) => r.json())
      .then((d) => setTemplates(d.templates ?? []))
      .catch(() => {});
  }, [isOpen, templates.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const recommend = (text: string): MiniTemplate[] => {
    const t = text.toLowerCase();
    const keywords: Record<string, string[]> = {
      'E-commerce': ['loja', 'ecommerce', 'e-commerce', 'vender produto', 'carrinho', 'checkout'],
      'Cursos': ['curso', 'aula', 'membros', 'ensinar', 'ebook'],
      'Portfólio': ['portfólio', 'portfolio', 'trabalhos', 'projetos', 'freelancer'],
      'Landing Page': ['landing', 'captura', 'anúncio', 'leads', 'lancamento', 'lançamento'],
      'Institucional': ['empresa', 'institucional', 'institucional', 'apresentar minha empresa'],
      'Restaurante': ['restaurante', 'cardápio', 'cardapio', 'comida', 'delivery'],
      'Blog': ['blog', 'artigos', 'notícias', 'noticias'],
    };

    const cats = new Set<string>();
    for (const [cat, kws] of Object.entries(keywords)) {
      if (kws.some((k) => t.includes(k))) cats.add(cat);
    }

    let matches = templates.filter((tp) => cats.has(tp.category));
    if (matches.length === 0) matches = templates.slice(0, 3);
    return matches.slice(0, 3);
  };

  const handleSend = (value?: string) => {
    const text = (value ?? input).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      if (lower.includes('personalizado') || lower.includes('do zero') || lower.includes('sob medida')) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: 'Perfeito! Um projeto 100% personalizado é feito do zero, com tudo do jeitinho que você pedir. Você preenche o briefing e a gente monta sob medida.',
          },
        ]);
        return;
      }

      const recs = recommend(text);
      if (recs.length > 0) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: 'Baseado no que você disse, recomendo estes templates:' },
          { role: 'bot', recommendations: recs },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: 'Ainda não tenho um template cadastrado pra isso, mas posso criar um site 100% personalizado pra você!',
          },
        ]);
      }
    }, 700);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-20 bottom-4 bg-[#FF8C00] text-black text-[10px] font-black px-4 py-2 rounded-full whitespace-nowrap shadow-2xl flex items-center gap-1.5"
          >
            <Sparkles size={12} /> qual template combina com você?
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(255,140,0,0.3)] text-black relative"
      >
        {isOpen ? <X size={28} /> : <Bot size={30} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.5 }}
            className="absolute bottom-20 right-0 w-[22rem] h-[520px] bg-[#0a0a0a] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white border border-white/10"
          >
            <div className="p-4 bg-[#FF8C00] text-black flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                  <Bot size={22} />
                </div>
                <div>
                  <h4 className="font-black text-sm leading-tight">Assistente MarmitaCode</h4>
                  <span className="text-[10px] font-bold opacity-70" suppressHydrationWarning>
                    {mounted ? 'online agora' : ''}
                  </span>
                </div>
              </div>
              <MoreVertical size={18} className="opacity-60" />
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[13px]">
              {messages.map((m, i) => {
                if ('recommendations' in m) {
                  return (
                    <div key={i} className="space-y-2">
                      {m.recommendations.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/templates/${r.slug}`}
                          className="block p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF8C00]/40 transition-all"
                        >
                          <span className="block text-[9px] font-black text-[#FF8C00] uppercase tracking-widest">
                            {r.category}
                          </span>
                          <span className="block font-black text-sm">{r.name}</span>
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={cn(
                        'max-w-[85%] p-3 rounded-2xl',
                        m.role === 'user' ? 'bg-[#FF8C00] text-black rounded-tr-none' : 'bg-white/5 rounded-tl-none'
                      )}
                    >
                      {m.text}
                      <div className="flex justify-end gap-1 mt-1">
                        {m.role === 'user' && <CheckCheck size={12} className="text-black/50" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold hover:border-[#FF8C00]/40 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 flex items-center gap-2 border-t border-white/5">
              <input
                type="text"
                placeholder="Escreva sua dúvida..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/5 rounded-full px-4 py-3 outline-none text-sm border border-white/10"
              />
              <button
                onClick={() => handleSend()}
                className="w-11 h-11 bg-[#FF8C00] text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
