/**
 * AnalyticsPresenterServerFactory
 * Factory for creating AnalyticsPresenter instances on the server side
 */

import { MockAnalyticsRepository } from '@/src/infrastructure/repositories/mock/MockAnalyticsRepository';
import { AnalyticsPresenter } from './AnalyticsPresenter';

export class AnalyticsPresenterServerFactory {
  static create(): AnalyticsPresenter {
    const repository = new MockAnalyticsRepository();
    return new AnalyticsPresenter(repository);
  }
}

export function createServerAnalyticsPresenter(): AnalyticsPresenter {
  return AnalyticsPresenterServerFactory.create();
}
