/**
 * DashboardPresenterClientFactory
 * Factory for creating DashboardPresenter instances on the client side
 */

'use client';

import { MockAuthRepository } from '@/src/infrastructure/repositories/mock/MockAuthRepository';
import { MockPostRepository } from '@/src/infrastructure/repositories/mock/MockPostRepository';
import { DashboardPresenter } from './DashboardPresenter';

export class DashboardPresenterClientFactory {
  static create(): DashboardPresenter {
    const postRepository = new MockPostRepository();
    const authRepository = new MockAuthRepository(); // Or ApiAuthRepository
    return new DashboardPresenter(postRepository, authRepository);
  }
}

export function createClientDashboardPresenter(): DashboardPresenter {
  return DashboardPresenterClientFactory.create();
}
