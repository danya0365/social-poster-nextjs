/**
 * MockSettingsRepository
 */

import { AppearanceSettings, AppSettings, ISettingsRepository, NotificationSettings, UserProfile } from '../../../application/repositories/ISettingsRepository';

export class MockSettingsRepository implements ISettingsRepository {
  private settings: AppSettings = {
    profile: {
      firstName: 'Maros',
      lastName: 'Admin',
      email: 'admin@await.life',
      phone: '081-234-5678',
    },
    notifications: {
      postSuccess: true,
      postFailed: true,
      scheduleReminder: true,
      weeklyReport: true,
      newFeatures: false,
      emailNotify: true,
      lineNotify: false,
    },
    billing: {
      currentPlan: 'Pro',
      expiryDate: '28 ก.พ. 2026',
      monthlyPrice: 799,
      paymentMethod: {
        type: 'VISA',
        last4: '4242',
        expiry: '12/27',
      },
      paymentHistory: [
        { date: '1 ก.พ. 2026', amount: '799', status: 'สำเร็จ' },
        { date: '1 ม.ค. 2026', amount: '799', status: 'สำเร็จ' },
        { date: '1 ธ.ค. 2025', amount: '799', status: 'สำเร็จ' },
      ],
    },
    appearance: {
      theme: 'system',
      language: 'th',
      timezone: 'Asia/Bangkok (GMT+7)',
    },
  };

  async getSettings(): Promise<AppSettings> {
    return { ...this.settings };
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    this.settings.profile = { ...this.settings.profile, ...data };
    return this.settings.profile;
  }

  async updateNotifications(data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    this.settings.notifications = { ...this.settings.notifications, ...data };
    return this.settings.notifications;
  }

  async updateAppearance(data: Partial<AppearanceSettings>): Promise<AppearanceSettings> {
    this.settings.appearance = { ...this.settings.appearance, ...data };
    return this.settings.appearance;
  }
}
