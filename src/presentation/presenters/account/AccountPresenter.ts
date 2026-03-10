/**
 * AccountPresenter
 * Handles business logic for global Account management
 * Receives repository via dependency injection
 */

import { AuthUser, IUserRepository } from '@/src/application/repositories/IUserRepository';
import { SessionPayload } from '@/src/application/use-cases/auth/JwtService';
import { Metadata } from 'next';

export interface ISessionService {
  getSession(): Promise<SessionPayload | null>;
}

export interface AccountViewModel {
  user: AuthUser | null;
  activeSession: SessionPayload | null;
  isLoading: boolean;
}

export class AccountPresenter {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionService: ISessionService
  ) {}

  async getViewModel(): Promise<AccountViewModel> {
    try {
      const session = await this.sessionService.getSession();
      if (!session) {
        return { user: null, activeSession: null, isLoading: false };
      }

      const user = await this.userRepository.getById(session.userId);

      return {
        user,
        activeSession: session,
        isLoading: false,
      };
    } catch (error) {
      console.error('Error getting view model:', error);
      throw error;
    }
  }

  generateMetadata(): Metadata {
    return {
      title: "จัดการบัญชี (Account) | SocialFlow",
      description: "ตั้งค่าบัญชีความปลอดภัยของคุณในระบบ SocialFlow",
    };
  }
}
