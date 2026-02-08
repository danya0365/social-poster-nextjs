'use client';

/**
 * Forgot Password Page
 */

import { useAuthStore } from '@/src/stores/authStore';
import { animated, useSpring } from '@react-spring/web';
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const formSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await resetPassword(email);
    if (success) {
      setSent(true);
    }
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
              POSTDEE
            </span>
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
          {sent ? (
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ส่งอีเมลแล้ว!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                เราได้ส่งลิงค์สำหรับรีเซ็ตรหัสผ่านไปยัง<br />
                <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                กรุณาตรวจสอบกล่องจดหมายและ Spam
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                ลืมรหัสผ่าน?
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                กรอกอีเมลของคุณ เราจะส่งลิงค์สำหรับรีเซ็ตรหัสผ่าน
              </p>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      ส่งลิงค์รีเซ็ตรหัสผ่าน
                    </>
                  )}
                </button>
              </form>

              <Link
                href="/auth/login"
                className="mt-6 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4" />
                กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </>
          )}
        </div>
      </animated.div>
    </div>
  );
}
