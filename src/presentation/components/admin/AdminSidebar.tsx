'use client';

/**
 * AdminSidebar
 * Sidebar navigation for the admin section mirroring DashboardSidebar but with red theme
 */

import { siteConfig } from '@/src/config/site.config';
import { animated, useSpring } from '@react-spring/web';
import {
  ChevronLeft,
  LayoutDashboard,
  Shield,
  Settings,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const adminNavItems = [
  { 
    id: 'admin-overview', 
    label: 'แผงควบคุมระบบ', 
    icon: LayoutDashboard, 
    href: '/admin',
    description: 'ภาพรวมระบบทั้งหมด'
  },
  { 
    id: 'admin-users', 
    label: 'จัดการผู้ใช้งาน', 
    icon: Users, 
    href: '/admin/users',
    description: 'จัดการระดับสิทธิ์'
  },
];

const bottomNavItems = [
  { 
    id: 'dashboard', 
    label: 'กลับ Dashboard', 
    icon: Settings, 
    href: '/dashboard',
    description: 'กลับหน้าผู้ใช้งานทั่วไป'
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({ isCollapsed, onToggleCollapse }: AdminSidebarProps) {
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
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent whitespace-nowrap leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">Admin Panel</span>
            </div>
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
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            
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
            ? 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-600 dark:text-red-400' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-red-600 to-rose-600 rounded-r-full" />
        )}

        <span className={isActive ? 'text-red-600 dark:text-red-400' : ''}>
          {icon}
        </span>

        {!isCollapsed && (
          <div className="ml-3 flex-1 min-w-0">
            <p className={`font-medium truncate ${isActive ? 'text-red-600 dark:text-red-400' : ''}`}>
              {label}
            </p>
          </div>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && isHovered && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg border border-red-500/20">
            <p className="font-medium">{label}</p>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        )}
      </animated.div>
    </Link>
  );
}
