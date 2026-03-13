'use client';

/**
 * Auth Guard
 * Protects routes requiring authentication
 */

import { useAuthStore } from '@/src/presentation/stores/authStore';
import { Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
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
