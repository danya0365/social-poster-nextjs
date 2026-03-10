'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminPresenter, AdminViewModel } from './AdminPresenter';
import { createClientAdminPresenter } from './AdminPresenterClientFactory';

export interface AdminState {
  viewModel: AdminViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface AdminActions {
  refreshAdmin: () => Promise<void>;
}

export function useAdminPresenter(
  initialViewModel?: AdminViewModel,
  presenterOverride?: AdminPresenter
): [AdminState, AdminActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientAdminPresenter(),
    [presenterOverride]
  );

  const [viewModel, setViewModel] = useState<AdminViewModel | null>(initialViewModel ?? null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshAdmin = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshAdmin();
    }
  }, []);

  const actions: AdminActions = {
    refreshAdmin,
  };

  return [
    { viewModel, loading, error },
    actions
  ];
}
