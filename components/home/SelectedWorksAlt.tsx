import Link from 'next/link';
import Image from 'next/image';
import { getSelectedWorksContent } from '@/lib/content';
import { PageSection, PageContainer } from '@/components/ui/Layout';

export function SelectedWorksAlt() {
  const selectedWorks = getSelectedWorksContent();
  const [firstRow, secondRow] = [selectedWorks.categories.slice(0, 2), selectedWorks.categories.slice(2)];

  return (
    <PageSection spacing="none" className="pb-8 sm:pb-12">
      <PageContainer>
        <h2 className="max-w-lg text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
          {selectedWorks.title}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 lg:grid-cols-6 lg:grid-rows-2">
          {firstRow.map((category, index) => (
            <article
              key={category.slug}
              className="group lg:col-span-3"
            >
              <Link href={`/works/${category.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 transition-all duration-300 group-hover:shadow-lg">
                  <Image
                    alt={category.altText}
                    src={category.previewImage}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                {/* Text Content - Outside Image */}
                <div>
                  <h3 className="text-xl font-light tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                    {category.displayName}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
          {secondRow.map((category) => (
            <article
              key={category.slug}
              className="group lg:col-span-2"
            >
              <Link href={`/works/${category.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 transition-all duration-300 group-hover:shadow-lg">
                  <Image
                    alt={category.altText}
                    src={category.previewImage}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>

                {/* Text Content - Outside Image */}
                <div>
                  <h3 className="text-lg font-light tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                    {category.displayName}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}
