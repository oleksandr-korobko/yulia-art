import Link from 'next/link';
import Image from 'next/image';
import { getNewFeaturedWorks } from '@/lib/content';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';

export default function NotFound() {
  const featuredWorks = getNewFeaturedWorks().slice(0, 3);

  return (
    <main className="min-h-[80vh] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 404 Header */}
        <div className="text-center mb-16">
          <h1 className="text-8xl font-light text-gray-200 mb-4">404</h1>
          <h2 className="text-3xl font-light text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Featured Works */}
        {featuredWorks.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
              Explore Featured Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredWorks.map((work) => (
                <Link
                  key={work.slug}
                  href={`/works/${work.slug}`}
                  className="group block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4 rounded-lg">
                    <Image
                      src={work.coverImage}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                    {work.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{work.year}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Browse by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORY_ORDER.map((slug) => {
              const category = CATEGORIES[slug];
              return (
                <Link
                  key={slug}
                  href={`/works/${slug}`}
                  className="block text-center py-4 px-6 border border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="text-sm font-light text-gray-900">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-light rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Return Home
          </Link>
          <Link
            href="/works"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-900 text-sm font-light rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            View All Works
          </Link>
          <Link
            href="/about"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-900 text-sm font-light rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            About the Artist
          </Link>
        </div>
      </div>
    </main>
  );
}
