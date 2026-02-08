'use client';

/**
 * DashboardView
 * Main dashboard page view with all widgets
 */

import { Calendar, FileEdit, Share2, Target, TrendingUp, Users } from 'lucide-react';
import { ActivityChart } from './ActivityChart';
import { RecentPosts } from './RecentPosts';
import { SchedulePreview } from './SchedulePreview';
import { StatsCard } from './StatsCard';

// Mock data for stats
const stats = [
  {
    title: 'โพสต์วันนี้',
    value: 124,
    change: 12,
    changeLabel: 'จากเมื่อวาน',
    icon: FileEdit,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Engagement',
    value: '16.3K',
    change: 25.5,
    changeLabel: 'เทียบเดือนก่อน',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'กลุ่มเป้าหมาย',
    value: 48,
    change: 8,
    changeLabel: 'กลุ่มใหม่',
    icon: Users,
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    title: 'บัญชี Social',
    value: 5,
    icon: Share2,
    gradient: 'from-teal-500 to-teal-600',
  },
];

// Mock data for activity chart
const activityData = [
  { label: 'จ.', value: 45, posts: 15, engagement: 450 },
  { label: 'อ.', value: 65, posts: 22, engagement: 680 },
  { label: 'พ.', value: 55, posts: 18, engagement: 520 },
  { label: 'พฤ.', value: 80, posts: 28, engagement: 890 },
  { label: 'ศ.', value: 70, posts: 24, engagement: 720 },
  { label: 'ส.', value: 90, posts: 32, engagement: 1100 },
  { label: 'อา.', value: 75, posts: 26, engagement: 850 },
];

// Mock data for recent posts
const recentPosts = [
  {
    id: 'post-1',
    content: '🔥 สินค้าใหม่มาแล้ว! เสื้อผ้าแฟชั่นคุณภาพดี ราคาถูก สั่งได้เลยค่ะ #แฟชั่น #ขายของออนไลน์',
    platforms: ['facebook', 'instagram'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'published' as const,
    publishedAt: '2026-02-08T10:00:00.000Z',
    engagement: { likes: 150, comments: 23 },
  },
  {
    id: 'post-2',
    content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น วันนี้วันเดียวเท่านั้น รีบสั่งก่อนหมด!',
    platforms: ['facebook'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'scheduled' as const,
    scheduledAt: '2026-02-09T14:00:00.000Z',
  },
  {
    id: 'post-3',
    content: '✨ ของใหม่เข้าร้านแล้วค่ะ กระเป๋าสวยๆ นำเข้าจากเกาหลี สนใจทักมาเลยนะคะ',
    platforms: ['facebook', 'instagram', 'twitter'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'draft' as const,
  },
  {
    id: 'post-4',
    content: '🎉 ขอบคุณลูกค้าทุกท่านที่อุดหนุนค่ะ ยอดขายทะลุ 100 ออเดอร์แล้ว!',
    platforms: ['facebook'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'published' as const,
    publishedAt: '2026-02-06T12:00:00.000Z',
    engagement: { likes: 89, comments: 15 },
  },
];

// Mock data for scheduled posts
const scheduledPosts = [
  {
    id: 'sched-1',
    content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น วันนี้วันเดียวเท่านั้น',
    platforms: ['facebook'] as ('facebook' | 'instagram' | 'twitter')[],
    scheduledAt: '2026-02-09T14:00:00.000Z',
  },
  {
    id: 'sched-2',
    content: '🌟 สินค้าขายดี กลับมาอีกครั้ง! พร้อมส่ง รีบจองก่อนหมดค่ะ',
    platforms: ['facebook', 'instagram'] as ('facebook' | 'instagram' | 'twitter')[],
    scheduledAt: '2026-02-09T18:00:00.000Z',
  },
  {
    id: 'sched-3',
    content: '📦 รีวิวจากลูกค้า สินค้าคุณภาพดี ส่งเร็วมากค่ะ',
    platforms: ['instagram'] as ('facebook' | 'instagram' | 'twitter')[],
    scheduledAt: '2026-02-10T10:00:00.000Z',
  },
  {
    id: 'sched-4',
    content: '🎁 แจกโค้ดส่วนลด 100 บาท สำหรับลูกค้าใหม่',
    platforms: ['facebook', 'twitter'] as ('facebook' | 'instagram' | 'twitter')[],
    scheduledAt: '2026-02-10T14:00:00.000Z',
  },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          สวัสดี, John! 👋
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
          <SchedulePreview scheduledPosts={scheduledPosts} />
        </div>
      </div>

      {/* Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPosts posts={recentPosts} />
        
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
