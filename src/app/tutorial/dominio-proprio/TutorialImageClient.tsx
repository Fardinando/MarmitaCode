'use client';

import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

/**
 * Mostra a imagem de apoio quando disponível. Se der 404 (ainda não enviou
 * o print pra public/tutorial/), mostra um placeholder discreto no lugar.
 */
export function TutorialImageClient({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-video bg-white/[0.02] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6">
        <ImageIcon size={32} className="text-white/20 mb-3" />
        <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">
          Imagem de apoio
        </div>
        <div className="text-white/30 text-xs mt-2 font-mono">{src}</div>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-auto block"
    />
  );
}
