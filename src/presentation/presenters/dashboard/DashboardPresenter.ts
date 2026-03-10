/**
 * DashboardPresenter
 * Handles data aggregation for the main dashboard view
 */

import { IAuthRepository } from '@/src/application/repositories/IAuthRepository';
import { IPostRepository, Post, PostStats } from '@/src/application/repositories/IPostRepository';

export interface DashboardViewModel {
  userName: string;
  stats: PostStats;
  recentPosts: Post[];
  scheduledPosts: Post[];
}

export class DashboardPresenter {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly authRepository: IAuthRepository
  ) {}

  /**
   * Get initial view model for the dashboard
   */
  async getViewModel(): Promise<DashboardViewModel> {
    try {
      // Get session and stats/posts in parallel
      const [session, stats, allPosts] = await Promise.all([
        this.authRepository.getSession(),
        this.postRepository.getStats(),
        this.postRepository.getPaginated(1, 10), // Get first 10 posts
      ]);

      const userName = session.user?.name || 'User';
      
      // Filter for recent/scheduled (in mock we just take slices for now or use repository methods if specific)
      // For this implementation, we'll use what we have in repository
      const recentPosts = allPosts.data.filter(p => p.status === 'published').slice(0, 5);
      const scheduledPosts = allPosts.data.filter(p => p.status === 'scheduled').slice(0, 5);

      return {
        userName,
        stats,
        recentPosts,
        scheduledPosts,
      };
    } catch (error) {
      console.error('Error getting dashboard view model:', error);
      throw error;
    }
  }
}
