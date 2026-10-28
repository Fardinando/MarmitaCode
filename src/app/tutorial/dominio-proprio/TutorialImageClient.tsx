'use client';

import { useState } from 'react';
import { ImageIcon, FolderUp } from 'lucide-react';

/**
 * Mostra a imagem de apoio quando disponível. Se der 404 (ainda não enviou
 * o print pra public/tutorial/), mostra um placeholder discreto no lugar.
 */
export function TutorialImageClient({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Placeholder apenas pro admin saber que a imagem está pendente — texto
    // minimalista, nada que confunda o cliente final.
    return (
      <div className="aspect-video bg-white/[0.02] border-2 border-dashed border-white/10 flex items-center justify-center p-6">
        <div className="text-center opacity-50">
          <ImageIcon size={28} className="text-white/30 mx-auto mb-2" />
          <div className="text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <FolderUp size={10} /> Imagem a enviar
          </div>
          <div className="text-white/30 text-[10px] mt-1 font-mono">{src}</div>
        </div>
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
