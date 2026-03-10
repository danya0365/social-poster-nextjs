'use client';

/**
 * RegisterView
 * UI Component for Register page
 */

import { siteConfig } from '@/src/config/site.config';
import { useRegisterPresenter } from '@/src/presentation/presenters/auth/register/useRegisterPresenter';
import { animated, useSpring } from '@react-spring/web';
import { AlertCircle, Check, Eye, EyeOff, UserPlus, Zap } from 'lucide-react';
import Link from 'next/link';

export function RegisterView() {
  const [state, actions] = useRegisterPresenter();

  const formSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  });

  const passwordStrength = () => {
    if (state.password.length < 6) return { level: 0, text: 'อ่อนมาก', color: 'bg-red-500' };
    if (state.password.length < 8) return { level: 1, text: 'อ่อน', color: 'bg-orange-500' };
    if (state.password.match(/[A-Z]/) && state.password.match(/[0-9]/)) {
      return { level: 3, text: 'แข็งแรง', color: 'bg-green-500' };
    }
    return { level: 2, text: 'ปานกลาง', color: 'bg-yellow-500' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.register();
  };

  const strength = passwordStrength();
  const displayError = state.localError || state.error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <animated.div style={formSpring} className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            สมัครสมาชิก
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            สร้างบัญชีฟรีวันนี้
          </p>

          {/* Error */}
          {displayError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ชื่อ
              </label>
              <input
                type="text"
                value={state.name}
                onChange={(e) => actions.setName(e.target.value)}
                placeholder="ชื่อของคุณ"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                อีเมล
              </label>
              <input
                type="email"
                value={state.email}
                onChange={(e) => {
                  actions.setEmail(e.target.value);
                  actions.setError(null);
                }}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={(e) => {
                    actions.setPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => actions.setShowPassword(!state.showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {state.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {state.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${i <= strength.level ? strength.color : 'bg-gray-200 dark:bg-gray-700'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{strength.text}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.confirmPassword}
                  onChange={(e) => {
                    actions.setConfirmPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
                {state.confirmPassword && state.password === state.confirmPassword && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={state.agreeTerms}
                onChange={(e) => actions.setAgreeTerms(e.target.checked)}
                className="rounded border-gray-300 mt-1"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ฉันยอมรับ{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  ข้อกำหนดการใช้งาน
                </Link>{' '}
                และ{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={state.loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              {state.loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  สมัครสมาชิก
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            มีบัญชีอยู่แล้ว?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </animated.div>
    </div>
  );
}
