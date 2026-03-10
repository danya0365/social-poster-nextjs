/**
 * IAuthRepository
 * Repository interface for Authentication and Session management
 * Following Clean Architecture - Application layer
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

export interface SessionData {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export interface IAuthRepository {
  /**
   * Login with email and password
   */
  login(credentials: AuthCredentials): Promise<AuthResponse>;

  /**
   * Register a new user
   */
  register(data: RegisterData): Promise<AuthResponse>;

  /**
   * Request a password reset
   */
  forgotPassword(email: string): Promise<AuthResponse>;

  /**
   * Logout the current user
   */
  logout(): Promise<AuthResponse>;

  /**
   * Get the current session
   */
  getSession(): Promise<SessionData>;
}
