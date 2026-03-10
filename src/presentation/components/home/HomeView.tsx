'use client';

/**
 * HomeView
 * Main home page view combining all sections
 */

import { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import { useHomePresenter } from '@/src/presentation/presenters/home/useHomePresenter';
import { CTASection } from './CTASection';
import { FeaturesSection } from './FeaturesSection';
import { HeroSection } from './HeroSection';
import { PricingSection } from './PricingSection';

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

export function HomeView({ initialViewModel }: HomeViewProps) {
  const [state] = useHomePresenter(initialViewModel);
  const { data, loading } = state;

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative">
      <HeroSection 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        ctaLink={data.hero.ctaLink}
      />
      <FeaturesSection features={data.features} />
      <PricingSection />
      <CTASection />
    </div>
  );
}
