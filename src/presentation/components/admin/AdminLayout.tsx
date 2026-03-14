'use client';

/**
 * AdminLayout
 * Main layout wrapper for all admin pages mirroring DashboardLayout
 */

import { ThemeProvider } from '@/src/presentation/providers/ThemeProvider';
import { useEffect, useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleCollapse = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        {/* Mobile overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${isMobile ? 'fixed z-40' : ''}
          ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          transition-transform duration-300
        `}>
          <AdminSidebar
            isCollapsed={isMobile ? false : isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
        </div>

        {/* Main content */}
        <div
          className="transition-all duration-300"
          style={{
            marginLeft: isMobile ? 0 : isCollapsed ? 80 : 280,
          }}
        >
          <AdminHeader
            isMobile={isMobile}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={handleToggleCollapse}
          />
          
          <main className="p-6 pt-20">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
