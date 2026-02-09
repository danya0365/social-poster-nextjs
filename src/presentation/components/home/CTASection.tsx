'use client';

/**
 * CTASection
 * Call-to-action section at the bottom of home page
 */

import { siteConfig } from '@/src/config/site.config';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export function CTASection() {
  const containerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 150, friction: 20 },
  });

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-bounce" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <animated.div 
        style={containerSpring}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-medium text-white">
            สนใจใช้งาน หรือสอบถามเพิ่มเติม
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          พร้อมเพิ่มยอดขายด้วย
          <br />
          <span className="text-yellow-300">{siteConfig.name}</span> แล้วหรือยัง?
        </h2>

        {/* Description */}
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          เริ่มต้นใช้งานวันนี้ ให้ AI ช่วยโพสต์ขายของให้คุณ 24 ชั่วโมง
          ไม่ต้องนั่งโพสต์เอง ประหยัดเวลา เพิ่มยอดขาย
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedButton
            variant="secondary"
            size="lg"
            className="bg-white hover:bg-gray-100 text-gray-900 shadow-xl"
          >
            <span>สมัครเลยที่นี่</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </AnimatedButton>

          <AnimatedButton
            variant="ghost"
            size="lg"
            className="text-white border-2 border-white/30 hover:bg-white/10"
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            <span>พิมพ์ทิ้งไว้ได้เลยค่ะ</span>
          </AnimatedButton>
        </div>

        {/* Trust text */}
        <p className="text-sm text-white/60 mt-8">
          👆 สนใจใช้งาน หรือสอบถามเพิ่มเติม พิมพ์ทิ้งไว้ได้เลยค่ะ
        </p>
      </animated.div>
    </section>
  );
}
