/**
 * LoopPostPresenterClientFactory
 * Factory for creating LoopPostPresenter instances on the client side
 */

'use client';

import { MockLoopPostRepository } from '@/src/infrastructure/repositories/mock/MockLoopPostRepository';
import { LoopPostPresenter } from './LoopPostPresenter';

export class LoopPostPresenterClientFactory {
  static create(): LoopPostPresenter {
    const repository = new MockLoopPostRepository();
    return new LoopPostPresenter(repository);
  }
}

export function createClientLoopPostPresenter(): LoopPostPresenter {
  return LoopPostPresenterClientFactory.create();
}
