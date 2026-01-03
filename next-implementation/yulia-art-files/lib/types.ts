// Категорії робіт
export type CategorySlug =
  | 'installations'
  | 'sculptures'
  | 'paintings'
  | 'ceramics'
  | 'text-informed';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

// Метадані роботи (frontmatter)
export interface WorkMeta {
  title: string;
  slug: string; // генерується з назви файлу
  year: number;
  categories: CategorySlug[];
  materials: string;
  dimensions: string;
  coverImage: string;
  images: string[];
  shortDescription: string;
  featured: boolean;
}

// Повна робота (з markdown контентом)
export interface Work extends WorkMeta {
  content: string; // HTML з markdown
}

// Для навігації Previous/Next
export interface WorkNavigation {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}
