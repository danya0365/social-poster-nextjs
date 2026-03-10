import { AuthUser, IUserRepository, UserStats } from '../../../application/repositories/IUserRepository';

export class MockUserRepository implements IUserRepository {
  private users: AuthUser[] = [
    {
      id: 'user-1',
      email: 'admin@example.com',
      passwordHash: 'hashed_password',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'user-2',
      email: 'user@example.com',
      passwordHash: 'hashed_password',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async getById(id: string): Promise<AuthUser | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getByEmail(email: string): Promise<AuthUser | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async getAll(): Promise<AuthUser[]> {
    return [...this.users];
  }

  async create(data: Omit<AuthUser, 'createdAt' | 'updatedAt'>): Promise<AuthUser> {
    const newUser: AuthUser = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, data: Partial<AuthUser>): Promise<AuthUser> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = { ...this.users[index], ...data, updatedAt: new Date().toISOString() };
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initialLength;
  }

  async getStats(): Promise<UserStats> {
    return {
      totalUsers: this.users.length,
      activeUsers: this.users.length,
      inactiveUsers: 0,
    };
  }
}
