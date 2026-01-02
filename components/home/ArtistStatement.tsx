import Image from 'next/image';
import { getArtistStatementContent } from '@/lib/content';

export function ArtistStatement() {
  const statement = getArtistStatementContent();
  const paragraphs = statement.content.split('\n\n');

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-24 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
              <Image
                alt="Artist at work"
                src={statement.image}
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base font-light leading-relaxed text-gray-700">
              <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                {statement.title}
              </h2>
              <div className="mt-6 space-y-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
