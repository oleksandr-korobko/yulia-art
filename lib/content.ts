import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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
  InstagramFeedContent,
  ContactPageContent,
} from './types';

const contentDirectory = path.join(process.cwd(), 'content');

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
