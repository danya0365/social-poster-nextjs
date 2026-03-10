/**
 * IProfileRepository
 * Repository interface for Profile data access
 * Following Clean Architecture - Application layer
 */

export interface UserProfile {
  id: string;
  userId: string;
  roleId: string;
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileStats {
  totalProfiles: number;
  // Add more stats as needed
}

export interface IProfileRepository {
  /**
   * Get profile by ID
   */
  getById(id: string): Promise<UserProfile | null>;

  /**
   * Get profiles by user ID
   */
  getByUserId(userId: string): Promise<UserProfile[]>;

  /**
   * Get all profiles
   */
  getAll(): Promise<UserProfile[]>;

  /**
   * Create a new profile
   */
  create(data: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile>;

  /**
   * Update an existing profile
   */
  update(id: string, data: Partial<UserProfile>): Promise<UserProfile>;

  /**
   * Delete a profile
   */
  delete(id: string): Promise<boolean>;

  /**
   * Delete all profiles for a user
   */
  deleteByUserId(userId: string): Promise<boolean>;

  /**
   * Get statistics
   */
  getStats(): Promise<ProfileStats>;
}
