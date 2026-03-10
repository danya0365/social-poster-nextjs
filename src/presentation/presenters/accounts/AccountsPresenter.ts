/**
 * AccountsPresenter
 */

import { IAccountRepository, SocialAccount } from '@/src/application/repositories/IAccountRepository';

export interface AccountsViewModel {
  accounts: SocialAccount[];
}

export class AccountsPresenter {
  constructor(private readonly repository: IAccountRepository) {}

  async getViewModel(): Promise<AccountsViewModel> {
    try {
      const accounts = await this.repository.getAll();
      return { accounts };
    } catch (error) {
      console.error('Error getting accounts view model:', error);
      throw error;
    }
  }

  async syncAccount(id: string): Promise<SocialAccount> {
    return await this.repository.sync(id);
  }

  async disconnectAccount(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
