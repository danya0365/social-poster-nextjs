'use client';

/**
 * ScheduleView
 * Main schedule page view
 */

import { PostComposer } from '@/src/presentation/components/posts/PostComposer';
import { ScheduleViewModel } from '@/src/presentation/presenters/schedule/SchedulePresenter';
import { useSchedulePresenter } from '@/src/presentation/presenters/schedule/useSchedulePresenter';
import { useState } from 'react';
import { ScheduleCalendar } from './ScheduleCalendar';

interface ScheduleViewProps {
  initialViewModel?: ScheduleViewModel;
}

export function ScheduleView({ initialViewModel }: ScheduleViewProps) {
  const [state, actions] = useSchedulePresenter(initialViewModel);
  const { scheduledPosts, loading, error } = state;

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddPost = (date: Date) => {
    setSelectedDate(date);
    setIsComposerOpen(true);
  };

  if (loading && scheduledPosts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      <ScheduleCalendar
        scheduledPosts={scheduledPosts.map(p => ({
          id: p.id,
          content: p.content,
          platforms: p.platforms as any,
          scheduledAt: p.scheduledAt || new Date().toISOString()
        }))}
        onAddPost={handleAddPost}
        onViewPost={(post) => {
          console.log('View post:', post);
        }}
      />

      <PostComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        initialData={selectedDate ? {
          content: '',
          platforms: ['facebook'],
          scheduledAt: selectedDate.toISOString(),
        } : undefined}
        onSubmit={async (data) => {
          await actions.savePost(data);
          setIsComposerOpen(false);
        }}
      />
    </>
  );
}
