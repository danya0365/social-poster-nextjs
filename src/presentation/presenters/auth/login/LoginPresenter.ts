/**
 * LoginPresenter
 * Handles business logic for Login page
 * Receives repository via dependency injection
 */

import {
    AuthCredentials,
    AuthResponse,
    IAuthRepository,
    SessionData,
} from '@/src/application/repositories/IAuthRepository';

export interface LoginViewModel {
  session: SessionData;
}

export class LoginPresenter {
  constructor(private readonly repository: IAuthRepository) {}

  /**
   * Get initial view model
   */
  async getViewModel(): Promise<LoginViewModel> {
    const session = await this.repository.getSession();
    return { session };
  }

  /**
   * Handle login action
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      return await this.repository.login(credentials);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle logout action
   */
  async logout(): Promise<AuthResponse> {
    try {
      return await this.repository.logout();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
