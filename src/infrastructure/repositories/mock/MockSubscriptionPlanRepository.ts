/**
 * MockSubscriptionPlanRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure layer
 */

import {
    ISubscriptionPlanRepository,
    SubscriptionPlan,
} from '@/src/application/repositories/ISubscriptionPlanRepository';

// Mock data matching the pricing from feature images
const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-weekly',
    name: 'Weekly',
    nameTh: '1 สัปดาห์',
    duration: 7,
    price: 399,
    features: [
      'โพสต์อัตโนมัติ 24 ชม.',
      'วนลูปโพสต์ซ้ำ',
      'ค้นหากลุ่ม AI',
      'Auto Comment',
    ],
    isBestValue: false,
    isActive: true,
  },
  {
    id: 'plan-monthly',
    name: 'Monthly',
    nameTh: '1 เดือน',
    duration: 30,
    price: 799,
    features: [
      'ทุกฟีเจอร์แพ็ค 1 สัปดาห์',
      'แชร์โพสต์เพจไปกลุ่ม',
      'จัดการหลายบัญชี',
      'รายงานสถิติ',
    ],
    isBestValue: false,
    isActive: true,
  },
  {
    id: 'plan-quarterly',
    name: 'Quarterly',
    nameTh: '3 เดือน',
    duration: 90,
    price: 2000,
    originalPrice: 2397,
    features: [
      'ทุกฟีเจอร์แพ็ค 1 เดือน',
      'ประหยัด 397 บาท',
      'Priority Support',
      'เหมาะกับแม่ค้าออนไลน์',
    ],
    isBestValue: false,
    isActive: true,
  },
  {
    id: 'plan-half-year',
    name: 'Half Year',
    nameTh: '5 เดือน',
    duration: 150,
    price: 3500,
    originalPrice: 3995,
    features: [
      'ทุกฟีเจอร์แพ็ค 3 เดือน',
      'ประหยัด 495 บาท',
      'VIP Support',
      'เหมาะกับพ่อค้าแม่ค้าออนไลน์',
    ],
    isBestValue: true,
    isActive: true,
  },
];

export class MockSubscriptionPlanRepository implements ISubscriptionPlanRepository {
  private plans: SubscriptionPlan[] = [...MOCK_PLANS];

  async getById(id: string): Promise<SubscriptionPlan | null> {
    await this.delay(100);
    return this.plans.find((plan) => plan.id === id) || null;
  }

  async getAll(): Promise<SubscriptionPlan[]> {
    await this.delay(100);
    return [...this.plans];
  }

  async getActive(): Promise<SubscriptionPlan[]> {
    await this.delay(100);
    return this.plans.filter((plan) => plan.isActive);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockSubscriptionPlanRepository = new MockSubscriptionPlanRepository();
