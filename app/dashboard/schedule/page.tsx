import { ScheduleView } from '@/src/presentation/components/schedule/ScheduleView';
import { createServerSchedulePresenter } from '@/src/presentation/presenters/schedule/SchedulePresenterServerFactory';

/**
 * Schedule Page - Server Component
 */
export default async function SchedulePage() {
  const presenter = createServerSchedulePresenter();
  const viewModel = await presenter.getViewModel();

  return <ScheduleView initialViewModel={viewModel} />;
}
