'use client';

/**
 * HeroSection
 * Main hero section with animated gradient background and dashboard preview
 */

import { siteConfig } from '@/src/config/site.config';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { ArrowRight, Clock, Play, Sparkles, TrendingUp, Users } from 'lucide-react';

const features = [
  { icon: Clock, text: 'โพสต์อัตโนมัติ 24 ชม.' },
  { icon: Users, text: 'ค้นหากลุ่มลูกค้าด้วย AI' },
  { icon: TrendingUp, text: 'เพิ่ม Engagement' },
];

export function HeroSection() {
  const titleSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 150, friction: 20 },
  });

  const subtitleSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 150,
    config: { tension: 150, friction: 20 },
  });

  const ctaSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: { tension: 150, friction: 20 },
  });

  const featureTrail = useTrail(features.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: 450,
    config: { tension: 200, friction: 20 },
  });

  const dashboardSpring = useSpring({
    from: { opacity: 0, scale: 0.9, y: 60 },
    to: { opacity: 1, scale: 1, y: 0 },
    delay: 600,
    config: { tension: 120, friction: 25 },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <animated.div style={titleSpring} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              AI Auto Posting System
            </span>
          </animated.div>

          {/* Title */}
          <animated.h1
            style={titleSpring}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-gray-900 dark:text-white">โพสต์ขายของ</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              อัตโนมัติ 24 ชม.
            </span>
          </animated.h1>

          {/* Subtitle */}
          <animated.p
            style={subtitleSpring}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
          >
            ระบบ AI ช่วยโพสต์ขายของอัตโนมัติ วนลูปไม่มีหยุด
            ค้นหากลุ่มลูกค้าด้วย AI และ Auto Comment ให้ร้านคุณติดอันดับ
          </animated.p>

          {/* Social platforms */}
          <animated.div
            style={subtitleSpring}
            className="flex items-center justify-center space-x-3 mb-8"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">รองรับ</span>
            <SocialIcon platform="facebook" size="sm" />
            <SocialIcon platform="instagram" size="sm" />
            <SocialIcon platform="twitter" size="sm" />
          </animated.div>

          {/* CTA Buttons */}
          <animated.div
            style={ctaSpring}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <AnimatedButton variant="gradient" size="lg">
              <span>เริ่มใช้งานฟรี</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </AnimatedButton>
            
            <AnimatedButton variant="ghost" size="lg">
              <Play className="mr-2 w-5 h-5" />
              <span>ดูวิดีโอแนะนำ</span>
            </AnimatedButton>
          </animated.div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {featureTrail.map((spring, index) => {
              const feature = features[index];
              const Icon = feature.icon;
              return (
                <animated.div
                  key={index}
                  style={spring}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature.text}
                  </span>
                </animated.div>
              );
            })}
          </div>
        </div>

        {/* Dashboard Preview */}
        <animated.div
          style={dashboardSpring}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
            
            {/* Dashboard mockup */}
            <div className="relative bg-gray-900 rounded-2xl p-1">
              {/* Browser header */}
              <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-t-xl">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-gray-700/50 text-gray-400 text-sm">
                    {siteConfig.dashboard.urlDisplay}
                  </div>
                </div>
              </div>
              
              {/* Dashboard content */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-b-xl">
                <div className="grid grid-cols-3 gap-6">
                  {/* Stats cards */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
                    <p className="text-blue-400 text-sm mb-2">โพสต์วันนี้</p>
                    <p className="text-3xl font-bold text-white">124</p>
                    <p className="text-green-400 text-sm mt-1">+12% จากเมื่อวาน</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
                    <p className="text-purple-400 text-sm mb-2">Engagement</p>
                    <p className="text-3xl font-bold text-white">16.3K</p>
                    <p className="text-green-400 text-sm mt-1">+25.5% เทียบเดือนก่อน</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-xl p-6 border border-pink-500/20">
                    <p className="text-pink-400 text-sm mb-2">กลุ่มเป้าหมาย</p>
                    <p className="text-3xl font-bold text-white">48</p>
                    <p className="text-green-400 text-sm mt-1">กลุ่มใหม่อัตโนมัติ</p>
                  </div>
                </div>
                
                {/* Chart area */}
                <div className="mt-6 h-32 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-end justify-around px-4 pb-4">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <div
                      key={i}
                      className="w-8 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
}
