/**
 * SettingsPresenter
 */

import { AppearanceSettings, AppSettings, ISettingsRepository, NotificationSettings, UserProfile } from '@/src/application/repositories/ISettingsRepository';

export interface SettingsViewModel {
  settings: AppSettings;
}

export class SettingsPresenter {
  constructor(private readonly repository: ISettingsRepository) {}

  async getViewModel(): Promise<SettingsViewModel> {
    try {
      const settings = await this.repository.getSettings();
      return { settings };
    } catch (error) {
      console.error('Error getting settings view model:', error);
      throw error;
    }
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return await this.repository.updateProfile(data);
  }

  async updateNotifications(data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    return await this.repository.updateNotifications(data);
  }

  async updateAppearance(data: Partial<AppearanceSettings>): Promise<AppearanceSettings> {
    return await this.repository.updateAppearance(data);
  }
}
