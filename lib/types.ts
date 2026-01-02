export type Category =
  | 'installations'
  | 'sculptures'
  | 'paintings'
  | 'ceramics'
  | 'text-informed';

export interface CategoryInfo {
  slug: Category;
  displayName: string;
  description: string;
}

export interface Work {
  slug: string;
  title: string;
  year: number;
  category: Category;
  materials: string;
  dimensions: string;
  featured: boolean;
  coverImage: string;
  images: string[];
  order: number;
  description: string;
}

export interface WorkFrontmatter {
  title: string;
  year: number;
  category: Category;
  materials: string;
  dimensions: string;
  featured: boolean;
  coverImage: string;
  images: string[];
  order: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'installations',
    displayName: 'Installations',
    description: 'Spatial works engaging material, scale, and context to create reflective environments shaped by individual & collective experience',
  },
  {
    slug: 'sculptures',
    displayName: 'Sculptures',
    description: 'Sculptural works often using found objects to explore endurance, rupture, and material memory',
  },
  {
    slug: 'paintings',
    displayName: 'Paintings',
    description: 'Material-based paintings using natural pigments and earth imprints, where surface operates as substance',
  },
  {
    slug: 'ceramics',
    displayName: 'Ceramic Works',
    description: 'Ceramic objects ranging from singular forms to modular structures, addressing reconstruction, fragility, and continuity',
  },
  {
    slug: 'text-informed',
    displayName: 'Text-Informed & Archival Works',
    description: 'Works engaging text, archival materials, photographs, and moving images to examine memory, history, and lived experience',
  },
];
