import Image from 'next/image';
import { getContactPageContent, getSiteConfig } from '@/lib/content';

export const metadata = {
  title: 'Contact | Yuliia Holovatiuk-Ungureanu',
  description: 'Get in touch with artist Yuliia Holovatiuk-Ungureanu. Email and Instagram contact information.',
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
    <main>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
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
          <div className="px-6 py-24 sm:py-32 lg:col-span-7 lg:px-0 lg:pt-16 lg:pb-0 lg:flex lg:items-end">
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
                  className="mt-2 flex items-center gap-3 text-xl font-light text-gray-900 hover:text-gray-600 transition-colors group"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-6 text-gray-600 group-hover:text-gray-800 transition-colors"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
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
  );
}
