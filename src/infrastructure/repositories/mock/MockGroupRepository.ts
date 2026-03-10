/**
 * MockGroupRepository
 */

import { IGroupRepository, SocialGroup } from '../../../application/repositories/IGroupRepository';

export class MockGroupRepository implements IGroupRepository {
  private groups: SocialGroup[] = [
    {
      id: 'grp-1',
      name: 'กลุ่มขายของออนไลน์ Thailand',
      platform: 'facebook',
      type: 'group',
      members: 125000,
      autoPost: true,
      autoComment: true,
      status: 'active',
    },
    {
      id: 'grp-2',
      name: 'ตลาดนัดออนไลน์ 24 ชม.',
      platform: 'facebook',
      type: 'group',
      members: 89000,
      autoPost: true,
      autoComment: false,
      status: 'active',
    },
    {
      id: 'grp-3',
      name: 'แฟชั่นราคาถูก ส่งฟรี',
      platform: 'facebook',
      type: 'group',
      members: 67000,
      autoPost: false,
      autoComment: true,
      status: 'pending',
    },
    {
      id: 'grp-4',
      name: 'ร้านค้าออนไลน์ 24HR',
      platform: 'facebook',
      type: 'page',
      members: 15420,
      autoPost: true,
      autoComment: true,
      status: 'active',
    },
    {
      id: 'grp-5',
      name: 'ขายของ Shopee Lazada',
      platform: 'facebook',
      type: 'group',
      members: 156000,
      autoPost: true,
      autoComment: false,
      status: 'error',
    },
  ];

  async getAll(): Promise<SocialGroup[]> {
    return [...this.groups];
  }

  async getById(id: string): Promise<SocialGroup | null> {
    return this.groups.find((g) => g.id === id) || null;
  }

  async create(data: Omit<SocialGroup, 'id'>): Promise<SocialGroup> {
    const newGroup: SocialGroup = {
      ...data,
      id: `grp-${this.groups.length + 1}`,
    };
    this.groups.push(newGroup);
    return newGroup;
  }

  async update(id: string, data: Partial<SocialGroup>): Promise<SocialGroup> {
    const index = this.groups.findIndex((g) => g.id === id);
    if (index === -1) throw new Error('Group not found');
    this.groups[index] = { ...this.groups[index], ...data };
    return this.groups[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.groups.length;
    this.groups = this.groups.filter((g) => g.id !== id);
    return this.groups.length < initialLength;
  }
}
