import Image from 'next/image';
import { getArtistStatementContent } from '@/lib/content';
import { PageSection, PageContainer } from '@/components/ui/Layout';

export function ArtistStatement() {
  const statement = getArtistStatementContent();
  const paragraphs = statement.content.split('\n\n');

  return (
    <PageSection spacing="none" className="pb-8 sm:pb-12">
      <PageContainer>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:gap-y-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
              <Image
                alt={statement.imageAlt}
                src={statement.image}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base font-light leading-relaxed text-gray-700">
              <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                {statement.title}
              </h2>
              <div className="mt-6 space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </PageSection>
  );
}
