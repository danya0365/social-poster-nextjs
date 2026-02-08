'use client';

/**
 * PostsView
 * Main posts management view with filtering and grid
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
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

type PostStatus = 'all' | 'draft' | 'scheduled' | 'published' | 'failed';
type ViewMode = 'grid' | 'list';

const statusFilters = [
  { id: 'all', label: 'ทั้งหมด', icon: Grid3X3 },
  { id: 'draft', label: 'แบบร่าง', icon: Clock },
  { id: 'scheduled', label: 'รอโพสต์', icon: Calendar },
  { id: 'published', label: 'โพสต์แล้ว', icon: CheckCircle },
  { id: 'failed', label: 'ผิดพลาด', icon: AlertCircle },
] as const;

// Mock posts data
const mockPosts = [
  {
    id: 'post-1',
    content: '🔥 สินค้าใหม่มาแล้ว! เสื้อผ้าแฟชั่นคุณภาพดี ราคาถูก สั่งได้เลยค่ะ #แฟชั่น #ขายของออนไลน์ #ขายของinstagram',
    platforms: ['facebook', 'instagram'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'published' as const,
    publishedAt: '2026-02-08T10:00:00.000Z',
    engagement: { likes: 150, comments: 23, shares: 12 },
  },
  {
    id: 'post-2',
    content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น วันนี้วันเดียวเท่านั้น รีบสั่งก่อนหมด! ไม่ซื้อถือว่าพลาด 🛒',
    platforms: ['facebook'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'scheduled' as const,
    scheduledAt: '2026-02-09T14:00:00.000Z',
  },
  {
    id: 'post-3',
    content: '✨ ของใหม่เข้าร้านแล้วค่ะ กระเป๋าสวยๆ นำเข้าจากเกาหลี สนใจทักมาเลยนะคะ 💕',
    platforms: ['facebook', 'instagram', 'twitter'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'draft' as const,
  },
  {
    id: 'post-4',
    content: '🎉 ขอบคุณลูกค้าทุกท่านที่อุดหนุนค่ะ ยอดขายทะลุ 100 ออเดอร์แล้ว! ปีนี้ปังปุริเย่ 🎊',
    platforms: ['facebook'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'published' as const,
    publishedAt: '2026-02-06T12:00:00.000Z',
    engagement: { likes: 89, comments: 15, shares: 5 },
  },
  {
    id: 'post-5',
    content: '📦 พร้อมส่งวันนี้! สั่งก่อนบ่ายโมง ส่งวันนี้ทุกออเดอร์ ฟรีค่าส่งทั่วไทย',
    platforms: ['instagram'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'scheduled' as const,
    scheduledAt: '2026-02-10T09:00:00.000Z',
  },
  {
    id: 'post-6',
    content: '❌ โพสต์นี้โพสต์ไม่สำเร็จ เนื่องจาก API Error',
    platforms: ['twitter'] as ('facebook' | 'instagram' | 'twitter')[],
    status: 'failed' as const,
  },
];

export function PostsView() {
  const [statusFilter, setStatusFilter] = useState<PostStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const filteredPosts = mockPosts.filter((post) => {
    if (statusFilter !== 'all' && post.status !== statusFilter) {
      return false;
    }
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleEdit = (id: string) => {
    console.log('Edit post:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete post:', id);
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate post:', id);
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาโพสต์..."
            className="ml-3 flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
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
          const count = filter.id === 'all'
            ? mockPosts.length
            : mockPosts.filter((p) => p.status === filter.id).length;

          return (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id as PostStatus)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${statusFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                statusFilter === filter.id
                  ? 'bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Posts grid */}
      {filteredPosts.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-4'
        }>
          {filteredPosts.map((post) => (
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
