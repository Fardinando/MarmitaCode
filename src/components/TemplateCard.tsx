import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Template } from '@/lib/types';

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group relative flex flex-col rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-[#FF8C00]/30 transition-all duration-500"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        {template.image_url ? (
          <Image
            src={template.image_url}
            alt={template.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black uppercase tracking-widest text-xs">
            {template.category}
          </div>
        )}
        {template.featured && (
          <span className="absolute top-4 left-4 bg-[#FF8C00] text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
            Destaque
          </span>
        )}
      </div>

      <div className="p-7 flex flex-col flex-1">
        <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.3em] mb-3">
          {template.category}
        </span>
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-3 group-hover:text-[#FF8C00] transition-colors">
          {template.name}
        </h3>
        <p className="text-white/30 text-sm font-bold leading-relaxed flex-1">
          {template.description}
        </p>
        <div className="mt-6 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
          Ver detalhes <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
