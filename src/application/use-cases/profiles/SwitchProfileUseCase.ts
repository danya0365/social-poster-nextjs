import { IProfileRepository } from '../../repositories/IProfileRepository';
import { SessionService } from '../auth/SessionService';

export class SwitchProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(userId: string, targetProfileId: string): Promise<void> {
    // 1. Verify the profile belongs to the user
    const profile = await this.profileRepository.getById(targetProfileId);
    
    if (!profile || profile.userId !== userId) {
      throw new Error('Unauthorized or Profile not found');
    }

    // 2. Update the active profile ID in the session/cookie
    await SessionService.updateActiveProfile(targetProfileId);
  }
}
