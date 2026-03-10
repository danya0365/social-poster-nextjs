/**
 * SchedulePresenterServerFactory
 * Factory for creating SchedulePresenter instances on the server side
 */

import { MockPostRepository } from '@/src/infrastructure/repositories/mock/MockPostRepository';
import { SchedulePresenter } from './SchedulePresenter';

export class SchedulePresenterServerFactory {
  static create(): SchedulePresenter {
    const postRepository = new MockPostRepository();
    return new SchedulePresenter(postRepository);
  }
}

export function createServerSchedulePresenter(): SchedulePresenter {
  return SchedulePresenterServerFactory.create();
}
