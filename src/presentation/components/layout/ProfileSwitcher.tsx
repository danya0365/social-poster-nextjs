'use client';

import { logoutAction, switchProfileAction } from '@/src/presentation/actions/authActions';
import { useAuthStore } from '@/src/presentation/stores/authStore';
import { ChevronDown, LogOut, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserAvatar } from '../ui/UserAvatar';

export function ProfileSwitcher() {
  const router = useRouter();
  const { user, activeProfile, availableProfiles, setAuthData, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || !activeProfile) return null;

  const handleSwitch = async (profileId: string) => {
    setIsOpen(false);
    if (profileId === activeProfile.id) return;
    
    // Optimistic UI update could be added here
    await switchProfileAction(user.id, profileId);
    
    // Hard refresh to reload all context/dashboard data with new profile
    window.location.reload();
  };

  const handleLogout = async () => {
    await logoutAction();
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <UserAvatar 
          name={activeProfile.name} 
          src={activeProfile.avatarUrl} 
          size="sm"
        />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {activeProfile.name}
          </span>
          <span className="text-xs text-gray-500 capitalize flex items-center gap-1">
            <Shield className="w-3 h-3" /> {activeProfile.roleId}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg shadow-black/5 overflow-hidden z-50">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 font-medium">
            Account: {user.email}
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {availableProfiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleSwitch(profile.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left
                  ${profile.id === activeProfile.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
              >
                <UserAvatar 
                  name={profile.name} 
                  src={profile.avatarUrl} 
                  size="sm"
                  showBorder={profile.id === activeProfile.id}
                />
                <div className="flex-1 overflow-hidden">
                  <div className={`text-sm font-medium truncate ${profile.id === activeProfile.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {profile.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {profile.roleId}
                  </div>
                </div>
                {profile.id === activeProfile.id && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 p-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
