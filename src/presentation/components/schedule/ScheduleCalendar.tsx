'use client';

/**
 * ScheduleCalendar
 * Calendar view for scheduling posts
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring, useTrail } from '@react-spring/web';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Plus,
} from 'lucide-react';
import { useState } from 'react';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: ('facebook' | 'instagram' | 'twitter')[];
  scheduledAt: string;
}

interface ScheduleCalendarProps {
  scheduledPosts?: ScheduledPost[];
  onAddPost?: (date: Date) => void;
  onViewPost?: (post: ScheduledPost) => void;
}

const DAYS_TH = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
const MONTHS_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

// Mock scheduled posts
const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 'sched-1',
    content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น',
    platforms: ['facebook'],
    scheduledAt: '2026-02-09T14:00:00.000Z',
  },
  {
    id: 'sched-2',
    content: '🌟 สินค้าขายดี กลับมาอีกครั้ง!',
    platforms: ['facebook', 'instagram'],
    scheduledAt: '2026-02-09T18:00:00.000Z',
  },
  {
    id: 'sched-3',
    content: '📦 รีวิวจากลูกค้า สินค้าคุณภาพดี',
    platforms: ['instagram'],
    scheduledAt: '2026-02-10T10:00:00.000Z',
  },
  {
    id: 'sched-4',
    content: '🎁 แจกโค้ดส่วนลด 100 บาท',
    platforms: ['facebook', 'twitter'],
    scheduledAt: '2026-02-10T14:00:00.000Z',
  },
  {
    id: 'sched-5',
    content: '✨ ของใหม่เข้าร้าน สวยมากค่ะ',
    platforms: ['instagram'],
    scheduledAt: '2026-02-12T09:00:00.000Z',
  },
  {
    id: 'sched-6',
    content: '🔥 Flash Sale เที่ยงวันนี้!',
    platforms: ['facebook', 'instagram', 'twitter'],
    scheduledAt: '2026-02-15T12:00:00.000Z',
  },
];

export function ScheduleCalendar({
  scheduledPosts = mockScheduledPosts,
  onAddPost,
  onViewPost,
}: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // Create calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  // Get posts for a specific date
  const getPostsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledPosts.filter((post) => post.scheduledAt.startsWith(dateStr));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'prev' ? -1 : 1), 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const trail = useTrail(calendarDays.length, {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ตารางโพสต์
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            วางแผนและจัดการโพสต์ของคุณ
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              เดือน
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              สัปดาห์
            </button>
          </div>

          <AnimatedButton variant="gradient" onClick={() => onAddPost?.(new Date())}>
            <Plus className="w-4 h-4 mr-1" />
            เพิ่มโพสต์
          </AnimatedButton>
        </div>
      </animated.div>

      {/* Calendar navigation */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {MONTHS_TH[month]} {year + 543}
        </h2>

        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800">
          {DAYS_TH.map((day, index) => (
            <div
              key={day}
              className={`py-3 text-center text-sm font-medium ${
                index === 0 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7">
          {trail.map((spring, index) => {
            const day = calendarDays[index];
            const posts = day ? getPostsForDate(day) : [];
            const isTodayDate = day ? isToday(day) : false;
            const isSelected = selectedDate && day === selectedDate.getDate() &&
              month === selectedDate.getMonth() && year === selectedDate.getFullYear();

            return (
              <animated.div
                key={index}
                style={spring}
                onClick={() => day && setSelectedDate(new Date(year, month, day))}
                className={`
                  min-h-24 sm:min-h-32 p-2 border-b border-r border-gray-200 dark:border-gray-800
                  ${day ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50' : 'bg-gray-50 dark:bg-gray-800/30'}
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  transition-colors
                `}
              >
                {day && (
                  <>
                    <div className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-sm mb-1
                      ${isTodayDate
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-gray-900 dark:text-white'
                      }
                    `}>
                      {day}
                    </div>

                    {/* Posts for this day */}
                    <div className="space-y-1">
                      {posts.slice(0, 2).map((post) => (
                        <button
                          key={post.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewPost?.(post);
                          }}
                          className="w-full text-left"
                        >
                          <div className="flex items-center gap-1 px-1.5 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded text-xs truncate">
                            <Clock className="w-3 h-3 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 truncate">
                              {new Date(post.scheduledAt).toLocaleTimeString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </button>
                      ))}
                      {posts.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                          +{posts.length - 2} โพสต์
                        </span>
                      )}
                    </div>
                  </>
                )}
              </animated.div>
            );
          })}
        </div>
      </div>

      {/* Selected date detail */}
      {selectedDate && (
        <SelectedDateDetail
          date={selectedDate}
          posts={getPostsForDate(selectedDate.getDate())}
          onAddPost={() => onAddPost?.(selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

interface SelectedDateDetailProps {
  date: Date;
  posts: ScheduledPost[];
  onAddPost: () => void;
  onClose: () => void;
}

function SelectedDateDetail({ date, posts, onAddPost, onClose }: SelectedDateDetailProps) {
  const spring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('th-TH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <animated.div
      style={spring}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {formatDate(date)}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ปิด
        </button>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            >
              <div className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap">
                <Clock className="w-4 h-4" />
                {new Date(post.scheduledAt).toLocaleTimeString('th-TH', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {post.platforms.map((platform) => (
                    <SocialIcon key={platform} platform={platform} size="xs" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <CalendarIcon className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">ไม่มีโพสต์ที่กำหนดไว้</p>
        </div>
      )}

      <AnimatedButton
        variant="primary"
        fullWidth
        className="mt-4"
        onClick={onAddPost}
      >
        <Plus className="w-4 h-4 mr-1" />
        เพิ่มโพสต์วันนี้
      </AnimatedButton>
    </animated.div>
  );
}
