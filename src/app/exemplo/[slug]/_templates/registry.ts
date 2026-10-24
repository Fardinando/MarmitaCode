import type { ComponentType } from 'react';
import { RestauranteTemplate } from './restaurante';
import { BarbeariaTemplate } from './barbearia';
import { CursoTemplate } from './curso';
import { PortfolioTemplate } from './portfolio';
import { LojaTemplate } from './loja';

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
};

export const DEMO_SLUGS = Object.keys(DEMO_TEMPLATES);
