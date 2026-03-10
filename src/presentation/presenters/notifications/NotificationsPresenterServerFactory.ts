/**
 * NotificationsPresenterServerFactory
 * Factory for creating NotificationsPresenter instances on the server side
 */

import { MockNotificationRepository } from '@/src/infrastructure/repositories/mock/MockNotificationRepository';
import { NotificationsPresenter } from './NotificationsPresenter';

export class NotificationsPresenterServerFactory {
  static create(): NotificationsPresenter {
    const repository = new MockNotificationRepository();
    return new NotificationsPresenter(repository);
  }
}

export function createServerNotificationsPresenter(): NotificationsPresenter {
  return NotificationsPresenterServerFactory.create();
}
