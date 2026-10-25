import type { ComponentType } from 'react';
import { RestauranteTemplate } from './restaurante';
import { BarbeariaTemplate } from './barbearia';
import { CursoTemplate } from './curso';
import { PortfolioTemplate } from './portfolio';
import { LojaTemplate } from './loja';
import { SaasTemplate } from './saas';
import { FitnessTemplate } from './fitness';
import { ImobiliariaTemplate } from './imobiliaria';
import { Restaurante2Template } from './restaurante-2';
import { Barbearia2Template } from './barbearia-2';
import { Curso2Template } from './curso-2';
import { Portfolio2Template } from './portfolio-2';
import { Loja2Template } from './loja-2';
import { ClinicaTemplate } from './clinica';
import { AdvocaciaTemplate } from './advocacia';
import { PetshopTemplate } from './petshop';
import { EventosTemplate } from './eventos';

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
  'restaurante-2': {
    slug: 'restaurante-2',
    name: 'Comida Sincera',
    category: 'Restaurante',
    description: 'Restaurante de comida brasileira rústica — fogão a lenha, pratos do dia, história familiar.',
    Component: Restaurante2Template,
  },
  'barbearia-2': {
    slug: 'barbearia-2',
    name: 'Barbearia Seu Henrique',
    category: 'Barbearia',
    description: 'Barbearia vintage/tradicional — estética clássica, tipografia serifada, cores quentes.',
    Component: Barbearia2Template,
  },
  'curso-2': {
    slug: 'curso-2',
    name: 'Mentoria da Mariana',
    category: 'Cursos',
    description: 'Curso com estilo de creator individual — pessoal, caloroso, prova social com fotos reais.',
    Component: Curso2Template,
  },
  'portfolio-2': {
    slug: 'portfolio-2',
    name: 'nova.dev Portfolio',
    category: 'Portfólio',
    description: 'Portfólio tech dark com projetos alternados, acentos neon e visual futurista.',
    Component: Portfolio2Template,
  },
  'loja-2': {
    slug: 'loja-2',
    name: 'Empório Direto',
    category: 'E-commerce',
    description: 'Mercado online de produtores artesanais — vitrine de produtos, newsletter e selo de frete grátis.',
    Component: Loja2Template,
  },
  clinica: {
    slug: 'clinica',
    name: 'Clínica Vida+',
    category: 'Clínica',
    description: 'Clínica multiespecialidade com agendamento de consulta interativo (especialidade, médico, horário).',
    Component: ClinicaTemplate,
  },
  advocacia: {
    slug: 'advocacia',
    name: 'Alves & Martins Advocacia',
    category: 'Advocacia',
    description: 'Escritório de advocacia com áreas de atuação, cases e formulário multi-step de consultoria.',
    Component: AdvocaciaTemplate,
  },
  petshop: {
    slug: 'petshop',
    name: 'AuAu+ Pet Shop',
    category: 'Pet shop',
    description: 'Pet shop com agendamento de banho/tosa por porte do pet e loja de produtos com carrinho.',
    Component: PetshopTemplate,
  },
  eventos: {
    slug: 'eventos',
    name: 'Haut Événement',
    category: 'Eventos',
    description: 'Cerimonial de eventos com calculadora de orçamento ao vivo (convidados, espaço, extras).',
    Component: EventosTemplate,
  },
};

export const DEMO_SLUGS = Object.keys(DEMO_TEMPLATES);
