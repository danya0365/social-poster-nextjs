/**
 * LoopPostPresenterServerFactory
 * Factory for creating LoopPostPresenter instances on the server side
 */

import { MockLoopPostRepository } from '@/src/infrastructure/repositories/mock/MockLoopPostRepository';
import { LoopPostPresenter } from './LoopPostPresenter';

export class LoopPostPresenterServerFactory {
  static create(): LoopPostPresenter {
    const repository = new MockLoopPostRepository();
    return new LoopPostPresenter(repository);
  }
}

export function createServerLoopPostPresenter(): LoopPostPresenter {
  return LoopPostPresenterServerFactory.create();
}
