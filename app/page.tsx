import { HomeView } from '@/src/presentation/components/home/HomeView';
import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { createServerHomePresenter } from '@/src/presentation/presenters/home/HomePresenterServerFactory';

/**
 * Main Landing Page - Server Component
 */
export default async function HomePage() {
  const presenter = createServerHomePresenter();
  const viewModel = await presenter.getViewModel();

  return (
    <MainLayout>
      <HomeView initialViewModel={viewModel} />
    </MainLayout>
  );
}
