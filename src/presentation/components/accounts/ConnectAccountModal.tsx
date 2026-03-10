'use client';

/**
 * ConnectAccountModal
 * Modal for connecting new social media accounts
 */

import { SocialPlatform } from '@/src/domain/types/social';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import { ArrowRight, Facebook, Instagram, Shield, Twitter, X } from 'lucide-react';
import { useState } from 'react';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (platform: SocialPlatform) => void;
}

const platforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'เชื่อมต่อเพจและโปรไฟล์ Facebook',
    icon: Facebook,
    color: 'bg-blue-600 hover:bg-blue-700',
    lightBg: 'bg-blue-50 dark:bg-blue-900/20',
    features: ['โพสต์อัตโนมัติ', 'ดูสถิติ', 'จัดการคอมเมนต์'],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'เชื่อมต่อบัญชี Instagram Business',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
    lightBg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20',
    features: ['โพสต์รูป/วิดีโอ', 'Stories', 'Reels'],
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    description: 'เชื่อมต่อบัญชี Twitter',
    icon: Twitter,
    color: 'bg-sky-500 hover:bg-sky-600',
    lightBg: 'bg-sky-50 dark:bg-sky-900/20',
    features: ['ทวีตอัตโนมัติ', 'ดู Analytics', 'Retweets'],
  },
] as const;

export function ConnectAccountModal({ isOpen, onClose, onConnect }: ConnectAccountModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    scale: isOpen ? 1 : 0.95,
    y: isOpen ? 0 : 20,
    config: { tension: 300, friction: 25 },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <animated.div
        style={backdropSpring}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <animated.div
        style={{
          opacity: modalSpring.opacity,
          transform: modalSpring.scale.to(
            (s) => `scale(${s}) translateY(${modalSpring.y.get()}px)`
          ),
        }}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            เชื่อมต่อบัญชี Social
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatform === platform.id;

            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`
                  w-full p-4 rounded-xl text-left transition-all border-2
                  ${isSelected
                    ? 'border-blue-500 ' + platform.lightBg
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${platform.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {platform.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {isSelected && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {platform.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-xs text-gray-700 dark:text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Security notice */}
        <div className="mx-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              ปลอดภัย 100%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              เราใช้ OAuth 2.0 และไม่เก็บรหัสผ่านของคุณ
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-4">
          <AnimatedButton
            variant="gradient"
            fullWidth
            onClick={() => selectedPlatform && onConnect(selectedPlatform as SocialPlatform)}
            disabled={!selectedPlatform}
          >
            เชื่อมต่อบัญชี
            <ArrowRight className="w-4 h-4 ml-1" />
          </AnimatedButton>
        </div>
      </animated.div>
    </div>
  );
}
