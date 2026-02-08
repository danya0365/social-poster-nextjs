'use client';

/**
 * AIContentGenerator
 * AI-powered content generation for posts
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import {
    Check,
    Copy,
    Heart,
    Lightbulb,
    Megaphone,
    MessageSquare,
    RefreshCw,
    ShoppingBag,
    Sparkles,
    Target,
    Wand2,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

interface AIContentGeneratorProps {
  onContentGenerated?: (content: string) => void;
  initialPrompt?: string;
}

type ContentType = 'product' | 'promotion' | 'engagement' | 'announcement';
type ContentTone = 'professional' | 'friendly' | 'exciting' | 'casual';

const contentTypes = [
  { id: 'product', label: 'ขายสินค้า', icon: ShoppingBag },
  { id: 'promotion', label: 'โปรโมชั่น', icon: Megaphone },
  { id: 'engagement', label: 'สร้าง Engagement', icon: Heart },
  { id: 'announcement', label: 'ประกาศ/ข่าวสาร', icon: MessageSquare },
] as const;

const toneOptions = [
  { id: 'professional', label: 'มืออาชีพ' },
  { id: 'friendly', label: 'เป็นกันเอง' },
  { id: 'exciting', label: 'ตื่นเต้น/สนุก' },
  { id: 'casual', label: 'สบายๆ' },
] as const;

// Mock AI responses
const mockResponses: Record<ContentType, string[]> = {
  product: [
    '🎉 สินค้าใหม่เข้าแล้ว! \n\n✨ คุณภาพเกินราคา ของดีต้องบอกต่อ!\n\n💯 รับประกันคุณภาพ 100%\n📦 ส่งฟรีทั่วประเทศ\n\n🔥 สั่งซื้อวันนี้ รับส่วนลดพิเศษ!\n\n#สินค้าใหม่ #ของดี #ส่งฟรี',
    '🌟 มาแล้ว! สินค้าที่ทุกคนรอคอย\n\n👉 คุณภาพพรีเมียม ราคาสุดคุ้ม\n👉 ใช้วัสดุชั้นดี ทนทาน\n👉 การันตีความพอใจ\n\n📞 สอบถามเพิ่มเติมได้เลยค่ะ\n\n#ขายดี #สินค้าแนะนำ',
  ],
  promotion: [
    '🔥 โปรแรง! ลดสูงสุด 50%\n\n⏰ เฉพาะวันนี้ - สิ้นเดือนนี้เท่านั้น!\n\n✅ ซื้อ 1 แถม 1\n✅ ส่งฟรีไม่มีขั้นต่ำ\n✅ ผ่อน 0% นาน 10 เดือน\n\n💥 รีบเลย! ของมีจำนวนจำกัด\n\n#โปรโมชั่น #ลดราคา #Sale',
    '🎁 โปรพิเศษสำหรับลูกค้าใหม่!\n\n💰 รับส่วนลดทันที 20%\n📦 ส่งฟรีทุกออเดอร์\n🎉 พร้อมของแถมสุดพิเศษ\n\n⚡ ใช้โค้ด: NEWBIE20\n\n#ลูกค้าใหม่ #โปรพิเศษ',
  ],
  engagement: [
    '🤔 ถามจริง...\n\nช่วงนี้ทุกคนกำลังสนใจอะไรกันอยู่คะ?\n\nคอมเมนต์บอกกันหน่อยนะ 👇\n\nอยากรู้จักทุกคนมากขึ้น! 💕\n\n#ถามตอบ #พูดคุย',
    '📢 มาเล่นกันหน่อย!\n\nบอกมา 1 อย่าง ที่ทำให้คุณ happy วันนี้? 🌈\n\nเริ่มก่อนเลย: เช้านี้กาแฟหอมมาก ☕\n\n#ShareHappiness #วันนี้ทำอะไร',
  ],
  announcement: [
    '📢 ประกาศสำคัญ!\n\n🔔 แจ้งให้ทราบ:\n\n• ร้านของเราได้ปรับปรุงบริการใหม่\n• เพิ่มช่องทางการชำระเงิน\n• ขยายเวลาส่งสินค้าเร็วขึ้น\n\nขอบคุณที่ไว้วางใจครับ/ค่ะ 🙏\n\n#ประกาศ #ข่าวสาร',
    '✨ ข่าวดี! เปิดบริการใหม่\n\n🎉 พร้อมให้บริการแล้ววันนี้!\n\n📍 สถานที่: [ระบุ]\n⏰ เวลา: 09:00 - 21:00\n📞 ติดต่อ: [เบอร์โทร]\n\nแวะมาเยี่ยมชมได้นะคะ 💖\n\n#เปิดร้านใหม่ #Welcome',
  ],
};

export function AIContentGenerator({
  onContentGenerated,
  initialPrompt = '',
}: AIContentGeneratorProps) {
  const [contentType, setContentType] = useState<ContentType>('product');
  const [tone, setTone] = useState<ContentTone>('friendly');
  const [productInfo, setProductInfo] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise((r) => setTimeout(r, 1500));
    
    // Get random response based on content type
    const responses = mockResponses[contentType];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setGeneratedContent(randomResponse);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useContent = () => {
    onContentGenerated?.(generatedContent);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <animated.div
        style={headerSpring}
        className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI ช่วยเขียนโพสต์</h3>
            <p className="text-sm text-white/80">
              สร้างข้อความขายสินค้าอัตโนมัติ
            </p>
          </div>
        </div>
      </animated.div>

      <div className="p-4 space-y-4">
        {/* Content type selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ประเภทเนื้อหา
          </label>
          <div className="grid grid-cols-2 gap-2">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = contentType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected
                        ? 'text-purple-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isSelected
                        ? 'text-purple-700 dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            โทนการเขียน
          </label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setTone(option.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  tone === option.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product info input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Target className="w-4 h-4 inline mr-1" />
            ข้อมูลสินค้า/บริการ (ถ้ามี)
          </label>
          <textarea
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            placeholder="เช่น: เสื้อยืด cotton 100% ราคา 299 บาท ลด 20% ส่งฟรี..."
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          />
        </div>

        {/* Generate button */}
        <AnimatedButton
          onClick={generateContent}
          disabled={isGenerating}
          variant="gradient"
          fullWidth
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              กำลังสร้าง...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              สร้างข้อความ
            </>
          )}
        </AnimatedButton>

        {/* Generated content */}
        {generatedContent && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans">
                {generatedContent}
              </pre>
            </div>

            <div className="flex gap-2">
              <AnimatedButton
                onClick={copyToClipboard}
                variant="secondary"
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    คัดลอกแล้ว!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    คัดลอก
                  </>
                )}
              </AnimatedButton>
              <AnimatedButton
                onClick={useContent}
                variant="gradient"
                className="flex-1"
              >
                <Zap className="w-4 h-4 mr-1" />
                ใช้ข้อความนี้
              </AnimatedButton>
            </div>

            <button
              onClick={generateContent}
              className="w-full text-center text-sm text-purple-600 hover:underline"
            >
              <RefreshCw className="w-4 h-4 inline mr-1" />
              สร้างใหม่
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
            <div className="text-sm text-yellow-700 dark:text-yellow-300">
              <p className="font-medium">เคล็ดลับ</p>
              <p>ใส่รายละเอียดสินค้ามากขึ้น จะได้ข้อความที่ตรงใจมากขึ้น!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
