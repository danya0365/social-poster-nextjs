/**
 * GroupsPresenterServerFactory
 * Factory for creating GroupsPresenter instances on the server side
 */

import { MockGroupRepository } from '@/src/infrastructure/repositories/mock/MockGroupRepository';
import { GroupsPresenter } from './GroupsPresenter';

export class GroupsPresenterServerFactory {
  static create(): GroupsPresenter {
    const repository = new MockGroupRepository();
    return new GroupsPresenter(repository);
  }
}

export function createServerGroupsPresenter(): GroupsPresenter {
  return GroupsPresenterServerFactory.create();
}
