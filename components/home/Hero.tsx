import Image from 'next/image';
import { getHomePageContent } from '@/lib/content';

export function Hero() {
  const homeContent = getHomePageContent();

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20 lg:max-w-7xl lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-light tracking-wide text-gray-900 sm:text-5xl lg:text-6xl">
              YULIIA HOLOVATIUK-UNGUREANU
            </h1>
            <p className="mt-10 text-lg font-light leading-relaxed text-gray-600 sm:text-xl lg:mt-12 lg:text-2xl">
              {homeContent.content}
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              alt="Artist workspace"
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
