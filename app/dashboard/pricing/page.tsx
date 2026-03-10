import { PricingView } from '@/src/presentation/components/pricing/PricingView';
import { createServerPricingPresenter } from '@/src/presentation/presenters/pricing/PricingPresenterServerFactory';

/**
 * Pricing Page - Server Component
 */
export default async function PricingPage() {
  const presenter = createServerPricingPresenter();
  const viewModel = await presenter.getViewModel();

  return <PricingView initialViewModel={viewModel} />;
}
