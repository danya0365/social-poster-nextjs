'use client';

/**
 * Auth Guard
 * Protects routes requiring authentication
 */

import { useAuthStore } from '@/src/stores/authStore';
import { Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to allow hydration
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else {
        setIsChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4 animate-pulse">
            <Zap className="w-8 h-8" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">กำลังตรวจสอบ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
