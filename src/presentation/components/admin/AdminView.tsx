'use client';

/**
 * AdminView
 * System administration panel
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { AdminViewModel } from '@/src/presentation/presenters/admin/AdminPresenter';
import { useAdminPresenter } from '@/src/presentation/presenters/admin/useAdminPresenter';
import { Activity, LayoutDashboard, RefreshCw, ShieldCheck, Users } from 'lucide-react';

interface AdminViewProps {
  initialViewModel?: AdminViewModel;
}

export function AdminView({ initialViewModel }: AdminViewProps) {
  const [state, actions] = useAdminPresenter(initialViewModel);
  const { viewModel, loading, error } = state;

  if (loading && !viewModel) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!viewModel) return null;

  const { stats, logs } = viewModel;

  const statItems = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Active Sessions', value: stats.activeSessions.toLocaleString(), icon: Activity, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'System Roles', value: stats.systemRoles.toLocaleString(), icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Reports', value: stats.reports.toLocaleString(), icon: LayoutDashboard, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
          <p className="text-gray-500 mt-2">Welcome to the system administration panel.</p>
        </div>
        <AnimatedButton variant="secondary" onClick={actions.refreshAdmin} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </AnimatedButton>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* System Status Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">System Logs</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {logs.length === 0 ? (
            <div className="p-6 text-center text-gray-400 italic">
              No logs to display currently.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.type === 'error' ? 'bg-red-500' : 
                    log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-gray-700 dark:text-gray-300">{log.message}</p>
                </div>
                <p className="text-sm text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
