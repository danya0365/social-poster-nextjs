import { LoopPostView } from '@/src/presentation/components/posts/LoopPostView';
import { createServerLoopPostPresenter } from '@/src/presentation/presenters/looppost/LoopPostPresenterServerFactory';

/**
 * Loop-Post Page - Server Component
 */
export default async function LoopPostPage() {
  const presenter = createServerLoopPostPresenter();
  const viewModel = await presenter.getViewModel();

  return <LoopPostView initialViewModel={viewModel} />;
}
