/**
 * SchedulePresenterClientFactory
 * Factory for creating SchedulePresenter instances on the client side
 */

'use client';

import { MockPostRepository } from '@/src/infrastructure/repositories/mock/MockPostRepository';
import { SchedulePresenter } from './SchedulePresenter';

export class SchedulePresenterClientFactory {
  static create(): SchedulePresenter {
    const postRepository = new MockPostRepository();
    return new SchedulePresenter(postRepository);
  }
}

export function createClientSchedulePresenter(): SchedulePresenter {
  return SchedulePresenterClientFactory.create();
}
