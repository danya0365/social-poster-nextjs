/**
 * IRolePermissionRepository
 * Repository interface for Role and Permission data access
 * Following Clean Architecture - Application layer
 */

export interface Role {
  id: string;
  name: string;
  description: string | null;
}

export interface Permission {
  id: string;
  action: string;
  resource: string;
  description: string | null;
}

export interface IRolePermissionRepository {
  /**
   * Get all permissions for a specific profile, considering both role-based 
   * and profile-specific override permissions.
   */
  getPermissionsForProfile(profileId: string, roleId: string): Promise<Permission[]>;

  /**
   * Get role details by role ID
   */
  getRoleById(roleId: string): Promise<Role | null>;
}
