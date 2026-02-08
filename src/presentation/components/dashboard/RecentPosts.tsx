'use client';

/**
 * RecentPosts
 * Widget showing recent posts with status
 */

import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { AlertCircle, CheckCircle, Clock, MoreVertical, Timer } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  platforms: ('facebook' | 'instagram' | 'twitter')[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledAt?: string;
  publishedAt?: string;
  engagement?: {
    likes: number;
    comments: number;
  };
}

interface RecentPostsProps {
  posts: Post[];
  title?: string;
}

const statusConfig = {
  draft: {
    label: 'แบบร่าง',
    color: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
    icon: Clock,
  },
  scheduled: {
    label: 'รอโพสต์',
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    icon: Timer,
  },
  published: {
    label: 'โพสต์แล้ว',
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    icon: CheckCircle,
  },
  failed: {
    label: 'ผิดพลาด',
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    icon: AlertCircle,
  },
};

export function RecentPosts({ posts, title = 'โพสต์ล่าสุด' }: RecentPostsProps) {
  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(posts.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <animated.div 
        style={headerSpring}
        className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ดูทั้งหมด
        </button>
      </animated.div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {trail.map((spring, index) => {
          const post = posts[index];
          const status = statusConfig[post.status];
          const StatusIcon = status.icon;

          return (
            <animated.div
              key={post.id}
              style={spring}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Content preview */}
                  <p className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {post.content}
                  </p>

                  {/* Platforms & Status */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {post.platforms.map((platform) => (
                        <SocialIcon key={platform} platform={platform} size="xs" />
                      ))}
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>

                    {post.publishedAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(post.publishedAt)}
                      </span>
                    )}
                    {post.scheduledAt && post.status === 'scheduled' && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        กำหนด: {formatDate(post.scheduledAt)}
                      </span>
                    )}
                  </div>

                  {/* Engagement */}
                  {post.engagement && (
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>❤️ {post.engagement.likes}</span>
                      <span>💬 {post.engagement.comments}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return 'เมื่อสักครู่';
  } else if (diffHours < 24) {
    return `${diffHours} ชั่วโมงที่แล้ว`;
  } else if (diffDays < 7) {
    return `${diffDays} วันที่แล้ว`;
  } else {
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  }
}
