import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-light text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-8">Page not found</p>
      <Link
        href="/"
        className="text-sm text-gray-900 underline hover:no-underline"
      >
        Return home
      </Link>
    </main>
  );
}
