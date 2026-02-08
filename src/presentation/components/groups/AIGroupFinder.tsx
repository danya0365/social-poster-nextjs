'use client';

/**
 * AIGroupFinder
 * AI-powered group discovery feature
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { SocialIcon } from '@/src/presentation/components/ui/SocialIcon';
import { animated, useSpring } from '@react-spring/web';
import { Loader2, Plus, Search, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

interface SuggestedGroup {
  id: string;
  name: string;
  platform: 'facebook';
  members: number;
  category: string;
  matchScore: number;
  description: string;
}

interface AIGroupFinderProps {
  onAddGroup?: (group: SuggestedGroup) => void;
}

// Mock suggested groups
const mockSuggestions: SuggestedGroup[] = [
  {
    id: 'sug-1',
    name: 'กลุ่มขายของออนไลน์ Thailand',
    platform: 'facebook',
    members: 125000,
    category: 'E-commerce',
    matchScore: 95,
    description: 'กลุ่มสำหรับผู้ขายออนไลน์ ซื้อขายสินค้าทุกประเภท',
  },
  {
    id: 'sug-2',
    name: 'ตลาดนัดออนไลน์ 24 ชม.',
    platform: 'facebook',
    members: 89000,
    category: 'Marketplace',
    matchScore: 88,
    description: 'ตลาดนัดออนไลน์ เปิด 24 ชม. ซื้อขายได้ตลอด',
  },
  {
    id: 'sug-3',
    name: 'แฟชั่นราคาถูก ส่งฟรี',
    platform: 'facebook',
    members: 67000,
    category: 'Fashion',
    matchScore: 82,
    description: 'รวมแฟชั่นราคาถูก ส่งฟรีทั่วไทย',
  },
  {
    id: 'sug-4',
    name: 'ขายของ Shopee Lazada',
    platform: 'facebook',
    members: 156000,
    category: 'E-commerce',
    matchScore: 78,
    description: 'กลุ่มสำหรับผู้ขายบน Shopee และ Lazada',
  },
];

export function AIGroupFinder({ onAddGroup }: AIGroupFinderProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestedGroup[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const containerSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Simulate AI search delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSuggestions(mockSuggestions);
    setIsSearching(false);
  };

  return (
    <animated.div
      style={containerSpring}
      className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-2xl border border-purple-200 dark:border-purple-800/50 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            AI ค้นหากลุ่มอัตโนมัติ
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ใส่คีย์เวิร์ดสินค้าของคุณ AI จะหากลุ่มที่เหมาะสมให้
          </p>
        </div>
      </div>

      {/* Search input */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="เช่น เสื้อผ้าแฟชั่น, กระเป๋า, เครื่องสำอาง..."
            className="ml-3 flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
          />
        </div>
        <AnimatedButton
          variant="gradient"
          onClick={handleSearch}
          disabled={isSearching || !keyword.trim()}
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span className="ml-1">ค้นหา</span>
        </AnimatedButton>
      </div>

      {/* Results */}
      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            AI กำลังค้นหากลุ่มที่เหมาะสมกับสินค้าของคุณ...
          </p>
        </div>
      )}

      {!isSearching && hasSearched && suggestions.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            พบ {suggestions.length} กลุ่มที่แนะนำ
          </p>
          {suggestions.map((group) => (
            <div
              key={group.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {group.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <SocialIcon platform={group.platform} size="xs" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                    {group.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    {group.members.toLocaleString()}
                    <span className="text-purple-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {group.matchScore}% match
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onAddGroup?.(group)}
                className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isSearching && hasSearched && suggestions.length === 0 && (
        <div className="text-center py-8">
          <Search className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            ไม่พบกลุ่มที่เหมาะสม ลองใช้คีย์เวิร์ดอื่น
          </p>
        </div>
      )}
    </animated.div>
  );
}
