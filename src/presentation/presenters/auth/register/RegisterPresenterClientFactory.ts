/**
 * RegisterPresenterClientFactory
 */

'use client';

import { ApiAuthRepository } from '@/src/infrastructure/repositories/api/ApiAuthRepository';
import { RegisterPresenter } from './RegisterPresenter';

export class RegisterPresenterClientFactory {
  static create(): RegisterPresenter {
    const repository = new ApiAuthRepository();
    return new RegisterPresenter(repository);
  }
}

export function createClientRegisterPresenter(): RegisterPresenter {
  return RegisterPresenterClientFactory.create();
}
