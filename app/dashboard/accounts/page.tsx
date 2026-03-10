import { AccountsView } from '@/src/presentation/components/accounts/AccountsView';
import { createServerAccountsPresenter } from '@/src/presentation/presenters/accounts/AccountsPresenterServerFactory';

/**
 * Accounts Page - Server Component
 */
export default async function AccountsPage() {
  const presenter = createServerAccountsPresenter();
  const viewModel = await presenter.getViewModel();

  return <AccountsView initialViewModel={viewModel} />;
}
