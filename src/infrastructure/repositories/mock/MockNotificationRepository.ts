/**
 * MockNotificationRepository
 */

import { INotificationRepository, Notification } from '../../../application/repositories/INotificationRepository';

export class MockNotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'โพสต์สำเร็จ',
      message: 'โพสต์ "โปรโมชั่นพิเศษ! ลด 50%" ถูกเผยแพร่ไปยัง 3 กลุ่มแล้ว',
      time: '2 นาทีที่แล้ว',
      isRead: false,
    },
    {
      id: '2',
      type: 'success',
      title: 'โพสต์สำเร็จ',
      message: 'โพสต์ "สินค้าใหม่เข้าแล้ว!" ถูกเผยแพร่เรียบร้อย',
      time: '15 นาทีที่แล้ว',
      isRead: false,
    },
    {
      id: '3',
      type: 'error',
      title: 'Token หมดอายุ',
      message: 'บัญชี Instagram @shop_fashion ต้องเชื่อมต่อใหม่',
      time: '1 ชั่วโมงที่แล้ว',
      isRead: false,
    },
    {
      id: '4',
      type: 'warning',
      title: 'โพสต์ตามกำหนดการ',
      message: 'มีโพสต์ที่กำหนดไว้ในอีก 15 นาที',
      time: '2 ชั่วโมงที่แล้ว',
      isRead: true,
    },
    {
      id: '5',
      type: 'info',
      title: 'รายงานประจำสัปดาห์',
      message: 'Engagement เพิ่มขึ้น 23.5% จากสัปดาห์ก่อน',
      time: 'เมื่อวาน',
      isRead: true,
    },
  ];

  async getAll(): Promise<Notification[]> {
    return [...this.notifications];
  }

  async getUnread(): Promise<Notification[]> {
    return this.notifications.filter((n) => !n.isRead);
  }

  async markAsRead(id: string): Promise<boolean> {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index === -1) return false;
    this.notifications[index].isRead = true;
    return true;
  }

  async markAllAsRead(): Promise<boolean> {
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.notifications.length;
    this.notifications = this.notifications.filter((n) => n.id !== id);
    return this.notifications.length < initialLength;
  }

  async clearAll(): Promise<boolean> {
    this.notifications = [];
    return true;
  }
}
