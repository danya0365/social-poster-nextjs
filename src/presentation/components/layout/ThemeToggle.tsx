'use client';

/**
 * ThemeToggle
 * Sun/Moon toggle button for switching between light and dark mode
 */

import { useThemeStore } from '@/src/presentation/stores/theme-store';
import { animated, useSpring } from '@react-spring/web';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const iconSpring = useSpring({
    transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { tension: 200, friction: 20 },
  });

  const buttonSpring = useSpring({
    scale: 1,
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.button
      onClick={toggleTheme}
      style={buttonSpring}
      onMouseEnter={() => buttonSpring.scale.set(1.1)}
      onMouseLeave={() => buttonSpring.scale.set(1)}
      className="relative p-2.5 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
        dark:from-yellow-500/10 dark:to-orange-500/10
        hover:from-indigo-500/20 hover:to-purple-500/20
        dark:hover:from-yellow-500/20 dark:hover:to-orange-500/20
        border border-indigo-200/50 dark:border-yellow-200/30
        transition-all duration-300 ease-out
        shadow-lg shadow-indigo-500/10 dark:shadow-yellow-500/10
        backdrop-blur-sm"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <animated.div style={iconSpring}>
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </animated.div>
    </animated.button>
  );
}
