'use client';

import { LoopPost } from '@/src/application/repositories/ILoopPostRepository';
import { useEffect, useMemo, useState } from 'react';
import { LoopPostPresenter, LoopPostViewModel } from './LoopPostPresenter';
import { createClientLoopPostPresenter } from './LoopPostPresenterClientFactory';

export interface LoopPostState {
  loopPosts: LoopPost[];
  loading: boolean;
  error: string | null;
}

export interface LoopPostActions {
  toggleStatus: (id: string, currentStatus: string) => Promise<void>;
  createLoopPost: (data: any) => Promise<void>;
  refreshLoopPosts: () => Promise<void>;
}

export function useLoopPostPresenter(
  initialViewModel?: LoopPostViewModel,
  presenterOverride?: LoopPostPresenter
): [LoopPostState, LoopPostActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientLoopPostPresenter(),
    [presenterOverride]
  );

  const [loopPosts, setLoopPosts] = useState<LoopPost[]>(initialViewModel?.loopPosts ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshLoopPosts = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setLoopPosts(data.loopPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch loop posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshLoopPosts();
    }
  }, []);

  const actions: LoopPostActions = {
    toggleStatus: async (id: string, currentStatus: string) => {
      try {
        await presenter.toggleStatus(id, currentStatus);
        await refreshLoopPosts();
      } catch (err: any) {
        setError(err.message || 'Failed to toggle status');
      }
    },
    createLoopPost: async (data: any) => {
      try {
        await presenter.createLoopPost(data);
        await refreshLoopPosts();
      } catch (err: any) {
        setError(err.message || 'Failed to create loop post');
      }
    },
    refreshLoopPosts,
  };

  return [
    { loopPosts, loading, error },
    actions
  ];
}
