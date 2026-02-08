'use client';

/**
 * EngagementChart
 * Line chart showing engagement over time
 */

import { animated, useSpring, useTrail } from '@react-spring/web';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface DataPoint {
  date: string;
  value: number;
  label: string;
}

interface EngagementChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
}

// Mock data for the chart
const mockData: DataPoint[] = [
  { date: '2026-02-01', value: 1200, label: '1 ก.พ.' },
  { date: '2026-02-02', value: 1450, label: '2 ก.พ.' },
  { date: '2026-02-03', value: 1100, label: '3 ก.พ.' },
  { date: '2026-02-04', value: 1680, label: '4 ก.พ.' },
  { date: '2026-02-05', value: 1890, label: '5 ก.พ.' },
  { date: '2026-02-06', value: 1550, label: '6 ก.พ.' },
  { date: '2026-02-07', value: 2100, label: '7 ก.พ.' },
];

export function EngagementChart({
  data = mockData,
  title = 'Engagement รายวัน',
  subtitle = '7 วันที่ผ่านมา',
}: EngagementChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(data.length, {
    from: { height: 0, opacity: 0 },
    to: { height: 100, opacity: 1 },
    delay: 300,
    config: { tension: 150, friction: 20 },
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <animated.div style={headerSpring} className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+23.5%</span>
        </div>
      </animated.div>

      {/* Chart */}
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-xs text-gray-400">
          <span>{maxValue.toLocaleString()}</span>
          <span>{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
          <span>{minValue.toLocaleString()}</span>
        </div>

        {/* Chart area */}
        <div className="ml-14 h-full flex items-end gap-2">
          {trail.map((spring, index) => {
            const item = data[index];
            const heightPercent = ((item.value - minValue) / range) * 80 + 20; // Min 20% height
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="relative flex-1 flex flex-col items-center justify-end h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-10">
                    {item.value.toLocaleString()} engagement
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                  </div>
                )}

                {/* Bar */}
                <animated.div
                  style={{
                    height: spring.height.to((h) => `${(h * heightPercent) / 100}%`),
                    opacity: spring.opacity,
                  }}
                  className={`w-full rounded-t-lg transition-all duration-200 ${
                    isHovered
                      ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                      : 'bg-gradient-to-t from-blue-500/60 to-blue-300/60'
                  }`}
                />

                {/* Label */}
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
