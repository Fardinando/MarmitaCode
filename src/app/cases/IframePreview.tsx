'use client';

import { useEffect, useRef, useState } from 'react';

const VIRTUAL_WIDTH = 1440;
const VIRTUAL_HEIGHT = 900;

export function IframePreview({ url, title }: { url: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / VIRTUAL_WIDTH);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: VIRTUAL_WIDTH,
          height: VIRTUAL_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        <iframe
          src={url}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-same-origin allow-scripts"
          className="w-full h-full border-0 bg-black"
        />
      </div>
    </div>
  );
}
