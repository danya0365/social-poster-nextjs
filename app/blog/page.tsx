'use client';

/**
 * Blog Page
 */

import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: '10 เทคนิคเพิ่มยอดขายบน Facebook ด้วย POSTDEE',
    excerpt: 'เรียนรู้วิธีใช้ระบบโพสต์อัตโนมัติเพื่อเพิ่มยอดขายอย่างมีประสิทธิภาพ...',
    date: '8 ก.พ. 2026',
    readTime: '5 นาที',
    category: 'เทคนิค',
    image: 'https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Blog+1',
  },
  {
    id: 2,
    title: 'อัปเดตฟีเจอร์ใหม่: AI ช่วยเขียนโพสต์',
    excerpt: 'ตอนนี้ POSTDEE มี AI ช่วยเขียนข้อความขายสินค้าให้คุณแล้ว...',
    date: '5 ก.พ. 2026',
    readTime: '3 นาที',
    category: 'อัปเดต',
    image: 'https://via.placeholder.com/400x200/7C3AED/FFFFFF?text=Blog+2',
  },
  {
    id: 3,
    title: 'วิธีเชื่อมต่อ Facebook อย่างปลอดภัย',
    excerpt: 'ขั้นตอนการเชื่อมต่อบัญชี Facebook และการดูแล Token...',
    date: '1 ก.พ. 2026',
    readTime: '4 นาที',
    category: 'คู่มือ',
    image: 'https://via.placeholder.com/400x200/2563EB/FFFFFF?text=Blog+3',
  },
  {
    id: 4,
    title: 'Case Study: ร้านค้าออนไลน์เพิ่มยอดขาย 300%',
    excerpt: 'เรื่องราวความสำเร็จของลูกค้าที่ใช้ POSTDEE ในการโปรโมทสินค้า...',
    date: '25 ม.ค. 2026',
    readTime: '7 นาที',
    category: 'Case Study',
    image: 'https://via.placeholder.com/400x200/059669/FFFFFF?text=Blog+4',
  },
];

const categories = ['ทั้งหมด', 'เทคนิค', 'อัปเดต', 'คู่มือ', 'Case Study'];

export default function BlogPage() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <animated.div style={headerSpring} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              บล็อก
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              เทคนิค ข่าวสาร และอัปเดตล่าสุด
            </p>
          </animated.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-blue-600 font-medium hover:underline"
                  >
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
