'use client';

/**
 * ScheduleView
 * Main schedule page view
 */

import { PostComposer } from '@/src/presentation/components/posts/PostComposer';
import { useState } from 'react';
import { ScheduleCalendar } from './ScheduleCalendar';

export function ScheduleView() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddPost = (date: Date) => {
    setSelectedDate(date);
    setIsComposerOpen(true);
  };

  return (
    <>
      <ScheduleCalendar
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
        onSubmit={(data) => {
          console.log('Save post:', data);
          setIsComposerOpen(false);
        }}
      />
    </>
  );
}
