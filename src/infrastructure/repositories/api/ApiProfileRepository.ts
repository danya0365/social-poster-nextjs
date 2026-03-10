'use client';

import { IProfileRepository, ProfileStats, UserProfile } from '../../../application/repositories/IProfileRepository';

export class ApiProfileRepository implements IProfileRepository {
  private baseUrl = '/api/profiles';

  async getById(id: string): Promise<UserProfile | null> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  }

  async getByUserId(userId: string): Promise<UserProfile[]> {
    const res = await fetch(`${this.baseUrl}?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch profiles for user');
    return res.json();
  }

  async getAll(): Promise<UserProfile[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch all profiles');
    return res.json();
  }

  async create(data: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create profile');
    return res.json();
  }

  async update(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  }

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete profile');
    const result = await res.json();
    return result.success;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}?userId=${userId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete profiles for user');
    const result = await res.json();
    return result.success;
  }

  async getStats(): Promise<ProfileStats> {
    const res = await fetch(`${this.baseUrl}/stats`);
    if (!res.ok) throw new Error('Failed to fetch profile stats');
    return res.json();
  }
}
