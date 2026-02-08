'use client';

/**
 * Careers Page
 */

import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { ArrowRight, Briefcase, Clock, Coffee, Heart, MapPin, Users, Zap } from 'lucide-react';

const benefits = [
  { icon: Heart, title: 'ประกันสุขภาพ', desc: 'ครอบคลุมทั้งครอบครัว' },
  { icon: Zap, title: 'ทำงานยืดหยุ่น', desc: 'Work from anywhere' },
  { icon: Users, title: 'ทีมเล็กๆ แต่แข็งแกร่ง', desc: 'เรียนรู้จากผู้เชี่ยวชาญ' },
  { icon: Coffee, title: 'Free snacks', desc: 'กาแฟ ขนม ไม่อั้น' },
];

const openings = [
  {
    title: 'Senior Frontend Developer',
    team: 'Engineering',
    location: 'กรุงเทพฯ / Remote',
    type: 'Full-time',
  },
  {
    title: 'Backend Developer (Node.js)',
    team: 'Engineering',
    location: 'กรุงเทพฯ / Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Designer',
    team: 'Design',
    location: 'กรุงเทพฯ',
    type: 'Full-time',
  },
  {
    title: 'Customer Success Specialist',
    team: 'Support',
    location: 'กรุงเทพฯ',
    type: 'Full-time',
  },
];

export default function CareersPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                มาร่วมสร้างอนาคตไปด้วยกัน
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                เราเปิดรับผู้ที่หลงใหลในเทคโนโลยีและอยากสร้าง impact ให้กับธุรกิจไทย
              </p>
            </animated.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
              สวัสดิการ
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {b.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open positions */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
              ตำแหน่งที่เปิดรับ
            </h2>
            <div className="space-y-4">
              {openings.map((job, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.team}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ไม่เจอตำแหน่งที่ใช่?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              ส่ง Resume มาให้เราดูได้เลย เราพร้อมเปิดรับคนเก่งเสมอ
            </p>
            <a
              href="mailto:careers@postdee.com"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              ส่ง Resume
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
