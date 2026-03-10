/**
 * HomePresenter
 */

import { IPublicHomeRepository, PublicHomeData } from '@/src/application/repositories/IPublicHomeRepository';

export interface HomeViewModel {
  data: PublicHomeData;
}

export class HomePresenter {
  constructor(private readonly repository: IPublicHomeRepository) {}

  async getViewModel(): Promise<HomeViewModel> {
    try {
      const data = await this.repository.getHomeData();
      return { data };
    } catch (error) {
      console.error('Error getting home view model:', error);
      throw error;
    }
  }
}
