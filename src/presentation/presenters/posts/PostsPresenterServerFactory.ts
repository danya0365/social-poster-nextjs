/**
 * PostsPresenterServerFactory
 * Factory for creating PostsPresenter instances on the server side
 */

import { MockPostRepository } from '@/src/infrastructure/repositories/mock/MockPostRepository';
import { PostsPresenter } from './PostsPresenter';

export class PostsPresenterServerFactory {
  static create(): PostsPresenter {
    const repository = new MockPostRepository();
    return new PostsPresenter(repository);
  }
}

export function createServerPostsPresenter(): PostsPresenter {
  return PostsPresenterServerFactory.create();
}
