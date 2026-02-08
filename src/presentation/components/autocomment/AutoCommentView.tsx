'use client';

/**
 * AutoCommentView
 * Auto comment settings and templates management
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring, useTrail } from '@react-spring/web';
import {
    AlertCircle,
    Clock,
    Edit3,
    MessageCircle,
    Plus,
    Power,
    Settings,
    Sparkles,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface CommentTemplate {
  id: string;
  name: string;
  messages: string[];
  delay: number; // minutes
  isActive: boolean;
  usageCount: number;
}

const mockTemplates: CommentTemplate[] = [
  {
    id: 'tpl-1',
    name: 'ตอบลูกค้าใหม่',
    messages: [
      'ขอบคุณที่สนใจค่ะ ทักแชทมาได้เลยนะคะ 💕',
      'สนใจสินค้าไหนคะ ทักมาสอบถามได้เลยค่ะ ✨',
      'รายละเอียดสินค้าทักแชทมาได้เลยค่ะ 🛒',
    ],
    delay: 2,
    isActive: true,
    usageCount: 1245,
  },
  {
    id: 'tpl-2',
    name: 'ตอบเรื่องราคา',
    messages: [
      'ราคาตามโพสต์เลยค่ะ หรือทักแชทมาถามราคาพิเศษได้นะคะ 💰',
      'มีส่วนลดพิเศษสำหรับลูกค้าใหม่ค่ะ ทักมาเลยนะคะ 🎁',
    ],
    delay: 1,
    isActive: true,
    usageCount: 890,
  },
  {
    id: 'tpl-3',
    name: 'ตอบเรื่องจัดส่ง',
    messages: [
      'จัดส่งทุกวันค่ะ ได้รับภายใน 1-3 วันเลยนะคะ 📦',
      'ส่งฟรีทั่วไทยค่ะ สั่งวันนี้ ส่งพรุ่งนี้เลย 🚚',
    ],
    delay: 1,
    isActive: false,
    usageCount: 567,
  },
];

export function AutoCommentView() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(templates.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const toggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  const activeCount = templates.filter((t) => t.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ตอบคอมเมนต์อัตโนมัติ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {activeCount} รูปแบบใช้งานอยู่
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <AnimatedButton variant="gradient">
            <Plus className="w-4 h-4 mr-1" />
            เพิ่มรูปแบบใหม่
          </AnimatedButton>
        </div>
      </animated.div>

      {/* AI Helper Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl border border-purple-200 dark:border-purple-800/50 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              AI ช่วยเขียนข้อความ
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              ให้ AI สร้างข้อความตอบกลับที่เหมาะสมกับสินค้าและลูกค้าของคุณ
            </p>
            <button className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
              ลองใช้ AI สร้างข้อความ →
            </button>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800/50">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            ข้อควรระวัง
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            ใช้คอมเมนต์อัตโนมัติอย่างเหมาะสม หลีกเลี่ยงการ spam เพื่อไม่ให้บัญชีถูกระงับ
          </p>
        </div>
      </div>

      {/* Templates list */}
      <div className="space-y-4">
        {trail.map((spring, index) => {
          const template = templates[index];

          return (
            <animated.div
              key={template.id}
              style={spring}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4"
            >
              {/* Template header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${template.isActive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <MessageCircle className={`w-5 h-5 ${template.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>หน่วงเวลา {template.delay} นาที</span>
                      <span>•</span>
                      <span>ใช้แล้ว {template.usageCount.toLocaleString()} ครั้ง</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Edit3 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                  <button
                    onClick={() => toggleTemplate(template.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      template.isActive
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-2">
                {template.messages.map((message, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                  >
                    {message}
                  </div>
                ))}
              </div>
            </animated.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">2,702</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">คอมเมนต์ตอบแล้ววันนี้</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">98.5%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">อัตราความสำเร็จ</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">1.2 วิ</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">เวลาตอบเฉลี่ย</p>
        </div>
      </div>
    </div>
  );
}
