/**
 * AutoCommentPresenterClientFactory
 * Factory for creating AutoCommentPresenter instances on the client side
 */

'use client';

import { MockAutoCommentRepository } from '@/src/infrastructure/repositories/mock/MockAutoCommentRepository';
import { AutoCommentPresenter } from './AutoCommentPresenter';

export class AutoCommentPresenterClientFactory {
  static create(): AutoCommentPresenter {
    const repository = new MockAutoCommentRepository();
    return new AutoCommentPresenter(repository);
  }
}

export function createClientAutoCommentPresenter(): AutoCommentPresenter {
  return AutoCommentPresenterClientFactory.create();
}
