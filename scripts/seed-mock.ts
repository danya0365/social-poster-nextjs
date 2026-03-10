import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { db } from '../src/infrastructure/database/client';
import { authUsers, userProfiles } from '../src/infrastructure/database/schema';

dotenv.config({ path: '.env.local' });

async function seedMock() {
  console.log('🧪 Seeding mock data for local testing...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create a Mock Auth User
  const mockUser = {
    id: 'user-1-mock',
    email: 'test@example.com',
    passwordHash,
  };

  await db.insert(authUsers).values(mockUser).onConflictDoNothing();
  console.log('✅ Mock Auth User created (test@example.com / password123)');

  // 2. Create Mock Profiles for that User
  const mockProfiles = [
    {
      id: 'profile-1-personal',
      userId: mockUser.id,
      roleId: 'admin', // Full access
      name: 'John Doe (Personal)',
      avatarUrl: 'https://i.pravatar.cc/150?u=john',
    },
    {
      id: 'profile-2-agency',
      userId: mockUser.id,
      roleId: 'manager', // Limited access
      name: 'Agency ABC',
      avatarUrl: 'https://i.pravatar.cc/150?u=agency',
    },
    {
      id: 'profile-3-viewonly',
      userId: mockUser.id,
      roleId: 'viewer', // Read-only access
      name: 'Client View',
      avatarUrl: 'https://i.pravatar.cc/150?u=client',
    }
  ];

  await db.insert(userProfiles).values(mockProfiles).onConflictDoNothing();
  console.log('✅ Mock Profiles created');

  console.log('🚀 Mock seed completed!');
  process.exit(0);
}

seedMock().catch((e) => {
  console.error('❌ Mock seeding failed:', e);
  process.exit(1);
});
