/**
 * DashboardPresenterServerFactory
 * Factory for creating DashboardPresenter instances on the server side
 */

import { MockPostRepository } from '@/src/infrastructure/repositories/mock/MockPostRepository';
import { ServerAuthRepository } from '@/src/infrastructure/repositories/server/ServerAuthRepository';
import { DashboardPresenter } from './DashboardPresenter';

export class DashboardPresenterServerFactory {
  static create(): DashboardPresenter {
    const postRepository = new MockPostRepository();
    const authRepository = new ServerAuthRepository();
    return new DashboardPresenter(postRepository, authRepository);
  }
}

export function createServerDashboardPresenter(): DashboardPresenter {
  return DashboardPresenterServerFactory.create();
}
