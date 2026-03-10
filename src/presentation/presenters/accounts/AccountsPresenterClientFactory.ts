/**
 * AccountsPresenterClientFactory
 * Factory for creating AccountsPresenter instances on the client side
 */

'use client';

import { MockAccountRepository } from '@/src/infrastructure/repositories/mock/MockAccountRepository';
import { AccountsPresenter } from './AccountsPresenter';

export class AccountsPresenterClientFactory {
  static create(): AccountsPresenter {
    const repository = new MockAccountRepository();
    return new AccountsPresenter(repository);
  }
}

export function createClientAccountsPresenter(): AccountsPresenter {
  return AccountsPresenterClientFactory.create();
}
