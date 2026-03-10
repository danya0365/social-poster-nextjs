import { sql } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Ensure standard timestamps
const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
};

// 1. Auth Users
export const authUsers = sqliteTable('auth_users', {
  id: text('id').primaryKey(), // UUID
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  ...timestamps,
});

// 2. Roles
export const roles = sqliteTable('roles', {
  id: text('id').primaryKey(), // e.g., 'admin', 'user', 'manager'
  name: text('name').notNull(),
  description: text('description'),
  ...timestamps,
});

// 3. Profiles (The main entity associated with other tables)
export const userProfiles = sqliteTable('user_profiles', {
  id: text('id').primaryKey(), // UUID
  userId: text('user_id').notNull().references(() => authUsers.id, { onDelete: 'cascade' }),
  roleId: text('role_id').notNull().references(() => roles.id),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  ...timestamps,
});

// 4. Permissions Definition
export const permissions = sqliteTable('permissions', {
  id: text('id').primaryKey(), // e.g., 'create:post', 'delete:post'
  action: text('action').notNull(),
  resource: text('resource').notNull(),
  description: text('description'),
});

// 5. Role Permissions (Mapping)
export const rolePermissions = sqliteTable('role_permissions', {
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  permissionId: text('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.roleId, table.permissionId] }),
]);

// 6. Profile Permissions (Overrides base role permissions)
export const profilePermissions = sqliteTable('profile_permissions', {
  profileId: text('profile_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
  permissionId: text('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
  isGranted: integer('is_granted', { mode: 'boolean' }).notNull(), // true = Grant, false = Deny
}, (table) => [
  primaryKey({ columns: [table.profileId, table.permissionId] }),
]);
