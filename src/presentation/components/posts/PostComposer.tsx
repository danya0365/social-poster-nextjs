'use client';

/**
 * PostComposer
 * Modal for creating and editing posts
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import {
    Calendar,
    Clock,
    Facebook,
    Image as ImageIcon,
    Instagram,
    Send,
    Smile,
    Sparkles,
    Twitter,
    Video,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface PostComposerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    content: string;
    platforms: ('facebook' | 'instagram' | 'twitter')[];
    scheduledAt?: string;
  };
  onSubmit: (data: {
    content: string;
    platforms: ('facebook' | 'instagram' | 'twitter')[];
    scheduledAt?: string;
    action: 'draft' | 'schedule' | 'post';
  }) => void;
}

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600 text-white' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-sky-500 text-white' },
] as const;

export function PostComposer({ isOpen, onClose, initialData, onSubmit }: PostComposerProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState<('facebook' | 'instagram' | 'twitter')[]>(
    initialData?.platforms || ['facebook']
  );
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    scale: isOpen ? 1 : 0.95,
    y: isOpen ? 0 : 20,
    config: { tension: 300, friction: 25 },
  });

  const togglePlatform = (platform: 'facebook' | 'instagram' | 'twitter') => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleSubmit = (action: 'draft' | 'schedule' | 'post') => {
    const scheduledAt = showSchedule && scheduledDate && scheduledTime
      ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
      : undefined;

    onSubmit({
      content,
      platforms: selectedPlatforms,
      scheduledAt,
      action,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <animated.div
        style={backdropSpring}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <animated.div
        style={{
          opacity: modalSpring.opacity,
          transform: modalSpring.scale.to(
            (s) => `scale(${s}) translateY(${modalSpring.y.get()}px)`
          ),
        }}
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            สร้างโพสต์ใหม่
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Platform selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              เลือกแพลตฟอร์ม
            </label>
            <div className="flex gap-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
                      ${isSelected
                        ? platform.color + ' shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {platform.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              เนื้อหาโพสต์
            </label>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="เขียนอะไรสักอย่าง..."
                rows={5}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              
              {/* AI suggestion button */}
              <button className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity">
                <Sparkles className="w-3 h-3" />
                AI ช่วยเขียน
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {content.length} / 2200 ตัวอักษร
            </p>
          </div>

          {/* Media buttons */}
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-800">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ImageIcon className="w-4 h-4 text-green-500" />
              เพิ่มรูปภาพ
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Video className="w-4 h-4 text-red-500" />
              เพิ่มวิดีโอ
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Smile className="w-4 h-4 text-yellow-500" />
              อีโมจิ
            </button>
          </div>

          {/* Schedule toggle */}
          <div>
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Calendar className="w-4 h-4" />
              {showSchedule ? 'ยกเลิกการตั้งเวลา' : 'ตั้งเวลาโพสต์'}
            </button>

            {showSchedule && (
              <div className="mt-3 flex gap-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    วันที่
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    เวลา
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => handleSubmit('draft')}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            บันทึกแบบร่าง
          </button>

          <div className="flex items-center gap-2">
            {showSchedule ? (
              <AnimatedButton
                variant="primary"
                size="md"
                onClick={() => handleSubmit('schedule')}
                disabled={!content.trim() || !scheduledDate || !scheduledTime}
              >
                <Clock className="w-4 h-4 mr-1" />
                ตั้งเวลาโพสต์
              </AnimatedButton>
            ) : (
              <AnimatedButton
                variant="gradient"
                size="md"
                onClick={() => handleSubmit('post')}
                disabled={!content.trim()}
              >
                <Send className="w-4 h-4 mr-1" />
                โพสต์เลย
              </AnimatedButton>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
}
