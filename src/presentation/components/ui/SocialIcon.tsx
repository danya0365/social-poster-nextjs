'use client';

/**
 * SocialIcon
 * Social media platform icons with brand colors and hover effects
 */

import { animated, useSpring } from '@react-spring/web';
import { Facebook, Instagram, Twitter } from 'lucide-react';

type Platform = 'facebook' | 'instagram' | 'twitter';

interface SocialIconProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  onClick?: () => void;
  className?: string;
}

const platformConfig = {
  facebook: {
    icon: Facebook,
    label: 'Facebook',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    textColor: 'text-blue-600',
    gradient: 'from-blue-600 to-blue-700',
  },
  instagram: {
    icon: Instagram,
    label: 'Instagram',
    color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    hoverColor: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
    textColor: 'text-pink-600',
    gradient: 'from-purple-600 via-pink-600 to-orange-500',
  },
  twitter: {
    icon: Twitter,
    label: 'Twitter',
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
    textColor: 'text-sky-500',
    gradient: 'from-sky-400 to-sky-600',
  },
};

const sizeConfig = {
  sm: { icon: 'w-4 h-4', wrapper: 'p-2', text: 'text-xs' },
  md: { icon: 'w-5 h-5', wrapper: 'p-2.5', text: 'text-sm' },
  lg: { icon: 'w-6 h-6', wrapper: 'p-3', text: 'text-base' },
};

export function SocialIcon({
  platform,
  size = 'md',
  showLabel = false,
  onClick,
  className = '',
}: SocialIconProps) {
  const config = platformConfig[platform];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  const [spring, api] = useSpring(() => ({
    scale: 1,
    rotate: 0,
    config: { tension: 400, friction: 15 },
  }));

  return (
    <animated.button
      onClick={onClick}
      style={{
        transform: spring.scale.to(
          (s) => `scale(${s}) rotate(${spring.rotate.get()}deg)`
        ),
      }}
      onMouseEnter={() => api.start({ scale: 1.15, rotate: 5 })}
      onMouseLeave={() => api.start({ scale: 1, rotate: 0 })}
      className={`
        inline-flex items-center justify-center
        ${sizes.wrapper}
        ${config.color} ${config.hoverColor}
        rounded-xl
        text-white
        transition-all duration-200
        shadow-lg
        ${className}
      `}
    >
      <Icon className={sizes.icon} />
      {showLabel && (
        <span className={`ml-2 font-medium ${sizes.text}`}>
          {config.label}
        </span>
      )}
    </animated.button>
  );
}

/**
 * SocialIconOutline
 * Outline variant of social icons
 */
export function SocialIconOutline({
  platform,
  size = 'md',
  onClick,
  className = '',
}: Omit<SocialIconProps, 'showLabel'>) {
  const config = platformConfig[platform];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 15 },
  }));

  return (
    <animated.button
      onClick={onClick}
      style={{
        transform: spring.scale.to((s) => `scale(${s})`),
      }}
      onMouseEnter={() => api.start({ scale: 1.1 })}
      onMouseLeave={() => api.start({ scale: 1 })}
      className={`
        inline-flex items-center justify-center
        ${sizes.wrapper}
        bg-transparent
        border-2 border-current
        ${config.textColor}
        rounded-xl
        transition-all duration-200
        hover:bg-current/10
        ${className}
      `}
    >
      <Icon className={sizes.icon} />
    </animated.button>
  );
}
