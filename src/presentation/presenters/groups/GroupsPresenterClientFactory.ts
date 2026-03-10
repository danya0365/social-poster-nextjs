/**
 * GroupsPresenterClientFactory
 * Factory for creating GroupsPresenter instances on the client side
 */

'use client';

import { MockGroupRepository } from '@/src/infrastructure/repositories/mock/MockGroupRepository';
import { GroupsPresenter } from './GroupsPresenter';

export class GroupsPresenterClientFactory {
  static create(): GroupsPresenter {
    const repository = new MockGroupRepository();
    return new GroupsPresenter(repository);
  }
}

export function createClientGroupsPresenter(): GroupsPresenter {
  return GroupsPresenterClientFactory.create();
}
