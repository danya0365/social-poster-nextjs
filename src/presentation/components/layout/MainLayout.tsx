'use client';

/**
 * MainLayout
 * Main layout wrapper with Header, Footer, and ThemeProvider
 */

import { ThemeProvider } from '@/src/presentation/providers/ThemeProvider';
import { Footer } from './Footer';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
