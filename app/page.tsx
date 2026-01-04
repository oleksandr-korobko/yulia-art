import { Hero } from '@/components/home/Hero';
import { SelectedWorks } from '@/components/home/SelectedWorks';
import { ArtistStatement } from '@/components/home/ArtistStatement';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import { PageTransition } from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <SelectedWorks />
        <ArtistStatement />
        <FeaturedWorks />
      </main>
    </PageTransition>
  );
}
