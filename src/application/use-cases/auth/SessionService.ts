import { cookies } from 'next/headers';
import 'server-only';
import { JwtService, SessionPayload } from './JwtService';

export class SessionService {
  static async createSession(userId: string, email: string, activeProfileId?: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await JwtService.encrypt({ userId, email, activeProfileId });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
  }

  static async updateActiveProfile(activeProfileId: string) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) return;

    const payload = await JwtService.decrypt(sessionCookie);
    if (!payload) return;

    payload.activeProfileId = activeProfileId;
    
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newSession = await JwtService.encrypt(payload);
    
    cookieStore.set('session', newSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
  }

  static async getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    return JwtService.decrypt(sessionCookie);
  }

  static async destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
  }
}
