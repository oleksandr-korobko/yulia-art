export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-24">
      <div className="animate-pulse">
        {/* Back link skeleton */}
        <div className="h-5 w-24 bg-gray-200 rounded mb-12" />

        {/* Header skeleton */}
        <div className="mb-16">
          <div className="h-12 w-64 bg-gray-200 rounded mb-4" />
          <div className="h-6 w-96 bg-gray-200 rounded" />
        </div>

        {/* Grid skeleton - shows 2 column layout like category pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
              <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
