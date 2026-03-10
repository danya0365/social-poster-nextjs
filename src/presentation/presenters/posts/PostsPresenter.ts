/**
 * PostsPresenter
 * Handles business logic for the posts management page
 */

import { IPostRepository, Post, PostStatus } from '@/src/application/repositories/IPostRepository';

export interface PostsViewModel {
  posts: Post[];
  total: number;
}

export class PostsPresenter {
  constructor(private readonly repository: IPostRepository) {}

  /**
   * Get initial view model for the posts page
   */
  async getViewModel(page: number = 1, perPage: number = 10): Promise<PostsViewModel> {
    try {
      const result = await this.repository.getPaginated(page, perPage);
      return {
        posts: result.data,
        total: result.total,
      };
    } catch (error) {
      console.error('Error getting posts view model:', error);
      throw error;
    }
  }

  /**
   * Filter posts by status
   */
  async getPostsByStatus(status: PostStatus | 'all'): Promise<Post[]> {
    try {
      if (status === 'all') {
        return await this.repository.getAll();
      }
      return await this.repository.getByStatus(status);
    } catch (error) {
      console.error('Error filtering posts:', error);
      throw error;
    }
  }

  /**
   * Delete a post
   */
  async deletePost(id: string): Promise<boolean> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  }
}
