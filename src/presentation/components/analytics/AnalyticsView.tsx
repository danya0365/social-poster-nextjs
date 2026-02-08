'use client';

/**
 * AnalyticsView
 * Main analytics dashboard page
 */

import { animated, useSpring } from '@react-spring/web';
import {
    Eye,
    Heart,
    MessageCircle,
    Share2
} from 'lucide-react';
import { AnalyticsCard } from './AnalyticsCard';
import { BestTimeToPost } from './BestTimeToPost';
import { EngagementChart } from './EngagementChart';
import { PlatformComparison } from './PlatformComparison';

export function AnalyticsView() {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          สถิติ
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          ภาพรวมผลการทำงานของโพสต์และ engagement
        </p>
      </animated.div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="การเข้าถึง"
          value={158420}
          change={15.3}
          changeLabel="เทียบสัปดาห์ก่อน"
          icon={Eye}
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
          delay={0}
        />
        <AnalyticsCard
          title="Engagement"
          value={24890}
          change={23.5}
          changeLabel="เทียบสัปดาห์ก่อน"
          icon={Heart}
          gradient="bg-gradient-to-r from-pink-500 to-rose-500"
          delay={100}
        />
        <AnalyticsCard
          title="ความคิดเห็น"
          value={3245}
          change={8.2}
          changeLabel="เทียบสัปดาห์ก่อน"
          icon={MessageCircle}
          gradient="bg-gradient-to-r from-purple-500 to-violet-500"
          delay={200}
        />
        <AnalyticsCard
          title="แชร์"
          value={1876}
          change={-3.1}
          changeLabel="เทียบสัปดาห์ก่อน"
          icon={Share2}
          gradient="bg-gradient-to-r from-orange-500 to-amber-500"
          delay={300}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart />
        <PlatformComparison />
      </div>

      {/* Best time to post */}
      <BestTimeToPost />

      {/* Top performing posts */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          โพสต์ยอดนิยม
        </h3>
        <div className="space-y-4">
          {[
            { id: 1, content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น', engagement: 4500, reach: 18000 },
            { id: 2, content: '🌟 สินค้าขายดี กลับมาอีกครั้ง!', engagement: 3200, reach: 15000 },
            { id: 3, content: '📦 รีวิวจากลูกค้า สินค้าคุณภาพดี', engagement: 2800, reach: 12000 },
          ].map((post, index) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-900 dark:text-white line-clamp-1">
                  {post.content}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-pink-500">
                  <Heart className="w-4 h-4" />
                  {post.engagement.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-blue-500">
                  <Eye className="w-4 h-4" />
                  {post.reach.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
