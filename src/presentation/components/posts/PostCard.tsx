'use client';

/**
 * PostCard
 * Individual post card with status, platforms, and actions
 */

import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring } from '@react-spring/web';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Copy,
    Edit3,
    Heart,
    MessageCircle,
    MoreVertical,
    Share,
    Timer,
    Trash2
} from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    mediaUrls?: string[];
    platforms: ('facebook' | 'instagram' | 'twitter')[];
    status: 'draft' | 'scheduled' | 'published' | 'failed';
    scheduledAt?: string;
    publishedAt?: string;
    engagement?: {
      likes: number;
      comments: number;
      shares: number;
    };
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
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

export function PostCard({ post, onEdit, onDelete, onDuplicate }: PostCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hoverSpring = useSpring({
    scale: isHovered ? 1.01 : 1,
    y: isHovered ? -2 : 0,
    config: { tension: 300, friction: 20 },
  });

  const status = statusConfig[post.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <animated.div
      style={{
        transform: hoverSpring.scale.to((s) => `scale(${s}) translateY(${hoverSpring.y.get()}px)`),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* Media preview */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-sm">รูปภาพ/วิดีโอ</div>
          </div>
          {post.mediaUrls.length > 1 && (
            <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
              +{post.mediaUrls.length - 1}
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Header with status and menu */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Platforms */}
            <div className="flex items-center gap-1">
              {post.platforms.map((platform) => (
                <SocialIcon key={platform} platform={platform} size="xs" />
              ))}
            </div>

            {/* Status badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button
                  onClick={() => onEdit?.(post.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit3 className="w-4 h-4" />
                  แก้ไข
                </button>
                <button
                  onClick={() => onDuplicate?.(post.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Copy className="w-4 h-4" />
                  สำเนา
                </button>
                <button
                  onClick={() => onDelete?.(post.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                  ลบ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-900 dark:text-white line-clamp-3 mb-3">
          {post.content}
        </p>

        {/* Date info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {post.status === 'published' && post.publishedAt && (
            <span>โพสต์เมื่อ: {formatDate(post.publishedAt)}</span>
          )}
          {post.status === 'scheduled' && post.scheduledAt && (
            <span>กำหนดโพสต์: {formatDate(post.scheduledAt)}</span>
          )}
          {post.status === 'draft' && <span>แบบร่าง</span>}
        </div>

        {/* Engagement stats */}
        {post.engagement && (
          <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Heart className="w-4 h-4 text-pink-500" />
              <span>{post.engagement.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span>{post.engagement.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Share className="w-4 h-4 text-green-500" />
              <span>{post.engagement.shares.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </animated.div>
  );
}
