import { PostsView } from '@/src/presentation/components/posts/PostsView';
import { createServerPostsPresenter } from '@/src/presentation/presenters/posts/PostsPresenterServerFactory';

/**
 * Posts Page - Server Component
 */
export default async function PostsPage() {
  const presenter = createServerPostsPresenter();
  const viewModel = await presenter.getViewModel();

  return <PostsView initialViewModel={viewModel} />;
}
