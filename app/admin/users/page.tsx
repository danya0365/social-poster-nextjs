import { AdminUserView } from '@/src/presentation/components/admin/AdminUserView';
import { createServerAdminUserPresenter } from '@/src/presentation/presenters/admin/AdminUserPresenterServerFactory';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AdminUsersPage() {
  const presenter = createServerAdminUserPresenter();

  let viewModel;
  try {
    viewModel = await presenter.getViewModel();
  } catch (error) {
    console.error('Error loading admin users:', error);
    return (
      <div className="bg-white p-10 rounded-2xl border border-red-100 shadow-sm text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Failed to load users</h2>
        <p className="text-gray-500 mb-6">There was an error connecting to the database.</p>
        <Link href="/admin" className="text-blue-600 font-medium hover:underline">
          Return to Overview
        </Link>
      </div>
    );
  }

  return <AdminUserView initialViewModel={viewModel} />;
}
