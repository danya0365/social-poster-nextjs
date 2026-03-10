'use client';

import { Post } from '@/src/application/repositories/IPostRepository';
import { useEffect, useMemo, useState } from 'react';
import { SchedulePresenter, ScheduleViewModel } from './SchedulePresenter';
import { createClientSchedulePresenter } from './SchedulePresenterClientFactory';

export interface ScheduleState {
  scheduledPosts: Post[];
  loading: boolean;
  error: string | null;
}

export interface ScheduleActions {
  refreshSchedule: () => Promise<void>;
  savePost: (data: any) => Promise<void>;
}

export function useSchedulePresenter(
  initialViewModel?: ScheduleViewModel,
  presenterOverride?: SchedulePresenter
): [ScheduleState, ScheduleActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientSchedulePresenter(),
    [presenterOverride]
  );

  const [scheduledPosts, setScheduledPosts] = useState<Post[]>(initialViewModel?.scheduledPosts ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshSchedule = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setScheduledPosts(data.scheduledPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch schedule');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshSchedule();
    }
  }, []);

  const actions: ScheduleActions = {
    refreshSchedule,
    savePost: async (data: any) => {
      try {
        await presenter.savePost(data);
        await refreshSchedule();
      } catch (err: any) {
        setError(err.message || 'Failed to save post');
      }
    }
  };

  return [
    { scheduledPosts, loading, error },
    actions
  ];
}
