'use client';

/**
 * PostsView
 * Main posts management view with filtering and grid
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { PostsViewModel } from '@/src/presentation/presenters/posts/PostsPresenter';
import { usePostsPresenter } from '@/src/presentation/presenters/posts/usePostsPresenter';
import { animated, useSpring } from '@react-spring/web';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    Grid3X3,
    List,
    Plus,
    Search
} from 'lucide-react';
import { useState } from 'react';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';

interface PostsViewProps {
  initialViewModel?: PostsViewModel;
}

const statusFilters = [
  { id: 'all', label: 'ทั้งหมด', icon: Grid3X3 },
  { id: 'draft', label: 'แบบร่าง', icon: Clock },
  { id: 'scheduled', label: 'รอโพสต์', icon: Calendar },
  { id: 'published', label: 'โพสต์แล้ว', icon: CheckCircle },
  { id: 'failed', label: 'ผิดพลาด', icon: AlertCircle },
] as const;

export function PostsView({ initialViewModel }: PostsViewProps) {
  const [state, actions] = usePostsPresenter(initialViewModel);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleEdit = (id: string) => {
    console.log('Edit post:', id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('ยืนยันการลบโพสต์?')) {
      await actions.deletePost(id);
    }
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate post:', id);
  };

  if (state.loading && state.posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            โพสต์ทั้งหมด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            จัดการและติดตามโพสต์ของคุณ
          </p>
        </div>

        <AnimatedButton variant="gradient" onClick={() => setIsComposerOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          สร้างโพสต์ใหม่
        </AnimatedButton>
      </animated.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={state.searchQuery}
            onChange={(e) => actions.setSearchQuery(e.target.value)}
            placeholder="ค้นหาโพสต์..."
            className="ml-3 flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-1">
          <button
            onClick={() => actions.setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              state.viewMode === 'grid'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => actions.setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              state.viewMode === 'list'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => {
          const Icon = filter.icon;
          
          return (
            <button
              key={filter.id}
              onClick={() => actions.setStatusFilter(filter.id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${state.statusFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Posts grid */}
      {state.posts.length > 0 ? (
        <div className={
          state.viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-4'
        }>
          {state.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            ไม่พบโพสต์
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            ลองเปลี่ยนตัวกรองหรือสร้างโพสต์ใหม่
          </p>
          <AnimatedButton variant="primary" onClick={() => setIsComposerOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            สร้างโพสต์ใหม่
          </AnimatedButton>
        </div>
      )}

      {/* Post Composer Modal */}
      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSubmit={(data) => {
          console.log('New post:', data);
        }}
      />
    </div>
  );
}
