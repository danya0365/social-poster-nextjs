import { AutoCommentView } from '@/src/presentation/components/autocomment/AutoCommentView';
import { createServerAutoCommentPresenter } from '@/src/presentation/presenters/autocomment/AutoCommentPresenterServerFactory';

/**
 * Auto-Comment Page - Server Component
 */
export default async function AutoCommentPage() {
  const presenter = createServerAutoCommentPresenter();
  const viewModel = await presenter.getViewModel();

  return <AutoCommentView initialViewModel={viewModel} />;
}
