/**
 * MockUserRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure layer
 */

import {
    CreateUserData,
    IUserRepository,
    UpdateUserData,
    User,
    UserStats,
} from '@/src/application/repositories/IUserRepository';

// Mock data
const MOCK_USERS: User[] = [
  {
    id: 'user-001',
    email: 'john@example.com',
    displayName: 'John Doe',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    subscriptionPlanId: 'plan-monthly',
    subscriptionExpiredAt: '2026-03-15T00:00:00.000Z',
    isActive: true,
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: 'user-002',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    subscriptionPlanId: 'plan-quarterly',
    subscriptionExpiredAt: '2026-05-20T00:00:00.000Z',
    isActive: true,
    createdAt: '2024-01-10T09:00:00.000Z',
    updatedAt: '2024-01-10T09:00:00.000Z',
  },
  {
    id: 'user-003',
    email: 'bob@example.com',
    displayName: 'Bob Wilson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    subscriptionPlanId: 'plan-weekly',
    subscriptionExpiredAt: '2024-01-20T00:00:00.000Z',
    isActive: false,
    createdAt: '2024-01-05T08:00:00.000Z',
    updatedAt: '2024-01-05T08:00:00.000Z',
  },
];

export class MockUserRepository implements IUserRepository {
  private users: User[] = [...MOCK_USERS];

  async getById(id: string): Promise<User | null> {
    await this.delay(100);
    return this.users.find((user) => user.id === id) || null;
  }

  async getAll(): Promise<User[]> {
    await this.delay(100);
    return [...this.users];
  }

  async getByEmail(email: string): Promise<User | null> {
    await this.delay(100);
    return this.users.find((user) => user.email === email) || null;
  }

  async create(data: CreateUserData): Promise<User> {
    await this.delay(200);
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...data,
      subscriptionPlanId: '',
      subscriptionExpiredAt: '',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.unshift(newUser);
    return newUser;
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    await this.delay(200);
    
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const updatedUser: User = {
      ...this.users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    await this.delay(200);
    
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }

  async getStats(): Promise<UserStats> {
    await this.delay(100);
    
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter((user) => user.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockUserRepository = new MockUserRepository();
