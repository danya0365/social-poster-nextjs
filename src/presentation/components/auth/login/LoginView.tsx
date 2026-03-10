'use client';

/**
 * LoginView
 * UI Component for Login page
 */

import { siteConfig } from '@/src/config/site.config';
import { LoginViewModel } from '@/src/presentation/presenters/auth/login/LoginPresenter';
import { useLoginPresenter } from '@/src/presentation/presenters/auth/login/useLoginPresenter';
import { animated, useSpring } from '@react-spring/web';
import { AlertCircle, Eye, EyeOff, LogIn, User, Zap } from 'lucide-react';
import Link from 'next/link';

interface LoginViewProps {
  initialViewModel?: LoginViewModel;
}

export function LoginView({ initialViewModel }: LoginViewProps) {
  const [state, actions] = useLoginPresenter(initialViewModel);

  const formSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.login();
  };

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
            เข้าสู่ระบบ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            ยินดีต้อนรับกลับมา!
          </p>

          {/* Demo Button */}
          <button
            type="button"
            onClick={actions.loginDemo}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <User className="w-5 h-5" />
            ทดลองใช้งาน Demo Account
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                หรือ
              </span>
            </div>
          </div>

          {/* Error */}
          {state.error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {state.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    actions.setError(null);
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600 dark:text-gray-400">จดจำฉัน</span>
              </label>
              <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>

            <button
              type="submit"
              disabled={state.loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              {state.loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  เข้าสู่ระบบ
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            ยังไม่มีบัญชี?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
              สมัครสมาชิก
            </Link>
          </p>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Demo:</strong> {siteConfig.demo.email} / {siteConfig.demo.password}
          </p>
        </div>
      </animated.div>
    </div>
  );
}
