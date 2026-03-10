/**
 * PostsPresenterClientFactory
 * Factory for creating PostsPresenter instances on the client side
 */

'use client';

import { MockPostRepository } from '@/src/infrastructure/repositories/mock/MockPostRepository';
import { PostsPresenter } from './PostsPresenter';

export class PostsPresenterClientFactory {
  static create(): PostsPresenter {
    const repository = new MockPostRepository();
    return new PostsPresenter(repository);
  }
}

export function createClientPostsPresenter(): PostsPresenter {
  return PostsPresenterClientFactory.create();
}
