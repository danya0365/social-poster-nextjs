'use client';

/**
 * PricingSection
 * Pricing plans from feature image
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/ui/AnimatedCard';
import { animated, useTrail } from '@react-spring/web';
import { Award, Calendar, Check, Rocket, ShoppingCart, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    id: 'weekly',
    name: '1 สัปดาห์',
    price: 399,
    originalPrice: null,
    duration: '7 วัน',
    icon: Calendar,
    features: [
      'โพสต์อัตโนมัติ 24 ชม.',
      'วนลูปโพสต์ซ้ำ',
      'ค้นหากลุ่ม AI',
      'Auto Comment',
    ],
    gradient: 'from-gray-600 to-gray-700',
    isBestValue: false,
    savings: null,
  },
  {
    id: 'monthly',
    name: '1 เดือน',
    price: 799,
    originalPrice: null,
    duration: '30 วัน',
    icon: Rocket,
    features: [
      'ทุกฟีเจอร์แพ็ค 1 สัปดาห์',
      'แชร์โพสต์เพจไปกลุ่ม',
      'จัดการหลายบัญชี',
      'รายงานสถิติ',
    ],
    gradient: 'from-blue-600 to-blue-700',
    isBestValue: false,
    savings: null,
  },
  {
    id: 'quarterly',
    name: '3 เดือน',
    price: 2000,
    originalPrice: 2397,
    duration: '90 วัน',
    icon: ShoppingCart,
    features: [
      'ทุกฟีเจอร์แพ็ค 1 เดือน',
      'ประหยัด 397 บาท',
      'Priority Support',
      'เหมาะกับแม่ค้าออนไลน์',
    ],
    gradient: 'from-purple-600 to-pink-600',
    isBestValue: false,
    savings: 397,
  },
  {
    id: 'half-year',
    name: '5 เดือน',
    price: 3500,
    originalPrice: 3995,
    duration: '150 วัน',
    icon: Award,
    features: [
      'ทุกฟีเจอร์แพ็ค 3 เดือน',
      'ประหยัด 495 บาท',
      'VIP Support',
      'เหมาะกับพ่อค้าแม่ค้าออนไลน์',
    ],
    gradient: 'from-yellow-500 to-orange-500',
    isBestValue: true,
    savings: 495,
  },
];

const targetAudiences = [
  { icon: Calendar, text: 'เลือกแพ็กได้ตามงบ' },
  { icon: Rocket, text: 'เริ่มต้นปีใหม่ งานง่ายขึ้น' },
  { icon: ShoppingCart, text: 'เหมาะกับพ่อค้าแม่ค้าออนไลน์' },
];

export function PricingSection() {
  const trail = useTrail(pricingPlans.length, {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { tension: 200, friction: 25 },
  });

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              แพ็กเกจใหม่ ต้อนรับปีใหม่ 2026
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            เลือกแพ็กเกจที่เหมาะกับคุณ
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            เริ่มปีใหม่ด้วยระบบโพสต์ขายอัตโนมัติ 24 ชม. ราคาเริ่มต้นเพียงวันละ 26 บาท
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trail.map((spring, index) => {
            const plan = pricingPlans[index];
            const Icon = plan.icon;
            return (
              <animated.div key={plan.id} style={spring} className="relative">
                {/* Best value badge */}
                {plan.isBestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                      <Award className="w-3 h-3" />
                      <span>Best Value</span>
                    </span>
                  </div>
                )}
                
                <AnimatedCard
                  variant={plan.isBestValue ? 'gradient' : 'glass'}
                  className={`h-full flex flex-col ${plan.isBestValue ? 'ring-2 ring-yellow-500/50' : ''}`}
                >
                  {/* Icon */}
                  <div className={`inline-flex self-start p-3 rounded-xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        จาก {plan.originalPrice.toLocaleString()} บาท
                      </p>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {plan.price.toLocaleString()}
                      </span>
                      <span className="ml-1 text-gray-600 dark:text-gray-400">บาท</span>
                    </div>
                    {plan.savings && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        (ประหยัด {plan.savings} บาท)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <AnimatedButton
                    variant={plan.isBestValue ? 'gradient' : 'primary'}
                    fullWidth
                  >
                    สมัครเลย
                  </AnimatedButton>
                </AnimatedCard>
              </animated.div>
            );
          })}
        </div>

        {/* Target audiences */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {targetAudiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
              >
                <Icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
