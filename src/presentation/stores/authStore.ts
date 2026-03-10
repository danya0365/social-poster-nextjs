import { create } from 'zustand';
import { UserProfile } from '../../application/repositories/IProfileRepository';
import { AuthUser } from '../../application/repositories/IUserRepository';

interface AuthState {
  user: Pick<AuthUser, 'id' | 'email'> | null;
  activeProfile: UserProfile | null;
  availableProfiles: UserProfile[];
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthData: (data: { user: AuthState['user']; activeProfile: UserProfile | null; availableProfiles: UserProfile[] }) => void;
  setActiveProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  activeProfile: null,
  availableProfiles: [],
  isAuthenticated: false,
  isLoading: true,
  setAuthData: (data) => set({
    user: data.user,
    activeProfile: data.activeProfile,
    availableProfiles: data.availableProfiles,
    isAuthenticated: !!data.user,
    isLoading: false,
  }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, activeProfile: null, availableProfiles: [], isAuthenticated: false }),
}));
