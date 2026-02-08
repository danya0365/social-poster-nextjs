'use client';

/**
 * Updates/Changelog Page
 */

import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { Bug, Layout, Shield, Sparkles, Zap } from 'lucide-react';

const updates = [
  {
    version: '2.5.0',
    date: '8 ก.พ. 2026',
    title: 'AI Content Generator & Loop Post',
    changes: [
      { type: 'new', text: 'เพิ่ม AI ช่วยเขียนโพสต์ 4 ประเภท' },
      { type: 'new', text: 'เพิ่มระบบวนลูปโพสต์อัตโนมัติ' },
      { type: 'improve', text: 'ปรับปรุง UI หน้า Settings' },
      { type: 'fix', text: 'แก้ไขบั๊กการแสดงผลบน mobile' },
    ],
  },
  {
    version: '2.4.0',
    date: '1 ก.พ. 2026',
    title: 'Analytics Dashboard & Auto Comment',
    changes: [
      { type: 'new', text: 'หน้า Analytics พร้อมกราฟสถิติ' },
      { type: 'new', text: 'ระบบ Auto Comment ดันโพสต์' },
      { type: 'improve', text: 'เพิ่มความเร็วในการโหลดหน้า' },
    ],
  },
  {
    version: '2.3.0',
    date: '25 ม.ค. 2026',
    title: 'Group Management & AI Finder',
    changes: [
      { type: 'new', text: 'AI ค้นหากลุ่มเป้าหมายตามคีย์เวิร์ด' },
      { type: 'new', text: 'จัดการกลุ่มด้วย tags และ categories' },
      { type: 'security', text: 'เพิ่มการเข้ารหัส Token' },
    ],
  },
  {
    version: '2.2.0',
    date: '15 ม.ค. 2026',
    title: 'Schedule Calendar',
    changes: [
      { type: 'new', text: 'ปฏิทินตั้งเวลาโพสต์แบบ Interactive' },
      { type: 'improve', text: 'รองรับ Dark Mode ทั้งระบบ' },
      { type: 'fix', text: 'แก้ไขปัญหา Token หมดอายุ' },
    ],
  },
];

const typeConfig = {
  new: { icon: Sparkles, label: 'ใหม่', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
  improve: { icon: Zap, label: 'ปรับปรุง', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  fix: { icon: Bug, label: 'แก้ไข', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' },
  security: { icon: Shield, label: 'ความปลอดภัย', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
};

export default function UpdatesPage() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <animated.div style={headerSpring} className="text-center mb-12">
            <Layout className="w-16 h-16 mx-auto text-blue-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              อัปเดตและ Changelog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              ดูฟีเจอร์ใหม่และการปรับปรุงล่าสุด
            </p>
          </animated.div>

          <div className="space-y-8">
            {updates.map((update, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-sm font-medium">
                      v{update.version}
                    </span>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {update.title}
                  </h2>
                </div>
                <div className="p-6 space-y-3">
                  {update.changes.map((change, j) => {
                    const config = typeConfig[change.type as keyof typeof typeConfig];
                    const Icon = config.icon;
                    return (
                      <div key={j} className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
                        >
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {change.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
