'use client';

import { AccountViewModel } from '@/src/presentation/presenters/account/AccountPresenter';
import { useAccountPresenter } from '@/src/presentation/presenters/account/useAccountPresenter';
import { ArrowLeft, LogOut, Shield, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface AccountViewProps {
  initialViewModel: AccountViewModel;
}

export function AccountView({ initialViewModel }: AccountViewProps) {
  const [{ viewModel }] = useAccountPresenter(initialViewModel);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'workspaces'>('profile');

  if (!viewModel?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">กรุณาเข้าสู่ระบบ</h2>
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            ไปที่หน้า Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              การจัดการบัญชีส่วนกลาง
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-sm">
              {viewModel.user.email.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {viewModel.user.email}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`} />
                ข้อมูลส่วนตัว (Profile)
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Shield className={`w-5 h-5 ${activeTab === 'security' ? 'text-blue-600' : 'text-gray-400'}`} />
                ความปลอดภัย (Security)
              </button>

              <button
                onClick={() => setActiveTab('workspaces')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === 'workspaces'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Users className={`w-5 h-5 ${activeTab === 'workspaces' ? 'text-blue-600' : 'text-gray-400'}`} />
                พื้นที่ทำงาน (Workspaces)
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all">
                <LogOut className="w-5 h-5 text-red-500" />
                ออกจากระบบ (Log out)
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px]">
              
              {activeTab === 'profile' && (
                <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">โปรไฟล์ส่วนตัว</h2>
                    <p className="text-gray-500 mt-1">จัดการชื่อและข้อมูลที่ใช้ติดต่อในบัญชีหลักของคุณ</p>
                  </div>
                  
                  <div className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล (Email)</label>
                      <input 
                        type="email" 
                        disabled 
                        defaultValue={viewModel.user.email}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 focus:outline-none cursor-not-allowed"
                      />
                      <p className="mt-2 text-sm text-gray-500">อีเมลนี้ใช้สำหรับล็อกอินเข้าสู่ระบบ ไม่สามารถเปลี่ยนได้ในขณะนี้</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อบัญชี (Account ID)</label>
                      <input 
                        type="text" 
                        disabled 
                        defaultValue={viewModel.user.id}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 focus:outline-none font-mono text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">ความปลอดภัย</h2>
                    <p className="text-gray-500 mt-1">อัปเดตรหัสผ่านและจัดการความปลอดภัยของบัญชี</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex flex-col items-center justify-center text-center max-w-xl">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">เปลี่ยนรหัสผ่าน</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      ระบบเปลี่ยนรหัสผ่านกำลังถูกพัฒนา (Coming Soon)
                    </p>
                    <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed">
                      เปลี่ยนรหัสผ่าน
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'workspaces' && (
                <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">พื้นที่ทำงาน (Workspaces)</h2>
                        <p className="text-gray-500 mt-1">โปรไฟล์ย่อยและพื้นที่ทำงานทั้งหมดที่คุณเข้าร่วม</p>
                      </div>
                      <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                        + สร้าง Workspace ใหม่
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {/* Active User_Profile mapping should go here. We will fetch profile list later */}
                    <div className="border border-blue-100 bg-blue-50/50 p-5 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-sm">
                          P
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            Personal Workspace
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Current</span>
                          </h3>
                          <p className="text-sm text-gray-500">บทบาท: Viewer</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        ตั้งค่า
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
