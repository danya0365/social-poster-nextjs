/**
 * MockAuthRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure layer
 */

import {
    AuthCredentials,
    AuthResponse,
    IAuthRepository,
    RegisterData,
    SessionData,
} from '@/src/application/repositories/IAuthRepository';

export class MockAuthRepository implements IAuthRepository {
  private session: SessionData = {
    user: null,
    isAuthenticated: false,
  };

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    await this.delay(500);
    
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      const user = { id: 'user-001', email: credentials.email, name: 'Test User' };
      this.session = { user, isAuthenticated: true };
      return { success: true, user };
    }
    
    return { success: false, error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await this.delay(500);
    const user = { id: `user-${Date.now()}`, email: data.email, name: data.name };
    this.session = { user, isAuthenticated: true };
    return { success: true, user };
  }

  async forgotPassword(email: string): Promise<AuthResponse> {
    await this.delay(500);
    return { success: true };
  }

  async logout(): Promise<AuthResponse> {
    await this.delay(200);
    this.session = { user: null, isAuthenticated: false };
    return { success: true };
  }

  async getSession(): Promise<SessionData> {
    await this.delay(100);
    return { ...this.session };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockAuthRepository = new MockAuthRepository();
