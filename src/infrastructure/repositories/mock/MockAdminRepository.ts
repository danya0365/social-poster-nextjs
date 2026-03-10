/**
 * MockAdminRepository
 */

import { AdminStats, IAdminRepository, SystemLog } from '../../../application/repositories/IAdminRepository';

export class MockAdminRepository implements IAdminRepository {
  async getStats(): Promise<AdminStats> {
    return {
      totalUsers: 1248,
      activeSessions: 42,
      systemRoles: 4,
      reports: 12,
    };
  }

  async getLogs(): Promise<SystemLog[]> {
    return [
      { id: '1', message: 'User logged in: admin@await.life', timestamp: new Date().toISOString(), type: 'info' },
      { id: '2', message: 'Failed login attempt from IP 192.168.1.1', timestamp: new Date().toISOString(), type: 'warning' },
      { id: '3', message: 'System updated to v2.4.0', timestamp: new Date().toISOString(), type: 'info' },
    ];
  }
}
