import { HomeView } from '@/src/presentation/components/home/HomeView';
import { MainLayout } from '@/src/presentation/components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <HomeView />
    </MainLayout>
  );
}
