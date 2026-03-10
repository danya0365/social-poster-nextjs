/**
 * ISettingsRepository
 * Repository interface for Settings data access
 */

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface NotificationSettings {
  postSuccess: boolean;
  postFailed: boolean;
  scheduleReminder: boolean;
  weeklyReport: boolean;
  newFeatures: boolean;
  emailNotify: boolean;
  lineNotify: boolean;
}

export interface BillingInfo {
  currentPlan: string;
  expiryDate: string;
  monthlyPrice: number;
  paymentMethod: {
    type: string;
    last4: string;
    expiry: string;
  };
  paymentHistory: Array<{
    date: string;
    amount: string;
    status: string;
  }>;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface AppSettings {
  profile: UserProfile;
  notifications: NotificationSettings;
  billing: BillingInfo;
  appearance: AppearanceSettings;
}

export interface ISettingsRepository {
  getSettings(): Promise<AppSettings>;
  updateProfile(data: Partial<UserProfile>): Promise<UserProfile>;
  updateNotifications(data: Partial<NotificationSettings>): Promise<NotificationSettings>;
  updateAppearance(data: Partial<AppearanceSettings>): Promise<AppearanceSettings>;
}
