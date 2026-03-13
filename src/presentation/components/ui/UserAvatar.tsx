'use client';

import { cn } from '@/src/presentation/utils/cn';
import { User } from 'lucide-react';
import { useState } from 'react';

interface UserAvatarProps {
  name?: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  showGlow?: boolean;
  className?: string;
}

export function UserAvatar({
  name = 'User',
  src,
  size = 'md',
  showBorder = true,
  showGlow = false,
  className,
}: UserAvatarProps) {
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent gradient based on the name hash
  const getGradient = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'from-blue-600 to-purple-600',
      'from-purple-600 to-pink-600',
      'from-indigo-600 to-blue-600',
      'from-cyan-600 to-blue-600',
      'from-emerald-600 to-teal-600',
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const gradientClass = getGradient(name);

  return (
    <div className={cn('relative group/avatar inline-block', className)}>
      {/* Premium Glow Effect */}
      {showGlow && (
        <div 
          className={cn(
            'absolute -inset-0.5 bg-gradient-to-r rounded-full blur opacity-30 group-hover/avatar:opacity-60 transition-opacity duration-300',
            gradientClass
          )} 
        />
      )}

      {/* Main Avatar Container */}
      <div 
        className={cn(
          'relative rounded-full flex items-center justify-center overflow-hidden',
          sizeClasses[size],
          showBorder ? 'p-[2px] bg-gradient-to-r' : '',
          showBorder ? gradientClass : ''
        )}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center">
          {src && !error ? (
            <img
              src={src}
              alt={name}
              onError={() => setError(true)}
              className="w-full h-full object-cover border-2 border-transparent"
            />
          ) : (
            /* Custom Drawn Fallback UI */
            <div className={cn(
              'w-full h-full flex items-center justify-center bg-gradient-to-br text-white font-bold tracking-tighter',
              gradientClass
            )}>
              {initials || <User className="w-1/2 h-1/2" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
