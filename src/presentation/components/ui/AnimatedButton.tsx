'use client';

/**
 * AnimatedButton
 * Reusable button component with press and hover animations
 */

import { animated, useSpring } from '@react-spring/web';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}: AnimatedButtonProps) {
  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 15 },
  }));

  const isDisabled = disabled || isLoading;

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `
          bg-blue-600 hover:bg-blue-700
          text-white
          shadow-lg shadow-blue-500/25
        `;
      case 'secondary':
        return `
          bg-gray-100 hover:bg-gray-200
          dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-900 dark:text-gray-100
          border border-gray-200 dark:border-gray-700
        `;
      case 'ghost':
        return `
          bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
          text-gray-700 dark:text-gray-300
        `;
      case 'gradient':
        return `
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
          hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
          text-white
          shadow-lg shadow-purple-500/25
        `;
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-5 py-2.5 text-base';
      case 'lg':
        return 'px-8 py-3.5 text-lg';
      default:
        return '';
    }
  };

  return (
    <animated.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        transform: spring.scale.to((s) => `scale(${s})`),
      }}
      onMouseEnter={() => !isDisabled && api.start({ scale: 1.05 })}
      onMouseLeave={() => api.start({ scale: 1 })}
      onMouseDown={() => !isDisabled && api.start({ scale: 0.95 })}
      onMouseUp={() => !isDisabled && api.start({ scale: 1.05 })}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-xl
        transition-all duration-200
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </animated.button>
  );
}
