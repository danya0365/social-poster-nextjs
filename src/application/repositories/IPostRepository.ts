/**
 * IPostRepository
 * Repository interface for Post data access
 * Following Clean Architecture - Application layer
 */

import { PostStatus, SocialPlatform } from '../../domain/types/social';

export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  status: PostStatus;
  platforms: SocialPlatform[];
  scheduledAt?: string;
  publishedAt?: string;
  engagement: PostEngagement;
  createdAt: string;
  updatedAt: string;
}

export interface PostStats {
  totalPosts: number;
  scheduledPosts: number;
  publishedPosts: number;
  failedPosts: number;
  totalEngagement: PostEngagement;
}

export interface CreatePostData {
  userId: string;
  content: string;
  mediaUrls?: string[];
  platforms: SocialPlatform[];
  scheduledAt?: string;
}

export interface UpdatePostData {
  content?: string;
  mediaUrls?: string[];
  status?: PostStatus;
  platforms?: SocialPlatform[];
  scheduledAt?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface IPostRepository {
  getById(id: string): Promise<Post | null>;
  getAll(): Promise<Post[]>;
  getByUserId(userId: string): Promise<Post[]>;
  getPaginated(page: number, perPage: number): Promise<PaginatedResult<Post>>;
  getByStatus(status: PostStatus): Promise<Post[]>;
  create(data: CreatePostData): Promise<Post>;
  update(id: string, data: UpdatePostData): Promise<Post>;
  delete(id: string): Promise<boolean>;
  getStats(userId?: string): Promise<PostStats>;
}
