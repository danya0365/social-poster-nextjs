/**
 * AccountsPresenterServerFactory
 * Factory for creating AccountsPresenter instances on the server side
 */

import { MockAccountRepository } from '@/src/infrastructure/repositories/mock/MockAccountRepository';
import { AccountsPresenter } from './AccountsPresenter';

export class AccountsPresenterServerFactory {
  static create(): AccountsPresenter {
    const repository = new MockAccountRepository();
    return new AccountsPresenter(repository);
  }
}

export function createServerAccountsPresenter(): AccountsPresenter {
  return AccountsPresenterServerFactory.create();
}
