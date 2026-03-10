/**
 * LoginPresenterClientFactory
 * Factory for creating LoginPresenter instances on the client side
 */

'use client';

import { ApiAuthRepository } from '@/src/infrastructure/repositories/api/ApiAuthRepository';
import { LoginPresenter } from './LoginPresenter';
// import { MockAuthRepository } from '@/src/infrastructure/repositories/mock/MockAuthRepository';

export class LoginPresenterClientFactory {
  static create(): LoginPresenter {
    // Switch to MockAuthRepository for development if needed
    const repository = new ApiAuthRepository();
    return new LoginPresenter(repository);
  }
}

export function createClientLoginPresenter(): LoginPresenter {
  return LoginPresenterClientFactory.create();
}
