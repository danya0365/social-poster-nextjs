import { DashboardView } from '@/src/presentation/components/dashboard/DashboardView';
import { createServerDashboardPresenter } from '@/src/presentation/presenters/dashboard/DashboardPresenterServerFactory';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

/**
 * Dashboard Page - Server Component
 */
export default async function DashboardPage() {
  const presenter = createServerDashboardPresenter();
  const viewModel = await presenter.getViewModel();

  return <DashboardView initialViewModel={viewModel} />;
}
