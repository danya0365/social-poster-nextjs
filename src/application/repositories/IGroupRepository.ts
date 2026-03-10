/**
 * IGroupRepository
 * Repository interface for Group data access
 */

export type GroupPlatform = 'facebook' | 'instagram' | 'twitter';
export type GroupType = 'group' | 'page' | 'profile' | 'community';
export type GroupStatus = 'active' | 'pending' | 'error';

export interface SocialGroup {
  id: string;
  name: string;
  platform: GroupPlatform;
  type: GroupType;
  members: number;
  autoPost: boolean;
  autoComment: boolean;
  status: GroupStatus;
}

export interface IGroupRepository {
  getAll(): Promise<SocialGroup[]>;
  getById(id: string): Promise<SocialGroup | null>;
  create(data: Omit<SocialGroup, 'id'>): Promise<SocialGroup>;
  update(id: string, data: Partial<SocialGroup>): Promise<SocialGroup>;
  delete(id: string): Promise<boolean>;
}
