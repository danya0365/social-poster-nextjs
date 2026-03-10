/**
 * ILoopPostRepository
 * Repository interface for Loop Post data access
 */

export interface LoopPost {
  id: string;
  content: string;
  status: 'active' | 'paused' | 'completed';
  interval: number;
  intervalUnit: 'hours' | 'days';
  totalPosts: number;
  postsCompleted: number;
  nextPostTime: string;
  createdAt: string;
}

export interface ILoopPostRepository {
  getAll(): Promise<LoopPost[]>;
  getById(id: string): Promise<LoopPost | null>;
  create(data: Omit<LoopPost, 'id' | 'postsCompleted' | 'nextPostTime' | 'createdAt'>): Promise<LoopPost>;
  update(id: string, data: Partial<LoopPost>): Promise<LoopPost>;
  delete(id: string): Promise<boolean>;
}
