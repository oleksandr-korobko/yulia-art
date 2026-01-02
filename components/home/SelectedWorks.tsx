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
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
            Selected Works
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Explore works across five distinct categories
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <article
              key={category.slug}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-sm bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
            >
              <img
                alt=""
                src={categoryImages[category.slug]}
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-sm ring-1 ring-inset ring-gray-900/10" />

              <h3 className="mt-3 text-lg font-light text-white">
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
