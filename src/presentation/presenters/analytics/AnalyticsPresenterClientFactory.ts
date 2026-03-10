/**
 * AnalyticsPresenterClientFactory
 * Factory for creating AnalyticsPresenter instances on the client side
 */

'use client';

import { MockAnalyticsRepository } from '@/src/infrastructure/repositories/mock/MockAnalyticsRepository';
import { AnalyticsPresenter } from './AnalyticsPresenter';

export class AnalyticsPresenterClientFactory {
  static create(): AnalyticsPresenter {
    const repository = new MockAnalyticsRepository();
    return new AnalyticsPresenter(repository);
  }
}

export function createClientAnalyticsPresenter(): AnalyticsPresenter {
  return AnalyticsPresenterClientFactory.create();
}
