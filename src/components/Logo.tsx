import React from 'react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Icon based on user provided image */}
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,140,0,0.4)]">
          {/* Steam (Orange Waves) */}
          <path d="M70 10C75 18 70 24 75 32" stroke="#FF8C00" strokeWidth="5" strokeLinecap="round" className="animate-pulse" />
          <path d="M85 15C90 23 85 29 90 37" stroke="#FF8C00" strokeWidth="5" strokeLinecap="round" className="animate-pulse delay-100" />
          <path d="M100 20C105 28 100 34 105 42" stroke="#FF8C00" strokeWidth="5" strokeLinecap="round" className="animate-pulse delay-200" />
          
          {/* Lid (Slightly tilted up) */}
          <path d="M25 55L90 40C92 39 94 40 94 42L94 52L25 65V55Z" fill="white" />
          <rect x="50" y="40" width="15" height="6" rx="2" transform="rotate(-13 50 40)" fill="#E0E0E0" />
          
          {/* Pan Body (Rounded base) */}
          <path d="M35 65H110L102 95C100 102 94 107 86 107H59C51 107 45 102 43 95L35 65Z" stroke="white" strokeWidth="7" strokeLinejoin="round" />
          
          {/* Code Symbol (Center of pan) */}
          <path d="M58 75L50 85L58 95" stroke="#FF8C00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M82 75L90 85L82 95" stroke="#FF8C00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M74 72L66 98" stroke="#FF8C00" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="flex flex-col -space-y-1">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center">
          Marmita<span className="text-[#FF8C00]">Code</span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-4 bg-[#FF8C00]"></div>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
            Solução entregue quentinha
          </span>
          <div className="h-[2px] w-4 bg-[#FF8C00]"></div>
        </div>
      </div>
    </div>
  );
};
