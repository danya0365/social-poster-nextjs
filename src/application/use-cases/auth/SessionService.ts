import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  email: string;
  activeProfileId?: string; // Optional: The profile they are currently using
}

export class SessionService {
  static async encrypt(payload: SessionPayload) {
    return new SignJWT(payload as unknown as Record<string, unknown>)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // 1 week session
      .sign(encodedKey);
  }

  static async decrypt(session: string | undefined = '') {
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      });
      return payload as unknown as SessionPayload;
    } catch {
      return null;
    }
  }

  static async createSession(userId: string, email: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await this.encrypt({ userId, email });
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

    const payload = await this.decrypt(sessionCookie);
    if (!payload) return;

    payload.activeProfileId = activeProfileId;
    
    // Re-sign session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newSession = await this.encrypt(payload);
    
    cookieStore.set('session', newSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
  }

  static async getSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    return this.decrypt(sessionCookie);
  }

  static async destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
  }
}
