'use client';

/**
 * PlatformComparison
 * Comparison of performance across platforms
 */

import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring } from '@react-spring/web';

interface PlatformData {
  platform: 'facebook' | 'instagram' | 'twitter';
  posts: number;
  engagement: number;
  reach: number;
  growth: number;
}

interface PlatformComparisonProps {
  data?: PlatformData[];
  title?: string;
}

const mockData: PlatformData[] = [
  { platform: 'facebook', posts: 45, engagement: 12500, reach: 45000, growth: 12.5 },
  { platform: 'instagram', posts: 32, engagement: 8900, reach: 28000, growth: 18.2 },
  { platform: 'twitter', posts: 28, engagement: 3200, reach: 15000, growth: -5.3 },
];

export function PlatformComparison({
  data = mockData,
  title = 'เปรียบเทียบ Platform',
}: PlatformComparisonProps) {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const maxEngagement = Math.max(...data.map((d) => d.engagement));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      <animated.div style={headerSpring} className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ผลการทำงานในแต่ละแพลตฟอร์ม
        </p>
      </animated.div>

      <div className="space-y-4">
        {data.map((item, index) => {
          const barWidth = (item.engagement / maxEngagement) * 100;

          return (
            <div key={item.platform} className="space-y-2">
              {/* Platform header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SocialIcon platform={item.platform} size="sm" />
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {item.platform}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      item.growth >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {item.growth >= 0 ? '+' : ''}
                    {item.growth}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.platform === 'facebook'
                      ? 'bg-blue-500'
                      : item.platform === 'instagram'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-sky-500'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{item.posts} โพสต์</span>
                <span>{item.engagement.toLocaleString()} engagement</span>
                <span>{item.reach.toLocaleString()} reach</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
