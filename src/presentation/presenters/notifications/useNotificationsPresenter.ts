'use client';

import { Notification } from '@/src/application/repositories/INotificationRepository';
import { useEffect, useMemo, useState } from 'react';
import { NotificationsPresenter, NotificationsViewModel } from './NotificationsPresenter';
import { createClientNotificationsPresenter } from './NotificationsPresenterClientFactory';

export interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'unread';
}

export interface NotificationsActions {
  setFilter: (filter: 'all' | 'unread') => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

export function useNotificationsPresenter(
  initialViewModel?: NotificationsViewModel,
  presenterOverride?: NotificationsPresenter
): [NotificationsState, NotificationsActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientNotificationsPresenter(),
    [presenterOverride]
  );

  const [notifications, setNotifications] = useState<Notification[]>(initialViewModel?.notifications ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const refreshNotifications = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setNotifications(data.notifications);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshNotifications();
    }
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => filter === 'all' || !n.isRead);
  }, [notifications, filter]);

  const actions: NotificationsActions = {
    setFilter,
    markAsRead: async (id: string) => {
      const success = await presenter.markAsRead(id);
      if (success) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      }
    },
    markAllAsRead: async () => {
      const success = await presenter.markAllAsRead();
      if (success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      }
    },
    deleteNotification: async (id: string) => {
      const success = await presenter.deleteNotification(id);
      if (success) {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }
    },
    clearAll: async () => {
      const success = await presenter.clearAll();
      if (success) {
        setNotifications([]);
      }
    },
    refreshNotifications,
  };

  return [
    { notifications: filteredNotifications, loading, error, filter },
    actions
  ];
}
