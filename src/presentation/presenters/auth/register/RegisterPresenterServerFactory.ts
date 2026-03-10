/**
 * RegisterPresenterServerFactory
 */

import { ServerAuthRepository } from '@/src/infrastructure/repositories/server/ServerAuthRepository';
import { RegisterPresenter } from './RegisterPresenter';

export class RegisterPresenterServerFactory {
  static create(): RegisterPresenter {
    const repository = new ServerAuthRepository();
    return new RegisterPresenter(repository);
  }
}

export function createServerRegisterPresenter(): RegisterPresenter {
  return RegisterPresenterServerFactory.create();
}
