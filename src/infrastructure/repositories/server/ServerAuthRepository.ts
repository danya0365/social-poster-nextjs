/**
 * ServerAuthRepository
 * Server-side implementation of IAuthRepository using existing Use Cases
 * Following Clean Architecture - Infrastructure layer
 * 
 * ✅ For SERVER-SIDE use only (API Routes, Server Components)
 */

import {
    AuthCredentials,
    AuthResponse,
    IAuthRepository,
    RegisterData,
    SessionData,
} from '@/src/application/repositories/IAuthRepository';
import { SessionService } from '@/src/application/use-cases/auth/SessionService';
import { SignInUseCase } from '@/src/application/use-cases/auth/SignInUseCase';
import { SignUpUseCase } from '@/src/application/use-cases/auth/SignUpUseCase';
import { DrizzleProfileRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleProfileRepository';
import { DrizzleUserRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleUserRepository';

export class ServerAuthRepository implements IAuthRepository {
  private userRepo = new DrizzleUserRepository();
  private profileRepo = new DrizzleProfileRepository();
  private signInUseCase = new SignInUseCase(this.userRepo);
  private signUpUseCase = new SignUpUseCase(this.userRepo, this.profileRepo);

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const user = await this.signInUseCase.execute(credentials.email, credentials.password || '');
      return { 
        success: true, 
        user: { id: user.id, email: user.email } 
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      await this.signUpUseCase.execute(data.name, data.email, data.password || '');
      // After signup, we might want to auto-login or return success
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async forgotPassword(email: string): Promise<AuthResponse> {
    // Implement forgot password logic if available
    return { success: true }; 
  }

  async logout(): Promise<AuthResponse> {
    await SessionService.destroySession();
    return { success: true };
  }

  async getSession(): Promise<SessionData> {
    const session = await SessionService.getSession();
    if (!session) return { user: null, isAuthenticated: false };
    
    return {
      user: { id: session.userId, email: session.email },
      isAuthenticated: true
    };
  }
}
