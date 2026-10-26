import { z } from 'zod';

export const EMAIL_MAX = 254;
export const NAME_MAX = 120;
export const PHONE_MAX = 20;
export const COMPANY_MAX = 120;
export const BRIEFING_MAX_CHARS = 50_000;
export const EXTRAS_WHITELIST = ['db-login', 'video-host', 'payment-api', 'admin-area', 'other'] as const;
export const TIER_WHITELIST = ['basico', 'intermediario', 'premium', 'personalizado'] as const;
export const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{0,60}$/;

// Sanitização de string: remove caracteres de controle e HTML tags simples
function sanitizeText(s: string): string {
  return s
    .replace(/[\u0000-\u001F\u007F]/g, '') // control chars
    .replace(/<[^>]*>/g, '') // simple HTML strip (defesa adicional, não substitui escape de output)
    .trim();
}

const safeString = (max: number) =>
  z
    .string()
    .max(max, `Máximo ${max} caracteres`)
    .transform(sanitizeText);

export const contactSchema = z.object({
  name: safeString(NAME_MAX).refine((s) => s.length >= 2, 'Nome muito curto'),
  email: z.string().trim().toLowerCase().email('E-mail inválido').max(EMAIL_MAX),
  phone: z
    .string()
    .trim()
    .max(PHONE_MAX)
    .optional()
    .refine(
      (v) => !v || /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(v.replace(/\s/g, '')),
      'Telefone inválido'
    ),
  company: safeString(COMPANY_MAX).optional().default(''),
});

export const briefingSchema = z
  .object({
    business_name: safeString(200).optional(),
    segment: safeString(200).optional(),
    primary_color: z.string().max(10).regex(/^#?[0-9a-fA-F]{3,8}$/, 'Cor inválida').optional(),
    secondary_color: z.string().max(10).regex(/^#?[0-9a-fA-F]{3,8}$/, 'Cor inválida').optional(),
    layout: safeString(100).optional(),
    about: safeString(5000).optional(),
    references: safeString(2000).optional(),
    wants_domain: z.enum(['sim', 'não']).optional(),
    extras: safeString(500).optional(),
  })
  .passthrough()
  .refine((b) => JSON.stringify(b).length <= BRIEFING_MAX_CHARS, 'Briefing muito grande');

export const orderBodySchema = z.object({
  templateSlug: z.string().regex(SLUG_REGEX, 'Slug inválido').nullable().optional(),
  tier: z.enum(TIER_WHITELIST),
  briefing: briefingSchema,
  contact: contactSchema,
  wantsDomain: z.boolean().nullable().optional(),
  discountCode: z.string().trim().max(60).regex(/^[A-Za-z0-9_-]*$/, 'Cupom inválido').nullable().optional(),
  // Preços chegam só como dica; o server recalcula do banco.
  setupPrice: z.number().min(0).max(10000).optional(),
  monthlyPrice: z.number().min(0).max(10000).optional(),
  extras: z.array(z.enum(EXTRAS_WHITELIST)).max(10).optional(),
  // Honeypot: campo invisível que bots preenchem.
  _hp: z.string().max(0).optional(),
});

export type OrderBody = z.infer<typeof orderBodySchema>;

export const briefingUpdateSchema = z.object({
  orderId: z.string().uuid('ID inválido'),
  briefing: z
    .object({
      // Marca
      business_name: safeString(200),
      business_tagline: safeString(300).optional(),
      business_about: safeString(3000),
      business_segment: safeString(200),
      business_target_audience: safeString(1000),
      logo_description: safeString(1000).optional(),
      primary_color: z.string().max(10).regex(/^#[0-9a-fA-F]{6}$/).optional(),
      secondary_color: z.string().max(10).regex(/^#[0-9a-fA-F]{6}$/).optional(),
      accent_color: z.string().max(10).regex(/^#[0-9a-fA-F]{6}$/).optional(),
      // Lista ordenada de cores (prioridade decrescente). Até 20 cores.
      colors: z.array(z.string().max(10).regex(/^#[0-9a-fA-F]{6}$/)).max(20).optional(),
      font_style: safeString(100).optional(),
      visual_references: safeString(1500).optional(),
      visual_tone: z.enum(['elegante', 'moderno', 'minimalista', 'ousado', 'casual', 'luxuoso', 'tecnico']).optional(),
      // Estrutura
      pages_desired: z.array(z.string().max(80)).max(30).optional(),
      hero_headline: safeString(300).optional(),
      hero_subheadline: safeString(500).optional(),
      hero_cta_label: safeString(100).optional(),
      hero_cta_action: safeString(300).optional(),
      // Serviços / produtos
      offerings: z
        .array(
          z.object({
            name: safeString(200),
            description: safeString(500),
            price: safeString(100).optional(),
          })
        )
        .max(50)
        .optional(),
      // Equipe
      team: z
        .array(
          z.object({
            name: safeString(120),
            role: safeString(120),
            bio: safeString(500).optional(),
          })
        )
        .max(50)
        .optional(),
      // Depoimentos
      testimonials: z
        .array(
          z.object({
            author: safeString(120),
            role: safeString(120).optional(),
            text: safeString(1000),
          })
        )
        .max(50)
        .optional(),
      // Funcionalidades
      features_desired: z.array(z.string().max(80)).max(30).optional(),
      // Contato
      contact_phone: safeString(50).optional(),
      contact_whatsapp: safeString(50).optional(),
      contact_email: z.string().email().max(EMAIL_MAX).optional(),
      contact_address: safeString(400).optional(),
      contact_hours: safeString(500).optional(),
      // Social
      instagram_url: z.string().url().max(500).optional().or(z.literal('')),
      facebook_url: z.string().url().max(500).optional().or(z.literal('')),
      linkedin_url: z.string().url().max(500).optional().or(z.literal('')),
      // Imagens
      images_policy: z.enum(['vou-enviar', 'voces-escolhem', 'misto']).optional(),
      images_description: safeString(2000).optional(),
      // Domínio
      domain_name: safeString(200).optional(),
      // Observações
      final_notes: safeString(3000).optional(),
      // Confirmação
      confirmed_at: z.string().optional(),
    })
    .refine((b) => JSON.stringify(b).length <= BRIEFING_MAX_CHARS, 'Briefing muito grande'),
});
