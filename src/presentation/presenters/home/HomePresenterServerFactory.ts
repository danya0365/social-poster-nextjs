/**
 * HomePresenterServerFactory
 * Factory for creating HomePresenter instances on the server side
 */

import { MockPublicHomeRepository } from '@/src/infrastructure/repositories/mock/MockPublicHomeRepository';
import { HomePresenter } from './HomePresenter';

export class HomePresenterServerFactory {
  static create(): HomePresenter {
    const repository = new MockPublicHomeRepository();
    return new HomePresenter(repository);
  }
}

export function createServerHomePresenter(): HomePresenter {
  return HomePresenterServerFactory.create();
}
