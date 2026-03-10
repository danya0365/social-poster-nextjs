import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../repositories/IUserRepository';
import { SessionService } from './SessionService';

export class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, passwordPlain: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(passwordPlain, user.passwordHash || '');
    if (!isValid) throw new Error('Invalid credentials');

    // Create secure HTTP-only cookie session
    await SessionService.createSession(user.id, user.email);

    return user;
  }
}
