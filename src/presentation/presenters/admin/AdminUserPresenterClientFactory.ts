'use client';

import { ApiProfileRepository } from '@/src/infrastructure/repositories/api/ApiProfileRepository';
import { ApiUserRepository } from '@/src/infrastructure/repositories/api/ApiUserRepository';
import { AdminUserPresenter } from './AdminUserPresenter';

export class AdminUserPresenterClientFactory {
  static create(): AdminUserPresenter {
    return new AdminUserPresenter(
      new ApiUserRepository(),
      new ApiProfileRepository()
    );
  }
}

export function createClientAdminUserPresenter(): AdminUserPresenter {
  return AdminUserPresenterClientFactory.create();
}
