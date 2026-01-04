import type { Metadata } from 'next';
import Image from 'next/image';
import { getContactPageContent, getSiteConfig } from '@/lib/content';
import { PageTransition } from '@/components/PageTransition';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Yuliia Holovatiuk-Ungureanu. Email: ungureanuyuliia@gmail.com',

  openGraph: {
    type: 'website',
    url: `${siteUrl}/contact`,
    title: 'Contact Yuliia Holovatiuk-Ungureanu',
    description: 'Get in touch with Yuliia for exhibitions, commissions, or inquiries.',
  },

  twitter: {
    card: 'summary',
    title: 'Contact Yuliia Holovatiuk-Ungureanu',
    description: 'Get in touch with Yuliia for exhibitions, commissions, or inquiries.',
  },
};

export default function ContactPage() {
  const contactContent = getContactPageContent();
  const siteConfig = getSiteConfig();

  // Split content into sections
  const sections = contactContent.content.split('## ').filter(Boolean);
  const copyrightSection = sections.find((s) => s.startsWith('Copyright'));
  const disclaimerSection = sections.find((s) => s.startsWith('External Links'));
  const cookiesSection = sections.find((s) => s.startsWith('Third-Party'));

  return (
    <PageTransition>
      <main className="pt-12 lg:pt-16">
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-16 lg:px-8">
          {/* Left side - Image */}
          <div className="relative lg:col-span-5 lg:row-span-2">
            <div className="relative h-64 sm:h-80 lg:absolute lg:inset-0 lg:h-full">
              <Image
                src={contactContent.profileImage}
                alt="Yuliia Holovatiuk-Ungureanu"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="px-6 py-24 sm:py-32 lg:col-span-7 lg:px-0 lg:pt-16 lg:pb-16 lg:flex lg:items-end">
            <div className="mx-auto max-w-lg lg:mx-0 lg:pb-0">
              {/* Email */}
              <div className="mb-12">
                <h2 className="text-sm font-light uppercase tracking-wide text-gray-500">
                  {contactContent.emailLabel}
                </h2>
                <a
                  href={`mailto:${contactContent.email}`}
                  className="mt-2 block text-xl font-light text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {contactContent.email}
                </a>
              </div>

              {/* Instagram */}
              <div className="mb-32">
                <h2 className="text-sm font-light uppercase tracking-wide text-gray-500">
                  {contactContent.instagramLabel}
                </h2>
                <a
                  href={contactContent.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-xl font-light text-gray-900 hover:text-gray-600 transition-colors"
                >
                  @{siteConfig.instagramHandle}
                </a>
              </div>

              {/* Copyright */}
              {copyrightSection && (
                <div className="border-t border-gray-200 pt-6 pb-6">
                  <h3 className="text-base font-light tracking-wide text-gray-900">
                    Copyright
                  </h3>
                  <div className="text-sm font-light leading-relaxed text-gray-600">
                    {copyrightSection
                      .replace('Copyright\n\n', '')
                      .split('\n\n')
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* External Links Disclaimer */}
              {disclaimerSection && (
                <div className="border-t border-gray-200 pt-6 pb-6">
                  <h3 className="text-base font-light tracking-wide text-gray-900">
                    External Links Disclaimer
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-gray-600">
                    {disclaimerSection.replace('External Links Disclaimer\n\n', '')}
                  </p>
                </div>
              )}

              {/* Third-Party Cookies */}
              {cookiesSection && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-light tracking-wide text-gray-900">
                    Third-Party Cookies
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-gray-600">
                    {cookiesSection.replace('Third-Party Cookies\n\n', '')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </main>
    </PageTransition>
  );
}
