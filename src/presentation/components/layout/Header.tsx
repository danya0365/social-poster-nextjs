'use client';

/**
 * Header
 * Main navigation header with social media style design
 */

import { siteConfig } from '@/src/config/site.config';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import { animated, useSpring } from '@react-spring/web';
import { LogIn, Menu, Shield, UserPlus, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ProfileSwitcher } from './ProfileSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { UserAvatar } from '../ui/UserAvatar';

const navLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'ฟีเจอร์', href: '#features' },
  { name: 'ราคา', href: '#pricing' },
  { name: 'ติดต่อ', href: '#contact' },
];

function ProfileHeaderInfo() {
  const { activeProfile } = useAuthStore();
  if (!activeProfile) return null;

  return (
    <>
      <UserAvatar 
        name={activeProfile.name}
        src={activeProfile.avatarUrl}
        showGlow
      />

      <div className="flex flex-col items-start overflow-hidden ml-3">
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate w-full tracking-tight">
          {activeProfile.name}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100/50 dark:border-blue-800/50">
          <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" /> 
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            {activeProfile.roleId}
          </span>
        </div>
      </div>
    </>
  );
}

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
          <div className="flex items-center space-x-2 md:space-x-3">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm
                    hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Dashboard
                </Link>
                <ProfileSwitcher />
              </div>
            ) : (
              /* Not logged in - show login/register */
              <>
                <Link
                  href="/auth/login"
                  className="hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-full 
                    text-gray-700 dark:text-gray-300 font-medium text-sm
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-full 
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
              {isAuthenticated && (
                <div className="px-5 py-5 mb-4 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
                   <div className="flex items-center">
                     <ProfileHeaderInfo />
                   </div>
                </div>
              )}
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
                  onClick={() => setIsMenuOpen(false)}
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
