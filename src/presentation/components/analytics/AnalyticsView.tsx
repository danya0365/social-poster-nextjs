'use client';

/**
 * AnalyticsView
 * Main analytics dashboard page
 */

import { AnalyticsViewModelData } from '@/src/application/repositories/IAnalyticsRepository';
import { useAnalyticsPresenter } from '@/src/presentation/presenters/analytics/useAnalyticsPresenter';
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

interface AnalyticsViewProps {
  initialViewModel?: AnalyticsViewModelData;
}

export function AnalyticsView({ initialViewModel }: AnalyticsViewProps) {
  const [state] = useAnalyticsPresenter(initialViewModel);
  const { viewModel, loading, error } = state;

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !viewModel) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
        {error}
      </div>
    );
  }

  if (!viewModel) return null;

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
        {viewModel.summary.map((stat, index) => {
          let Icon = Eye;
          let gradient = "bg-gradient-to-r from-blue-500 to-cyan-500";
          
          if (stat.title.includes('Engagement')) {
            Icon = Heart;
            gradient = "bg-gradient-to-r from-pink-500 to-rose-500";
          } else if (stat.title.includes('ความคิดเห็น')) {
            Icon = MessageCircle;
            gradient = "bg-gradient-to-r from-purple-500 to-violet-500";
          } else if (stat.title.includes('แชร์')) {
            Icon = Share2;
            gradient = "bg-gradient-to-r from-orange-500 to-amber-500";
          }

          return (
            <AnalyticsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeLabel={stat.changeLabel}
              icon={Icon}
              gradient={gradient}
              delay={index * 100}
            />
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart 
          data={viewModel.engagementHistory.map(d => ({
            date: d.date,
            value: d.engagement,
            label: new Date(d.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
          }))} 
        />
        <PlatformComparison 
          data={viewModel.platformComparison.map(d => ({
            platform: d.platform as any,
            engagement: d.engagement,
            posts: 0, // Not available in current domain model
            reach: 0, // Not available in current domain model
            growth: 0  // Not available in current domain model
          }))} 
        />
      </div>

      {/* Best time to post */}
      <BestTimeToPost data={viewModel.bestTimes} />

      {/* Top performing posts */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          โพสต์ยอดนิยม
        </h3>
        <div className="space-y-4">
          {viewModel.topPosts.map((post, index) => (
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
