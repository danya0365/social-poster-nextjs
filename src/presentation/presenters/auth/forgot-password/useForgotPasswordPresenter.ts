'use client';

import { useMemo, useState } from 'react';
import { ForgotPasswordPresenter } from './ForgotPasswordPresenter';
import { createClientForgotPasswordPresenter } from './ForgotPasswordPresenterClientFactory';

export interface ForgotPasswordPresenterState {
  loading: boolean;
  error: string | null;
  email: string;
  sent: boolean;
}

export interface ForgotPasswordPresenterActions {
  setEmail: (email: string) => void;
  forgotPassword: () => Promise<void>;
  setError: (error: string | null) => void;
  setSent: (sent: boolean) => void;
}

export function useForgotPasswordPresenter(
  presenterOverride?: ForgotPasswordPresenter
): [ForgotPasswordPresenterState, ForgotPasswordPresenterActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientForgotPasswordPresenter(),
    [presenterOverride]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const actions: ForgotPasswordPresenterActions = {
    setEmail,
    setError,
    setSent,
    forgotPassword: async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await presenter.forgotPassword(email);
        if (result.success) {
          setSent(true);
        } else {
          setError(result.error || 'ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้');
        }
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    }
  };

  return [
    { email, sent, loading, error },
    actions
  ];
}
