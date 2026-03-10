'use client';

import { ClientSessionService } from '@/src/application/use-cases/auth/ClientSessionService';
import { ApiUserRepository } from '@/src/infrastructure/repositories/api/ApiUserRepository';
import { AccountPresenter } from './AccountPresenter';

export class AccountPresenterClientFactory {
  static create(): AccountPresenter {
    const userRepository = new ApiUserRepository();
    
    // Use ClientSessionService which calls the API route
    return new AccountPresenter(userRepository, ClientSessionService);
  }
}

export function createClientAccountPresenter(): AccountPresenter {
  return AccountPresenterClientFactory.create();
}
