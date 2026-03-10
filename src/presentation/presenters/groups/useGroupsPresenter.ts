'use client';

import { SocialGroup } from '@/src/application/repositories/IGroupRepository';
import { useEffect, useMemo, useState } from 'react';
import { GroupsPresenter, GroupsViewModel } from './GroupsPresenter';
import { createClientGroupsPresenter } from './GroupsPresenterClientFactory';

export interface GroupsState {
  groups: SocialGroup[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface GroupsActions {
  setSearchQuery: (query: string) => void;
  toggleAutoPost: (id: string, currentStatus: boolean) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  refreshGroups: () => Promise<void>;
}

export function useGroupsPresenter(
  initialViewModel?: GroupsViewModel,
  presenterOverride?: GroupsPresenter
): [GroupsState, GroupsActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientGroupsPresenter(),
    [presenterOverride]
  );

  const [groups, setGroups] = useState<SocialGroup[]>(initialViewModel?.groups ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const refreshGroups = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setGroups(data.groups);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshGroups();
    }
  }, []);

  const filteredGroups = useMemo(() => {
    return groups.filter(grp => 
      grp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groups, searchQuery]);

  const actions: GroupsActions = {
    setSearchQuery,
    toggleAutoPost: async (id: string, currentStatus: boolean) => {
      try {
        const updated = await presenter.toggleAutoPost(id, currentStatus);
        setGroups(prev => prev.map(g => g.id === id ? updated : g));
      } catch (err: any) {
        setError(err.message || 'Failed to toggle auto post');
      }
    },
    deleteGroup: async (id: string) => {
      try {
        const success = await presenter.deleteGroup(id);
        if (success) {
          setGroups(prev => prev.filter(g => g.id !== id));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to delete group');
      }
    },
    refreshGroups,
  };

  return [
    { groups: filteredGroups, loading, error, searchQuery },
    actions
  ];
}
