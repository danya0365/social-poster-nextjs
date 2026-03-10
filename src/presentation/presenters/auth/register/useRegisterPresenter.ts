'use client';

import { useMemo, useState } from 'react';
import { RegisterPresenter } from './RegisterPresenter';
import { createClientRegisterPresenter } from './RegisterPresenterClientFactory';

export interface RegisterPresenterState {
  loading: boolean;
  error: string | null;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  agreeTerms: boolean;
  localError: string | null;
}

export interface RegisterPresenterActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setAgreeTerms: (agree: boolean) => void;
  register: () => Promise<void>;
  setError: (error: string | null) => void;
}

export function useRegisterPresenter(
  presenterOverride?: RegisterPresenter
): [RegisterPresenterState, RegisterPresenterActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientRegisterPresenter(),
    [presenterOverride]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const actions: RegisterPresenterActions = {
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setAgreeTerms,
    setError,
    register: async () => {
      setLocalError(null);
      setError(null);
      
      if (password !== confirmPassword) {
        setLocalError('รหัสผ่านไม่ตรงกัน');
        return;
      }
      
      if (password.length < 6) {
        setLocalError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        return;
      }
      
      if (!agreeTerms) {
        setLocalError('กรุณายอมรับข้อกำหนดการใช้งาน');
        return;
      }

      setLoading(true);
      try {
        const result = await presenter.register({ name, email, password });
        if (result.success) {
          window.location.href = '/dashboard';
        } else {
          setError(result.error || 'สมัครสมาชิกไม่สำเร็จ');
        }
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    }
  };

  return [
    { name, email, password, confirmPassword, showPassword, agreeTerms, loading, error, localError },
    actions
  ];
}
