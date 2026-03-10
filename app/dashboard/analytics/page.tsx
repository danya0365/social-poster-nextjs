import { AnalyticsView } from '@/src/presentation/components/analytics/AnalyticsView';
import { createServerAnalyticsPresenter } from '@/src/presentation/presenters/analytics/AnalyticsPresenterServerFactory';

/**
 * Analytics Page - Server Component
 */
export default async function AnalyticsPage() {
  const presenter = createServerAnalyticsPresenter();
  const viewModel = await presenter.getViewModel();

  return <AnalyticsView initialViewModel={viewModel} />;
}
