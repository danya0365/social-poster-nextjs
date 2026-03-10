/**
 * GroupsPresenter
 */

import { IGroupRepository, SocialGroup } from '@/src/application/repositories/IGroupRepository';

export interface GroupsViewModel {
  groups: SocialGroup[];
}

export class GroupsPresenter {
  constructor(private readonly repository: IGroupRepository) {}

  async getViewModel(): Promise<GroupsViewModel> {
    try {
      const groups = await this.repository.getAll();
      return { groups };
    } catch (error) {
      console.error('Error getting groups view model:', error);
      throw error;
    }
  }

  async toggleAutoPost(id: string, currentStatus: boolean): Promise<SocialGroup> {
    return await this.repository.update(id, { autoPost: !currentStatus });
  }

  async deleteGroup(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
