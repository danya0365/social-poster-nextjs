import { IProfileRepository, ProfileStats, UserProfile } from '../../../application/repositories/IProfileRepository';

export class MockProfileRepository implements IProfileRepository {
  private profiles: UserProfile[] = [
    {
      id: 'profile-1',
      userId: 'user-1',
      roleId: 'admin',
      name: 'Admin User',
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'profile-2',
      userId: 'user-2',
      roleId: 'user',
      name: 'Regular User',
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async getById(id: string): Promise<UserProfile | null> {
    return this.profiles.find(p => p.id === id) || null;
  }

  async getByUserId(userId: string): Promise<UserProfile[]> {
    return this.profiles.filter(p => p.userId === userId);
  }

  async getAll(): Promise<UserProfile[]> {
    return [...this.profiles];
  }

  async create(data: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    const newProfile: UserProfile = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.profiles.push(newProfile);
    return newProfile;
  }

  async update(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const index = this.profiles.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Profile not found');
    this.profiles[index] = { ...this.profiles[index], ...data, updatedAt: new Date().toISOString() };
    return this.profiles[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.profiles.length;
    this.profiles = this.profiles.filter(p => p.id !== id);
    return this.profiles.length < initialLength;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const initialLength = this.profiles.length;
    this.profiles = this.profiles.filter(p => p.userId !== userId);
    return this.profiles.length < initialLength;
  }

  async getStats(): Promise<ProfileStats> {
    return {
      totalProfiles: this.profiles.length,
    };
  }
}
