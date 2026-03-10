'use client';

/**
 * PricingView
 * Pricing plans page
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { PricingViewModel } from '@/src/presentation/presenters/pricing/PricingPresenter';
import { usePricingPresenter } from '@/src/presentation/presenters/pricing/usePricingPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import {
    ArrowRight,
    BarChart3,
    Calendar,
    Check,
    Crown,
    MessageCircle,
    Sparkles,
    Star,
    Users,
    Zap,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Zap,
  Crown,
  Sparkles,
};

const allFeatures = [
  { name: 'โพสต์อัตโนมัติ 24 ชม.', icon: Calendar },
  { name: 'เชื่อมต่อหลายบัญชี', icon: Users },
  { name: 'ตอบคอมเมนต์อัตโนมัติ', icon: MessageCircle },
  { name: 'AI ค้นหากลุ่ม', icon: Sparkles },
  { name: 'รายงานและสถิติ', icon: BarChart3 },
];

interface PricingViewProps {
  initialViewModel?: PricingViewModel;
}

export function PricingView({ initialViewModel }: PricingViewProps) {
  const [state, actions] = usePricingPresenter(initialViewModel);
  const { plans, faqs, loading, error, selectedPlanId } = state;

  const headerSpring = useSpring({
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(plans.length, {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  if (loading && plans.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <animated.div style={headerSpring} className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          เลือกแพ็กเกจที่เหมาะกับคุณ
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          เริ่มต้นปีใหม่ด้วยระบบโพสต์ขายอัตโนมัติ 24 ชม. ไม่ต้องนั่งกดโพสต์เอง!
        </p>
      </animated.div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Features highlight */}
      <div className="flex flex-wrap justify-center gap-4">
        {allFeatures.map((feature) => (
          <div
            key={feature.name}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800"
          >
            <feature.icon className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{feature.name}</span>
          </div>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trail.map((spring, index) => {
          const plan = plans[index];
          const Icon = iconMap[plan.iconName] || Zap;
          const isSelected = selectedPlanId === plan.id;

          return (
            <animated.div
              key={plan.id}
              style={spring}
              onClick={() => actions.selectPlan(plan.id)}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {/* Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                  ยอดนิยม
                </div>
              )}
              {plan.isBestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> คุ้มที่สุด
                </div>
              )}

              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.gradient} text-white mb-4`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Plan name */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {plan.duration}
              </p>

              {/* Price */}
              <div className="mb-4">
                {plan.savings && plan.savings > 0 && (
                  <p className="text-sm text-gray-400 line-through">
                    ฿{plan.originalPrice.toLocaleString()}
                  </p>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ฿{plan.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  เฉลี่ยวันละ {plan.pricePerDay} บาท
                </p>
                {plan.savings && plan.savings > 0 && (
                  <p className="text-sm text-green-500 font-medium mt-1">
                    ประหยัด ฿{plan.savings}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <AnimatedButton
                variant={isSelected ? 'gradient' : 'secondary'}
                fullWidth
              >
                {isSelected ? 'เลือกแพ็กเกจนี้' : 'ดูรายละเอียด'}
              </AnimatedButton>
            </animated.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center">
        <AnimatedButton variant="gradient" className="px-8">
          สมัครเลยที่นี่
          <ArrowRight className="w-4 h-4 ml-2" />
        </AnimatedButton>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          ✅ ใช้ระบบ API แท้ 100% ปลอดภัยสูงสุด • ไม่ใช่บอทกดจอ
        </p>
      </div>

      {/* FAQ */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          คำถามที่พบบ่อย
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="font-medium text-gray-900 dark:text-white mb-1">{faq.q}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
