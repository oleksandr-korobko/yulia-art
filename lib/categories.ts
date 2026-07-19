import { CategorySlug } from './types';

// Category interface for the categories system
export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  installations: {
    slug: 'installations',
    name: 'Installations & Performance',
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

// Type guard to check if a string is a valid CategorySlug
export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in CATEGORIES;
}

// Get category by slug
export function getCategoryBySlug(slug: CategorySlug): Category {
  return CATEGORIES[slug];
}

// Get all categories in order
export function getAllCategories(): Category[] {
  return CATEGORY_ORDER.map(slug => CATEGORIES[slug]);
}
