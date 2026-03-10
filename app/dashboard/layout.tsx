import { AuthGuard } from '@/src/presentation/components/auth/AuthGuard';
import { DashboardLayout } from '@/src/presentation/components/dashboard/DashboardLayout';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
