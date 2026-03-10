/**
 * IGroupRepository
 * Repository interface for Group data access
 */

import { GroupStatus, GroupType, SocialPlatform } from '../../domain/types/social';

export interface SocialGroup {
  id: string;
  name: string;
  platform: SocialPlatform;
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
