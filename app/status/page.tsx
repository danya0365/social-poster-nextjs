'use client';

/**
 * System Status Page
 */

import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { Activity, CheckCircle2, Database, Globe, Server, Zap } from 'lucide-react';

const services = [
  { name: 'เว็บแอปพลิเคชัน', status: 'operational', uptime: '99.99%', icon: Globe },
  { name: 'API หลัก', status: 'operational', uptime: '99.95%', icon: Server },
  { name: 'ฐานข้อมูล', status: 'operational', uptime: '99.99%', icon: Database },
  { name: 'ระบบโพสต์อัตโนมัติ', status: 'operational', uptime: '99.90%', icon: Zap },
];

const incidents = [
  {
    date: '8 ก.พ. 2026',
    title: 'ไม่มีเหตุการณ์ผิดปกติ',
    status: 'resolved',
  },
];

export default function StatusPage() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <animated.div style={headerSpring} className="text-center mb-12">
            <Activity className="w-16 h-16 mx-auto text-green-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              สถานะระบบ
            </h1>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              ระบบทำงานปกติ
            </div>
          </animated.div>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              สถานะบริการ
            </h2>
            <div className="space-y-4">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        Uptime: {service.uptime}
                      </span>
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="w-5 h-5 mr-1" />
                        <span className="text-sm">ปกติ</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Uptime chart placeholder */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              ประวัติ Uptime (90 วัน)
            </h2>
            <div className="flex gap-1 h-8">
              {Array.from({ length: 90 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500 rounded-sm hover:bg-green-400 transition-colors"
                  title={`${90 - i} วันที่แล้ว: 100%`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>90 วันที่แล้ว</span>
              <span>วันนี้</span>
            </div>
          </section>

          {/* Recent incidents */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              เหตุการณ์ล่าสุด
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <p className="text-green-700 dark:text-green-400 font-medium">
                ไม่มีเหตุการณ์ผิดปกติในช่วง 90 วันที่ผ่านมา
              </p>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
