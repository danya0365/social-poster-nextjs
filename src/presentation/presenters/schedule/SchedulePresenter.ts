/**
 * SchedulePresenter
 */

import { IPostRepository, Post } from '@/src/application/repositories/IPostRepository';

export interface ScheduleViewModel {
  scheduledPosts: Post[];
}

export class SchedulePresenter {
  constructor(private readonly postRepository: IPostRepository) {}

  async getViewModel(): Promise<ScheduleViewModel> {
    try {
      const posts = await this.postRepository.getByStatus('scheduled');
      return { scheduledPosts: posts };
    } catch (error) {
      console.error('Error getting schedule view model:', error);
      throw error;
    }
  }

  async savePost(data: any): Promise<Post> {
    return await this.postRepository.create(data);
  }
}
