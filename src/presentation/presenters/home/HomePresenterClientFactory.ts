/**
 * HomePresenterClientFactory
 * Factory for creating HomePresenter instances on the client side
 */

'use client';

import { MockPublicHomeRepository } from '@/src/infrastructure/repositories/mock/MockPublicHomeRepository';
import { HomePresenter } from './HomePresenter';

export class HomePresenterClientFactory {
  static create(): HomePresenter {
    const repository = new MockPublicHomeRepository();
    return new HomePresenter(repository);
  }
}

export function createClientHomePresenter(): HomePresenter {
  return HomePresenterClientFactory.create();
}
