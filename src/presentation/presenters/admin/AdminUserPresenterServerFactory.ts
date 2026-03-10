import { DrizzleProfileRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleProfileRepository';
import { DrizzleUserRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleUserRepository';
import { AdminUserPresenter } from './AdminUserPresenter';

export class AdminUserPresenterServerFactory {
  static create(): AdminUserPresenter {
    return new AdminUserPresenter(
      new DrizzleUserRepository(),
      new DrizzleProfileRepository()
    );
  }
}

export function createServerAdminUserPresenter(): AdminUserPresenter {
  return AdminUserPresenterServerFactory.create();
}
