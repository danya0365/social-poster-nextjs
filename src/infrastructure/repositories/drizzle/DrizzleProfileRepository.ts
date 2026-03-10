import { eq, sql } from 'drizzle-orm';
import { IProfileRepository, ProfileStats, UserProfile } from '../../../application/repositories/IProfileRepository';
import { db } from '../../database/client';
import { userProfiles } from '../../database/schema';

type ProfileRow = typeof userProfiles.$inferSelect;

export class DrizzleProfileRepository implements IProfileRepository {
  private mapToDomain(row: ProfileRow): UserProfile {
    return {
      id: row.id,
      userId: row.userId,
      roleId: row.roleId,
      name: row.name,
      avatarUrl: row.avatarUrl,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  async getById(id: string): Promise<UserProfile | null> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.id, id)).limit(1);
    if (result.length === 0) return null;
    return this.mapToDomain(result[0]);
  }

  async getByUserId(userId: string): Promise<UserProfile[]> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return result.map(row => this.mapToDomain(row));
  }

  async getAll(): Promise<UserProfile[]> {
    const result = await db.select().from(userProfiles);
    return result.map(row => this.mapToDomain(row));
  }

  async create(data: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    const result = await db.insert(userProfiles).values({
      id: data.id,
      userId: data.userId,
      roleId: data.roleId,
      name: data.name,
      avatarUrl: data.avatarUrl
    }).returning();
    return this.mapToDomain(result[0]);
  }

  async update(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const updateData: any = {};
    if (data.roleId) updateData.roleId = data.roleId;
    if (data.name) updateData.name = data.name;
    if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl;
    updateData.updatedAt = new Date();

    const result = await db.update(userProfiles)
      .set(updateData)
      .where(eq(userProfiles.id, id))
      .returning();
    return this.mapToDomain(result[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(userProfiles).where(eq(userProfiles.id, id)).returning();
    return result.length > 0;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await db.delete(userProfiles).where(eq(userProfiles.userId, userId)).returning();
    return result.length > 0;
  }

  async getStats(): Promise<ProfileStats> {
    const result = await db.select({
      count: sql<number>`count(*)`
    }).from(userProfiles);
    
    return {
      totalProfiles: result[0]?.count || 0
    };
  }
}
