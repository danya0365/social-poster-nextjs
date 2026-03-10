/**
 * INotificationRepository
 * Repository interface for Notification data access
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface INotificationRepository {
  getAll(): Promise<Notification[]>;
  getUnread(): Promise<Notification[]>;
  markAsRead(id: string): Promise<boolean>;
  markAllAsRead(): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  clearAll(): Promise<boolean>;
}
