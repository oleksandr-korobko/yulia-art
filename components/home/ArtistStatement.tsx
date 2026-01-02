import Image from 'next/image';
import { getArtistStatementContent } from '@/lib/content';

export function ArtistStatement() {
  const statement = getArtistStatementContent();
  const paragraphs = statement.content.split('\n\n');

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative h-[500px] overflow-hidden rounded-lg bg-gray-900 shadow-2xl lg:h-[600px]">
              <Image
                alt="Artist at work"
                src={statement.image}
                fill
                className="rounded-lg object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gray-900 mix-blend-multiply opacity-40" />
            </div>
          </div>
          <div>
            <div className="text-base font-light leading-relaxed text-gray-700 lg:max-w-lg">
              <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                {statement.title}
              </h2>
              <div className="max-w-xl">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? 'mt-6' : 'mt-8'}>
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
