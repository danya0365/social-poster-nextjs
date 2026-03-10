'use client';

/**
 * NotificationCenter
 * Notification dropdown/modal
 */

import { NotificationsViewModel } from '@/src/presentation/presenters/notifications/NotificationsPresenter';
import { useNotificationsPresenter } from '@/src/presentation/presenters/notifications/useNotificationsPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import {
    AlertTriangle,
    Bell,
    Check,
    CheckCheck,
    Clock,
    Info,
    Trash2,
    X
} from 'lucide-react';

interface NotificationCenterProps {
  initialViewModel?: NotificationsViewModel;
}

const typeConfig = {
  success: {
    icon: Check,
    bg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600',
  },
  error: {
    icon: AlertTriangle,
    bg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600',
  },
  warning: {
    icon: Clock,
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600',
  },
};

export function NotificationCenter({ initialViewModel }: NotificationCenterProps) {
  const [state, actions] = useNotificationsPresenter(initialViewModel);
  const { notifications, loading, error, filter } = state;

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(notifications.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { tension: 200, friction: 20 },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            การแจ้งเตือน
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} รายการยังไม่ได้อ่าน` : 'ไม่มีการแจ้งเตือนใหม่'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={actions.markAllAsRead}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="อ่านทั้งหมด"
          >
            <CheckCheck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={actions.clearAll}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="ลบทั้งหมด"
          >
            <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </animated.div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => actions.setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => actions.setFilter('unread')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          ยังไม่ได้อ่าน
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* Notifications list */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Bell className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              ไม่มีการแจ้งเตือน
            </p>
          </div>
        ) : (
          trail.map((spring, index) => {
            const notification = notifications[index];
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <animated.div
                key={notification.id}
                style={spring}
                className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-xl ${config.bg}`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-medium ${
                          notification.isRead
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {!notification.isRead && (
                          <button
                            onClick={() => actions.markAsRead(notification.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="อ่านแล้ว"
                          >
                            <Check className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                        <button
                          onClick={() => actions.deleteNotification(notification.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="ลบ"
                        >
                          <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </animated.div>
            );
          })
        )}
      </div>
    </div>
  );
}
