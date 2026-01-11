import type { Metadata } from 'next';
import Image from 'next/image';
import { getAboutPageContent, getSiteConfig, getInstagramFeedContent } from '@/lib/content';
import { PageTransition } from '@/components/PageTransition';
import { PageSection, PageContainer } from '@/components/ui/Layout';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'About',
  description: 'Yuliia Holovatiuk-Ungureanu is a UK-based Ukrainian multidisciplinary artist working with installation, sculpture, ceramics, and text-informed practices.',

  openGraph: {
    type: 'profile',
    url: `${siteUrl}/about`,
    title: 'About Yuliia Holovatiuk-Ungureanu',
    description: 'UK-based Ukrainian multidisciplinary artist exploring themes of war, displacement, memory, and resilience.',
    images: [
      {
        url: `${siteUrl}/images/profile/artist-portrait.jpg`,
        width: 1200,
        height: 630,
        alt: 'Yuliia Holovatiuk-Ungureanu',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About Yuliia Holovatiuk-Ungureanu',
    description: 'UK-based Ukrainian multidisciplinary artist exploring themes of war, displacement, memory, and resilience.',
    images: [`${siteUrl}/images/profile/artist-portrait.jpg`],
  },
};

export default function AboutPage() {
  const aboutContent = getAboutPageContent();
  const siteConfig = getSiteConfig();
  const instagramFeed = getInstagramFeedContent();
  const paragraphs = aboutContent.content.split('\n\n');

  return (
    <PageTransition>
      <main className="pt-12 lg:pt-16">
      {/* Profile Section */}
      <PageSection spacing="md" className="bg-white">
        <PageContainer>
          <div className="grid grid-cols-1 gap-y-16 sm:gap-y-24 lg:grid-cols-2 lg:items-stretch">
            <div className="overflow-hidden rounded-lg bg-white">
              <Image
                alt={aboutContent.profileImageAlt}
                src={aboutContent.profileImage}
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col lg:pl-8">
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
                </div>
              </div>
              <div className="mt-auto pt-10">
                <a
                  href={siteConfig.cvFile}
                  className="inline-block rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-light text-white shadow-sm hover:bg-gray-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  {aboutContent.downloadCvText}
                </a>
              </div>
            </div>
          </div>
        </PageContainer>
      </PageSection>

      {/* Instagram Grid Section */}
      <PageSection spacing="md" className="bg-gray-50">
        <PageContainer>
          <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
            {instagramFeed.sectionTitle}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {instagramFeed.sectionSubtitle}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
            {instagramFeed.posts.map((post, index) => {
              const rowIndex = Math.floor(index / 2);
              const isEvenRow = rowIndex % 2 === 0;
              const isFirstInRow = index % 2 === 0;
              const isLastPost = index === instagramFeed.posts.length - 1;
              const isFirstPost = index === 0;

              // Pattern alternates: Row 0,2,4... = [4,2], Row 1,3,5... = [2,4]
              const colSpan = isEvenRow
                ? (isFirstInRow ? 'lg:col-span-4' : 'lg:col-span-2')
                : (isFirstInRow ? 'lg:col-span-2' : 'lg:col-span-4');

              // Corner rounding
              let roundedClass = '';
              if (isFirstPost) roundedClass = 'lg:rounded-tl-4xl max-lg:rounded-t-4xl';
              else if (index === 1) roundedClass = 'lg:rounded-tr-4xl';
              else if (index === instagramFeed.posts.length - 2) roundedClass = 'lg:rounded-bl-4xl max-lg:rounded-b-4xl';
              else if (isLastPost) roundedClass = 'lg:rounded-br-4xl';

              return (
                <a
                  key={post.id}
                  href={`https://instagram.com/p/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 ${colSpan} ${roundedClass}`}
                >
                  <div className="relative h-80 w-full">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 16vw"
                    />
                  </div>
                </a>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light text-gray-900 hover:text-gray-600"
            >
              {instagramFeed.viewMoreText} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </PageContainer>
      </PageSection>
      </main>
    </PageTransition>
  );
}
