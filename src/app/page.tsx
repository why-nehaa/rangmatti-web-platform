import HeroSection from '@/components/home/HeroSection';
import TwoWealthSection from '@/components/home/TwoWealthSection';
import ValueChainSection from '@/components/home/ValueChainSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import FeaturedArtisansSection from '@/components/home/FeaturedArtisansSection';
import PassportShowcaseSection from '@/components/home/PassportShowcaseSection';
import BrandStorySection from '@/components/home/BrandStorySection';
import CuratedCollectionsSection from '@/components/home/CuratedCollectionsSection';
import ImpactSection from '@/components/home/ImpactSection';
import FinalCtaSection from '@/components/home/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TwoWealthSection />
      <ValueChainSection />
      <FeaturedProductsSection />
      <PassportShowcaseSection />
      <FeaturedArtisansSection />
      <BrandStorySection />
      <CuratedCollectionsSection />
      <ImpactSection />
      <FinalCtaSection />
    </div>
  );
}
