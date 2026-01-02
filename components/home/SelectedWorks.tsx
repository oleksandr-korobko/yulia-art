import Link from 'next/link';
import { getCategoriesWithImages } from '@/lib/content';

export function SelectedWorks() {
  const categories = getCategoriesWithImages();
  const [firstRow, secondRow] = [categories.slice(0, 2), categories.slice(2)];

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
                src={category.previewImage}
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
                src={category.previewImage}
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
