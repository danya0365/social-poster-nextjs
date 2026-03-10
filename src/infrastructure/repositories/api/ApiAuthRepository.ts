/**
 * ApiAuthRepository
 * Client-side implementation of IAuthRepository using API calls
 * Following Clean Architecture - Infrastructure layer
 * 
 * ✅ For CLIENT-SIDE use only
 */

import {
    AuthCredentials,
    AuthResponse,
    IAuthRepository,
    RegisterData,
    SessionData,
} from '@/src/application/repositories/IAuthRepository';

export class ApiAuthRepository implements IAuthRepository {
  private baseUrl = '/api/auth';

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async forgotPassword(email: string): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  }

  async logout(): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
    });
    return res.json();
  }

  async getSession(): Promise<SessionData> {
    const res = await fetch(`${this.baseUrl}/session`);
    if (!res.ok) return { user: null, isAuthenticated: false };
    return res.json();
  }
}
