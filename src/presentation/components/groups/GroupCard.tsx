'use client';

/**
 * GroupCard
 * Card for displaying target groups
 */

import { GroupStatus, GroupType, SocialPlatform } from '@/src/domain/types/social';
import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring } from '@react-spring/web';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit3,
  ExternalLink,
  MoreVertical,
  Trash2,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    platform: SocialPlatform;
    type: GroupType;
    members?: number;
    autoPost: boolean;
    autoComment: boolean;
    lastActivity?: string;
    status: GroupStatus;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleAutoPost?: (id: string) => void;
}

const statusConfig = {
  active: {
    label: 'ใช้งานอยู่',
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    icon: CheckCircle,
  },
  pending: {
    label: 'รอการอนุมัติ',
    color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
    icon: Clock,
  },
  error: {
    label: 'ไม่สามารถเข้าถึง',
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    icon: AlertCircle,
  },
};

const typeLabels = {
  group: 'กลุ่ม',
  page: 'เพจ',
  profile: 'โปรไฟล์',
  community: 'ชุมชน',
};

export function GroupCard({ group, onEdit, onDelete, onToggleAutoPost }: GroupCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hoverSpring = useSpring({
    scale: isHovered ? 1.02 : 1,
    y: isHovered ? -4 : 0,
    config: { tension: 300, friction: 20 },
  });

  const status = statusConfig[group.status];
  const StatusIcon = status.icon;

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
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 transition-shadow hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
              {group.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <SocialIcon platform={group.platform} size="xs" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
              {group.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {typeLabels[group.type]}
            </p>
          </div>
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
                onClick={() => onEdit?.(group.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit3 className="w-4 h-4" />
                แก้ไข
              </button>
              <button
                onClick={() => window.open(`https://facebook.com`, '_blank')}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ExternalLink className="w-4 h-4" />
                เปิดดู
              </button>
              <button
                onClick={() => onDelete?.(group.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                ลบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color} mb-3`}>
        <StatusIcon className="w-3 h-3" />
        {status.label}
      </div>

      {/* Stats */}
      {group.members && (
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          {group.members.toLocaleString()} สมาชิก
        </div>
      )}

      {/* Toggles */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={group.autoPost}
            onChange={() => onToggleAutoPost?.(group.id)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">โพสต์อัตโนมัติ</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={group.autoComment}
            onChange={() => {}}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">คอมเมนต์อัตโนมัติ</span>
        </label>
      </div>
    </animated.div>
  );
}
