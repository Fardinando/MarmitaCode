import { createAdminClient } from '@/lib/supabase/admin';
import { TEMPLATE_CATEGORIES, type Template, type TemplateTier, type Tier } from '@/lib/types';
import { saveTemplate, deleteTemplate } from '@/app/admin/actions';

export const metadata = { title: '' };

export const dynamic = 'force-dynamic';

export default async function AdminTemplatesPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from('templates')
    .select('*, tiers:template_tiers(*)')
    .order('sort_order', { ascending: true });

  const templates = (data as unknown as (Template & { tiers: TemplateTier[] })[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Templates</h1>
      </div>

      <details className="mb-12 rounded-3xl bg-white/[0.02] border border-white/5 p-8">
        <summary className="cursor-pointer text-[11px] font-black uppercase tracking-widest text-[#FF8C00]">
          + Novo template
        </summary>
        <TemplateForm />
      </details>

      <div className="space-y-6">
        {templates.length === 0 && (
          <p className="text-white/30 font-bold">Nenhum template cadastrado.</p>
        )}
        {templates.map((t) => (
          <details key={t.id} className="rounded-3xl bg-white/[0.02] border border-white/5 p-8">
            <summary className="cursor-pointer flex items-center justify-between">
              <span className="font-black uppercase text-sm">
                {t.name} <span className="text-white/30">/{t.slug}</span>
              </span>
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                {t.category} {t.active ? '' : '• inativo'} {t.featured ? '• destaque' : ''}
              </span>
            </summary>
            <div className="mt-8">
              <TemplateForm template={t} />
              <form action={deleteTemplate} className="mt-6">
                <input type="hidden" name="id" value={t.id} />
                <button className="px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20">
                  Excluir template
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function TemplateForm({ template }: { template?: Template & { tiers?: TemplateTier[] } }) {
  const tierRow = (tier: Tier) => template?.tiers?.find((x) => x.tier === tier);

  return (
    <form action={saveTemplate} className="space-y-5 mt-4">
      {template && <input type="hidden" name="id" value={template.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input name="name" label="Nome" defaultValue={template?.name} required />
        <Input name="slug" label="Slug (URL)" defaultValue={template?.slug} required />
        <Input name="category" label="Categoria" defaultValue={template?.category} list="cats" required />
        <datalist id="cats">
          {TEMPLATE_CATEGORIES.map((c) => <option key={c} value={c} />)}
        </datalist>
        <Input name="sort_order" label="Ordem" type="number" defaultValue={String(template?.sort_order ?? 0)} />
        <Input name="image_url" label="URL da imagem" defaultValue={template?.image_url ?? ''} />
        <Input name="demo_url" label="URL da demo" defaultValue={template?.demo_url ?? ''} />
      </div>

      <Input name="description" label="Descrição curta" defaultValue={template?.description ?? ''} />
      <Textarea name="long_description" label="Descrição longa" defaultValue={template?.long_description ?? ''} />
      <Textarea name="features" label="Features (uma por linha)" defaultValue={(template?.features ?? []).join('\n')} />

      <div className="flex gap-6">
        <Check name="featured" label="Destaque" defaultChecked={template?.featured} />
        <Check name="active" label="Ativo" defaultChecked={template?.active ?? true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-white/5">
        {(['basico', 'intermediario', 'premium'] as Tier[]).map((tier) => (
          <div key={tier} className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8C00]">{tier}</p>
            <Input name={`setup_${tier}`} label="Setup (R$)" type="number" defaultValue={String(tierRow(tier)?.setup_price ?? '')} />
            <Input name={`monthly_${tier}`} label="Mensalidade (R$)" type="number" defaultValue={String(tierRow(tier)?.monthly_price ?? '')} />
            <Textarea name={`features_${tier}`} label="Ferramentas (1/linha)" defaultValue={(tierRow(tier)?.features ?? []).join('\n')} />
          </div>
        ))}
      </div>

      <button className="px-8 py-4 rounded-full bg-[#FF8C00] text-black text-[11px] font-black uppercase tracking-widest">
        {template ? 'Salvar alterações' : 'Criar template'}
      </button>
    </form>
  );
}

function Input({ name, label, defaultValue, required, type, list }: {
  name: string; label: string; defaultValue?: string; required?: boolean; type?: string; list?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <input
        name={name}
        type={type ?? 'text'}
        defaultValue={defaultValue}
        required={required}
        list={list}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50"
      />
    </label>
  );
}

function Textarea({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-[#FF8C00]/50 resize-none"
      />
    </label>
  );
}

function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/60">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="w-4 h-4 accent-[#FF8C00]" />
      {label}
    </label>
  );
}
