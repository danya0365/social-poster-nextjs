'use client';

/**
 * Terms of Service Page
 */

import { siteConfig } from '@/src/config/site.config';
import { MainLayout } from '@/src/presentation/components/layout/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <animated.div style={headerSpring} className="text-center mb-12">
            <FileText className="w-16 h-16 mx-auto text-blue-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ข้อกำหนดการใช้งาน
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              อัปเดตล่าสุด: 1 มกราคม 2026
            </p>
          </animated.div>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. การยอมรับข้อกำหนด
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                โดยการเข้าถึงและใช้งานบริการ {siteConfig.name} ถือว่าคุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้
                หากคุณไม่เห็นด้วยกับข้อกำหนดใดๆ กรุณาหยุดใช้บริการของเรา
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. คำอธิบายบริการ
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {siteConfig.name} เป็นแพลตฟอร์มจัดการ Social Media ที่ช่วยให้ผู้ใช้สามารถ:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                <li>โพสต์เนื้อหาอัตโนมัติไปยังกลุ่ม Facebook</li>
                <li>ตั้งเวลาโพสต์ล่วงหน้า</li>
                <li>จัดการหลายบัญชี Social Media</li>
                <li>วิเคราะห์ประสิทธิภาพการโพสต์</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. การใช้งานที่ยอมรับได้
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                คุณตกลงที่จะไม่ใช้บริการเพื่อ:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                <li>โพสต์เนื้อหาที่ผิดกฎหมายหรือละเมิดสิทธิ์ผู้อื่น</li>
                <li>สแปมหรือรบกวนผู้ใช้อื่น</li>
                <li>ละเมิดนโยบายของ Facebook หรือแพลตฟอร์มอื่นๆ</li>
                <li>แจกจ่ายมัลแวร์หรือไวรัส</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. การชำระเงินและการคืนเงิน
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                การชำระเงินทั้งหมดจะถูกเรียกเก็บล่วงหน้าตามแพ็กเกจที่เลือก
                เรามีนโยบายคืนเงินภายใน 7 วันหากไม่พึงพอใจบริการ
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. การยกเลิกบริการ
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีของคุณหากพบการละเมิดข้อกำหนดเหล่านี้
                โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. ติดต่อเรา
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                หากมีคำถามเกี่ยวกับข้อกำหนดนี้ กรุณาติดต่อ:{' '}
                <a href={`mailto:${siteConfig.contact.legal}`} className="text-blue-600 hover:underline">
                  {siteConfig.contact.legal}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
