import { getSessionAction } from '@/src/presentation/actions/authActions';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/src/presentation/components/admin/AdminLayout';

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionData = await getSessionAction();

  // 1. Basic Auth Check
  if (!sessionData || !sessionData.activeProfile) {
    redirect('/auth/login');
  }

  // 2. Role Check - STRICTLY only 'admin' role allowed for this workspace
  if (sessionData.activeProfile.roleId !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-8">
            ขออภัย คุณไม่มีสิทธิ์เข้าถึงส่วนของผู้ดูแลระบบ (Admin Only)
          </p>
          <Link
            href="/dashboard"
            className="inline-block w-full py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
          >
            กลับหน้า Dashboard ปกติ
          </Link>
        </div>
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
