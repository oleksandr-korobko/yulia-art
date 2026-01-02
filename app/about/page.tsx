import Image from 'next/image';
import { getAboutPageContent, getSiteConfig } from '@/lib/content';

export default function AboutPage() {
  const aboutContent = getAboutPageContent();
  const siteConfig = getSiteConfig();
  const paragraphs = aboutContent.content.split('\n\n');

  return (
    <main>
      {/* Profile Section */}
      <div className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 sm:gap-y-24 lg:grid-cols-2 lg:items-stretch">
            <div className="overflow-hidden rounded-lg bg-white">
              <Image
                alt="Yuliia Holovatiuk-Ungureanu"
                src={aboutContent.profileImage}
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="text-base font-light leading-relaxed text-gray-700">
                <h1 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                  {aboutContent.title}
                </h1>
                <div className="mt-6 space-y-6">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                  <div className="mt-10">
                    <a
                      href={siteConfig.cvFile}
                      className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-light text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                      {aboutContent.downloadCvText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Grid Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
            {aboutContent.instagramSectionTitle}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {aboutContent.instagramSectionSubtitle}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-4">
            {/* Row 1: Large + Small */}
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[0]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-4 lg:rounded-tl-4xl max-lg:rounded-t-4xl"
            >
              <img
                src={aboutContent.instagramPosts[0]?.image}
                alt="Instagram post 1"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[1]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-2 lg:rounded-tr-4xl"
            >
              <img
                src={aboutContent.instagramPosts[1]?.image}
                alt="Instagram post 2"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Row 2: Small + Large */}
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[2]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-2"
            >
              <img
                src={aboutContent.instagramPosts[2]?.image}
                alt="Instagram post 3"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[3]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-4"
            >
              <img
                src={aboutContent.instagramPosts[3]?.image}
                alt="Instagram post 4"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Row 3: Medium + Medium */}
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[4]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3"
            >
              <img
                src={aboutContent.instagramPosts[4]?.image}
                alt="Instagram post 5"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[5]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3"
            >
              <img
                src={aboutContent.instagramPosts[5]?.image}
                alt="Instagram post 6"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Row 4: Small + Small + Small (but only 2 to make 8 total) */}
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[6]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3 lg:rounded-bl-4xl max-lg:rounded-b-4xl"
            >
              <img
                src={aboutContent.instagramPosts[6]?.image}
                alt="Instagram post 7"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${aboutContent.instagramPosts[7]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3 lg:rounded-br-4xl"
            >
              <img
                src={aboutContent.instagramPosts[7]?.image}
                alt="Instagram post 8"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light text-gray-900 hover:text-gray-600"
            >
              {aboutContent.viewMoreText} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
