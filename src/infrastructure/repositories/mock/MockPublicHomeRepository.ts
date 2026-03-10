/**
 * MockPublicHomeRepository
 */

import { IPublicHomeRepository, PublicHomeData } from '../../../application/repositories/IPublicHomeRepository';

export class MockPublicHomeRepository implements IPublicHomeRepository {
  async getHomeData(): Promise<PublicHomeData> {
    return {
      hero: {
        title: 'ระบบโพสต์ขายอัตโนมัติ 24 ชม.',
        subtitle: 'ช่วยคุณโพสต์ขายสินค้าลงกลุ่ม Facebook อัตโนมัติ ประหยัดเวลา เพิ่มยอดขาย 10 เท่า!',
        ctaText: 'เริ่มใช้งานฟรี 7 วัน',
        ctaLink: '/auth/register',
      },
      features: [
        { id: '1', title: 'โพสต์อัตโนมัติ', description: 'ตั้งเวลาโพสต์ล่วงหน้าได้ไม่จำกัด', iconName: 'Clock' },
        { id: '2', title: 'วนลูปโพสต์', description: 'โพสต์ซ้ำอัตโนมัติตามช่วงเวลาที่กำหนด', iconName: 'Repeat' },
        { id: '3', title: 'AI ช่วยเขียน', description: 'สร้างเนื้อหาโพสต์ที่น่าสนใจด้วย AI', iconName: 'Sparkles' },
        { id: '4', title: 'ตอบคอมเมนต์', description: 'ระบบตอบคอมเมนต์และดึงเข้าแชทอัตโนมัติ', iconName: 'MessageCircle' },
      ],
    };
  }
}
