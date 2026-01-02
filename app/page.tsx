import { Hero } from '@/components/home/Hero';
import { SelectedWorks } from '@/components/home/SelectedWorks';
import { ArtistStatement } from '@/components/home/ArtistStatement';

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWorks />
      <ArtistStatement />
    </main>
  );
}
