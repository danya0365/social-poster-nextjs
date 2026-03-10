/**
 * LoginPresenterServerFactory
 * Factory for creating LoginPresenter instances on the server side
 */

import { ServerAuthRepository } from '@/src/infrastructure/repositories/server/ServerAuthRepository';
import { LoginPresenter } from './LoginPresenter';
// import { MockAuthRepository } from '@/src/infrastructure/repositories/mock/MockAuthRepository';

export class LoginPresenterServerFactory {
  static create(): LoginPresenter {
    // Switch to MockAuthRepository for development if needed
    const repository = new ServerAuthRepository();
    return new LoginPresenter(repository);
  }
}

export function createServerLoginPresenter(): LoginPresenter {
  return LoginPresenterServerFactory.create();
}
