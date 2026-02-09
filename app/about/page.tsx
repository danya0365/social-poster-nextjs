'use client';

/**
 * About Page
 * Company information and team
 */

import { siteConfig } from '@/src/config/site.config';
import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import {
    Award,
    Clock,
    Globe,
    Heart,
    Target,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'ผู้ใช้งาน', value: '10,000+', icon: Users },
  { label: 'โพสต์สำเร็จ', value: '1M+', icon: TrendingUp },
  { label: 'ประเทศ', value: '15+', icon: Globe },
  { label: 'เวลาทำงาน', value: '99.9%', icon: Clock },
];

const values = [
  {
    icon: Target,
    title: 'มุ่งมั่น',
    description: 'เราตั้งใจพัฒนาผลิตภัณฑ์ที่ดีที่สุดสำหรับลูกค้า',
  },
  {
    icon: Zap,
    title: 'ทันสมัย',
    description: 'ใช้เทคโนโลยี AI ล่าสุดเพื่อประสิทธิภาพสูงสุด',
  },
  {
    icon: Heart,
    title: 'ใส่ใจ',
    description: 'ทีมซัพพอร์ตพร้อมช่วยเหลือตลอด 24 ชั่วโมง',
  },
  {
    icon: Award,
    title: 'คุณภาพ',
    description: 'รับประกันความพึงพอใจของลูกค้าทุกราย',
  },
];

export default function AboutPage() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <animated.div style={headerSpring}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                เกี่ยวกับ{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {siteConfig.name}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                เราเป็นทีมที่หลงใหลในเทคโนโลยี มุ่งมั่นสร้างเครื่องมือที่ช่วยให้ธุรกิจเติบโตบน Social Media
              </p>
            </animated.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              เรื่องราวของเรา
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p className="text-lg leading-relaxed mb-6">
                {siteConfig.name} เริ่มต้นจากความต้องการที่จะช่วยเหลือธุรกิจขนาดเล็กในประเทศไทย
                ให้สามารถโปรโมทสินค้าและบริการได้อย่างมีประสิทธิภาพ โดยไม่ต้องเสียเวลานั่งโพสต์ทั้งวัน
              </p>
              <p className="text-lg leading-relaxed mb-6">
                ด้วยเทคโนโลยี AI และ Automation เราช่วยให้คุณประหยัดเวลาหลายชั่วโมงต่อวัน
                พร้อมเพิ่มยอดขายได้อย่างต่อเนื่อง
              </p>
              <p className="text-lg leading-relaxed">
                ปัจจุบัน {siteConfig.name} มีผู้ใช้งานมากกว่า 10,000 รายทั่วประเทศ
                และช่วยสร้างโพสต์สำเร็จมากกว่า 1 ล้านโพสต์
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              คุณค่าของเรา
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              พร้อมเริ่มต้นแล้วหรือยัง?
            </h2>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              เริ่มต้นใช้งานฟรี
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
