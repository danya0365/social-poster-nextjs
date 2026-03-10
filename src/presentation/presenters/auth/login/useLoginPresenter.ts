'use client';

import { useMemo, useState } from 'react';
import { LoginPresenter, LoginViewModel } from './LoginPresenter';
import { createClientLoginPresenter } from './LoginPresenterClientFactory';

export interface LoginPresenterState {
  viewModel: LoginViewModel | null;
  loading: boolean;
  error: string | null;
  email: string;
  password: string;
  showPassword: boolean;
}

export interface LoginPresenterActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  login: () => Promise<void>;
  loginDemo: () => Promise<void>;
  setError: (error: string | null) => void;
}

export function useLoginPresenter(
  initialViewModel?: LoginViewModel,
  presenterOverride?: LoginPresenter
): [LoginPresenterState, LoginPresenterActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientLoginPresenter(),
    [presenterOverride]
  );

  const [viewModel, setViewModel] = useState<LoginViewModel | null>(initialViewModel ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const actions: LoginPresenterActions = {
    setEmail,
    setPassword,
    setShowPassword,
    setError,
    login: async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await presenter.login({ email, password });
        if (result.success) {
          window.location.href = '/dashboard';
        } else {
          setError(result.error || 'เข้าสู่ระบบไม่สำเร็จ');
        }
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    },
    loginDemo: async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await presenter.login({ 
          email: 'test@example.com', 
          password: 'password123' 
        });
        if (result.success) {
          window.location.href = '/dashboard';
        } else {
          setError(result.error || 'เข้าสู่ระบบ Demo ไม่สำเร็จ');
        }
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    }
  };

  return [
    { viewModel, loading, error, email, password, showPassword },
    actions
  ];
}
