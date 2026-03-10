/**
 * AutoCommentPresenterServerFactory
 * Factory for creating AutoCommentPresenter instances on the server side
 */

import { MockAutoCommentRepository } from '@/src/infrastructure/repositories/mock/MockAutoCommentRepository';
import { AutoCommentPresenter } from './AutoCommentPresenter';

export class AutoCommentPresenterServerFactory {
  static create(): AutoCommentPresenter {
    const repository = new MockAutoCommentRepository();
    return new AutoCommentPresenter(repository);
  }
}

export function createServerAutoCommentPresenter(): AutoCommentPresenter {
  return AutoCommentPresenterServerFactory.create();
}
