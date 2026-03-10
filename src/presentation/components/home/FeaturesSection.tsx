'use client';

/**
 * FeaturesSection
 * Showcasing key features with animated cards
 */

import { AnimatedCard } from '@/src/presentation/components/ui/AnimatedCard';
import { animated, useTrail } from '@react-spring/web';
import {
    BarChart,
    Clock,
    LucideIcon,
    MessageSquare,
    RefreshCw,
    Search,
    Share2,
    Shield,
    Users,
    Zap
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Clock,
  RefreshCw,
  Search,
  MessageSquare,
  Users,
  Share2,
  Zap,
  Shield,
  BarChart,
};

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface FeaturesSectionProps {
  features?: FeatureItem[];
}

const features = [
  {
    icon: Clock,
    title: 'โพสต์อัตโนมัติ 24 ชม.',
    description: 'ระบบโพสต์ขายของอัตโนมัติตลอด 24 ชั่วโมง ไม่ต้องคอยนั่งโพสต์เอง',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    icon: RefreshCw,
    title: 'วนลูปโพสต์ซ้ำ',
    description: 'วนลูปโพสต์ซ้ำอัตโนมัติ ไม่ต้องคอยกดโพสต์เอง ประหยัดเวลา',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-500/10 to-purple-600/5',
  },
  {
    icon: Search,
    title: 'ค้นหากลุ่มลูกค้าด้วย AI',
    description: 'ระบบ AI ช่วยค้นหากลุ่มเป้าหมายที่เหมาะกับสินค้าของคุณ',
    gradient: 'from-pink-500 to-pink-600',
    bgGradient: 'from-pink-500/10 to-pink-600/5',
  },
  {
    icon: MessageSquare,
    title: 'Auto Comment',
    description: 'คอมเมนต์ดันโพสต์อัตโนมัติ ให้ลูกค้าเห็นโพสต์ตลอด',
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-500/10 to-orange-600/5',
  },
  {
    icon: Users,
    title: 'ดูแลครบวงจร ทั้งกลุ่ม',
    description: 'จัดการหลายบัญชี หลายกลุ่มในระบบเดียว สะดวกง่าย',
    gradient: 'from-teal-500 to-teal-600',
    bgGradient: 'from-teal-500/10 to-teal-600/5',
  },
  {
    icon: Share2,
    title: 'แชร์โพสต์เพจไปกลุ่ม',
    description: 'แชร์โพสต์จากเพจไปยังกลุ่มต่างๆ ได้อัตโนมัติ',
    gradient: 'from-indigo-500 to-indigo-600',
    bgGradient: 'from-indigo-500/10 to-indigo-600/5',
  },
];

const stats = [
  { value: '24', unit: 'ชม.', label: 'โพสต์อัตโนมัติ' },
  { value: '100', unit: '%', label: 'API แท้ ปลอดภัย' },
  { value: '26', unit: '฿/วัน', label: 'ราคาเริ่มต้น' },
];

export function FeaturesSection({ features: initialFeatures }: FeaturesSectionProps) {
  const displayFeatures = initialFeatures?.map(f => ({
    ...f,
    icon: iconMap[f.iconName] || Zap,
    gradient: 'from-blue-500 to-blue-600', // Default gradients for now
    bgGradient: 'from-blue-500/10 to-blue-600/5',
  })) || features;

  const trail = useTrail(displayFeatures.length, {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section id="features" className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            ฟีเจอร์เด่น
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ทำอะไรได้บ้าง?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ระบบผู้ช่วยโพสต์อัจฉริยะ เปลี่ยนงานโพสต์แสนเหนื่อย ให้เป็นเรื่องง่ายในพริบตา
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400 ml-1">
                  {stat.unit}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trail.map((spring, index) => {
            const feature = displayFeatures[index];
            const Icon = feature.icon;
            return (
              <animated.div key={index} style={spring}>
                <AnimatedCard variant="glass" className="h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.bgGradient || 'from-blue-500/10 to-blue-600/5'} mb-4`}>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient || 'from-blue-500 to-blue-600'}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </AnimatedCard>
              </animated.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            จุดเด่นที่ลูกค้าวางใจ
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">ใช้ API แท้ 100%</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">ไม่ใช่บอทกดจอ</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <BarChart className="w-4 h-4" />
              <span className="text-sm font-medium">ปลอดภัยสูงสุด</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
