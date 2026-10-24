import type { ComponentType } from 'react';
import { RestauranteTemplate } from './restaurante';
import { BarbeariaTemplate } from './barbearia';
import { CursoTemplate } from './curso';
import { PortfolioTemplate } from './portfolio';
import { LojaTemplate } from './loja';
import { SaasTemplate } from './saas';
import { FitnessTemplate } from './fitness';
import { ImobiliariaTemplate } from './imobiliaria';

export interface DemoTemplate {
  slug: string;
  name: string;
  category: string;
  description: string;
  Component: ComponentType;
}

export const DEMO_TEMPLATES: Record<string, DemoTemplate> = {
  restaurante: {
    slug: 'restaurante',
    name: 'Sabor da Casa',
    category: 'Restaurante',
    description: 'Site para restaurantes e delivery — cardápio, horários e pedido no WhatsApp.',
    Component: RestauranteTemplate,
  },
  barbearia: {
    slug: 'barbearia',
    name: 'Barber Studio',
    category: 'Barbearia',
    description: 'Site para barbearia e salão — serviços, equipe e agendamento rápido.',
    Component: BarbeariaTemplate,
  },
  curso: {
    slug: 'curso',
    name: 'Academia Online',
    category: 'Cursos',
    description: 'Página de curso online — hero, módulos, depoimentos e inscrição.',
    Component: CursoTemplate,
  },
  portfolio: {
    slug: 'portfolio',
    name: 'Portfolio Studio',
    category: 'Portfólio',
    description: 'Portfólio profissional minimalista — bio, projetos e contato.',
    Component: PortfolioTemplate,
  },
  loja: {
    slug: 'loja',
    name: 'Loja Boutique',
    category: 'E-commerce',
    description: 'Vitrine de produtos com pedido via WhatsApp — ideal para pequenos lojistas.',
    Component: LojaTemplate,
  },
  saas: {
    slug: 'saas',
    name: 'Linear SaaS',
    category: 'SaaS',
    description: 'Landing page de produto SaaS — hero com screenshot, features, planos e social proof.',
    Component: SaasTemplate,
  },
  fitness: {
    slug: 'fitness',
    name: 'Forge Fitness',
    category: 'Fitness',
    description: 'Site de academia e studio fitness — aulas, estrutura, planos e matrícula.',
    Component: FitnessTemplate,
  },
  imobiliaria: {
    slug: 'imobiliaria',
    name: 'Horizonte Imóveis',
    category: 'Imobiliária',
    description: 'Site de imobiliária com busca, catálogo de imóveis, filtros e agendamento de visita.',
    Component: ImobiliariaTemplate,
  },
};

export const DEMO_SLUGS = Object.keys(DEMO_TEMPLATES);
