/**
 * MockAccountRepository
 */

import { IAccountRepository, SocialAccount } from '../../../application/repositories/IAccountRepository';

export class MockAccountRepository implements IAccountRepository {
  private accounts: SocialAccount[] = [
    {
      id: 'acc-1',
      userId: 'user-1',
      platform: 'facebook',
      name: 'ร้านค้าออนไลน์ 24HR',
      username: 'shop24hr',
      status: 'connected',
      followers: 15420,
      posts: 342,
      lastSync: new Date().toISOString(),
    },
    {
      id: 'acc-2',
      userId: 'user-1',
      platform: 'instagram',
      name: 'Shop24HR Official',
      username: 'shop24hr_official',
      status: 'connected',
      followers: 8930,
      posts: 156,
      lastSync: new Date().toISOString(),
    },
    {
      id: 'acc-3',
      userId: 'user-1',
      platform: 'twitter',
      name: 'Shop 24HR',
      username: 'shop24hr',
      status: 'expired',
      followers: 2340,
      posts: 89,
      lastSync: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'acc-4',
      userId: 'user-1',
      platform: 'facebook',
      name: 'กลุ่มขายของมือสอง',
      username: 'secondhand.group',
      status: 'connected',
      followers: 45200,
      posts: 567,
      lastSync: new Date().toISOString(),
    },
  ];

  async getById(id: string): Promise<SocialAccount | null> {
    return this.accounts.find(a => a.id === id) || null;
  }

  async getByUserId(userId: string): Promise<SocialAccount[]> {
    return this.accounts.filter(a => a.userId === userId);
  }

  async getAll(): Promise<SocialAccount[]> {
    return [...this.accounts];
  }

  async create(data: Omit<SocialAccount, 'id' | 'lastSync'>): Promise<SocialAccount> {
    const newAccount: SocialAccount = {
      ...data,
      id: `acc-${this.accounts.length + 1}`,
      lastSync: new Date().toISOString(),
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  async update(id: string, data: Partial<SocialAccount>): Promise<SocialAccount> {
    const index = this.accounts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Account not found');
    this.accounts[index] = { ...this.accounts[index], ...data };
    return this.accounts[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter(a => a.id !== id);
    return this.accounts.length < initialLength;
  }

  async sync(id: string): Promise<SocialAccount> {
    const account = await this.getById(id);
    if (!account) throw new Error('Account not found');
    const updated = { ...account, lastSync: new Date().toISOString() };
    await this.update(id, updated);
    return updated;
  }
}
