'use client';

/**
 * Privacy Policy Page
 */

import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <animated.div style={headerSpring} className="text-center mb-12">
            <Shield className="w-16 h-16 mx-auto text-blue-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              อัปเดตล่าสุด: 1 มกราคม 2026
            </p>
          </animated.div>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                เราเก็บรวบรวมข้อมูลประเภทต่อไปนี้:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>ข้อมูลบัญชี:</strong> ชื่อ, อีเมล, รหัสผ่าน (เข้ารหัส)</li>
                <li><strong>ข้อมูล Social Media:</strong> Token การเข้าถึง Facebook ที่คุณอนุญาต</li>
                <li><strong>ข้อมูลการใช้งาน:</strong> ประวัติการโพสต์, กลุ่มเป้าหมาย</li>
                <li><strong>ข้อมูลเทคนิค:</strong> IP Address, ประเภทเบราว์เซอร์</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. วิธีที่เราใช้ข้อมูล
              </h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>ให้บริการโพสต์อัตโนมัติตามที่คุณตั้งค่า</li>
                <li>ปรับปรุงและพัฒนาบริการ</li>
                <li>ส่งการแจ้งเตือนและอัปเดต</li>
                <li>ป้องกันการใช้งานที่ไม่เหมาะสม</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. การแบ่งปันข้อมูล
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                เราจะไม่ขายหรือแบ่งปันข้อมูลส่วนบุคคลของคุณกับบุคคลที่สาม
                ยกเว้นในกรณีที่กฎหมายกำหนด หรือเพื่อปกป้องสิทธิ์ของเรา
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. ความปลอดภัยของข้อมูล
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสม รวมถึง:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                <li>การเข้ารหัส SSL/TLS สำหรับการส่งข้อมูล</li>
                <li>การเข้ารหัสรหัสผ่านด้วย bcrypt</li>
                <li>การจำกัดการเข้าถึงข้อมูล</li>
                <li>การสำรองข้อมูลเป็นประจำ</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. สิทธิ์ของคุณ
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณมีสิทธิ์:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                <li>ขอเข้าถึงข้อมูลส่วนบุคคลของคุณ</li>
                <li>ขอแก้ไขข้อมูลที่ไม่ถูกต้อง</li>
                <li>ขอลบข้อมูลของคุณ</li>
                <li>ถอนความยินยอมได้ทุกเมื่อ</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. ติดต่อเรา
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                หากมีคำถามเกี่ยวกับนโยบายนี้ กรุณาติดต่อ:{' '}
                <a href="mailto:privacy@postdee.com" className="text-blue-600 hover:underline">
                  privacy@postdee.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
