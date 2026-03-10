'use client';

/**
 * DashboardHeader
 * Top header for dashboard pages with user info
 */

import { ThemeToggle } from '@/src/presentation/components/layout/ThemeToggle';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import { animated, useSpring } from '@react-spring/web';
import { Bell, ChevronDown, Crown, LogOut, Menu, Plus, Search, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DashboardHeaderProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function DashboardHeader({ isMobile, isSidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const router = useRouter();
  const { user, activeProfile } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleLogout = async () => {
    // Rely on the layout Header's ProfileSwitcher logout function, or implement full logout here.
    // Dashboard header should not implement its own logout if ProfileSwitcher covers it, but since it's here:
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
          
          {/* Search bar */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 w-64 lg:w-80">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="ml-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Create Post Button */}
          <Link href="/dashboard/posts">
            <AnimatedButton variant="gradient" size="sm" className="hidden sm:flex">
              <Plus className="w-4 h-4 mr-1" />
              สร้างโพสต์
            </AnimatedButton>
          </Link>

          {/* Mobile create button */}
          <Link href="/dashboard/posts" className="sm:hidden p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="w-5 h-5" />
          </Link>

          {/* Notifications */}
          <Link 
            href="/dashboard/notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
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
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                        {activeProfile?.avatarUrl ? (
                           <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
                        ) : (
                           <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activeProfile?.name || 'Guest'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.email || ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role badge */}
                  {activeProfile && (
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">บทบาท (Role)</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-blue-600 capitalize">
                          <Crown className="w-4 h-4" />
                          {activeProfile.roleId}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Menu items */}
                  <div className="p-2">
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <Settings className="w-4 h-4" />
                      ตั้งค่า
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

