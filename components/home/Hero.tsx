import Image from 'next/image';
import { getHomePageContent } from '@/lib/content';

export function Hero() {
  const homeContent = getHomePageContent();

  return (
    <div className="bg-white pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-light tracking-wide text-gray-900 sm:text-5xl lg:text-6xl">
              YULIIA HOLOVATIUK-UNGUREANU
            </h1>
            <p className="mt-8 text-base font-light leading-relaxed text-gray-600 sm:text-lg">
              {homeContent.content}
            </p>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg lg:h-[500px]">
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
