'use client';

/**
 * SocialAccountCard
 * Card for displaying connected social media accounts
 */

import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring } from '@react-spring/web';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    ExternalLink,
    FileText,
    MoreVertical,
    RefreshCw,
    Trash2,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface SocialAccountCardProps {
  account: {
    id: string;
    platform: 'facebook' | 'instagram' | 'twitter';
    name: string;
    username: string;
    avatar?: string;
    status: 'connected' | 'expired' | 'error';
    followers?: number;
    posts?: number;
    lastSync?: string;
  };
  onRefresh?: (id: string) => void;
  onDisconnect?: (id: string) => void;
}

const statusConfig = {
  connected: {
    label: 'เชื่อมต่อแล้ว',
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    icon: CheckCircle,
  },
  expired: {
    label: 'Token หมดอายุ',
    color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
    icon: Clock,
  },
  error: {
    label: 'เกิดข้อผิดพลาด',
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    icon: AlertCircle,
  },
};

export function SocialAccountCard({ account, onRefresh, onDisconnect }: SocialAccountCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hoverSpring = useSpring({
    scale: isHovered ? 1.02 : 1,
    y: isHovered ? -4 : 0,
    config: { tension: 300, friction: 20 },
  });

  const status = statusConfig[account.status];
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
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar with platform badge */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-400">
              {account.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <SocialIcon platform={account.platform} size="xs" />
            </div>
          </div>

          {/* Account info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {account.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{account.username}
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
            <div className="absolute top-full right-0 mt-1 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
              <button
                onClick={() => onRefresh?.(account.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
                รีเฟรช Token
              </button>
              <button
                onClick={() => window.open(`https://${account.platform}.com/${account.username}`, '_blank')}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ExternalLink className="w-4 h-4" />
                ดูบนแพลตฟอร์ม
              </button>
              <button
                onClick={() => onDisconnect?.(account.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                ยกเลิกการเชื่อมต่อ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color} mb-4`}>
        <StatusIcon className="w-3 h-3" />
        {status.label}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-200 dark:border-gray-800">
        {account.followers !== undefined && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {account.followers.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">ผู้ติดตาม</p>
            </div>
          </div>
        )}
        {account.posts !== undefined && (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {account.posts.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">โพสต์</p>
            </div>
          </div>
        )}
      </div>

      {/* Last sync */}
      {account.lastSync && (
        <p className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-800">
          ซิงค์ล่าสุด: {new Date(account.lastSync).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}
    </animated.div>
  );
}
