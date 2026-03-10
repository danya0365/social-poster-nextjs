export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  roleId: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface IUserRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(id: string): Promise<AuthUser | null>;
  create(user: Omit<AuthUser, 'createdAt' | 'updatedAt'>): Promise<AuthUser>;
}

export interface IProfileRepository {
  findByUserId(userId: string): Promise<UserProfile[]>;
  findById(profileId: string): Promise<UserProfile | null>;
  create(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<UserProfile>;
}

export interface IRolePermissionRepository {
  getPermissionsForProfile(profileId: string, roleId: string): Promise<Permission[]>;
  getRoleById(roleId: string): Promise<Role | null>;
}
