'use client';

import { AnalyticsViewModelData } from '@/src/application/repositories/IAnalyticsRepository';
import { useEffect, useMemo, useState } from 'react';
import { AnalyticsPresenter } from './AnalyticsPresenter';
import { createClientAnalyticsPresenter } from './AnalyticsPresenterClientFactory';

export interface AnalyticsState {
  viewModel: AnalyticsViewModelData | null;
  loading: boolean;
  error: string | null;
}

export interface AnalyticsActions {
  refreshAnalytics: () => Promise<void>;
}

export function useAnalyticsPresenter(
  initialViewModel?: AnalyticsViewModelData,
  presenterOverride?: AnalyticsPresenter
): [AnalyticsState, AnalyticsActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientAnalyticsPresenter(),
    [presenterOverride]
  );

  const [viewModel, setViewModel] = useState<AnalyticsViewModelData | null>(initialViewModel ?? null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshAnalytics = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshAnalytics();
    }
  }, []);

  return [
    { viewModel, loading, error },
    { refreshAnalytics }
  ];
}
