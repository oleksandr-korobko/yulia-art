// Категорії робіт
export type CategorySlug =
  | 'installations'
  | 'sculptures'
  | 'paintings'
  | 'ceramics'
  | 'text-informed';

// Backward compatibility
export type Category = CategorySlug;

export interface CategoryInfo {
  slug: CategorySlug;
  displayName: string;
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

// Backward compatibility - deprecated, use WorkMeta instead
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

// Backward compatibility - старий формат Work (буде видалено в Етапі 4)
export interface LegacyWork {
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

// Для навігації Previous/Next
export interface WorkNavigation {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export interface CategoryInfoWithImage extends CategoryInfo {
  previewImage: string;
  altText: string;
}

export interface HomePageContent {
  title: string;
  heroImage: string;
  heroImageAlt: string;
  artistName: string;
  content: string;
}

export interface ArtistStatementContent {
  title: string;
  image: string;
  imageAlt: string;
  content: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

export interface AboutPageContent {
  title: string;
  profileImage: string;
  profileImageAlt: string;
  downloadCvText: string;
  content: string;
}

export interface InstagramFeedContent {
  sectionTitle: string;
  sectionSubtitle: string;
  viewMoreText: string;
  posts: InstagramPost[];
}

export interface ContactPageContent {
  title: string;
  emailLabel: string;
  email: string;
  instagramLabel: string;
  instagramUrl: string;
  copyrightYear: string;
  copyrightHolder: string;
  profileImage: string;
  content: string;
}

export interface SiteConfig {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  artistName: string;
  location: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  copyright: string;
  cvFile: string;
  navigation: {
    home: string;
    works: string;
    about: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
}

export interface SelectedWorksContent {
  title: string;
  categories: CategoryInfoWithImage[];
}

export interface FeaturedWorksContent {
  title: string;
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
