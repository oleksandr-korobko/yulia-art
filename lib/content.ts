import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import {
  LegacyWork,
  WorkFrontmatter,
  Category,
  CategoryInfoWithImage,
  HomePageContent,
  ArtistStatementContent,
  AboutPageContent,
  SiteConfig,
  SelectedWorksContent,
  FeaturedWorksContent,
  InstagramFeedContent,
  ContactPageContent,
  Work,
  WorkMeta,
  CategorySlug,
  WorkNavigation,
} from './types';

const contentDirectory = path.join(process.cwd(), 'content');
const worksDirectory = path.join(process.cwd(), 'content/works');
const categoryOrderPath = path.join(process.cwd(), 'content/category-order.json');

/**
 * Read and parse a markdown file
 */
function readMarkdownFile<T>(filePath: string): { data: T; content: string } {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data: data as T, content };
}

/**
 * Get home page content
 */
export function getHomePageContent(): HomePageContent {
  const { data, content } = readMarkdownFile<Omit<HomePageContent, 'content'>>('pages/main/home.md');
  return { ...data, content };
}

/**
 * Get artist statement content
 */
export function getArtistStatementContent(): ArtistStatementContent {
  const { data, content } = readMarkdownFile<Omit<ArtistStatementContent, 'content'>>('pages/main/artist-statement.md');
  return { ...data, content };
}

/**
 * Get about page content
 */
export function getAboutPageContent(): AboutPageContent {
  const { data, content } = readMarkdownFile<Omit<AboutPageContent, 'content'>>('pages/about.md');
  return { ...data, content };
}

/**
 * Get Instagram feed content
 */
export function getInstagramFeedContent(): InstagramFeedContent {
  const { data } = readMarkdownFile<InstagramFeedContent>('instagram-feed.md');
  return data;
}

/**
 * Get contact page content
 */
export function getContactPageContent(): ContactPageContent {
  const { data, content } = readMarkdownFile<Omit<ContactPageContent, 'content'>>('pages/contact.md');
  return { ...data, content };
}

/**
 * Get site configuration
 */
export function getSiteConfig(): SiteConfig {
  const { data } = readMarkdownFile<SiteConfig>('site-config.md');
  return data;
}

/**
 * Get Selected Works section content
 */
export function getSelectedWorksContent(): SelectedWorksContent {
  const { data } = readMarkdownFile<SelectedWorksContent>('pages/main/selected-works.md');
  return data;
}

/**
 * Get Featured Works section content
 */
export function getFeaturedWorksContent(): FeaturedWorksContent {
  const { data } = readMarkdownFile<FeaturedWorksContent>('pages/main/featured-works.md');
  return data;
}

/**
 * Get categories with preview images
 * @deprecated Use getSelectedWorksContent() instead
 */
export function getCategoriesWithImages(): CategoryInfoWithImage[] {
  const content = getSelectedWorksContent();
  return content.categories;
}

/**
 * Get all works for a specific category
 */
export function getWorksByCategory(category: Category): LegacyWork[] {
  const worksDirectory = path.join(contentDirectory, 'works', category);

  if (!fs.existsSync(worksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worksDirectory);
  const works = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join('works', category, fileName);
      const { data, content } = readMarkdownFile<WorkFrontmatter>(filePath);

      return {
        slug,
        ...data,
        description: content,
      } as LegacyWork;
    })
    .sort((a, b) => a.order - b.order);

  return works;
}

/**
 * Get all works across all categories
 */
export function getAllWorks(): LegacyWork[] {
  const categories: Category[] = ['installations', 'sculptures', 'paintings', 'ceramics', 'text-informed'];
  const allWorks: LegacyWork[] = [];

  categories.forEach((category) => {
    const works = getWorksByCategory(category);
    allWorks.push(...works);
  });

  return allWorks.sort((a, b) => a.order - b.order);
}

/**
 * Get featured works (for homepage)
 */
export function getFeaturedWorks(): LegacyWork[] {
  const allWorks = getAllWorks();
  return allWorks.filter((work) => work.featured);
}

/**
 * Get a single work by category and slug
 */
export function getWorkBySlug(category: Category, slug: string): LegacyWork | null {
  const filePath = path.join('works', category, `${slug}.md`);
  const fullPath = path.join(contentDirectory, filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { data, content } = readMarkdownFile<WorkFrontmatter>(filePath);

  return {
    slug,
    ...data,
    description: content,
  } as LegacyWork;
}

/**
 * Get all work slugs for a category (for static generation)
 */
export function getWorkSlugs(category: Category): string[] {
  const worksDirectory = path.join(contentDirectory, 'works', category);

  if (!fs.existsSync(worksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worksDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

// ============================================================================
// NEW WORKS SYSTEM FUNCTIONS (2-repo architecture)
// ============================================================================

/**
 * Перевіряє чи існує контент (може не існувати при першому build)
 */
function contentExists(): boolean {
  return fs.existsSync(worksDirectory);
}

/**
 * Reads category-order.json
 */
function getCategoryOrder(): Record<CategorySlug, string[]> {
  if (!fs.existsSync(categoryOrderPath)) {
    return {
      installations: [],
      sculptures: [],
      paintings: [],
      ceramics: [],
      'text-informed': [],
    };
  }
  const fileContents = fs.readFileSync(categoryOrderPath, 'utf8');
  return JSON.parse(fileContents);
}

/**
 * Get all work slugs
 */
export function getAllWorkSlugs(): string[] {
  if (!contentExists()) return [];

  const fileNames = fs.readdirSync(worksDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

/**
 * Get metadata for all works
 */
export function getAllWorksMeta(): WorkMeta[] {
  const slugs = getAllWorkSlugs();
  return slugs.map((slug) => getWorkMeta(slug));
}

/**
 * Get metadata for a single work (without content)
 */
export function getWorkMeta(slug: string): WorkMeta {
  const fullPath = path.join(worksDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    ...data,
    slug,
  } as WorkMeta;
}

/**
 * Get full work with content (async)
 */
export async function getWork(slug: string): Promise<Work> {
  const fullPath = path.join(worksDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);

  return {
    ...data,
    slug,
    content: processedContent.toString(),
  } as Work;
}

/**
 * Get works by category (sorted by category-order.json)
 */
export function getWorksByCategorySlug(category: CategorySlug): WorkMeta[] {
  if (!contentExists()) return [];

  const order = getCategoryOrder();
  const orderedSlugs = order[category] || [];

  // First, works in order from JSON
  const orderedWorks = orderedSlugs
    .map((slug) => {
      try {
        return getWorkMeta(slug);
      } catch {
        return null;
      }
    })
    .filter((work): work is WorkMeta => work !== null);

  // Then, works not in JSON (new works)
  const allWorks = getAllWorksMeta().filter((work) =>
    work.categories.includes(category)
  );

  const unorderedWorks = allWorks.filter(
    (work) => !orderedSlugs.includes(work.slug)
  );

  return [...orderedWorks, ...unorderedWorks];
}

/**
 * Get featured works for homepage
 */
export function getNewFeaturedWorks(): WorkMeta[] {
  if (!contentExists()) return [];

  return getAllWorksMeta()
    .filter((work) => work.featured)
    .sort((a, b) => b.year - a.year);
}

/**
 * Get Previous/Next navigation within category
 */
export function getWorkNavigation(
  slug: string,
  category: CategorySlug
): WorkNavigation {
  const works = getWorksByCategorySlug(category);
  const currentIndex = works.findIndex((w) => w.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous =
    currentIndex > 0
      ? {
          slug: works[currentIndex - 1].slug,
          title: works[currentIndex - 1].title,
        }
      : null;

  const next =
    currentIndex < works.length - 1
      ? {
          slug: works[currentIndex + 1].slug,
          title: works[currentIndex + 1].title,
        }
      : null;

  return { previous, next };
}
