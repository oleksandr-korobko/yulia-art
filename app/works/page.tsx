import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';
import { getWorksByCategorySlug } from '@/lib/content';

export const metadata = {
  title: 'Works — Yuliia Holovatiuk-Ungureanu',
  description:
    'Explore artworks across installations, sculptures, paintings, ceramics, and text-informed works.',
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
          const works = getWorksByCategorySlug(slug);
          const coverWork = works[0];

          return (
            <Link key={slug} href={`/works/${slug}`} className="group block">
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
