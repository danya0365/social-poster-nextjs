import { AdminView } from '@/src/presentation/components/admin/AdminView';
import { createServerAdminPresenter } from '@/src/presentation/presenters/admin/AdminPresenterServerFactory';

/**
 * Admin Page - Server Component
 */
export default async function AdminPage() {
  const presenter = createServerAdminPresenter();
  const viewModel = await presenter.getViewModel();

  return <AdminView initialViewModel={viewModel} />;
}
