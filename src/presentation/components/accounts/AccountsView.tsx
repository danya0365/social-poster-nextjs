'use client';

/**
 * AccountsView
 * Main social accounts management page
 */

import { SocialPlatform } from '@/src/domain/types/social';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { AccountsViewModel } from '@/src/presentation/presenters/accounts/AccountsPresenter';
import { useAccountsPresenter } from '@/src/presentation/presenters/accounts/useAccountsPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { ConnectAccountModal } from './ConnectAccountModal';
import { SocialAccountCard } from './SocialAccountCard';

interface AccountsViewProps {
  initialViewModel?: AccountsViewModel;
}

export function AccountsView({ initialViewModel }: AccountsViewProps) {
  const [state, actions] = useAccountsPresenter(initialViewModel);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(state.accounts.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleRefreshAll = async () => {
    await actions.syncAll();
  };

  const handleConnect = (platform: SocialPlatform) => {
    console.log('Connect platform:', platform);
    setIsModalOpen(false);
    // In real app, would redirect to OAuth
  };

  const handleDelete = async (id: string) => {
    if (confirm('ยืนยันการยกเลิกการเชื่อมต่อบัญชีนี้?')) {
      await actions.disconnectAccount(id);
    }
  };

  // Group accounts by platform for stats
  const connectedCount = state.accounts.filter((a) => a.status === 'connected').length;
  const expiredCount = state.accounts.filter((a) => a.status === 'expired').length;

  const platforms = [
    { label: 'Facebook', platform: 'facebook', color: 'text-blue-600' },
    { label: 'Instagram', platform: 'instagram', color: 'text-pink-600' },
    { label: 'Twitter', platform: 'twitter', color: 'text-sky-500' },
  ];

  if (state.loading && state.accounts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            บัญชี Social Media
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            เชื่อมต่อ {connectedCount} บัญชี
            {expiredCount > 0 && (
              <span className="text-yellow-500"> • {expiredCount} ต้องต่ออายุ</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshAll}
            disabled={state.isRefreshing}
            className={`p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              state.isRefreshing ? 'animate-spin text-blue-600' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <AnimatedButton variant="gradient" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            เชื่อมต่อบัญชีใหม่
          </AnimatedButton>
        </div>
      </animated.div>

      {/* Search */}
      <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={state.searchQuery}
          onChange={(e) => actions.setSearchQuery(e.target.value)}
          placeholder="ค้นหาบัญชี..."
          className="ml-3 flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        {platforms.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>
              {state.accounts.filter((a) => a.platform === stat.platform).length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Accounts grid */}
      {state.accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trail.map((spring, index) => (
            <animated.div key={state.accounts[index].id} style={spring}>
              <SocialAccountCard
                account={state.accounts[index]}
                onRefresh={actions.syncAccount}
                onDisconnect={handleDelete}
              />
            </animated.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            ไม่พบบัญชี
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            ลองค้นหาใหม่หรือเชื่อมต่อบัญชีใหม่
          </p>
          <AnimatedButton variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            เชื่อมต่อบัญชีใหม่
          </AnimatedButton>
        </div>
      )}

      {/* Connect Account Modal */}
      <ConnectAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
      />
    </div>
  );
}
