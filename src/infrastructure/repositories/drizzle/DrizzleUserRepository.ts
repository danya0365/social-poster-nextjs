import { eq, sql } from 'drizzle-orm';
import { AuthUser, IUserRepository, UserStats } from '../../../application/repositories/IUserRepository';
import { db } from '../../database/client';
import { authUsers } from '../../database/schema';

type UserRow = typeof authUsers.$inferSelect;

export class DrizzleUserRepository implements IUserRepository {
  private mapToDomain(row: UserRow): AuthUser {
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.passwordHash,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  async getById(id: string): Promise<AuthUser | null> {
    const result = await db.select().from(authUsers).where(eq(authUsers.id, id)).limit(1);
    if (result.length === 0) return null;
    return this.mapToDomain(result[0]);
  }

  async getByEmail(email: string): Promise<AuthUser | null> {
    const result = await db.select().from(authUsers).where(eq(authUsers.email, email)).limit(1);
    if (result.length === 0) return null;
    return this.mapToDomain(result[0]);
  }

  async getAll(): Promise<AuthUser[]> {
    const result = await db.select().from(authUsers);
    return result.map(row => this.mapToDomain(row));
  }

  async create(data: Omit<AuthUser, 'createdAt' | 'updatedAt'>): Promise<AuthUser> {
    const result = await db.insert(authUsers).values({
      id: data.id,
      email: data.email,
      passwordHash: data.passwordHash
    }).returning();
    return this.mapToDomain(result[0]);
  }

  async update(id: string, data: Partial<AuthUser>): Promise<AuthUser> {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.passwordHash !== undefined) updateData.passwordHash = data.passwordHash;
    updateData.updatedAt = new Date();

    const result = await db.update(authUsers)
      .set(updateData)
      .where(eq(authUsers.id, id))
      .returning();
    return this.mapToDomain(result[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(authUsers).where(eq(authUsers.id, id)).returning();
    return result.length > 0;
  }

  async getStats(): Promise<UserStats> {
    const result = await db.select({
      count: sql<number>`count(*)`
    }).from(authUsers);
    
    const total = result[0]?.count || 0;
    
    return {
      totalUsers: total,
      activeUsers: total, // Placeholder
      inactiveUsers: 0   // Placeholder
    };
  }
}
