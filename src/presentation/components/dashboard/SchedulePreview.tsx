'use client';

/**
 * SchedulePreview
 * Mini calendar widget showing upcoming scheduled posts
 */

import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring } from '@react-spring/web';
import { Calendar, ChevronRight, Clock } from 'lucide-react';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: ('facebook' | 'instagram' | 'twitter')[];
  scheduledAt: string;
}

interface SchedulePreviewProps {
  scheduledPosts: ScheduledPost[];
  title?: string;
}

export function SchedulePreview({ scheduledPosts, title = 'โพสต์ที่รอ' }: SchedulePreviewProps) {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  // Group posts by date
  const groupedPosts = scheduledPosts.reduce((acc, post) => {
    const date = new Date(post.scheduledAt).toLocaleDateString('th-TH', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(post);
    return acc;
  }, {} as Record<string, ScheduledPost[]>);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <animated.div
        style={headerSpring}
        className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
          {scheduledPosts.length} โพสต์
        </span>
      </animated.div>

      <div className="p-4 max-h-80 overflow-y-auto">
        {Object.entries(groupedPosts).length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">ไม่มีโพสต์ที่รอ</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedPosts).map(([date, posts]) => (
              <div key={date}>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {date}
                </p>
                <div className="space-y-2">
                  {posts.map((post) => (
                    <ScheduleItem key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button className="w-full flex items-center justify-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ดูตารางโพสต์ทั้งหมด
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface ScheduleItemProps {
  post: ScheduledPost;
}

function ScheduleItem({ post }: ScheduleItemProps) {
  const time = new Date(post.scheduledAt).toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
      {/* Time */}
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        <Clock className="w-3 h-3" />
        {time}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.content}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {post.platforms.map((platform) => (
            <SocialIcon key={platform} platform={platform} size="xs" />
          ))}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
