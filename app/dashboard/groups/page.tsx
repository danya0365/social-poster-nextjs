import { GroupsView } from '@/src/presentation/components/groups/GroupsView';
import { createServerGroupsPresenter } from '@/src/presentation/presenters/groups/GroupsPresenterServerFactory';

/**
 * Groups Page - Server Component
 */
export default async function GroupsPage() {
  const presenter = createServerGroupsPresenter();
  const viewModel = await presenter.getViewModel();

  return <GroupsView initialViewModel={viewModel} />;
}
