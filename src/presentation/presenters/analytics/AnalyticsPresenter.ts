/**
 * AnalyticsPresenter
 */

import { AnalyticsViewModelData, IAnalyticsRepository } from '@/src/application/repositories/IAnalyticsRepository';

export class AnalyticsPresenter {
  constructor(private readonly repository: IAnalyticsRepository) {}

  async getViewModel(): Promise<AnalyticsViewModelData> {
    try {
      return await this.repository.getAllAnalytics();
    } catch (error) {
      console.error('Error getting analytics view model:', error);
      throw error;
    }
  }
}
