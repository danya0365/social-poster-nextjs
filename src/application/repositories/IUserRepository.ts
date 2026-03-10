/**
 * IUserRepository
 * Repository interface for User data access
 * Following Clean Architecture - Application layer
 * 
 * Note: This wraps the Authentication User (auth_users)
 */

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface IUserRepository {
  /**
   * Get user by ID
   */
  getById(id: string): Promise<AuthUser | null>;

  /**
   * Get user by Email
   */
  getByEmail(email: string): Promise<AuthUser | null>;

  /**
   * Get all users
   */
  getAll(): Promise<AuthUser[]>;

  /**
   * Create a new user
   */
  create(data: Omit<AuthUser, 'createdAt' | 'updatedAt'>): Promise<AuthUser>;

  /**
   * Update an existing user
   */
  update(id: string, data: Partial<AuthUser>): Promise<AuthUser>;

  /**
   * Delete a user
   */
  delete(id: string): Promise<boolean>;

  /**
   * Get statistics
   */
  getStats(): Promise<UserStats>;
}
