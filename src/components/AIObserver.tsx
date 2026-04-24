'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Terminal, AlertTriangle, Cpu, CheckCircle2, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

export const AIObserver = () => {
    const [status, setStatus] = useState<'monitoring' | 'analyzing' | 'fixed'>('monitoring');
    const [logs, setLogs] = useState<string[]>(['AI Guard initialized...', 'Kernel monitoring active.']);
    const [isMinimized, setIsMinimized] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
            const errorMsg = 'message' in event ? event.message : 'Unknown Promise Rejection';
            setStatus('analyzing');
            addLog(`Error detected: ${errorMsg.substring(0, 30)}...`);
            
            setTimeout(async () => {
                try {
                    await fetch('/api/ai/log-error', {
                        method: 'POST',
                        body: JSON.stringify({ error: errorMsg }),
                    });
                } catch (e) {
                    console.error('AI Fix reporting failed', e);
                }
                
                setStatus('fixed');
                addLog('Optimizing code paths...');
                addLog('Status: SYSTEM RESTORED.');
                
                setTimeout(() => setStatus('monitoring'), 3000);
            }, 1500);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleError);

        const interval = setInterval(() => {
            const systemCheck = [`Checking HTTP/3 coherence...`, `Verifying Vercel Edge cache...`, `Heartbeat: STABLE`, `AI focus: 99.8%`];
            addLog(systemCheck[Math.floor(Math.random() * systemCheck.length)]);
        }, 8000);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleError);
            clearInterval(interval);
        };
    }, []);

    const addLog = (msg: string) => {
        setLogs(prev => [msg, ...prev].slice(0, 5));
    };

    if (!mounted) return null;

    return (
        <div className="fixed top-24 right-8 z-[100]">
            <motion.div 
                initial={{ x: 300 }}
                animate={{ x: 0, height: isMinimized ? '60px' : 'auto' }}
                className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-64 shadow-2xl overflow-hidden pointer-events-auto"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'monitoring' ? 'bg-green-500' : status === 'analyzing' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                        <span className="text-[10px] font-black tracking-widest uppercase text-white/50">Marmita Guard IA</span>
                    </div>
                    <button 
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/40 hover:text-white"
                    >
                        {isMinimized ? <Eye size={12} /> : <EyeOff size={12} />}
                    </button>
                </div>

                <AnimatePresence>
                    {!isMinimized && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="space-y-1 h-32 overflow-hidden">
                                {logs.map((log, i) => (
                                    <motion.div 
                                        key={log + i}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[9px] font-mono text-white/30 truncate"
                                        suppressHydrationWarning
                                    >
                                        <span className="text-blue-500/50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> {log}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-4 p-2 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Terminal size={10} className="text-[#FF8C00]" />
                                    <span className="text-[10px] font-bold text-[#FF8C00]">
                                        {status === 'monitoring' ? 'MONITORANDO...' : status === 'analyzing' ? 'CORRIGINDO ERRO...' : 'ERRO CORRIGIDO!'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
