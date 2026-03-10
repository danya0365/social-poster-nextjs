/**
 * IAccountRepository
 * Repository interface for Social Account data access
 */

export type AccountPlatform = 'facebook' | 'instagram' | 'twitter';
export type AccountStatus = 'connected' | 'expired' | 'disconnected' | 'error';

export interface SocialAccount {
  id: string;
  userId: string;
  platform: AccountPlatform;
  name: string;
  username: string;
  status: AccountStatus;
  followers: number;
  posts: number;
  lastSync: string;
}

export interface IAccountRepository {
  getById(id: string): Promise<SocialAccount | null>;
  getByUserId(userId: string): Promise<SocialAccount[]>;
  getAll(): Promise<SocialAccount[]>;
  create(data: Omit<SocialAccount, 'id' | 'lastSync'>): Promise<SocialAccount>;
  update(id: string, data: Partial<SocialAccount>): Promise<SocialAccount>;
  delete(id: string): Promise<boolean>;
  sync(id: string): Promise<SocialAccount>;
}
