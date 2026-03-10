'use client';

/**
 * DashboardView
 * Main dashboard page view with all widgets
 */

import { DashboardViewModel } from '@/src/presentation/presenters/dashboard/DashboardPresenter';
import { useDashboardPresenter } from '@/src/presentation/presenters/dashboard/useDashboardPresenter';
import { Calendar, FileEdit, Share2, Target, TrendingUp } from 'lucide-react';
import { ActivityChart } from './ActivityChart';
import { RecentPosts } from './RecentPosts';
import { SchedulePreview } from './SchedulePreview';
import { StatsCard } from './StatsCard';

interface DashboardViewProps {
  initialViewModel?: DashboardViewModel;
}

export function DashboardView({ initialViewModel }: DashboardViewProps) {
  const [state, actions] = useDashboardPresenter(initialViewModel);
  
  const { viewModel, loading, error } = state;

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

  // Map stats from viewModel
  const stats = [
    {
      title: 'โพสต์วันนี้',
      value: viewModel.stats.totalPosts,
      icon: FileEdit,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Engagement',
      value: viewModel.stats.totalEngagement.likes + viewModel.stats.totalEngagement.comments,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'รอโพสต์',
      value: viewModel.stats.scheduledPosts,
      icon: Calendar,
      gradient: 'from-pink-500 to-pink-600',
    },
    {
      title: 'โพสต์แล้ว',
      value: viewModel.stats.publishedPosts,
      icon: Share2,
      gradient: 'from-teal-500 to-teal-600',
    },
  ];

  // Map activity data (still using some mock for chart if not in repository)
  const activityData = [
    { label: 'จ.', value: 45, posts: 15, engagement: 450 },
    { label: 'อ.', value: 65, posts: 22, engagement: 680 },
    { label: 'พ.', value: 55, posts: 18, engagement: 520 },
    { label: 'พฤ.', value: 80, posts: 28, engagement: 890 },
    { label: 'ศ.', value: 70, posts: 24, engagement: 720 },
    { label: 'ส.', value: 90, posts: 32, engagement: 1100 },
    { label: 'อา.', value: 75, posts: 26, engagement: 850 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          สวัสดี, {viewModel.userName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          ภาพรวมการโพสต์และ Engagement ของคุณวันนี้
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Charts and Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart - spans 2 columns */}
        <div className="lg:col-span-2">
          <ActivityChart
            data={activityData}
            title="กิจกรรมสัปดาห์นี้"
            subtitle="จำนวนโพสต์และ Engagement รวม"
          />
        </div>

        {/* Schedule Preview */}
        <div>
          <SchedulePreview 
            scheduledPosts={viewModel.scheduledPosts.map(p => ({
              id: p.id,
              content: p.content,
              platforms: p.platforms as any,
              scheduledAt: p.scheduledAt || new Date().toISOString()
            }))} 
          />
        </div>
      </div>

      {/* Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPosts posts={viewModel.recentPosts} />
        
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            เริ่มต้นใช้งาน
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              icon={FileEdit}
              label="สร้างโพสต์ใหม่"
              gradient="from-blue-500 to-blue-600"
            />
            <QuickAction
              icon={Calendar}
              label="วางแผนโพสต์"
              gradient="from-purple-500 to-purple-600"
            />
            <QuickAction
              icon={Target}
              label="หากลุ่มเป้าหมาย"
              gradient="from-pink-500 to-pink-600"
            />
            <QuickAction
              icon={Share2}
              label="เชื่อมต่อบัญชี"
              gradient="from-teal-500 to-teal-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickActionProps {
  icon: React.ElementType;
  label: string;
  gradient: string;
}

function QuickAction({ icon: Icon, label, gradient }: QuickActionProps) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
        {label}
      </span>
    </button>
  );
}
