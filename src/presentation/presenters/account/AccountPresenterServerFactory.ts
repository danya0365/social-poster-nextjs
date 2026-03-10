import { SessionService } from '@/src/application/use-cases/auth/SessionService';
import { DrizzleUserRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleUserRepository';
import { AccountPresenter } from './AccountPresenter';

export class AccountPresenterServerFactory {
  static create(): AccountPresenter {
    const userRepository = new DrizzleUserRepository();
    
    // In server components, SessionService uses next/headers to read cookies securely
    return new AccountPresenter(userRepository, SessionService);
  }
}

export function createServerAccountPresenter(): AccountPresenter {
  return AccountPresenterServerFactory.create();
}
