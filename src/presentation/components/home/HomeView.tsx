'use client';

/**
 * HomeView
 * Main home page view combining all sections
 */

import { CTASection } from './CTASection';
import { FeaturesSection } from './FeaturesSection';
import { HeroSection } from './HeroSection';
import { PricingSection } from './PricingSection';

export function HomeView() {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
