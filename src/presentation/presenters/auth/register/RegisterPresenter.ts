/**
 * RegisterPresenter
 * Handles business logic for Register page
 */

import {
    AuthResponse,
    IAuthRepository,
    RegisterData,
} from '@/src/application/repositories/IAuthRepository';

export class RegisterPresenter {
  constructor(private readonly repository: IAuthRepository) {}

  /**
   * Handle register action
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      return await this.repository.register(data);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
