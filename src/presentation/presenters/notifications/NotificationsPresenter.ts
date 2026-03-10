/**
 * NotificationsPresenter
 */

import { INotificationRepository, Notification } from '@/src/application/repositories/INotificationRepository';

export interface NotificationsViewModel {
  notifications: Notification[];
}

export class NotificationsPresenter {
  constructor(private readonly repository: INotificationRepository) {}

  async getViewModel(): Promise<NotificationsViewModel> {
    try {
      const notifications = await this.repository.getAll();
      return { notifications };
    } catch (error) {
      console.error('Error getting notifications view model:', error);
      throw error;
    }
  }

  async markAsRead(id: string): Promise<boolean> {
    return await this.repository.markAsRead(id);
  }

  async markAllAsRead(): Promise<boolean> {
    return await this.repository.markAllAsRead();
  }

  async deleteNotification(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async clearAll(): Promise<boolean> {
    return await this.repository.clearAll();
  }
}
