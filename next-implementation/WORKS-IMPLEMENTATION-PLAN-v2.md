# WORKS Implementation Plan for Claude Code (v2)

## Огляд

Цей документ — покрокова інструкція для Claude Code.
Кожен етап = один commit.
Не переходь до наступного етапу поки поточний не працює.

---

## Архітектура: Два репозиторії

```
yulia-art/                    ← КОД (доступ: тільки розробник)
├── app/
├── components/
├── lib/
├── scripts/
│   └── fetch-content.ts      ← завантажує контент при build
└── public/

yulia-art-content/            ← КОНТЕНТ (доступ: Юля + розробник)
├── works/
│   ├── the-escape.md
│   └── ...
├── category-order.json
├── images/
│   └── works/
│       ├── the-escape/
│       └── ...
└── .github/
    └── workflows/
        └── trigger-deploy.yml  ← автодеплой при зміні
```

**Чому так:**
- Юля не може зламати код
- Юля редагує тільки контент
- Зміна контенту → автоматичний rebuild сайту

---

## ЕТАП 0: Створення репозиторіїв

### Мета
Створити два GitHub репозиторії та налаштувати зв'язок.

### Крок 0.1: Створити контент-репозиторій

На GitHub створи новий репозиторій:
- **Name:** `yulia-art-content`
- **Visibility:** Private (або Public, якщо Юля не проти)
- **Initialize:** з README

### Крок 0.2: Структура контент-репозиторію

```bash
# Клонуй контент-репо
git clone git@github.com:YOUR_USERNAME/yulia-art-content.git
cd yulia-art-content

# Створи структуру
mkdir -p works
mkdir -p images/works
touch category-order.json
```

### Крок 0.3: Vercel Deploy Hook

1. Зайди в Vercel → твій проект yulia-art
2. Settings → Git → Deploy Hooks
3. Create Hook:
   - **Name:** `content-update`
   - **Branch:** `main`
4. Скопіюй URL (виглядає як `https://api.vercel.com/v1/integrations/deploy/prj_xxx/xxx`)

### Крок 0.4: GitHub Action для автодеплою

У `yulia-art-content` репозиторії:

**Файл: `.github/workflows/trigger-deploy.yml`**

```yaml
name: Trigger Vercel Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        run: |
          curl -X POST "${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

### Крок 0.5: Додати secret

1. GitHub → `yulia-art-content` → Settings → Secrets and variables → Actions
2. New repository secret:
   - **Name:** `VERCEL_DEPLOY_HOOK`
   - **Value:** URL з кроку 0.3

### Крок 0.6: Налаштувати доступ для Юлі

1. GitHub → `yulia-art-content` → Settings → Collaborators
2. Add people → додай Юлін GitHub акаунт
3. Role: **Write** (може редагувати, але не видаляти репо)

### Тестування
- Push зміну в `yulia-art-content`
- Перевір що Vercel почав новий build

### Commit (в обох репо)
```
chore: initial repository setup
```

---

## ЕТАП 1: Типи та структура даних

### Мета
Створити TypeScript типи для робіт та категорій.

### Репозиторій: `yulia-art` (код)

### Файл: `lib/types.ts`

```typescript
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
  slug: string;  // генерується з назви файлу
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
  content: string;  // HTML з markdown
}

// Для навігації Previous/Next
export interface WorkNavigation {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}
```

### Файл: `lib/categories.ts`

```typescript
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
```

### Тестування
- `npm run build` — без помилок типів

### Commit
```
feat(types): add Work and Category types
```

---

## ЕТАП 2: Скрипт для завантаження контенту

### Мета
Створити скрипт який завантажує контент з GitHub при build.

### Репозиторій: `yulia-art` (код)

### Залежності

```bash
npm install -D tsx
```

### Файл: `scripts/fetch-content.ts`

```typescript
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CONTENT_REPO = 'YOUR_USERNAME/yulia-art-content';
const CONTENT_BRANCH = 'main';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const IMAGES_DIR = path.join(process.cwd(), 'public/images');

async function fetchContent() {
  console.log('📥 Fetching content from GitHub...');

  // Видаляємо стару папку content якщо є
  if (fs.existsSync(CONTENT_DIR)) {
    fs.rmSync(CONTENT_DIR, { recursive: true });
  }

  // Клонуємо контент-репо (shallow clone для швидкості)
  const tempDir = path.join(process.cwd(), '.content-temp');
  
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }

  try {
    execSync(
      `git clone --depth 1 --branch ${CONTENT_BRANCH} https://github.com/${CONTENT_REPO}.git ${tempDir}`,
      { stdio: 'inherit' }
    );

    // Копіюємо works та category-order.json в content/
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    
    const worksSource = path.join(tempDir, 'works');
    const worksDest = path.join(CONTENT_DIR, 'works');
    if (fs.existsSync(worksSource)) {
      fs.cpSync(worksSource, worksDest, { recursive: true });
      console.log('✅ Copied works/');
    }

    const orderSource = path.join(tempDir, 'category-order.json');
    const orderDest = path.join(CONTENT_DIR, 'category-order.json');
    if (fs.existsSync(orderSource)) {
      fs.copyFileSync(orderSource, orderDest);
      console.log('✅ Copied category-order.json');
    }

    // Копіюємо images в public/images/
    const imagesSource = path.join(tempDir, 'images');
    if (fs.existsSync(imagesSource)) {
      fs.cpSync(imagesSource, IMAGES_DIR, { recursive: true });
      console.log('✅ Copied images/');
    }

    // Видаляємо тимчасову папку
    fs.rmSync(tempDir, { recursive: true });

    console.log('🎉 Content fetched successfully!');
  } catch (error) {
    console.error('❌ Failed to fetch content:', error);
    process.exit(1);
  }
}

fetchContent();
```

### Оновити `package.json`

```json
{
  "scripts": {
    "fetch-content": "tsx scripts/fetch-content.ts",
    "prebuild": "npm run fetch-content",
    "dev": "npm run fetch-content && next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Додати в `.gitignore`

```
# Content (fetched from yulia-art-content repo)
/content/
/.content-temp/
```

### Для локальної розробки (альтернатива)

Якщо не хочеш fetch кожен раз при `npm run dev`, можеш:

```bash
# Клонуй контент-репо поруч
cd ..
git clone git@github.com:YOUR_USERNAME/yulia-art-content.git

# Створи symlink
cd yulia-art
ln -s ../yulia-art-content/works content/works
ln -s ../yulia-art-content/category-order.json content/category-order.json
ln -s ../yulia-art-content/images public/images
```

Або просто запускай `npm run fetch-content` вручну коли треба оновити.

### Тестування

```bash
npm run fetch-content
# Перевір що з'явилась папка content/ з файлами
```

### Commit
```
feat(scripts): add content fetching from GitHub
```

---

## ЕТАП 3: Наповнення контент-репозиторію

### Мета
Створити тестові markdown файли та зображення.

### Репозиторій: `yulia-art-content`

### Файл: `works/the-escape.md`

```markdown
---
title: "The Escape"
year: 2024
categories: ["installations", "text-informed"]
materials: "Mixed media, clothing, suitcase, stroller, personal belongings"
dimensions: "Variable, approximately 3m × 2m × 2m"
coverImage: "/images/works/the-escape/cover.jpg"
images:
  - "/images/works/the-escape/01.jpg"
  - "/images/works/the-escape/02.jpg"
  - "/images/works/the-escape/03.jpg"
shortDescription: "An installation exploring displacement and forced migration through personal belongings left behind."
featured: true
---

The Escape captures a frozen moment of displacement—the instant when a family must abandon their home with only what they can carry. The installation features actual belongings: a stroller, children's clothing, winter coats, and a suitcase, arranged as shadows against a white wall.

Each object carries the weight of memory and the trauma of forced departure. The deliberate arrangement creates ghostly silhouettes, suggesting presence through absence—the family is gone, but their traces remain.

This work draws from the artist's personal experience of leaving Ukraine and witnessing countless others make the same impossible journey.
```

### Файл: `works/lego-blocks.md`

```markdown
---
title: "Lego Blocks"
year: 2023
categories: ["sculptures"]
materials: "Found Lego pieces, metal armature"
dimensions: "45cm × 30cm × 30cm"
coverImage: "/images/works/lego-blocks/cover.jpg"
images:
  - "/images/works/lego-blocks/01.jpg"
  - "/images/works/lego-blocks/02.jpg"
shortDescription: "A sculptural exploration of childhood memory and reconstruction."
featured: true
---

Lego Blocks transforms discarded toys into a meditation on memory, play, and the act of building. Each piece was collected from different sources—charity shops, donations, forgotten collections—carrying traces of unknown childhoods.

The sculpture exists in perpetual incompletion, suggesting both destruction and the possibility of rebuilding.
```

### Файл: `works/red-painting-01.md`

```markdown
---
title: "Untitled (Red)"
year: 2024
categories: ["paintings"]
materials: "Kumkum, sindur, natural pigments on canvas"
dimensions: "120cm × 100cm"
coverImage: "/images/works/red-painting-01/cover.jpg"
images:
  - "/images/works/red-painting-01/01.jpg"
shortDescription: "A material painting using traditional South Asian pigments."
featured: false
---

This painting functions not as representation but as material presence. Created through layered applications of kumkum and sindur—pigments traditionally used in South Asian religious and cultural practices—the surface accumulates meaning through process rather than image.

The work explores colour as substance, ritual as method, and painting as object rather than window.
```

### Файл: `category-order.json`

```json
{
  "installations": [
    "the-escape"
  ],
  "sculptures": [
    "lego-blocks"
  ],
  "paintings": [
    "red-painting-01"
  ],
  "ceramics": [],
  "text-informed": [
    "the-escape"
  ]
}
```

### Placeholder зображення

Створи структуру папок та додай placeholder зображення:

```
images/
└── works/
    ├── the-escape/
    │   ├── cover.jpg    (800x1000px)
    │   ├── 01.jpg       (1400x900px)
    │   ├── 02.jpg       (1400x900px)
    │   └── 03.jpg       (1400x900px)
    ├── lego-blocks/
    │   ├── cover.jpg
    │   ├── 01.jpg
    │   └── 02.jpg
    └── red-painting-01/
        ├── cover.jpg
        └── 01.jpg
```

**Для placeholder можеш використати:**
- https://unsplash.com (безкоштовні фото)
- https://placeholder.com (сірі квадрати)
- Або реальні фото від Юлі якщо вже є

### Commit
```
content: add sample works and category order
```

---

## ЕТАП 4: Бібліотека для читання контенту

### Мета
Створити функції для читання markdown файлів.

### Репозиторій: `yulia-art` (код)

### Залежності

```bash
npm install gray-matter remark remark-html
```

### Файл: `lib/content.ts`

```typescript
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
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  
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
  const allWorks = getAllWorksMeta().filter(
    (work) => work.categories.includes(category)
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
  
  const previous = currentIndex > 0 
    ? { slug: works[currentIndex - 1].slug, title: works[currentIndex - 1].title }
    : null;
    
  const next = currentIndex < works.length - 1
    ? { slug: works[currentIndex + 1].slug, title: works[currentIndex + 1].title }
    : null;
  
  return { previous, next };
}
```

### Тестування

```bash
npm run fetch-content
npm run dev
# Відкрий консоль, імпортуй функції, перевір що повертають дані
```

### Commit
```
feat(lib): add content reading utilities
```

---

## ЕТАП 5: Сторінка /works (категорії)

### Мета
Створити головну сторінку Works.

### Репозиторій: `yulia-art` (код)

### Файл: `app/works/page.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';
import { getWorksByCategory } from '@/lib/content';

export const metadata = {
  title: 'Works — Yuliia Holovatiuk-Ungureanu',
  description: 'Explore artworks across installations, sculptures, paintings, ceramics, and text-informed works.',
};

export default function WorksPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      
      <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-16">
        Works
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORY_ORDER.map((slug) => {
          const category = CATEGORIES[slug];
          const works = getWorksByCategory(slug);
          const coverWork = works[0];
          
          return (
            <Link
              key={slug}
              href={`/works/${slug}`}
              className="group block"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
                {coverWork ? (
                  <Image
                    src={coverWork.coverImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    No works yet
                  </div>
                )}
              </div>
              
              {/* Category Info */}
              <h2 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {works.length} {works.length === 1 ? 'work' : 'works'}
              </p>
            </Link>
          );
        })}
      </div>

    </main>
  );
}
```

### Тестування
- `npm run dev`
- Відкрий `/works`
- Бачиш 5 категорій з cover images

### Commit
```
feat(works): add works index page with categories
```

---

## ЕТАП 6: Динамічна сторінка /works/[slug]

### Мета
Одна динамічна сторінка для категорій І робіт.

### Важливо: Routing Logic

Next.js не може мати одночасно:
- `app/works/[category]/page.tsx`
- `app/works/[slug]/page.tsx`

**Рішення:** Один файл `app/works/[slug]/page.tsx` який визначає що показувати.

### Репозиторій: `yulia-art` (код)

### Файл: `app/works/[slug]/page.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';
import { getWork, getWorksByCategory, getAllWorkSlugs, getWorkNavigation } from '@/lib/content';
import { CategorySlug } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

// Генеруємо статичні шляхи для категорій і робіт
export async function generateStaticParams() {
  const categorySlugs = CATEGORY_ORDER.map((slug) => ({ slug }));
  const workSlugs = getAllWorkSlugs().map((slug) => ({ slug }));
  return [...categorySlugs, ...workSlugs];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  
  // Якщо це категорія
  if (slug in CATEGORIES) {
    const category = CATEGORIES[slug as CategorySlug];
    return {
      title: `${category.name} — Yuliia Holovatiuk-Ungureanu`,
      description: category.description,
    };
  }
  
  // Якщо це робота
  try {
    const work = await getWork(slug);
    return {
      title: `${work.title} — Yuliia Holovatiuk-Ungureanu`,
      description: work.shortDescription,
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  
  // Перевіряємо чи це категорія
  if (slug in CATEGORIES) {
    return <CategoryPage slug={slug as CategorySlug} />;
  }
  
  // Інакше це робота
  return <WorkPage slug={slug} />;
}

// ============================================
// CATEGORY PAGE COMPONENT
// ============================================

function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = CATEGORIES[slug];
  const works = getWorksByCategory(slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      
      {/* Back link */}
      <Link 
        href="/works"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-12"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
        </svg>
        All Works
      </Link>

      {/* Category Header */}
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-gray-500">
          {category.description}
        </p>
      </div>

      {/* Works Grid */}
      {works.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/works/${work.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
                <Image
                  src={work.coverImage}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                {work.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {work.year}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No works in this category yet.</p>
      )}

    </main>
  );
}

// ============================================
// WORK PAGE COMPONENT
// ============================================

async function WorkPage({ slug }: { slug: string }) {
  let work;
  try {
    work = await getWork(slug);
  } catch {
    notFound();
  }

  const primaryCategory = work.categories[0] as CategorySlug;
  const navigation = getWorkNavigation(work.slug, primaryCategory);
  const categoryInfo = CATEGORIES[primaryCategory];

  return (
    <main>
      
      {/* HERO: Full-width Cover Image */}
      <section className="relative">
        <div className="w-full h-[70vh] lg:h-[85vh]">
          <Image
            src={work.coverImage}
            alt={work.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* WORK INFO */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24 lg:px-8">
        
        {/* Title & Meta */}
        <div className="mb-16">
          <h1 className="font-serif text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            {work.title}
          </h1>
          
          {/* Compact meta line */}
          <p className="text-sm text-gray-500 tracking-wide">
            {work.year} · {work.materials} · {work.dimensions}
          </p>
        </div>

        {/* Categories as tags */}
        <div className="flex flex-wrap gap-3 mb-16">
          {work.categories.map((cat) => {
            const catInfo = CATEGORIES[cat as CategorySlug];
            return (
              <Link
                key={cat}
                href={`/works/${cat}`}
                className="border border-gray-300 px-4 py-2 text-xs tracking-wide text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                {catInfo?.name || cat}
              </Link>
            );
          })}
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-xs tracking-wider text-gray-400 uppercase">
              About this work
            </h2>
          </div>
          <div className="lg:col-span-9">
            <div 
              className="font-serif text-xl lg:text-2xl text-gray-800 leading-relaxed prose prose-lg prose-gray"
              dangerouslySetInnerHTML={{ __html: work.content }}
            />
          </div>
        </div>

      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="space-y-16 lg:space-y-24">
          {work.images.map((image, index) => (
            <figure key={index}>
              <Image
                src={image}
                alt={`${work.title} - View ${index + 1}`}
                width={1400}
                height={900}
                className="w-full"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* NAVIGATION: Previous / Next */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8 mt-24 lg:mt-32 pb-24">
        <div className="border-t border-gray-200 pt-12">
          <div className="flex justify-between items-start">
            
            {/* Previous */}
            {navigation.previous ? (
              <Link href={`/works/${navigation.previous.slug}`} className="group max-w-xs">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
                  </svg>
                  Previous
                </div>
                <span className="font-serif text-lg text-gray-700 group-hover:text-gray-900 transition-colors">
                  {navigation.previous.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {/* Next */}
            {navigation.next ? (
              <Link href={`/works/${navigation.next.slug}`} className="group max-w-xs text-right">
                <div className="flex items-center justify-end gap-2 text-xs text-gray-400 mb-2">
                  Next
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <span className="font-serif text-lg text-gray-700 group-hover:text-gray-900 transition-colors">
                  {navigation.next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

          </div>
        </div>
      </section>

      {/* BACK TO CATEGORY */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8 pb-16">
        <Link 
          href={`/works/${primaryCategory}`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to {categoryInfo?.name || 'Works'}
        </Link>
      </section>

    </main>
  );
}
```

### Додай шрифт Cormorant в layout

**Файл: `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yuliia Holovatiuk-Ungureanu',
  description: 'Multidisciplinary artist working across installation, sculpture, ceramics, and painting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### Tailwind config

**Файл: `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### Встанови typography plugin

```bash
npm install -D @tailwindcss/typography
```

### Тестування
- `/works/installations` — сторінка категорії
- `/works/the-escape` — сторінка роботи
- Навігація працює
- 404 для неіснуючих slug

### Commit
```
feat(works): add dynamic page for categories and works
```

---

## ЕТАП 7: Featured Works на головній

### Мета
Показати вибрані роботи на Home page.

### Репозиторій: `yulia-art` (код)

### Файл: `components/home/FeaturedWorks.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedWorks } from '@/lib/content';

export default function FeaturedWorks() {
  const works = getFeaturedWorks();
  
  if (works.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-2xl font-light text-gray-900">
          Selected Works
        </h2>
        <Link 
          href="/works"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.slice(0, 6).map((work) => (
          <Link
            key={work.slug}
            href={`/works/${work.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
              <Image
                src={work.coverImage}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
              {work.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {work.year}
            </p>
          </Link>
        ))}
      </div>

    </section>
  );
}
```

### Оновити Home page

**Файл: `app/page.tsx`**

```tsx
import Hero from '@/components/home/Hero';
import FeaturedWorks from '@/components/home/FeaturedWorks';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedWorks />
    </main>
  );
}
```

### Commit
```
feat(home): add featured works section
```

---

## ЕТАП 8: Фінальні штрихи

### Мета
404 сторінка, loading states, оптимізація.

### Файл: `app/not-found.tsx`

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-light text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-8">Page not found</p>
      <Link 
        href="/"
        className="text-sm text-gray-900 underline hover:no-underline"
      >
        Return home
      </Link>
    </main>
  );
}
```

### Файл: `app/works/loading.tsx`

```tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="animate-pulse">
        <div className="h-12 w-48 bg-gray-200 rounded mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="aspect-[4/3] bg-gray-200 rounded mb-4" />
              <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```

### Next.js config для зображень

**Файл: `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

### Checklist перед деплоєм

- [ ] `npm run build` — без помилок
- [ ] Всі сторінки відкриваються
- [ ] Зображення завантажуються
- [ ] Навігація працює
- [ ] Mobile responsive
- [ ] 404 працює

### Commit
```
chore: add 404, loading states, image config
```

---

## Порядок виконання (Summary)

| # | Етап | Репо | Commit |
|---|------|------|--------|
| 0 | Два репозиторії + webhook | обидва | `chore: initial setup` |
| 1 | Типи TypeScript | код | `feat(types): add types` |
| 2 | Скрипт fetch-content | код | `feat(scripts): add content fetching` |
| 3 | Тестовий контент | контент | `content: add sample works` |
| 4 | lib/content.ts | код | `feat(lib): add content utilities` |
| 5 | /works page | код | `feat(works): add index page` |
| 6 | /works/[slug] | код | `feat(works): add dynamic page` |
| 7 | Featured works | код | `feat(home): add featured works` |
| 8 | Polish | код | `chore: polish` |

---

## Тестування автодеплою

Після завершення всіх етапів:

1. Зроби зміну в `yulia-art-content` (наприклад, зміни title в md файлі)
2. Push в main
3. Перевір GitHub Actions — має запуститись workflow
4. Перевір Vercel — має почати новий build
5. Через 1-2 хвилини — сайт оновлений

---

## Готово!

Тепер маєш:

✅ Два репозиторії (код + контент)  
✅ Автодеплой при зміні контенту  
✅ Юля може редагувати без доступу до коду  
✅ Повноцінну Works систему  
