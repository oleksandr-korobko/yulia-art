import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';
import {
  getWork,
  getWorksByCategorySlug,
  getAllWorkSlugs,
  getWorkNavigation,
} from '@/lib/content';
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
  const works = getWorksByCategorySlug(slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      {/* Back link */}
      <Link
        href="/works"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-12"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All Works
      </Link>

      {/* Category Header */}
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-gray-500">{category.description}</p>
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
              <p className="text-sm text-gray-500 mt-1">{work.year}</p>
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
              <Link
                href={`/works/${navigation.previous.slug}`}
                className="group max-w-xs"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
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
              <Link
                href={`/works/${navigation.next.slug}`}
                className="group max-w-xs text-right"
              >
                <div className="flex items-center justify-end gap-2 text-xs text-gray-400 mb-2">
                  Next
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
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
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to {categoryInfo?.name || 'Works'}
        </Link>
      </section>
    </main>
  );
}
