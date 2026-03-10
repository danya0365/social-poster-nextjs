/**
 * IAdminRepository
 * Repository interface for Admin data access
 */

import { StatusType } from '@/src/domain/types/social';

export interface AdminStats {
  totalUsers: number;
  activeSessions: number;
  systemRoles: number;
  reports: number;
}

export interface SystemLog {
  id: string;
  message: string;
  timestamp: string;
  type: StatusType;
}

export interface IAdminRepository {
  getStats(): Promise<AdminStats>;
  getLogs(): Promise<SystemLog[]>;
}
