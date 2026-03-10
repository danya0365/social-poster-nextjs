'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AdminUserPresenter, AdminUserViewModel } from './AdminUserPresenter';
import { createClientAdminUserPresenter } from './AdminUserPresenterClientFactory';

export interface AdminUserPresenterState {
  viewModel: AdminUserViewModel | null;
  loading: boolean;
  error: string | null;
}

export function useAdminUserPresenter(
  initialViewModel?: AdminUserViewModel,
  presenterOverride?: AdminUserPresenter
) {
  const presenter = useMemo(
    () => presenterOverride ?? createClientAdminUserPresenter(),
    [presenterOverride]
  );
  
  const isMountedRef = useRef(true);
  const [state, setState] = useState<AdminUserPresenterState>({
    viewModel: initialViewModel || null,
    loading: !initialViewModel,
    error: null,
  });

  const loadData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const viewModel = await presenter.getViewModel();
      if (isMountedRef.current) {
        setState({ viewModel, loading: false, error: null });
      }
    } catch (error: unknown) {
      if (isMountedRef.current) {
        setState(prev => ({ ...prev, loading: false, error: error instanceof Error ? error.message : 'Failed to load users' }));
      }
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await presenter.deleteUser(userId);
      await loadData();
    } catch (error: unknown) {
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Failed to delete user' }));
    }
  };

  const updateUserRole = async (profileId: string, roleId: string) => {
    try {
      await presenter.updateUserRole(profileId, roleId);
      await loadData();
    } catch (error: unknown) {
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Failed to update user role' }));
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (!initialViewModel) {
      loadData();
    }
    return () => { isMountedRef.current = false; };
  }, [initialViewModel]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    state,
    actions: {
      loadData,
      deleteUser,
      updateUserRole,
    }
  };
}
