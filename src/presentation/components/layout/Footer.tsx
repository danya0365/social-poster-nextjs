'use client';

/**
 * Footer
 * Main footer with social media links and branding
 */

import { animated, useSpring } from '@react-spring/web';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Zap } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
];

const footerLinks = {
  product: [
    { name: 'ฟีเจอร์', href: '#features' },
    { name: 'ราคา', href: '#pricing' },
    { name: 'วิธีใช้งาน', href: '/how-to-use' },
    { name: 'อัปเดต', href: '/updates' },
  ],
  company: [
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'บล็อก', href: '/blog' },
    { name: 'ติดต่อ', href: '#contact' },
    { name: 'ร่วมงาน', href: '/careers' },
  ],
  support: [
    { name: 'ศูนย์ช่วยเหลือ', href: '/help' },
    { name: 'ข้อกำหนด', href: '/terms' },
    { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
    { name: 'สถานะระบบ', href: '/status' },
  ],
};


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                POSTDEE 24HR
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              ระบบโพสต์ขายอัตโนมัติ 24 ชม. ด้วย AI
              ช่วยให้คุณจัดการ Social Media ได้อย่างมีประสิทธิภาพ
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@postdee.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>02-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>กรุงเทพฯ, ประเทศไทย</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <SocialLink key={social.name} {...social} />
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ผลิตภัณฑ์
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              บริษัท
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ช่วยเหลือ
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} POSTDEE. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Made with ❤️ in Thailand
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

function SocialLink({ name, icon: Icon, href, color }: SocialLinkProps) {
  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 15 },
  }));

  return (
    <animated.a
      href={href}
      style={spring}
      onMouseEnter={() => api.start({ scale: 1.2 })}
      onMouseLeave={() => api.start({ scale: 1 })}
      className={`p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${color} transition-colors`}
      aria-label={name}
    >
      <Icon className="w-5 h-5" />
    </animated.a>
  );
}
