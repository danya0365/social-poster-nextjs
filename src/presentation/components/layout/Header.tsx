'use client';

/**
 * Header
 * Main navigation header with social media style design
 */

import { siteConfig } from '@/src/config/site.config';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import { animated, useSpring } from '@react-spring/web';
import { LogIn, Menu, UserPlus, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ProfileSwitcher } from './ProfileSwitcher';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'ฟีเจอร์', href: '#features' },
  { name: 'ราคา', href: '#pricing' },
  { name: 'ติดต่อ', href: '#contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const logoSpring = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { tension: 200, friction: 20 },
  });

  const menuSpring = useSpring({
    opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 300, friction: 25 },
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50" />
      
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <animated.div style={logoSpring}>
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
          </animated.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink key={link.name} href={link.href} index={index}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <ProfileSwitcher />
            ) : (
              /* Not logged in - show login/register */
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-full 
                    text-gray-700 dark:text-gray-300 font-medium text-sm
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-full 
                    bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white font-medium text-sm
                    hover:from-blue-700 hover:to-purple-700
                    transform hover:scale-105 transition-all duration-200
                    shadow-lg shadow-blue-500/25"
                >
                  <UserPlus className="w-4 h-4" />
                  สมัครฟรี
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <animated.div
            style={menuSpring}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-medium"
                >
                  ไปยัง Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-medium"
                  >
                    สมัครฟรี
                  </Link>
                </>
              )}
            </div>
          </animated.div>
        )}
      </nav>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  index: number;
}

function NavLink({ href, children, index }: NavLinkProps) {
  const spring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    delay: index * 50,
    config: { tension: 200, friction: 20 },
  });

  const [hoverSpring, hoverApi] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 15 },
  }));

  return (
    <animated.div
      style={{ ...spring, ...hoverSpring }}
      onMouseEnter={() => hoverApi.start({ scale: 1.05 })}
      onMouseLeave={() => hoverApi.start({ scale: 1 })}
    >
      <Link
        href={href}
        className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 
          hover:text-blue-600 dark:hover:text-blue-400
          hover:bg-blue-50 dark:hover:bg-blue-900/20
          transition-colors font-medium"
      >
        {children}
      </Link>
    </animated.div>
  );
}
