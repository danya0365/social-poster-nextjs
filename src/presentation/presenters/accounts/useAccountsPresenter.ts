'use client';

import { SocialAccount } from '@/src/application/repositories/IAccountRepository';
import { useEffect, useMemo, useState } from 'react';
import { AccountsPresenter, AccountsViewModel } from './AccountsPresenter';
import { createClientAccountsPresenter } from './AccountsPresenterClientFactory';

export interface AccountsState {
  accounts: SocialAccount[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  isRefreshing: boolean;
}

export interface AccountsActions {
  setSearchQuery: (query: string) => void;
  syncAccount: (id: string) => Promise<void>;
  syncAll: () => Promise<void>;
  disconnectAccount: (id: string) => Promise<void>;
}

export function useAccountsPresenter(
  initialViewModel?: AccountsViewModel,
  presenterOverride?: AccountsPresenter
): [AccountsState, AccountsActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientAccountsPresenter(),
    [presenterOverride]
  );

  const [accounts, setAccounts] = useState<SocialAccount[]>(initialViewModel?.accounts ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAccounts = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setAccounts(data.accounts);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshAccounts();
    }
  }, []);

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc => 
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [accounts, searchQuery]);

  const actions: AccountsActions = {
    setSearchQuery,
    syncAccount: async (id: string) => {
      try {
        const updated = await presenter.syncAccount(id);
        setAccounts(prev => prev.map(a => a.id === id ? updated : a));
      } catch (err: any) {
        setError(err.message || 'Failed to sync account');
      }
    },
    syncAll: async () => {
      setIsRefreshing(true);
      try {
        await Promise.all(accounts.map(a => presenter.syncAccount(a.id)));
        await refreshAccounts();
      } catch (err: any) {
        setError(err.message || 'Failed to sync all accounts');
      } finally {
        setIsRefreshing(false);
      }
    },
    disconnectAccount: async (id: string) => {
      try {
        const success = await presenter.disconnectAccount(id);
        if (success) {
          setAccounts(prev => prev.filter(a => a.id !== id));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to disconnect account');
      }
    }
  };

  return [
    { accounts: filteredAccounts, loading, error, searchQuery, isRefreshing },
    actions
  ];
}
