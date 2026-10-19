'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MoreVertical, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const AI_KNOWLEDGE = [
  { keywords: ['preço', 'valor', 'quanto'], answer: 'Temos opções de Sites Modelo a partir de R$ 300 e Personalizados a partir de R$ 400. Automações começam em R$ 200 via Pix!' },
  { keywords: ['estoque', 'automação'], answer: 'Temos 4 tipos de sistemas de estoque (Modelo/Personalizado, com ou sem compra automática). O Kit Tudo Personalizado com Auto é o nosso mais completo!' },
  { keywords: ['mensalidade', 'manutenção'], answer: 'As mensalidades variam de R$ 75 (sites simples) até R$ 140 (estoque complexo ou e-commerce). Kits ficam em R$ 125.' },
  { keywords: ['personalizado', 'modelo'], answer: 'O Personalizado é feito do zero para sua demanda. O Modelo usa nossa estrutura base sólida com o conteúdo que você escolher.' },
  { keywords: ['ia', 'guarda', 'erro'], answer: 'Sim! Nosso sistema conta com a Marmita Guard IA, assistindo 24/7. Ela detecta e corrige erros automaticamente para garantir 100% de estabilidade.' }
];

const emptySubscribe = () => () => {};

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Olá! Sou a IA de Suporte da MarmitaCode. Como posso te ajudar com o desenvolvimento do seu sistema hoje?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const match = AI_KNOWLEDGE.find(k => k.keywords.some(kw => lowerInput.includes(kw)));
      const response = match ? match.answer : 'Excelente ponto. Vou encaminhar isso para nossa Equipe de Desenvolvimento Humana. Se preferir, clique no botão abaixo!';
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      {/* Tooltip text */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-20 bottom-4 bg-[#25D366] text-white text-[10px] font-black px-4 py-2 rounded-full whitespace-nowrap shadow-2xl drop-shadow-[0_0_10px_rgba(37,211,102,0.4)]"
          >
            alguma pergunta?
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.3)] text-white relative"
      >
        {isOpen ? <X size={28} /> : (
            <>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </>
        )}
      </motion.button>

      {/* WhatsApp Styled Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5, originX: 0, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.5 }}
            className="absolute bottom-20 left-0 w-80 h-[500px] bg-[#ededed] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-black border border-white/20"
          >
            {/* WhatsApp Green Bar */}
            <div className="p-4 bg-[#075e54] text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                    <div className="bg-white/20 p-2 rounded-full"><Bot size={20} /></div>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">MarmitaDev IA</h4>
                  <span className="text-[10px] opacity-70" suppressHydrationWarning>
                    visto por último hoje às {mounted ? `${new Date().getHours()}:${new Date().getMinutes()}` : '--:--'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 opacity-70">
                <MoreVertical size={18} />
              </div>
            </div>

            {/* Chat Body with Classic WA Wallpaper Style */}
            <div 
                className="flex-1 p-4 overflow-y-auto space-y-4 text-[13px] bg-[#e5ddd5]"
                style={{ backgroundImage: `url('https://i.pinimg.com/originals/97/c0/07/97c00759d90d748b64f3d274536f45c9.jpg')`, backgroundSize: 'cover', backgroundBlendMode: 'soft-light' }}
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={cn(
                      "max-w-[85%] p-3 shadow-sm relative rounded-xl",
                      m.role === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'
                  )}>
                    {m.text}
                    <div className="flex justify-end gap-1 mt-1">
                        <span className="text-[9px] opacity-40">19:24</span>
                        {m.role === 'user' && <CheckCheck size={12} className="text-blue-400" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#f0f0f0] flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center border border-black/5">
                <input 
                    type="text" 
                    placeholder="Mensagem"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                />
              </div>
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-[#075e54] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Professional CTA Button */}
            <button 
              onClick={() => window.open('https://wa.me/5583996532203', '_blank')}
              className="m-3 mt-0 py-3 bg-white hover:bg-white/80 text-[11px] font-black tracking-widest text-[#075e54] border border-[#075e54]/20 rounded-xl transition-all uppercase shadow-sm"
            >
              Falar com a equipe de desenvolvimento
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
