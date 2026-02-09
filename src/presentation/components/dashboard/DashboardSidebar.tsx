'use client';

/**
 * DashboardSidebar
 * Sidebar navigation for the dashboard
 */

import { siteConfig } from '@/src/config/site.config';
import { animated, useSpring } from '@react-spring/web';
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  FileEdit,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Share2,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    href: '/dashboard',
    description: 'ภาพรวมทั้งหมด'
  },
  { 
    id: 'posts', 
    label: 'โพสต์', 
    icon: FileEdit, 
    href: '/dashboard/posts',
    description: 'จัดการโพสต์'
  },
  { 
    id: 'schedule', 
    label: 'ตารางโพสต์', 
    icon: Calendar, 
    href: '/dashboard/schedule',
    description: 'วางแผนโพสต์'
  },
  { 
    id: 'groups', 
    label: 'กลุ่มเป้าหมาย', 
    icon: Users, 
    href: '/dashboard/groups',
    description: 'จัดการกลุ่ม'
  },
  { 
    id: 'accounts', 
    label: 'บัญชี Social', 
    icon: Share2, 
    href: '/dashboard/accounts',
    description: 'เชื่อมต่อบัญชี'
  },
  { 
    id: 'analytics', 
    label: 'สถิติ', 
    icon: BarChart3, 
    href: '/dashboard/analytics',
    description: 'วิเคราะห์ผล'
  },
  { 
    id: 'auto-comment', 
    label: 'Auto Comment', 
    icon: MessageSquare, 
    href: '/dashboard/auto-comment',
    description: 'ดันโพสต์อัตโนมัติ'
  },
];

const bottomNavItems = [
  { 
    id: 'settings', 
    label: 'ตั้งค่า', 
    icon: Settings, 
    href: '/dashboard/settings',
    description: 'การตั้งค่าระบบ'
  },
];

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function DashboardSidebar({ isCollapsed, onToggleCollapse }: DashboardSidebarProps) {
  const pathname = usePathname();

  const sidebarSpring = useSpring({
    width: isCollapsed ? 80 : 280,
    config: { tension: 300, friction: 30 },
  });

  const arrowSpring = useSpring({
    rotate: isCollapsed ? 180 : 0,
    config: { tension: 300, friction: 30 },
  });

  return (
    <animated.aside
      style={sidebarSpring}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              {siteConfig.name}
            </span>
          )}
        </Link>
        
        <animated.button
          style={{ transform: arrowSpring.rotate.to(r => `rotate(${r}deg)`) }}
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </animated.button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <li key={item.id}>
                <NavItem
                  href={item.href}
                  icon={<Icon className="w-5 h-5" />}
                  label={item.label}
                  description={item.description}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-3 border-t border-gray-200 dark:border-gray-800">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.id}>
                <NavItem
                  href={item.href}
                  icon={<Icon className="w-5 h-5" />}
                  label={item.label}
                  description={item.description}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </animated.aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  isActive: boolean;
  isCollapsed: boolean;
}

function NavItem({ href, icon, label, description, isActive, isCollapsed }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverSpring = useSpring({
    scale: isHovered ? 1.02 : 1,
    x: isHovered ? 4 : 0,
    config: { tension: 300, friction: 20 },
  });

  return (
    <Link href={href}>
      <animated.div
        style={{
          transform: hoverSpring.scale.to((s) => `scale(${s}) translateX(${hoverSpring.x.get()}px)`),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center px-3 py-2.5 rounded-xl transition-colors
          ${isActive 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
        )}

        <span className={isActive ? 'text-blue-600 dark:text-blue-400' : ''}>
          {icon}
        </span>

        {!isCollapsed && (
          <div className="ml-3 flex-1 min-w-0">
            <p className={`font-medium truncate ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
              {label}
            </p>
          </div>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && isHovered && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg">
            <p className="font-medium">{label}</p>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        )}
      </animated.div>
    </Link>
  );
}
