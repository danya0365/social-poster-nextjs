import { eq } from 'drizzle-orm';
import { AuthUser, IUserRepository } from '../../application/interfaces/repositories';
import { db } from '../database/client';
import { authUsers } from '../database/schema';

export class DrizzleUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<AuthUser | null> {
    const result = await db.select().from(authUsers).where(eq(authUsers.email, email)).limit(1);
    return result[0] || null;
  }

  async findById(id: string): Promise<AuthUser | null> {
    const result = await db.select().from(authUsers).where(eq(authUsers.id, id)).limit(1);
    return result[0] || null;
  }

  async create(user: Omit<AuthUser, 'createdAt' | 'updatedAt'>): Promise<AuthUser> {
    const result = await db.insert(authUsers).values(user).returning();
    return result[0];
  }
}
