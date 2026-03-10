import { eq, inArray } from 'drizzle-orm';
import { IRolePermissionRepository, Permission, Role } from '../../application/repositories/IRolePermissionRepository';
import { db } from '../database/client';
import { permissions, profilePermissions, rolePermissions, roles } from '../database/schema';

export class DrizzleRolePermissionRepository implements IRolePermissionRepository {
  async getPermissionsForProfile(profileId: string, roleId: string): Promise<Permission[]> {
    // 1. Get base role permissions
    const basePermMaps = await db
      .select({ permissionId: rolePermissions.permissionId })
      .from(rolePermissions)
      .where(eq(rolePermissions.roleId, roleId));
      
    const basePermIds = basePermMaps.map(rm => rm.permissionId);

    // 2. Get profile permission overrides
    const profileOverrides = await db
      .select({
        permissionId: profilePermissions.permissionId,
        isGranted: profilePermissions.isGranted
      })
      .from(profilePermissions)
      .where(eq(profilePermissions.profileId, profileId));

    // Resolve final permission IDs list
    const finalPermIds = new Set<string>(basePermIds);
    for (const po of profileOverrides) {
      if (po.isGranted) {
        finalPermIds.add(po.permissionId); // Explicit grant
      } else {
        finalPermIds.delete(po.permissionId); // Explicit revoke
      }
    }

    if (finalPermIds.size === 0) return [];

    // 3. Fetch full permission entities
    const finalPermissions = await db
      .select()
      .from(permissions)
      .where(inArray(permissions.id, Array.from(finalPermIds)));

    return finalPermissions;
  }

  async getRoleById(roleId: string): Promise<Role | null> {
    const result = await db.select().from(roles).where(eq(roles.id, roleId)).limit(1);
    return result[0] || null;
  }
}
