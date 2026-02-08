/**
 * MockPostRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure layer
 */

import {
    CreatePostData,
    IPostRepository,
    PaginatedResult,
    Post,
    PostStats,
    PostStatus,
    UpdatePostData,
} from '@/src/application/repositories/IPostRepository';

// Mock data
const MOCK_POSTS: Post[] = [
  {
    id: 'post-001',
    userId: 'user-001',
    content: '🔥 สินค้าใหม่มาแล้ว! เสื้อผ้าแฟชั่นคุณภาพดี ราคาถูก สั่งได้เลยค่ะ #แฟชั่น #ขายของออนไลน์',
    mediaUrls: ['https://picsum.photos/seed/post1/400/400'],
    status: 'published',
    platforms: ['facebook', 'instagram'],
    scheduledAt: '2026-02-08T10:00:00.000Z',
    publishedAt: '2026-02-08T10:00:00.000Z',
    engagement: { likes: 150, comments: 23, shares: 12 },
    createdAt: '2026-02-08T09:00:00.000Z',
    updatedAt: '2026-02-08T10:00:00.000Z',
  },
  {
    id: 'post-002',
    userId: 'user-001',
    content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น วันนี้วันเดียวเท่านั้น รีบสั่งก่อนหมด!',
    mediaUrls: ['https://picsum.photos/seed/post2/400/400'],
    status: 'scheduled',
    platforms: ['facebook'],
    scheduledAt: '2026-02-09T14:00:00.000Z',
    engagement: { likes: 0, comments: 0, shares: 0 },
    createdAt: '2026-02-08T08:00:00.000Z',
    updatedAt: '2026-02-08T08:00:00.000Z',
  },
  {
    id: 'post-003',
    userId: 'user-001',
    content: '✨ ของใหม่เข้าร้านแล้วค่ะ กระเป๋าสวยๆ นำเข้าจากเกาหลี สนใจทักมาเลยนะคะ',
    mediaUrls: ['https://picsum.photos/seed/post3/400/400', 'https://picsum.photos/seed/post3b/400/400'],
    status: 'draft',
    platforms: ['facebook', 'instagram', 'twitter'],
    engagement: { likes: 0, comments: 0, shares: 0 },
    createdAt: '2026-02-07T15:00:00.000Z',
    updatedAt: '2026-02-07T15:00:00.000Z',
  },
  {
    id: 'post-004',
    userId: 'user-002',
    content: '🎉 ขอบคุณลูกค้าทุกท่านที่อุดหนุนค่ะ ยอดขายทะลุ 100 ออเดอร์แล้ว!',
    mediaUrls: [],
    status: 'published',
    platforms: ['facebook'],
    publishedAt: '2026-02-06T12:00:00.000Z',
    engagement: { likes: 89, comments: 15, shares: 5 },
    createdAt: '2026-02-06T11:00:00.000Z',
    updatedAt: '2026-02-06T12:00:00.000Z',
  },
];

export class MockPostRepository implements IPostRepository {
  private posts: Post[] = [...MOCK_POSTS];

  async getById(id: string): Promise<Post | null> {
    await this.delay(100);
    return this.posts.find((post) => post.id === id) || null;
  }

  async getAll(): Promise<Post[]> {
    await this.delay(100);
    return [...this.posts];
  }

  async getByUserId(userId: string): Promise<Post[]> {
    await this.delay(100);
    return this.posts.filter((post) => post.userId === userId);
  }

  async getPaginated(page: number, perPage: number): Promise<PaginatedResult<Post>> {
    await this.delay(100);
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedPosts = this.posts.slice(start, end);

    return {
      data: paginatedPosts,
      total: this.posts.length,
      page,
      perPage,
    };
  }

  async getByStatus(status: PostStatus): Promise<Post[]> {
    await this.delay(100);
    return this.posts.filter((post) => post.status === status);
  }

  async create(data: CreatePostData): Promise<Post> {
    await this.delay(200);
    
    const newPost: Post = {
      id: `post-${Date.now()}`,
      ...data,
      mediaUrls: data.mediaUrls || [],
      status: data.scheduledAt ? 'scheduled' : 'draft',
      engagement: { likes: 0, comments: 0, shares: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  async update(id: string, data: UpdatePostData): Promise<Post> {
    await this.delay(200);
    
    const index = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }

    const updatedPost: Post = {
      ...this.posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.posts[index] = updatedPost;
    return updatedPost;
  }

  async delete(id: string): Promise<boolean> {
    await this.delay(200);
    
    const index = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      return false;
    }

    this.posts.splice(index, 1);
    return true;
  }

  async getStats(userId?: string): Promise<PostStats> {
    await this.delay(100);
    
    const filteredPosts = userId 
      ? this.posts.filter((post) => post.userId === userId)
      : this.posts;
    
    const totalPosts = filteredPosts.length;
    const scheduledPosts = filteredPosts.filter((p) => p.status === 'scheduled').length;
    const publishedPosts = filteredPosts.filter((p) => p.status === 'published').length;
    const failedPosts = filteredPosts.filter((p) => p.status === 'failed').length;
    
    const totalEngagement = filteredPosts.reduce(
      (acc, post) => ({
        likes: acc.likes + post.engagement.likes,
        comments: acc.comments + post.engagement.comments,
        shares: acc.shares + post.engagement.shares,
      }),
      { likes: 0, comments: 0, shares: 0 }
    );

    return {
      totalPosts,
      scheduledPosts,
      publishedPosts,
      failedPosts,
      totalEngagement,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockPostRepository = new MockPostRepository();
