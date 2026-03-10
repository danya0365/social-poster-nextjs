'use client';

/**
 * LoopPostView
 * Loop Post management and AI Content Generator page
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { LoopPostViewModel } from '@/src/presentation/presenters/looppost/LoopPostPresenter';
import { useLoopPostPresenter } from '@/src/presentation/presenters/looppost/useLoopPostPresenter';
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

interface LoopPostViewProps {
  initialViewModel?: LoopPostViewModel;
}

export function LoopPostView({ initialViewModel }: LoopPostViewProps) {
  const [state, actions] = useLoopPostPresenter(initialViewModel);
  const { loopPosts, loading, error } = state;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const activeCount = loopPosts.filter((p) => p.status === 'active').length;
  const totalCompleted = loopPosts.reduce((sum, p) => sum + p.postsCompleted, 0);

  if (loading && loopPosts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
          {error}
        </div>
      )}

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

          {loopPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
              <Repeat className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">ยังไม่มีลูปโพสต์ที่ตั้งไว้</p>
            </div>
          ) : (
            loopPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-gray-900 dark:text-white line-clamp-2">
                    {post.content}
                  </p>
                  <button
                    onClick={() => actions.toggleStatus(post.id, post.status)}
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
                    {post.status === 'active' ? 'กำลังทำงาน' : post.status === 'completed' ? 'เสร็จสิ้น' : 'หยุดชั่วคราว'}
                  </span>
                </div>
              </div>
            ))
          )}
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
          <LoopPostSettings onSave={(settings) => {
            if (generatedContent) {
              actions.createLoopPost({
                content: generatedContent,
                ...settings,
                status: 'active'
              });
              setShowCreateModal(false);
            }
          }} />
        </div>
      </div>
    </div>
  );
}
