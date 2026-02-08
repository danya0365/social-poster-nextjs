'use client';

/**
 * NotificationCenter
 * Notification dropdown/modal
 */

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
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'โพสต์สำเร็จ',
    message: 'โพสต์ "โปรโมชั่นพิเศษ! ลด 50%" ถูกเผยแพร่ไปยัง 3 กลุ่มแล้ว',
    time: '2 นาทีที่แล้ว',
    isRead: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'โพสต์สำเร็จ',
    message: 'โพสต์ "สินค้าใหม่เข้าแล้ว!" ถูกเผยแพร่เรียบร้อย',
    time: '15 นาทีที่แล้ว',
    isRead: false,
  },
  {
    id: '3',
    type: 'error',
    title: 'Token หมดอายุ',
    message: 'บัญชี Instagram @shop_fashion ต้องเชื่อมต่อใหม่',
    time: '1 ชั่วโมงที่แล้ว',
    isRead: false,
  },
  {
    id: '4',
    type: 'warning',
    title: 'โพสต์ตามกำหนดการ',
    message: 'มีโพสต์ที่กำหนดไว้ในอีก 15 นาที',
    time: '2 ชั่วโมงที่แล้ว',
    isRead: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'รายงานประจำสัปดาห์',
    message: 'Engagement เพิ่มขึ้น 23.5% จากสัปดาห์ก่อน',
    time: 'เมื่อวาน',
    isRead: true,
  },
];

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

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const filteredNotifications = notifications.filter(
    (n) => filter === 'all' || !n.isRead
  );

  const trail = useTrail(filteredNotifications.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { tension: 200, friction: 20 },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

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
            onClick={markAllAsRead}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="อ่านทั้งหมด"
          >
            <CheckCheck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={clearAll}
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
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          ทั้งหมด ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          ยังไม่ได้อ่าน ({unreadCount})
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Bell className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              ไม่มีการแจ้งเตือน
            </p>
          </div>
        ) : (
          trail.map((spring, index) => {
            const notification = filteredNotifications[index];
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
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="อ่านแล้ว"
                          >
                            <Check className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
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
