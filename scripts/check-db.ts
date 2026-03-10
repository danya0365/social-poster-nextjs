import 'dotenv/config';
import { db } from '../src/infrastructure/database/client';
import { authUsers, userProfiles } from '../src/infrastructure/database/schema';

async function checkUsers() {
  const users = await db.select().from(authUsers);
  console.log('--- Auth Users ---');
  console.table(users.map(u => ({ id: u.id, email: u.email })));

  const profiles = await db.select().from(userProfiles);
  console.log('\n--- User Profiles ---');
  console.table(profiles.map(p => ({ id: p.id, userId: p.userId, name: p.name, roleId: p.roleId })));
}

checkUsers().catch(console.error);
