'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AccountPresenter, AccountViewModel } from './AccountPresenter';
import { createClientAccountPresenter } from './AccountPresenterClientFactory';

export interface AccountPresenterState {
  viewModel: AccountViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface AccountPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Account presenter
 * Provides state management and actions for Account operations
 */
export function useAccountPresenter(
  initialViewModel?: AccountViewModel,
  presenterOverride?: AccountPresenter
): [AccountPresenterState, AccountPresenterActions] {
  
  const presenter = useMemo(
    () => presenterOverride ?? createClientAccountPresenter(),
    [presenterOverride]
  );
  
  const isMountedRef = useRef(true);
  
  const [state, setState] = useState<AccountPresenterState>({
    viewModel: initialViewModel || null,
    loading: !initialViewModel,
    error: null,
  });

  const loadData = async () => {
    if (!isMountedRef.current) return;
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const viewModel = await presenter.getViewModel();
      
      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          viewModel,
          loading: false,
        }));
      }
    } catch (error: unknown) {
      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load account data',
        }));
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (!initialViewModel) {
      loadData();
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const actions: AccountPresenterActions = {
    loadData,
    setError,
  };

  return [state, actions];
}
