/**
 * ForgotPasswordPresenterServerFactory
 */

import { ServerAuthRepository } from '@/src/infrastructure/repositories/server/ServerAuthRepository';
import { ForgotPasswordPresenter } from './ForgotPasswordPresenter';

export class ForgotPasswordPresenterServerFactory {
  static create(): ForgotPasswordPresenter {
    const repository = new ServerAuthRepository();
    return new ForgotPasswordPresenter(repository);
  }
}

export function createServerForgotPasswordPresenter(): ForgotPasswordPresenter {
  return ForgotPasswordPresenterServerFactory.create();
}
