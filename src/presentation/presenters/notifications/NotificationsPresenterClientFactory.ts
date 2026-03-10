/**
 * NotificationsPresenterClientFactory
 * Factory for creating NotificationsPresenter instances on the client side
 */

'use client';

import { MockNotificationRepository } from '@/src/infrastructure/repositories/mock/MockNotificationRepository';
import { NotificationsPresenter } from './NotificationsPresenter';

export class NotificationsPresenterClientFactory {
  static create(): NotificationsPresenter {
    const repository = new MockNotificationRepository();
    return new NotificationsPresenter(repository);
  }
}

export function createClientNotificationsPresenter(): NotificationsPresenter {
  return NotificationsPresenterClientFactory.create();
}
