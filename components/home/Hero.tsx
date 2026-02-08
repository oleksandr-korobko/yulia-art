import Image from 'next/image';
import { getHomePageContent } from '@/lib/content';
import { PageSection, PageContainer } from '@/components/ui/Layout';

export function Hero() {
  const homeContent = getHomePageContent();

  return (
    <PageSection spacing="none" className="pb-8 sm:pb-12">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 sm:py-20 lg:px-8 lg:py-32 lg:pr-16">
            <p className="max-w-xl text-lg font-light leading-[2] tracking-wide text-gray-900 sm:text-xl sm:leading-[2] lg:text-xl lg:leading-[2]">
              {homeContent.content}
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              alt={homeContent.heroImageAlt}
              src={homeContent.heroImage}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </PageContainer>
    </PageSection>
  );
}
