import { IRolePermissionRepository } from '../../interfaces/repositories';

export class CheckPermissionUseCase {
  constructor(private rolePermRepository: IRolePermissionRepository) {}

  /**
   * Checks if the active profile has the exact permission required.
   * Handles base role permissions and profile-specific overrides.
   */
  async execute(profileId: string, roleId: string, requiredAction: string, requiredResource: string): Promise<boolean> {
    const permissions = await this.rolePermRepository.getPermissionsForProfile(profileId, roleId);
    
    return permissions.some(
      p => p.action === requiredAction && p.resource === requiredResource
    );
  }
}
