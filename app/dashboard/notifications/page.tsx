import { NotificationCenter } from '@/src/presentation/components/notifications/NotificationCenter';
import { createServerNotificationsPresenter } from '@/src/presentation/presenters/notifications/NotificationsPresenterServerFactory';

/**
 * Notifications Page - Server Component
 */
export default async function NotificationsPage() {
  const presenter = createServerNotificationsPresenter();
  const viewModel = await presenter.getViewModel();

  return <NotificationCenter initialViewModel={viewModel} />;
}
