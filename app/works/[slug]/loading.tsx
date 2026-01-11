import { PageContainer, Grid } from '@/components/ui/Layout';

export default function Loading() {
  return (
    <main className="pt-12 lg:pt-16 pb-16 lg:pb-24">
      <PageContainer>
        {/* Back link skeleton */}
        <div className="h-5 w-24 bg-gray-200 rounded mb-12 animate-pulse" />

        {/* Header skeleton */}
        <div className="mb-16">
          <div className="h-12 w-64 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Grid skeleton - shows 2 column layout like category pages */}
        <Grid cols={2} gap="xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </Grid>
      </PageContainer>
    </main>
  );
}
