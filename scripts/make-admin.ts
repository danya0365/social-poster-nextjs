import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { db } from '../src/infrastructure/database/client';
import { authUsers, userProfiles } from '../src/infrastructure/database/schema';
dotenv.config({ path: '.env.local' });

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error('❌ Please provide an email: yarn ts-node scripts/make-admin.ts user@example.com');
    process.exit(1);
  }

  console.log(`🔍 Finding user with email: ${email}...`);

  const user = await db.select().from(authUsers).where(eq(authUsers.email, email)).limit(1);

  if (user.length === 0) {
    console.error('❌ User not found!');
    process.exit(1);
  }

  console.log(`✅ Found user: ${user[0].id}`);
  console.log(`🚀 Promoting all profiles of this user to 'admin' role...`);

  const result = await db.update(userProfiles)
    .set({ roleId: 'admin' })
    .where(eq(userProfiles.userId, user[0].id))
    .returning();

  if (result.length === 0) {
    console.warn('⚠️ User found but has no profiles to promote.');
  } else {
    console.log(`✨ Successfully promoted ${result.length} profiles to Admin!`);
    result.forEach(p => console.log(`   - Profile: ${p.name} (${p.id})`));
  }

  process.exit(0);
}

makeAdmin().catch((e) => {
  console.error('❌ Failed to promote user:', e);
  process.exit(1);
});
