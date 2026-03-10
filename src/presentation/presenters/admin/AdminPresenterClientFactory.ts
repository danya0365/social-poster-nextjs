/**
 * AdminPresenterClientFactory
 * Factory for creating AdminPresenter instances on the client side
 */

'use client';

import { MockAdminRepository } from '@/src/infrastructure/repositories/mock/MockAdminRepository';
import { AdminPresenter } from './AdminPresenter';

export class AdminPresenterClientFactory {
  static create(): AdminPresenter {
    const repository = new MockAdminRepository();
    return new AdminPresenter(repository);
  }
}

export function createClientAdminPresenter(): AdminPresenter {
  return AdminPresenterClientFactory.create();
}
