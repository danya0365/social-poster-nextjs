import * as bcrypt from 'bcryptjs';
import { AuthUser, IProfileRepository, IUserRepository } from '../../interfaces/repositories';
import { SessionService } from './SessionService';

export class SignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private profileRepository: IProfileRepository
  ) {}

  async execute(name: string, email: string, password: string): Promise<AuthUser> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('อีเมลนี้ถูกใช้งานแล้ว (Email already exists)');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create Base Auth User
    const newUser = await this.userRepository.create({
      id: crypto.randomUUID(),
      email,
      passwordHash,
    });

    let defaultProfile;
    try {
      // Automatically create a default "Personal" profile for the new user
      defaultProfile = await this.profileRepository.create({
        id: crypto.randomUUID(),
        userId: newUser.id,
        roleId: 'viewer', // Default least-privileged role from schema
        name: name || 'ผู้ใช้ใหม่',
        avatarUrl: null,
      });
    } catch (error: any) {
      if (error.message?.toLowerCase().includes('foreign key constraint failed')) {
        throw new Error('🔧 [Dev Error]: ตาราง Roles ใน Database ยังไม่ได้ถูก Seed ข้อมูล! 🚀 กรุณารันคำสั่ง `yarn db:setup` หรือ `yarn seed:starter` ก่อนทำการสมัครสมาชิกครับ');
      }
      throw error;
    }

    // Immediately create session 
    await SessionService.createSession(newUser.id, newUser.email, defaultProfile.id);

    return newUser;
  }
}
