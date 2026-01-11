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
import { ArtworkStructuredData } from '@/components/StructuredData';
import { PageTransition } from '@/components/PageTransition';
import { Gallery } from '@/components/Gallery';
import { PageContainer, Grid, Card } from '@/components/ui/Layout';

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Category page metadata
  if (slug in CATEGORIES) {
    const category = CATEGORIES[slug as CategorySlug];
    const works = getWorksByCategorySlug(slug as CategorySlug);

    // Use first work's cover image as category preview
    const previewImage = works.length > 0
      ? works[0].coverImage
      : '/og-image.jpg';

    return {
      title: category.name,
      description: category.description,

      openGraph: {
        type: 'website',
        url: `${siteUrl}/works/${slug}`,
        title: category.name,
        description: category.description,
        images: [
          {
            url: `${siteUrl}${previewImage}`,
            width: 1200,
            height: 630,
            alt: `${category.name} - Yuliia Holovatiuk-Ungureanu`,
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title: category.name,
        description: category.description,
        images: [`${siteUrl}${previewImage}`],
      },
    };
  }

  // Individual work metadata
  try {
    const work = await getWork(slug);

    return {
      title: work.title,
      description: work.shortDescription,

      openGraph: {
        type: 'article',
        url: `${siteUrl}/works/${slug}`,
        title: work.title,
        description: work.shortDescription,
        publishedTime: `${work.year}-01-01T00:00:00.000Z`,
        authors: ['Yuliia Holovatiuk-Ungureanu'],
        images: [
          {
            url: `${siteUrl}${work.coverImage}`,
            width: 1200,
            height: 630,
            alt: `${work.title} - ${work.materials}`,
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title: work.title,
        description: work.shortDescription,
        images: [`${siteUrl}${work.coverImage}`],
        creator: '@yuliia_art_uk_ua',
      },
    };
  } catch {
    return {
      title: 'Work Not Found',
    };
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
    <PageTransition>
      <main className="pt-12 lg:pt-16 pb-16 lg:pb-24">
        <PageContainer>
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
            <Grid cols={2} gap="xl">
              {works.map((work) => (
                <Card
                  key={work.slug}
                  image={work.coverImage}
                  title={work.title}
                  subtitle={work.year.toString()}
                  href={`/works/${work.slug}`}
                />
              ))}
            </Grid>
          ) : (
            <p className="text-gray-500">No works in this category yet.</p>
          )}
        </PageContainer>
      </main>
    </PageTransition>
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
    <>
      <ArtworkStructuredData work={work} />
      <PageTransition>
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
      <PageContainer maxWidth="narrow">
        <section className="py-16 lg:py-24">
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
      </PageContainer>

      {/* GALLERY */}
      <PageContainer maxWidth="wide">
        <section>
        <Gallery images={work.images} workTitle={work.title} />
        </section>
      </PageContainer>

      {/* NAVIGATION: Previous / Next */}
      <PageContainer maxWidth="wide">
        <section className="mt-24 lg:mt-32 pb-24">
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
      </PageContainer>

      {/* BACK TO CATEGORY */}
      <PageContainer maxWidth="wide">
        <section className="pb-16">
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
      </PageContainer>
        </main>
      </PageTransition>
    </>
  );
}
