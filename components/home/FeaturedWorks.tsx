import Link from 'next/link';
import Image from 'next/image';
import { getNewFeaturedWorks, getFeaturedWorksContent } from '@/lib/content';
import { PageSection, PageContainer } from '@/components/ui/Layout';

export default function FeaturedWorks() {
  const works = getNewFeaturedWorks();
  const content = getFeaturedWorksContent();

  if (works.length === 0) return null;

  return (
    <PageSection spacing="sm">
      <PageContainer>
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl font-light text-gray-900">{content.title}</h2>
        <Link href="/works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.slice(0, 6).map((work) => (
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
            <h3 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
              {work.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{work.year}</p>
          </Link>
        ))}
      </div>
      </PageContainer>
    </PageSection>
  );
}
