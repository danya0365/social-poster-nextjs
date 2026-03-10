'use client';

import { AutoCommentSettings } from '@/src/application/repositories/IAutoCommentRepository';
import { useEffect, useMemo, useState } from 'react';
import { AutoCommentPresenter, AutoCommentViewModel } from './AutoCommentPresenter';
import { createClientAutoCommentPresenter } from './AutoCommentPresenterClientFactory';

export interface AutoCommentState {
  viewModel: AutoCommentViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface AutoCommentActions {
  toggleTemplate: (id: string, currentStatus: boolean) => Promise<void>;
  saveTemplate: (data: any) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  updateSettings: (data: Partial<AutoCommentSettings>) => Promise<void>;
  refreshAutoComment: () => Promise<void>;
}

export function useAutoCommentPresenter(
  initialViewModel?: AutoCommentViewModel,
  presenterOverride?: AutoCommentPresenter
): [AutoCommentState, AutoCommentActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientAutoCommentPresenter(),
    [presenterOverride]
  );

  const [viewModel, setViewModel] = useState<AutoCommentViewModel | null>(initialViewModel ?? null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshAutoComment = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch auto-comment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshAutoComment();
    }
  }, []);

  const actions: AutoCommentActions = {
    toggleTemplate: async (id: string, currentStatus: boolean) => {
      try {
        await presenter.toggleTemplate(id, currentStatus);
        await refreshAutoComment();
      } catch (err: any) {
        setError(err.message || 'Failed to toggle template');
      }
    },
    saveTemplate: async (data: any) => {
      try {
        await presenter.saveTemplate(data);
        await refreshAutoComment();
      } catch (err: any) {
        setError(err.message || 'Failed to save template');
      }
    },
    deleteTemplate: async (id: string) => {
      try {
        await presenter.deleteTemplate(id);
        await refreshAutoComment();
      } catch (err: any) {
        setError(err.message || 'Failed to delete template');
      }
    },
    updateSettings: async (data: Partial<AutoCommentSettings>) => {
      try {
        await presenter.updateSettings(data);
        await refreshAutoComment();
      } catch (err: any) {
        setError(err.message || 'Failed to update settings');
      }
    },
    refreshAutoComment,
  };

  return [
    { viewModel, loading, error },
    actions
  ];
}
