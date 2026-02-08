'use client';

/**
 * AnimatedCard
 * Reusable card component with hover animations using react-spring
 */

import { animated, useSpring } from '@react-spring/web';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient';
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  onClick,
  variant = 'default',
}: AnimatedCardProps) {
  const entranceSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay,
    config: { tension: 200, friction: 20 },
  });

  const [hoverSpring, hoverApi] = useSpring(() => ({
    scale: 1,
    y: 0,
    shadow: 0,
    config: { tension: 300, friction: 20 },
  }));

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return `
          bg-white/60 dark:bg-gray-900/60 
          backdrop-blur-xl 
          border border-white/20 dark:border-gray-700/50
        `;
      case 'gradient':
        return `
          bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
          dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20
          backdrop-blur-xl
          border border-white/20 dark:border-gray-700/50
        `;
      default:
        return `
          bg-white dark:bg-gray-800/90
          border border-gray-200 dark:border-gray-700
        `;
    }
  };

  return (
    <animated.div
      style={{
        ...entranceSpring,
        transform: hoverSpring.scale.to(
          (s) => `scale(${s}) translateY(${hoverSpring.y.get()}px)`
        ),
        boxShadow: hoverSpring.shadow.to(
          (s) => `0 ${4 + s * 20}px ${12 + s * 30}px rgba(0, 0, 0, ${0.05 + s * 0.1})`
        ),
      }}
      onMouseEnter={() => hoverApi.start({ scale: 1.02, y: -5, shadow: 1 })}
      onMouseLeave={() => hoverApi.start({ scale: 1, y: 0, shadow: 0 })}
      onClick={onClick}
      className={`
        rounded-2xl p-6
        transition-colors duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${getVariantClasses()}
        ${className}
      `}
    >
      {children}
    </animated.div>
  );
}
