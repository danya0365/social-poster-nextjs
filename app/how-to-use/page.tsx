'use client';

/**
 * How to Use Page
 */

import { siteConfig } from '@/src/config/site.config';
import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import {
    BarChart3,
    Calendar,
    CheckCircle2,
    Link as LinkIcon,
    PenTool,
    Play,
    Repeat,
    UserPlus,
    Users,
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: UserPlus,
    title: 'สมัครสมาชิก',
    desc: 'สร้างบัญชีฟรี ใช้เวลาไม่ถึง 1 นาที',
  },
  {
    icon: LinkIcon,
    title: 'เชื่อมต่อ Facebook',
    desc: 'ล็อกอินเพื่ออนุญาตให้ระบบโพสต์แทน',
  },
  {
    icon: Users,
    title: 'เพิ่มกลุ่มเป้าหมาย',
    desc: 'เลือกกลุ่มที่ต้องการโพสต์ หรือใช้ AI หาให้',
  },
  {
    icon: PenTool,
    title: 'สร้างโพสต์',
    desc: 'เขียนโพสต์หรือใช้ AI ช่วยเขียน',
  },
  {
    icon: Calendar,
    title: 'ตั้งเวลาโพสต์',
    desc: 'เลือกวันเวลาที่ต้องการ หรือโพสต์ทันที',
  },
  {
    icon: Repeat,
    title: 'ตั้งค่าลูป (ถ้าต้องการ)',
    desc: 'ให้ระบบโพสต์วนซ้ำอัตโนมัติ',
  },
  {
    icon: BarChart3,
    title: 'ดูผลลัพธ์',
    desc: 'ติดตามสถิติและปรับปรุงกลยุทธ์',
  },
];

export default function HowToUsePage() {
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
              <Play className="w-16 h-16 mx-auto text-blue-600 mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                วิธีใช้งาน {siteConfig.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                เริ่มต้นใช้งานง่ายๆ ใน 7 ขั้นตอน
              </p>
            </animated.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video placeholder */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              วิดีโอสอนการใช้งาน
            </h2>
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">วิดีโอสาธิตการใช้งาน</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-600 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              พร้อมเริ่มต้นแล้ว!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              สมัครฟรีวันนี้ เริ่มโพสต์อัตโนมัติได้ทันที
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              เริ่มใช้งานฟรี
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
