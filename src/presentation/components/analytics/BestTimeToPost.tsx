'use client';

/**
 * BestTimeToPost
 * Shows optimal times to post based on engagement
 */

import { animated, useSpring } from '@react-spring/web';
import { Zap } from 'lucide-react';

interface TimeSlot {
  hour: number;
  day: string;
  score: number; // 0-100
}

interface BestTimeToPostProps {
  data?: TimeSlot[];
  title?: string;
}

// Mock data for heatmap
const generateHeatmapData = (): TimeSlot[] => {
  const days = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
  const data: TimeSlot[] = [];

  days.forEach((day) => {
    for (let hour = 6; hour <= 22; hour += 2) {
      // Generate realistic-looking scores
      let score = Math.random() * 30 + 20; // Base score
      
      // Higher during lunch and evening
      if (hour >= 11 && hour <= 13) score += 30;
      if (hour >= 18 && hour <= 21) score += 40;
      
      // Higher on weekends evening
      if ((day === 'ส.' || day === 'อา.') && hour >= 10) score += 15;
      
      data.push({
        hour,
        day,
        score: Math.min(100, Math.round(score)),
      });
    }
  });

  return data;
};

const heatmapData = generateHeatmapData();

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-green-400';
  if (score >= 40) return 'bg-yellow-400';
  if (score >= 20) return 'bg-orange-300';
  return 'bg-gray-200 dark:bg-gray-700';
};

export function BestTimeToPost({ 
  data = heatmapData, 
  title = 'เวลาที่ดีที่สุดในการโพสต์' 
}: BestTimeToPostProps) {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const days = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
  const hours = [6, 8, 10, 12, 14, 16, 18, 20, 22];

  // Find best time
  const bestSlot = data.reduce((best, current) =>
    current.score > best.score ? current : best,
    data[0] || { day: '-', hour: 0, score: 0 }
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      <animated.div style={headerSpring} className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            วิเคราะห์จาก engagement ย้อนหลัง 30 วัน
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">
            {bestSlot.day} {bestSlot.hour}:00
          </span>
        </div>
      </animated.div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Hour headers */}
          <div className="flex items-center gap-1 mb-2 pl-10">
            {hours.map((hour) => (
              <div
                key={hour}
                className="w-8 text-center text-xs text-gray-500 dark:text-gray-400"
              >
                {hour}:00
              </div>
            ))}
          </div>

          {/* Rows */}
          {days.map((day) => (
            <div key={day} className="flex items-center gap-1 mb-1">
              <div className="w-8 text-xs text-gray-500 dark:text-gray-400 text-right pr-2">
                {day}
              </div>
              {hours.map((hour) => {
                const slot = data.find((s) => s.day === day && s.hour === hour);
                const score = slot?.score || 0;

                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`w-8 h-8 rounded ${getScoreColor(score)} transition-all hover:scale-110 cursor-pointer`}
                    title={`${day} ${hour}:00 - Score: ${score}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700" />
          <span>ต่ำ</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-400" />
          <span>ปานกลาง</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>สูง</span>
        </div>
      </div>
    </div>
  );
}
