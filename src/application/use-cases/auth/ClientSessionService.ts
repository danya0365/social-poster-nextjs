'use client';

import { SessionPayload } from './JwtService';

export class ClientSessionService {
  static async getSession(): Promise<SessionPayload | null> {
    try {
      const res = await fetch('/api/auth/session');
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }

  // Client cannot directly modify session cookies (httpOnly)
  // Instead, it should use Server Actions or API routes which are already implemented
  static async updateActiveProfile() {
    throw new Error('updateActiveProfile must be called via Server Action or API');
  }
}
