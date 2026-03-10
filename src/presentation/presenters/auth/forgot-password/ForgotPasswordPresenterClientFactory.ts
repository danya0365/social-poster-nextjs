/**
 * ForgotPasswordPresenterClientFactory
 */

'use client';

import { ApiAuthRepository } from '@/src/infrastructure/repositories/api/ApiAuthRepository';
import { ForgotPasswordPresenter } from './ForgotPasswordPresenter';

export class ForgotPasswordPresenterClientFactory {
  static create(): ForgotPasswordPresenter {
    const repository = new ApiAuthRepository();
    return new ForgotPasswordPresenter(repository);
  }
}

export function createClientForgotPasswordPresenter(): ForgotPasswordPresenter {
  return ForgotPasswordPresenterClientFactory.create();
}
