'use client';

/**
 * AnalyticsCard
 * Card for displaying analytics metrics
 */

import { animated, useSpring } from '@react-spring/web';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay?: number;
}

export function AnalyticsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient,
  delay = 0,
}: AnalyticsCardProps) {
  const entranceSpring = useSpring({
    from: { opacity: 0, y: 20, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
    delay,
    config: { tension: 200, friction: 20 },
  });

  const [hoverSpring, hoverApi] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: { tension: 300, friction: 20 },
  }));

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <animated.div
      style={{
        ...entranceSpring,
        transform: hoverSpring.scale.to(
          (s) => `scale(${s}) translateY(${hoverSpring.y.get()}px)`
        ),
      }}
      onMouseEnter={() => hoverApi.start({ scale: 1.02, y: -4 })}
      onMouseLeave={() => hoverApi.start({ scale: 1, y: 0 })}
      className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      {/* Gradient background accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2`}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl ${gradient} text-white mb-4`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Title */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>

        {/* Value */}
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>

        {/* Change indicator */}
        {change !== undefined && (
          <div className="flex items-center gap-1">
            <TrendIcon
              className={`w-4 h-4 ${
                isPositive
                  ? 'text-green-500'
                  : isNegative
                  ? 'text-red-500'
                  : 'text-gray-400'
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? 'text-green-500'
                  : isNegative
                  ? 'text-red-500'
                  : 'text-gray-400'
              }`}
            >
              {isPositive ? '+' : ''}
              {change}%
            </span>
            {changeLabel && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </animated.div>
  );
}
