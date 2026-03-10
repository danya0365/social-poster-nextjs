import * as dotenv from 'dotenv';
import { db } from '../src/infrastructure/database/client';
import { permissions, rolePermissions, roles } from '../src/infrastructure/database/schema';
dotenv.config({ path: '.env.local' });

async function seedStarter() {
  console.log('🌱 Seeding starter data (Roles & Permissions)...');

  // 1. Insert Core Roles
  const rolesData = [
    { id: 'admin', name: 'Administrator', description: 'Full access to all system features.' },
    { id: 'manager', name: 'Manager', description: 'Can manage content and team members.' },
    { id: 'editor', name: 'Editor', description: 'Can create and edit content, but cannot publish without approval.' },
    { id: 'viewer', name: 'Viewer', description: 'Can only view analytics and posts.' },
  ];
  
  await db.insert(roles).values(rolesData).onConflictDoNothing();
  console.log('✅ Roles seeded');

  // 2. Insert Core Permissions
  const permissionsData = [
    // Post Management
    { id: 'create:post', action: 'create', resource: 'post', description: 'Create new posts' },
    { id: 'edit:post', action: 'edit', resource: 'post', description: 'Edit existing posts' },
    { id: 'delete:post', action: 'delete', resource: 'post', description: 'Delete posts' },
    { id: 'publish:post', action: 'publish', resource: 'post', description: 'Publish posts immediately or schedule' },
    
    // Group / Account Management
    { id: 'manage:accounts', action: 'manage', resource: 'accounts', description: 'Connect or disconnect social accounts' },
    { id: 'manage:groups', action: 'manage', resource: 'groups', description: 'Manage posting groups' },
    
    // Analytics
    { id: 'view:analytics', action: 'view', resource: 'analytics', description: 'View performance analytics' },
  ];

  await db.insert(permissions).values(permissionsData).onConflictDoNothing();
  console.log('✅ Permissions seeded');

  // 3. Map Roles to Permissions
  const adminPermissions = permissionsData.map(p => ({ roleId: 'admin', permissionId: p.id }));
  
  const managerPermissions = [
    'create:post', 'edit:post', 'publish:post', 'manage:accounts', 'manage:groups', 'view:analytics'
  ].map(pId => ({ roleId: 'manager', permissionId: pId }));

  const editorPermissions = [
    'create:post', 'edit:post', 'view:analytics'
  ].map(pId => ({ roleId: 'editor', permissionId: pId }));

  const viewerPermissions = [
    'view:analytics'
  ].map(pId => ({ roleId: 'viewer', permissionId: pId }));

  const allRolePermissions = [...adminPermissions, ...managerPermissions, ...editorPermissions, ...viewerPermissions];

  await db.insert(rolePermissions).values(allRolePermissions).onConflictDoNothing();
  console.log('✅ Role-Permissions mapping seeded');

  console.log('🚀 Starter seed completed!');
  process.exit(0);
}

seedStarter().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
