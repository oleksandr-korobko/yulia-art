import Image from 'next/image';
import { getHomePageContent } from '@/lib/content';

export function Hero() {
  const homeContent = getHomePageContent();

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 sm:py-20 lg:px-8 lg:py-32 lg:pr-16">
            <p className="max-w-xl text-lg font-light leading-[2] tracking-wide text-gray-900 sm:text-xl sm:leading-[2] lg:text-xl lg:leading-[2]">
              {homeContent.content}
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              alt={homeContent.heroImageAlt}
              src={homeContent.heroImage}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
