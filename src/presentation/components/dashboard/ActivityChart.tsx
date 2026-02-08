'use client';

/**
 * ActivityChart
 * Simple animated chart showing posting/engagement activity
 */

import { animated, useSpring, useTrail } from '@react-spring/web';
import { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
  posts?: number;
  engagement?: number;
}

interface ActivityChartProps {
  data: DataPoint[];
  title: string;
  subtitle?: string;
}

export function ActivityChart({ data, title, subtitle }: ActivityChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  const trail = useTrail(data.length, {
    from: { height: 0, opacity: 0 },
    to: { height: 100, opacity: 1 },
    delay: 300,
    config: { tension: 120, friction: 20 },
  });

  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      <animated.div style={headerSpring} className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </animated.div>

      {/* Chart */}
      <div className="h-48 flex items-end justify-around gap-2 sm:gap-4">
        {trail.map((spring, index) => {
          const item = data[index];
          const heightPercent = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-10 shadow-lg">
                  <p className="font-medium">{item.value.toLocaleString()}</p>
                  {item.posts !== undefined && (
                    <p className="text-gray-400">{item.posts} โพสต์</p>
                  )}
                  {item.engagement !== undefined && (
                    <p className="text-gray-400">{item.engagement} Engagement</p>
                  )}
                </div>
              )}

              {/* Bar */}
              <animated.div
                style={{
                  height: spring.height.to(h => `${(h * heightPercent) / 100}%`),
                  opacity: spring.opacity,
                }}
                className={`w-full max-w-10 rounded-t-lg transition-all duration-200 ${
                  isHovered
                    ? 'bg-gradient-to-t from-purple-600 to-blue-500'
                    : 'bg-gradient-to-t from-blue-600/80 to-blue-400/80'
                }`}
              />

              {/* Label */}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
          <span className="text-xs text-gray-500 dark:text-gray-400">โพสต์ทั้งหมด</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
        </div>
      </div>
    </div>
  );
}
