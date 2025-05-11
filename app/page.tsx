import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import RecentUpdates from '@/components/home/RecentUpdates';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Features />
      <RecentUpdates />
    </div>
  );
}