import { AccountView } from '@/src/presentation/components/account/AccountView';
import { createServerAccountPresenter } from '@/src/presentation/presenters/account/AccountPresenterServerFactory';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerAccountPresenter();
  
  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'จัดการบัญชี (Account) | SocialFlow',
      description: 'ระบบจัดการบัญชีและความปลอดภัย',
    };
  }
}

export default async function AccountPage() {
  const presenter = createServerAccountPresenter();

  let viewModel;
  try {
    viewModel = await presenter.getViewModel();
  } catch (error) {
    console.error('Error fetching account data:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-500 mb-6">ไม่สามารถโหลดข้อมูลผู้ใช้งานได้ โปรดลองใหม่อีกครั้ง</p>
          <Link
            href="/auth/login"
            className="block w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all font-medium"
          >
            เข้าสู่ระบบใหม่
          </Link>
        </div>
      </div>
    );
  }

  return <AccountView initialViewModel={viewModel} />;
}
