export const siteConfig = {
  name: 'MarmitaCode',
  tagline: 'Solução entregue quentinha',
  description:
    'Sites profissionais sob medida para pequenas empresas. Templates prontos, personalização, domínio e hospedagem — tudo entregue como marmita: pronto para servir.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://marmitacode.vercel.app',
  ogImage: '/og.png',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5583996532203',
  email: 'contato@marmitacode.com',
  company: {
    name: 'MarmitaCode',
    legalName: 'MarmitaCode',
  },
};

export type SiteConfig = typeof siteConfig;
