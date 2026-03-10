import { getSessionAction } from '@/src/presentation/actions/authActions';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
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
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-8">
            ขออภัย คุณไม่มีสิทธิ์เข้าถึงส่วนของผู้ดูแลระบบ (Admin Only)
          </p>
          <Link
            href="/dashboard"
            className="inline-block w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg shadow-black/5"
          >
            กลับหน้า Dashboard ปกติ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Navbar */}
      <header className="h-16 bg-red-600 text-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <span className="font-black tracking-tighter text-xl">SOCIALFLOW <span className="bg-white text-red-600 px-2 py-0.5 rounded ml-1 text-sm font-bold">ADMIN</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>{sessionData.user.email}</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
            A
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block overflow-y-auto">
          <nav className="p-4 space-y-1">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl"
            >
              Overview
            </Link>
            <Link 
              href="/admin/users" 
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            >
              User Management
            </Link>
            <Link 
              href="/admin/roles" 
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            >
              Roles & Permissions
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
