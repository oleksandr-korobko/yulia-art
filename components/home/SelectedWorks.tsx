import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';

const categoryImages = {
  installations: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=3270&auto=format&fit=crop',
  sculptures: 'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?q=80&w=3270&auto=format&fit=crop',
  paintings: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=3272&auto=format&fit=crop',
  ceramics: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=3270&auto=format&fit=crop',
  'text-informed': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=3270&auto=format&fit=crop',
};

export function SelectedWorks() {
  const [firstRow, secondRow] = [CATEGORIES.slice(0, 2), CATEGORIES.slice(2)];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="mt-2 max-w-lg text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
          Selected Works
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {firstRow.map((category) => (
            <article
              key={category.slug}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-lg bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:col-span-3 lg:pt-80"
            >
              <img
                alt=""
                src={categoryImages[category.slug]}
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-lg ring-1 ring-inset ring-gray-900/10" />

              <h3 className="text-lg font-light tracking-wide text-white">
                <Link href={`/works/${category.slug}`}>
                  <span className="absolute inset-0" />
                  {category.displayName}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                {category.description}
              </p>
            </article>
          ))}
          {secondRow.map((category) => (
            <article
              key={category.slug}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-lg bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:col-span-2 lg:pt-80"
            >
              <img
                alt=""
                src={categoryImages[category.slug]}
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-lg ring-1 ring-inset ring-gray-900/10" />

              <h3 className="text-lg font-light tracking-wide text-white">
                <Link href={`/works/${category.slug}`}>
                  <span className="absolute inset-0" />
                  {category.displayName}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
