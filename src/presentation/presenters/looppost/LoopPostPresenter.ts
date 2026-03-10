/**
 * LoopPostPresenter
 */

import { ILoopPostRepository, LoopPost } from '@/src/application/repositories/ILoopPostRepository';

export interface LoopPostViewModel {
  loopPosts: LoopPost[];
}

export class LoopPostPresenter {
  constructor(private readonly repository: ILoopPostRepository) {}

  async getViewModel(): Promise<LoopPostViewModel> {
    try {
      const loopPosts = await this.repository.getAll();
      return { loopPosts };
    } catch (error) {
      console.error('Error getting loop post view model:', error);
      throw error;
    }
  }

  async toggleStatus(id: string, currentStatus: string): Promise<LoopPost> {
    const nextStatus = currentStatus === 'active' ? 'paused' : 'active';
    return await this.repository.update(id, { status: nextStatus });
  }

  async createLoopPost(data: any): Promise<LoopPost> {
    return await this.repository.create(data);
  }
}
