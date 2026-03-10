/**
 * AdminPresenter
 */

import { AdminStats, IAdminRepository, SystemLog } from '@/src/application/repositories/IAdminRepository';

export interface AdminViewModel {
  stats: AdminStats;
  logs: SystemLog[];
}

export class AdminPresenter {
  constructor(private readonly repository: IAdminRepository) {}

  async getViewModel(): Promise<AdminViewModel> {
    try {
      const [stats, logs] = await Promise.all([
        this.repository.getStats(),
        this.repository.getLogs(),
      ]);
      return { stats, logs };
    } catch (error) {
      console.error('Error getting admin view model:', error);
      throw error;
    }
  }
}
