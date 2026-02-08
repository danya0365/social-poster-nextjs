'use client';

/**
 * DashboardHeader
 * Top header for dashboard pages
 */

import { ThemeToggle } from '@/src/presentation/components/layout/ThemeToggle';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import { Bell, Menu, Plus, Search, User } from 'lucide-react';

interface DashboardHeaderProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function DashboardHeader({ isMobile, isSidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

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
          <AnimatedButton variant="gradient" size="sm" className="hidden sm:flex">
            <Plus className="w-4 h-4 mr-1" />
            สร้างโพสต์
          </AnimatedButton>

          {/* Mobile create button */}
          <button className="sm:hidden p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User menu */}
          <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </animated.header>
  );
}
