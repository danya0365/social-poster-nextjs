'use client';

/**
 * LoopPostView
 * Loop Post management and AI Content Generator page
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import {
    Activity,
    CheckCircle2,
    Clock,
    Pause,
    Play,
    Repeat
} from 'lucide-react';
import { useState } from 'react';
import { AIContentGenerator } from './AIContentGenerator';
import { LoopPostSettings } from './LoopPostSettings';

interface LoopPost {
  id: string;
  content: string;
  status: 'active' | 'paused' | 'completed';
  interval: number;
  intervalUnit: 'hours' | 'days';
  totalPosts: number;
  postsCompleted: number;
  nextPostTime: string;
  createdAt: string;
}

const mockLoopPosts: LoopPost[] = [
  {
    id: '1',
    content: '🔥 โปรแรง! ลดสูงสุด 50% เฉพาะวันนี้!',
    status: 'active',
    interval: 4,
    intervalUnit: 'hours',
    totalPosts: 10,
    postsCompleted: 6,
    nextPostTime: '14:30',
    createdAt: '2026-02-08',
  },
  {
    id: '2',
    content: '✨ สินค้าใหม่เข้าแล้ว! คุณภาพเกินราคา',
    status: 'active',
    interval: 6,
    intervalUnit: 'hours',
    totalPosts: 8,
    postsCompleted: 3,
    nextPostTime: '16:00',
    createdAt: '2026-02-07',
  },
  {
    id: '3',
    content: '🎁 โปรพิเศษสำหรับลูกค้าใหม่! รับส่วนลด 20%',
    status: 'paused',
    interval: 1,
    intervalUnit: 'days',
    totalPosts: 7,
    postsCompleted: 7,
    nextPostTime: '-',
    createdAt: '2026-02-05',
  },
];

export function LoopPostView() {
  const [loopPosts, setLoopPosts] = useState(mockLoopPosts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const toggleStatus = (id: string) => {
    setLoopPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              status: post.status === 'active' ? 'paused' : 'active',
            }
          : post
      )
    );
  };

  const activeCount = loopPosts.filter((p) => p.status === 'active').length;
  const totalCompleted = loopPosts.reduce((sum, p) => sum + p.postsCompleted, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            วนลูปโพสต์อัตโนมัติ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            ตั้งค่าโพสต์ซ้ำอัตโนมัติ ไม่ต้องคอยกดโพสต์เอง
          </p>
        </div>

        <AnimatedButton
          variant="gradient"
          onClick={() => setShowCreateModal(true)}
        >
          <Repeat className="w-4 h-4 mr-2" />
          สร้างลูปโพสต์ใหม่
        </AnimatedButton>
      </animated.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">กำลังทำงาน</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">โพสต์สำเร็จ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalCompleted}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">โพสต์ถัดไป</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loopPosts.find((p) => p.status === 'active')?.nextPostTime || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Loop Posts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            ลูปโพสต์ที่ตั้งไว้
          </h2>

          {loopPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-gray-900 dark:text-white line-clamp-2">
                  {post.content}
                </p>
                <button
                  onClick={() => toggleStatus(post.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    post.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }`}
                >
                  {post.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>ความคืบหน้า</span>
                  <span>
                    {post.postsCompleted}/{post.totalPosts}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                    style={{
                      width: `${(post.postsCompleted / post.totalPosts) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Repeat className="w-4 h-4" />
                  ทุก {post.interval}{' '}
                  {post.intervalUnit === 'hours' ? 'ชม.' : 'วัน'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ถัดไป: {post.nextPostTime}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    post.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {post.status === 'active' ? 'กำลังทำงาน' : 'หยุดชั่วคราว'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Content Generator */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI ช่วยเขียนโพสต์
          </h2>
          <AIContentGenerator
            onContentGenerated={(content) => setGeneratedContent(content)}
          />

          {/* Loop Settings Preview */}
          <LoopPostSettings />
        </div>
      </div>
    </div>
  );
}
