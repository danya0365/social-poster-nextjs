import { siteConfig } from '@/src/config/site.config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store
 * Zustand store for authentication state management
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  isDemo: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  loginWithDemo: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
}

// Demo account credentials
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: siteConfig.demo.email,
  name: 'Demo User',
  avatar: undefined,
  plan: 'monthly',
  isDemo: true,
};

// Mock users for demo
const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: siteConfig.demo.email,
    password: siteConfig.demo.password,
    user: DEMO_USER,
  },
  {
    email: siteConfig.demo.adminEmail,
    password: siteConfig.demo.adminPassword,
    user: {
      id: 'admin-001',
      email: siteConfig.demo.adminEmail,
      name: 'Admin User',
      plan: 'yearly',
      isDemo: false,
    },
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          set({
            user: foundUser.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          set({
            error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
            isLoading: false,
          });
          return false;
        }
      },

      loginWithDemo: () => {
        set({
          user: DEMO_USER,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Check if email exists
        const exists = MOCK_USERS.some((u) => u.email === email);
        
        if (exists) {
          set({
            error: 'อีเมลนี้ถูกใช้งานแล้ว',
            isLoading: false,
          });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          plan: 'free',
          isDemo: false,
        };
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const exists = MOCK_USERS.some((u) => u.email === email);
        
        if (!exists) {
          set({
            error: 'ไม่พบอีเมลนี้ในระบบ',
            isLoading: false,
          });
          return false;
        }
        
        set({ isLoading: false });
        return true;
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'socialflow-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
