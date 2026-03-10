/**
 * MockLoopPostRepository
 */

import { ILoopPostRepository, LoopPost } from '../../../application/repositories/ILoopPostRepository';

export class MockLoopPostRepository implements ILoopPostRepository {
  private loopPosts: LoopPost[] = [
    {
      id: '1',
      content: '🔥 โปรแรง! ลดสูงสุด 50% เฉพาะวันนี้!',
      status: 'active',
      interval: 4,
      intervalUnit: 'hours',
      totalPosts: 10,
      postsCompleted: 6,
      nextPostTime: '14:30',
      createdAt: '2026-02-08',
    },
    {
      id: '2',
      content: '✨ สินค้าใหม่เข้าแล้ว! คุณภาพเกินราคา',
      status: 'active',
      interval: 6,
      intervalUnit: 'hours',
      totalPosts: 8,
      postsCompleted: 3,
      nextPostTime: '16:00',
      createdAt: '2026-02-07',
    },
    {
      id: '3',
      content: '🎁 โปรพิเศษสำหรับลูกค้าใหม่! รับส่วนลด 20%',
      status: 'paused',
      interval: 1,
      intervalUnit: 'days',
      totalPosts: 7,
      postsCompleted: 7,
      nextPostTime: '-',
      createdAt: '2026-02-05',
    },
  ];

  async getAll(): Promise<LoopPost[]> {
    return [...this.loopPosts];
  }

  async getById(id: string): Promise<LoopPost | null> {
    return this.loopPosts.find((p) => p.id === id) || null;
  }

  async create(data: Omit<LoopPost, 'id' | 'postsCompleted' | 'nextPostTime' | 'createdAt'>): Promise<LoopPost> {
    const newPost: LoopPost = {
      ...data,
      id: `${this.loopPosts.length + 1}`,
      postsCompleted: 0,
      nextPostTime: '12:00', // Default
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.loopPosts.unshift(newPost);
    return newPost;
  }

  async update(id: string, data: Partial<LoopPost>): Promise<LoopPost> {
    const index = this.loopPosts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Loop post not found');
    this.loopPosts[index] = { ...this.loopPosts[index], ...data };
    return this.loopPosts[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.loopPosts.length;
    this.loopPosts = this.loopPosts.filter((p) => p.id !== id);
    return this.loopPosts.length < initialLength;
  }
}
