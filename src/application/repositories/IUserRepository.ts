/**
 * IUserRepository
 * Repository interface for User data access
 * Following Clean Architecture - Application layer
 */

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  subscriptionPlanId: string;
  subscriptionExpiredAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface CreateUserData {
  email: string;
  displayName: string;
  avatarUrl?: string;
}

export interface UpdateUserData {
  displayName?: string;
  avatarUrl?: string;
  subscriptionPlanId?: string;
  subscriptionExpiredAt?: string;
  isActive?: boolean;
}

export interface IUserRepository {
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<boolean>;
  getStats(): Promise<UserStats>;
}
