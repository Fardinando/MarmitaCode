import React from 'react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12">
        {/* SVG Pan Icon based on user uploaded image */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,140,0,0.5)]">
          {/* Steam */}
          <path d="M60,10 Q65,20 60,30 T60,45" stroke="#FF8C00" strokeWidth="4" fill="none" className="animate-pulse" />
          <path d="M75,15 Q80,25 75,35 T75,50" stroke="#FF8C00" strokeWidth="4" fill="none" className="animate-pulse delay-75" />
          <path d="M50,15 Q55,25 50,35 T50,50" stroke="#FF8C00" strokeWidth="4" fill="none" className="animate-pulse delay-150" />
          
          {/* Lid (slightly open) */}
          <path d="M20,40 L65,30 L65,40 L20,50 Z" fill="white" stroke="#333" strokeWidth="1" />
          <rect x="35" y="30" width="12" height="5" transform="rotate(-15 35 30)" fill="#DDD" />
          
          {/* Pan Body */}
          <path d="M35,45 L85,45 L80,80 Q78,85 70,85 L45,85 Q37,85 35,80 Z" fill="none" stroke="white" strokeWidth="5" />
          <path d="M45,60 L55,75 L65,60" stroke="#FF8C00" strokeWidth="3" fill="none" />
          <line x1="55" y1="65" x2="55" y2="78" stroke="#FF8C00" strokeWidth="3" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tighter text-white">
          Marmita<span className="text-[#FF8C00]">Code</span>
        </span>
        <span className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase">
          Solução entregue quentinha
        </span>
      </div>
    </div>
  );
};
