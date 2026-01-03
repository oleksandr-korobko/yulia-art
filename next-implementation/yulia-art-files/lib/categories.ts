import { Category, CategorySlug } from './types';

export const CATEGORIES: Record<CategorySlug, Category> = {
  installations: {
    slug: 'installations',
    name: 'Installations',
    description: 'Spatial works engaging material, scale, and context',
  },
  sculptures: {
    slug: 'sculptures',
    name: 'Sculptures',
    description: 'Sculptural works using found objects',
  },
  paintings: {
    slug: 'paintings',
    name: 'Paintings',
    description: 'Material-based paintings using natural pigments',
  },
  ceramics: {
    slug: 'ceramics',
    name: 'Ceramic Works',
    description: 'Ceramic objects and modular structures',
  },
  'text-informed': {
    slug: 'text-informed',
    name: 'Text-Informed & Archival Works',
    description: 'Works engaging text, archival materials, photographs',
  },
};

export const CATEGORY_ORDER: CategorySlug[] = [
  'installations',
  'sculptures',
  'paintings',
  'ceramics',
  'text-informed',
];
