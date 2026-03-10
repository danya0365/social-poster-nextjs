'use client';

import { useEffect, useMemo, useState } from 'react';
import { DashboardPresenter, DashboardViewModel } from './DashboardPresenter';
import { createClientDashboardPresenter } from './DashboardPresenterClientFactory';

export interface DashboardState {
  viewModel: DashboardViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardActions {
  refreshData: () => Promise<void>;
}

export function useDashboardPresenter(
  initialViewModel?: DashboardViewModel,
  presenterOverride?: DashboardPresenter
): [DashboardState, DashboardActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientDashboardPresenter(),
    [presenterOverride]
  );

  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(initialViewModel ?? null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // If no initial data, fetch on mount
  useEffect(() => {
    if (!initialViewModel) {
      refreshData();
    }
  }, []);

  return [
    { viewModel, loading, error },
    { refreshData }
  ];
}
