import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  email: string;
  activeProfileId?: string;
}

export class JwtService {
  static async encrypt(payload: SessionPayload) {
    return new SignJWT(payload as unknown as Record<string, unknown>)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey);
  }

  static async decrypt(session: string | undefined = '') {
    if (!session) return null;
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      });
      return payload as unknown as SessionPayload;
    } catch {
      return null;
    }
  }
}
