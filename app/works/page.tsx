import type { Metadata } from 'next';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';
import { getWorksByCategorySlug } from '@/lib/content';
import { PageTransition } from '@/components/PageTransition';
import { PageContainer, Grid, Card } from '@/components/ui/Layout';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Works',
  description: 'Explore artworks by Yuliia Holovatiuk-Ungureanu across installations, sculptures, ceramics, paintings, and text-informed practices.',

  openGraph: {
    type: 'website',
    url: `${siteUrl}/works`,
    title: 'Works - Yuliia Holovatiuk-Ungureanu',
    description: 'Explore artworks across installations, sculptures, ceramics, and text-informed practices.',
  },

  twitter: {
    card: 'summary',
    title: 'Works - Yuliia Holovatiuk-Ungureanu',
    description: 'Explore artworks across installations, sculptures, ceramics, and text-informed practices.',
  },
};

export default function WorksPage() {
  return (
    <PageTransition>
      <main className="pt-12 lg:pt-16 pb-16 lg:pb-24">
        <PageContainer>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-16">
            Works
          </h1>

          <Grid cols={3} gap="md">
            {CATEGORY_ORDER.map((slug) => {
              const category = CATEGORIES[slug];
              const works = getWorksByCategorySlug(slug);
              const coverWork = works[0];

              return (
                <Card
                  key={slug}
                  image={coverWork?.coverImage}
                  title={category.name}
                  subtitle={`${works.length} ${works.length === 1 ? 'work' : 'works'}`}
                  href={`/works/${slug}`}
                />
              );
            })}
          </Grid>
        </PageContainer>
      </main>
    </PageTransition>
  );
}
