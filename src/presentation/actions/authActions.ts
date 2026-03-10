'use server';

import { SessionService } from '../../application/use-cases/auth/SessionService';
import { SignInUseCase } from '../../application/use-cases/auth/SignInUseCase';
import { SignUpUseCase } from '../../application/use-cases/auth/SignUpUseCase';
import { SwitchProfileUseCase } from '../../application/use-cases/profiles/SwitchProfileUseCase';
import { DrizzleProfileRepository } from '../../infrastructure/repositories/drizzle/DrizzleProfileRepository';
import { DrizzleUserRepository } from '../../infrastructure/repositories/drizzle/DrizzleUserRepository';

// Initialize Repositories and Use Cases
// (In a full DI setup, this would come from a container)
const userRepo = new DrizzleUserRepository();
const profileRepo = new DrizzleProfileRepository();
const signInUseCase = new SignInUseCase(userRepo);
const signUpUseCase = new SignUpUseCase(userRepo, profileRepo);
const switchProfileUseCase = new SwitchProfileUseCase(profileRepo);

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await signInUseCase.execute(email, password);
    // After login, we fetch profiles and set the first one as active by default
    const profiles = await profileRepo.getByUserId(user.id);
    if (profiles.length > 0) {
      await switchProfileUseCase.execute(user.id, profiles[0].id);
    }
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signUpUseCase.execute(name, email, password);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
}

export async function switchProfileAction(userId: string, targetProfileId: string) {
  try {
    await switchProfileUseCase.execute(userId, targetProfileId);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
}

export async function getSessionAction() {
  const session = await SessionService.getSession();
  if (!session) return null;

  const profiles = await profileRepo.getByUserId(session.userId);
  const activeProfile = session.activeProfileId 
    ? profiles.find(p => p.id === session.activeProfileId) 
    : profiles[0];

  return {
    user: { id: session.userId, email: session.email },
    activeProfile: activeProfile || null,
    availableProfiles: profiles
  };
}

export async function logoutAction() {
  await SessionService.destroySession();
}
