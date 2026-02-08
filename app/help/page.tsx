'use client';

/**
 * Help Center Page
 * FAQ and support resources
 */

import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import {
    Book,
    ChevronDown,
    ChevronUp,
    FileText,
    HelpCircle,
    Mail,
    MessageCircle,
    Search,
    Video
} from 'lucide-react';
import { useState } from 'react';

const categories = [
  { icon: Book, name: 'เริ่มต้นใช้งาน', count: 12 },
  { icon: Video, name: 'วิดีโอสอนการใช้', count: 8 },
  { icon: FileText, name: 'คู่มือการใช้งาน', count: 15 },
  { icon: MessageCircle, name: 'การเชื่อมต่อบัญชี', count: 6 },
];

const faqs = [
  {
    q: 'POSTDEE คืออะไร?',
    a: 'POSTDEE คือระบบโพสต์ขายอัตโนมัติ 24 ชม. ที่ช่วยให้คุณโพสต์สินค้าไปยังกลุ่ม Facebook ได้อัตโนมัติ โดยใช้เทคโนโลยี AI ช่วยจัดการ',
  },
  {
    q: 'ฉันสามารถเชื่อมต่อบัญชี Facebook ได้กี่บัญชี?',
    a: 'ขึ้นอยู่กับแพ็กเกจที่คุณเลือก แพ็กเกจ 1 สัปดาห์เชื่อมต่อได้ 3 บัญชี, 1 เดือนได้ 5 บัญชี, 3 เดือนได้ 10 บัญชี และ 5 เดือนได้ไม่จำกัด',
  },
  {
    q: 'วิธีเริ่มต้นใช้งาน?',
    a: 'เพียง 1) สมัครสมาชิก 2) เชื่อมต่อบัญชี Facebook 3) เพิ่มกลุ่มเป้าหมาย 4) สร้างโพสต์และตั้งเวลา ระบบจะจัดการที่เหลือให้อัตโนมัติ',
  },
  {
    q: 'Token หมดอายุทำไงดี?',
    a: 'เมื่อ Token หมดอายุ ให้ไปที่หน้า บัญชี Social และกด "ต่ออายุ Token" เพื่อล็อกอินเข้า Facebook อีกครั้ง',
  },
  {
    q: 'มีรับประกันคืนเงินไหม?',
    a: 'เรามีนโยบายคืนเงินภายใน 7 วัน หากไม่พอใจบริการ โปรดติดต่อทีมซัพพอร์ตเพื่อขอคืนเงิน',
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <animated.div style={headerSpring}>
              <HelpCircle className="w-16 h-16 mx-auto text-blue-600 mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ศูนย์ช่วยเหลือ
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                ค้นหาคำตอบและความช่วยเหลือที่คุณต้องการ
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาคำถามหรือหัวข้อ..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </animated.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              หมวดหมู่
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={i}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <Icon className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500">{cat.count} บทความ</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              คำถามที่พบบ่อย
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.q}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ยังไม่เจอคำตอบ?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              ติดต่อทีมซัพพอร์ตของเราได้ตลอด 24 ชั่วโมง
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:support@postdee.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                ส่งอีเมล
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                แชทสด
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
