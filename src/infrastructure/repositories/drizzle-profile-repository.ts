import { eq } from 'drizzle-orm';
import { IProfileRepository, UserProfile } from '../../application/interfaces/repositories';
import { db } from '../database/client';
import { userProfiles } from '../database/schema';

export class DrizzleProfileRepository implements IProfileRepository {
  async findByUserId(userId: string): Promise<UserProfile[]> {
    return db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
  }

  async findById(profileId: string): Promise<UserProfile | null> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.id, profileId)).limit(1);
    return result[0] || null;
  }

  async create(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    const result = await db.insert(userProfiles).values(profile).returning();
    return result[0];
  }
}
