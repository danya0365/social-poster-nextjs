'use client';

import { AuthUser, IUserRepository, UserStats } from '../../../application/repositories/IUserRepository';

export class ApiUserRepository implements IUserRepository {
  private baseUrl = '/api/users';

  async getById(id: string): Promise<AuthUser | null> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  }

  async getByEmail(email: string): Promise<AuthUser | null> {
    const res = await fetch(`${this.baseUrl}?email=${encodeURIComponent(email)}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch user by email');
    return res.json();
  }

  async getAll(): Promise<AuthUser[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch all users');
    return res.json();
  }

  async create(data: Omit<AuthUser, 'createdAt' | 'updatedAt'>): Promise<AuthUser> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  }

  async update(id: string, data: Partial<AuthUser>): Promise<AuthUser> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  }

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    const result = await res.json();
    return result.success;
  }

  async getStats(): Promise<UserStats> {
    const res = await fetch(`${this.baseUrl}/stats`);
    if (!res.ok) throw new Error('Failed to fetch user stats');
    return res.json();
  }
}
