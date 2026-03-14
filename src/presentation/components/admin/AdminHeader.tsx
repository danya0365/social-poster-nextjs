'use client';

/**
 * AdminHeader
 * Top header for admin pages mirroring DashboardHeader but with admin colors
 */

import { ThemeToggle } from '@/src/presentation/components/layout/ThemeToggle';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import { animated, useSpring } from '@react-spring/web';
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, Shield, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AdminHeaderProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function AdminHeader({ isMobile, isSidebarOpen, onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const { user, activeProfile } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleLogout = async () => {
    const { logoutAction } = await import('@/src/presentation/actions/authActions');
    await logoutAction();
    window.location.href = '/auth/login';
  };

  return (
    <animated.header
      style={{
        ...headerSpring,
        left: isMobile ? 0 : undefined,
        width: isMobile ? '100%' : undefined,
      }}
      className="fixed top-0 right-0 z-20 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
    >
      <div className="h-full flex items-center justify-between px-4 sm:px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          
          {/* Admin Label */}
          {!isMobile && (
             <div className="flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Admin Panel</span>
             </div>
          )}
          
          {/* Search bar */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 w-64 lg:w-80">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาข้อมูลระบบ..."
              className="ml-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Back to Dashboard */}
          <Link href="/dashboard">
            <AnimatedButton variant="outline" size="sm" className="hidden sm:flex border-gray-200 dark:border-gray-700">
              กลับหน้า Dashboard
            </AnimatedButton>
          </Link>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              {!isMobile && activeProfile && (
                <>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                    {activeProfile.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </>
              )}
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowUserMenu(false)} 
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
                  {/* User info */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center overflow-hidden">
                        {activeProfile?.avatarUrl ? (
                           <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
                        ) : (
                           <UserIcon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activeProfile?.name || 'Admin'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.email || ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role badge */}
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">สิทธิ์การเข้าถึง</span>
                      <span className="flex items-center gap-1 text-sm font-bold text-red-600 uppercase">
                        <Shield className="w-4 h-4" />
                        Administrator
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <Settings className="w-4 h-4" />
                      กลับหน้า Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </animated.header>
  );
}
