/**
 * IAdminRepository
 * Repository interface for Admin data access
 */

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
  type: 'info' | 'warning' | 'error';
}

export interface IAdminRepository {
  getStats(): Promise<AdminStats>;
  getLogs(): Promise<SystemLog[]>;
}
