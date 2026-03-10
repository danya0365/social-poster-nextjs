/**
 * MockPricingRepository
 */

import { IPricingRepository, PricingFAQ, PricingPlan } from '../../../application/repositories/IPricingRepository';

export class MockPricingRepository implements IPricingRepository {
  private plans: PricingPlan[] = [
    {
      id: 'weekly',
      name: '1 สัปดาห์',
      duration: '7 วัน',
      originalPrice: 399,
      price: 399,
      pricePerDay: 57,
      features: [
        'โพสต์อัตโนมัติ 24 ชม.',
        'เชื่อมต่อ 3 บัญชี',
        'กลุ่มเป้าหมาย 10 กลุ่ม',
        'รายงานพื้นฐาน',
      ],
      iconName: 'Calendar',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'monthly',
      name: '1 เดือน',
      duration: '30 วัน',
      originalPrice: 799,
      price: 799,
      pricePerDay: 26,
      features: [
        'โพสต์อัตโนมัติ 24 ชม.',
        'เชื่อมต่อ 5 บัญชี',
        'กลุ่มเป้าหมาย 30 กลุ่ม',
        'รายงานขั้นสูง',
        'AI ช่วยเขียนโพสต์',
      ],
      iconName: 'Zap',
      gradient: 'from-purple-500 to-pink-500',
      isPopular: true,
    },
    {
      id: 'quarterly',
      name: '3 เดือน',
      duration: '90 วัน',
      originalPrice: 2397,
      price: 2000,
      pricePerDay: 22,
      savings: 397,
      features: [
        'โพสต์อัตโนมัติ 24 ชม.',
        'เชื่อมต่อ 10 บัญชี',
        'กลุ่มเป้าหมาย 50 กลุ่ม',
        'รายงานขั้นสูง + Export',
        'AI ช่วยเขียนโพสต์',
        'ตอบคอมเมนต์อัตโนมัติ',
      ],
      iconName: 'Crown',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'biannual',
      name: '5 เดือน',
      duration: '150 วัน',
      originalPrice: 3995,
      price: 3500,
      pricePerDay: 23,
      savings: 495,
      features: [
        'ทุกฟีเจอร์ใน 3 เดือน',
        'เชื่อมต่อไม่จำกัด',
        'กลุ่มเป้าหมายไม่จำกัด',
        'Priority Support',
        'API Access',
        'Custom Analytics',
      ],
      iconName: 'Sparkles',
      gradient: 'from-yellow-500 to-orange-500',
      isBestValue: true,
    },
  ];

  private faqs: PricingFAQ[] = [
    { q: 'เริ่มใช้งานได้เลยไหม?', a: 'ได้ครับ! หลังชำระเงินสำเร็จ ระบบจะเปิดใช้งานทันที' },
    { q: 'ปลอดภัยไหม?', a: 'ใช้ระบบ API อย่างเป็นทางการ 100% ไม่ใช่บอทกดจอ' },
    { q: 'ยกเลิกได้ไหม?', a: 'ยกเลิกได้ทุกเมื่อ ไม่มีค่าใช้จ่ายเพิ่มเติม' },
    { q: 'มี Support ไหม?', a: 'มีทีมซัพพอร์ตพร้อมช่วยเหลือ 24/7' },
  ];

  async getPlans(): Promise<PricingPlan[]> {
    return [...this.plans];
  }

  async getFAQs(): Promise<PricingFAQ[]> {
    return [...this.faqs];
  }
}
