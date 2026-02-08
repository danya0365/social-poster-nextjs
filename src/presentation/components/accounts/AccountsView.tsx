'use client';

/**
 * AccountsView
 * Main social accounts management page
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { ConnectAccountModal } from './ConnectAccountModal';
import { SocialAccountCard } from './SocialAccountCard';

// Mock accounts data
const mockAccounts = [
  {
    id: 'acc-1',
    platform: 'facebook' as const,
    name: 'ร้านค้าออนไลน์ 24HR',
    username: 'shop24hr',
    status: 'connected' as const,
    followers: 15420,
    posts: 342,
    lastSync: '2026-02-08T15:30:00.000Z',
  },
  {
    id: 'acc-2',
    platform: 'instagram' as const,
    name: 'Shop24HR Official',
    username: 'shop24hr_official',
    status: 'connected' as const,
    followers: 8930,
    posts: 156,
    lastSync: '2026-02-08T16:00:00.000Z',
  },
  {
    id: 'acc-3',
    platform: 'twitter' as const,
    name: 'Shop 24HR',
    username: 'shop24hr',
    status: 'expired' as const,
    followers: 2340,
    posts: 89,
    lastSync: '2026-02-05T10:00:00.000Z',
  },
  {
    id: 'acc-4',
    platform: 'facebook' as const,
    name: 'กลุ่มขายของมือสอง',
    username: 'secondhand.group',
    status: 'connected' as const,
    followers: 45200,
    posts: 567,
    lastSync: '2026-02-08T14:00:00.000Z',
  },
];

export function AccountsView() {
  const [accounts] = useState(mockAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const filteredAccounts = accounts.filter((acc) =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trail = useTrail(filteredAccounts.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleConnect = (platform: 'facebook' | 'instagram' | 'twitter') => {
    console.log('Connect platform:', platform);
    setIsModalOpen(false);
    // In real app, would redirect to OAuth
  };

  // Group accounts by platform
  const connectedCount = accounts.filter((a) => a.status === 'connected').length;
  const expiredCount = accounts.filter((a) => a.status === 'expired').length;

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
            disabled={isRefreshing}
            className={`p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาบัญชี..."
          className="ml-3 flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Facebook', count: accounts.filter((a) => a.platform === 'facebook').length, color: 'text-blue-600' },
          { label: 'Instagram', count: accounts.filter((a) => a.platform === 'instagram').length, color: 'text-pink-600' },
          { label: 'Twitter', count: accounts.filter((a) => a.platform === 'twitter').length, color: 'text-sky-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Accounts grid */}
      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trail.map((spring, index) => (
            <animated.div key={filteredAccounts[index].id} style={spring}>
              <SocialAccountCard
                account={filteredAccounts[index]}
                onRefresh={(id) => console.log('Refresh:', id)}
                onDisconnect={(id) => console.log('Disconnect:', id)}
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
