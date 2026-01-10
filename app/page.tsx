import { Hero } from '@/components/home/Hero';
import { SelectedWorksAlt } from '@/components/home/SelectedWorksAlt';
import { ArtistStatement } from '@/components/home/ArtistStatement';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import { PageTransition } from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <SelectedWorksAlt />
        <ArtistStatement />
        <FeaturedWorks />
      </main>
    </PageTransition>
  );
}
