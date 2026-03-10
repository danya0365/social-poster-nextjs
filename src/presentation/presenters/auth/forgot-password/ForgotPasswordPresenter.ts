/**
 * ForgotPasswordPresenter
 */

import {
    AuthResponse,
    IAuthRepository,
} from '@/src/application/repositories/IAuthRepository';

export class ForgotPasswordPresenter {
  constructor(private readonly repository: IAuthRepository) {}

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      return await this.repository.forgotPassword(email);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
