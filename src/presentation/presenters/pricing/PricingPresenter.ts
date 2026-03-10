/**
 * PricingPresenter
 */

import { IPricingRepository, PricingFAQ, PricingPlan } from '@/src/application/repositories/IPricingRepository';

export interface PricingViewModel {
  plans: PricingPlan[];
  faqs: PricingFAQ[];
}

export class PricingPresenter {
  constructor(private readonly repository: IPricingRepository) {}

  async getViewModel(): Promise<PricingViewModel> {
    try {
      const [plans, faqs] = await Promise.all([
        this.repository.getPlans(),
        this.repository.getFAQs(),
      ]);
      return { plans, faqs };
    } catch (error) {
      console.error('Error getting pricing view model:', error);
      throw error;
    }
  }
}
