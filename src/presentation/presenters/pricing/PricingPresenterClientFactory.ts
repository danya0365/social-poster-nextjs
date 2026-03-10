/**
 * PricingPresenterClientFactory
 * Factory for creating PricingPresenter instances on the client side
 */

'use client';

import { MockPricingRepository } from '@/src/infrastructure/repositories/mock/MockPricingRepository';
import { PricingPresenter } from './PricingPresenter';

export class PricingPresenterClientFactory {
  static create(): PricingPresenter {
    const repository = new MockPricingRepository();
    return new PricingPresenter(repository);
  }
}

export function createClientPricingPresenter(): PricingPresenter {
  return PricingPresenterClientFactory.create();
}
