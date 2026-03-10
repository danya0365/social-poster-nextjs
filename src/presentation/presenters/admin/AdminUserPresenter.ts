import { IProfileRepository, UserProfile } from '@/src/application/repositories/IProfileRepository';
import { AuthUser, IUserRepository } from '@/src/application/repositories/IUserRepository';

export interface AdminUserViewModel {
  users: (AuthUser & { profiles: UserProfile[] })[];
  isLoading: boolean;
}

export class AdminUserPresenter {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly profileRepository: IProfileRepository
  ) {}

  async getViewModel(): Promise<AdminUserViewModel> {
    try {
      const [users, allProfiles] = await Promise.all([
        this.userRepository.getAll(),
        this.profileRepository.getAll(),
      ]);

      const usersWithProfiles = users.map(user => ({
        ...user,
        profiles: allProfiles.filter(p => p.userId === user.id),
      }));

      return {
        users: usersWithProfiles,
        isLoading: false,
      };
    } catch (error) {
      console.error('Error getting admin user view model:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    return this.userRepository.delete(userId);
  }

  async updateUserRole(profileId: string, newRoleId: string): Promise<UserProfile> {
    return this.profileRepository.update(profileId, { roleId: newRoleId });
  }
}
