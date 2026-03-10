'use client';

import { PublicHomeData } from '@/src/application/repositories/IPublicHomeRepository';
import { useEffect, useMemo, useState } from 'react';
import { HomePresenter, HomeViewModel } from './HomePresenter';
import { createClientHomePresenter } from './HomePresenterClientFactory';

export interface HomeState {
  data: PublicHomeData | null;
  loading: boolean;
  error: string | null;
}

export interface HomeActions {
  refreshHome: () => Promise<void>;
}

export function useHomePresenter(
  initialViewModel?: HomeViewModel,
  presenterOverride?: HomePresenter
): [HomeState, HomeActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientHomePresenter(),
    [presenterOverride]
  );

  const [data, setData] = useState<PublicHomeData | null>(initialViewModel?.data ?? null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const refreshHome = async () => {
    setLoading(true);
    try {
      const result = await presenter.getViewModel();
      setData(result.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch home data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshHome();
    }
  }, []);

  const actions: HomeActions = {
    refreshHome,
  };

  return [
    { data, loading, error },
    actions
  ];
}
