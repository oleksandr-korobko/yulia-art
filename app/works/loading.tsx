import { PageContainer, Grid } from '@/components/ui/Layout';

export default function Loading() {
  return (
    <main className="pt-12 lg:pt-16 pb-16 lg:pb-24">
      <PageContainer>
        <div className="h-12 w-48 bg-gray-200 rounded mb-16 animate-pulse" />
        <Grid cols={3} gap="md">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/3] bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </Grid>
      </PageContainer>
    </main>
  );
}
