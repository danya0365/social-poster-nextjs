/**
 * INotificationRepository
 * Repository interface for Notification data access
 */

import { StatusType } from '@/src/domain/types/social';

export interface Notification {
  id: string;
  type: StatusType;
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
