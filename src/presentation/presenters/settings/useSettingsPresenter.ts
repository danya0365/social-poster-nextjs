'use client';

import { AppearanceSettings, AppSettings, NotificationSettings, UserProfile } from '@/src/application/repositories/ISettingsRepository';
import { useEffect, useMemo, useState } from 'react';
import { SettingsPresenter, SettingsViewModel } from './SettingsPresenter';
import { createClientSettingsPresenter } from './SettingsPresenterClientFactory';

export interface SettingsState {
  settings: AppSettings | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
}

export interface SettingsActions {
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateNotifications: (data: Partial<NotificationSettings>) => Promise<void>;
  updateAppearance: (data: Partial<AppearanceSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

export function useSettingsPresenter(
  initialViewModel?: SettingsViewModel,
  presenterOverride?: SettingsPresenter
): [SettingsState, SettingsActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientSettingsPresenter(),
    [presenterOverride]
  );

  const [settings, setSettings] = useState<AppSettings | null>(initialViewModel?.settings ?? null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const refreshSettings = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setSettings(data.settings);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshSettings();
    }
  }, []);

  const actions: SettingsActions = {
    updateProfile: async (data: Partial<UserProfile>) => {
      setSaving(true);
      try {
        const updated = await presenter.updateProfile(data);
        if (settings) {
          setSettings({ ...settings, profile: updated });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update profile');
      } finally {
        setSaving(false);
      }
    },
    updateNotifications: async (data: Partial<NotificationSettings>) => {
      setSaving(true);
      try {
        const updated = await presenter.updateNotifications(data);
        if (settings) {
          setSettings({ ...settings, notifications: updated });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update notifications');
      } finally {
        setSaving(false);
      }
    },
    updateAppearance: async (data: Partial<AppearanceSettings>) => {
      setSaving(true);
      try {
        const updated = await presenter.updateAppearance(data);
        if (settings) {
          setSettings({ ...settings, appearance: updated });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update appearance');
      } finally {
        setSaving(false);
      }
    },
    refreshSettings,
  };

  return [
    { settings, loading, error, saving },
    actions
  ];
}
