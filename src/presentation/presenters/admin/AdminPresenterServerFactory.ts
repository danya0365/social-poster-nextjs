/**
 * AdminPresenterServerFactory
 * Factory for creating AdminPresenter instances on the server side
 */

import { MockAdminRepository } from '@/src/infrastructure/repositories/mock/MockAdminRepository';
import { AdminPresenter } from './AdminPresenter';

export class AdminPresenterServerFactory {
  static create(): AdminPresenter {
    const repository = new MockAdminRepository();
    return new AdminPresenter(repository);
  }
}

export function createServerAdminPresenter(): AdminPresenter {
  return AdminPresenterServerFactory.create();
}
