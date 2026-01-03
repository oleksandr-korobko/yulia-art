import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Work, WorkMeta, CategorySlug, WorkNavigation } from './types';

const worksDirectory = path.join(process.cwd(), 'content/works');
const categoryOrderPath = path.join(process.cwd(), 'content/category-order.json');

/**
 * Перевіряє чи існує контент (може не існувати при першому build)
 */
function contentExists(): boolean {
  return fs.existsSync(worksDirectory);
}

/**
 * Читає category-order.json
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
 * Отримує всі slugs робіт
 */
export function getAllWorkSlugs(): string[] {
  if (!contentExists()) return [];

  const fileNames = fs.readdirSync(worksDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

/**
 * Отримує метадані всіх робіт
 */
export function getAllWorksMeta(): WorkMeta[] {
  const slugs = getAllWorkSlugs();
  return slugs.map((slug) => getWorkMeta(slug));
}

/**
 * Отримує метадані однієї роботи (без content)
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
 * Отримує повну роботу з контентом
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
 * Отримує роботи по категорії (відсортовані за category-order.json)
 */
export function getWorksByCategory(category: CategorySlug): WorkMeta[] {
  if (!contentExists()) return [];

  const order = getCategoryOrder();
  const orderedSlugs = order[category] || [];

  // Спочатку роботи в порядку з JSON
  const orderedWorks = orderedSlugs
    .map((slug) => {
      try {
        return getWorkMeta(slug);
      } catch {
        return null;
      }
    })
    .filter((work): work is WorkMeta => work !== null);

  // Потім роботи, яких немає в JSON (нові роботи)
  const allWorks = getAllWorksMeta().filter((work) =>
    work.categories.includes(category)
  );

  const unorderedWorks = allWorks.filter(
    (work) => !orderedSlugs.includes(work.slug)
  );

  return [...orderedWorks, ...unorderedWorks];
}

/**
 * Отримує featured роботи для головної сторінки
 */
export function getFeaturedWorks(): WorkMeta[] {
  if (!contentExists()) return [];

  return getAllWorksMeta()
    .filter((work) => work.featured)
    .sort((a, b) => b.year - a.year);
}

/**
 * Отримує навігацію Previous/Next в межах категорії
 */
export function getWorkNavigation(
  slug: string,
  category: CategorySlug
): WorkNavigation {
  const works = getWorksByCategory(category);
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
