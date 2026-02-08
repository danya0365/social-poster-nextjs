'use client';

/**
 * StatsCard
 * Animated stats card for dashboard
 */

import { animated, useSpring } from '@react-spring/web';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient,
  delay = 0,
}: StatsCardProps) {
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
      {/* Background gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl`} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive && (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              )}
              {isNegative && (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-gray-500'
              }`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-gray-400 ml-1">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </animated.div>
  );
}
