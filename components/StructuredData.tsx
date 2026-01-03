import type { Work } from '@/lib/types';

export function ArtworkStructuredData({ work }: { work: Work }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: work.title,
    description: work.shortDescription,
    image: `${siteUrl}${work.coverImage}`,
    dateCreated: work.year.toString(),
    artMedium: work.materials,
    creator: {
      '@type': 'Person',
      name: 'Yuliia Holovatiuk-Ungureanu',
      url: siteUrl,
      sameAs: [
        'https://www.instagram.com/yuliia_art_uk_ua/',
      ],
    },
    workPresented: {
      '@type': 'CreativeWork',
      name: work.title,
      artform: work.categories.join(', '),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
