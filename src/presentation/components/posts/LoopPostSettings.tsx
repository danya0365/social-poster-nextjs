'use client';

/**
 * LoopPostSettings
 * Component for configuring automatic post looping/repeating
 */

import { IntervalUnit } from '@/src/domain/types/social';
import { animated, useSpring } from '@react-spring/web';
import {
    Calendar,
    Clock,
    Info,
    Repeat
} from 'lucide-react';
import { useState } from 'react';

interface LoopConfig {
  enabled: boolean;
  interval: number; // in hours
  intervalUnit: IntervalUnit;
  maxRepeat: number; // 0 = unlimited
  startTime: string;
  endTime: string;
  activeDays: number[]; // 0-6 (Sun-Sat)
}

interface LoopPostSettingsProps {
  onConfigChange?: (config: LoopConfig) => void;
  onSave?: (config: LoopConfig) => void;
  initialConfig?: Partial<LoopConfig>;
}

const defaultConfig: LoopConfig = {
  enabled: false,
  interval: 4,
  intervalUnit: 'hours',
  maxRepeat: 10,
  startTime: '08:00',
  endTime: '22:00',
  activeDays: [1, 2, 3, 4, 5], // Mon-Fri
};

const dayLabels = ['อา.', 'จ.', 'อ.', 'พ.', 'ฤ.', 'ศ.', 'ส.'];

export function LoopPostSettings({
  onConfigChange,
  onSave,
  initialConfig = {},
}: LoopPostSettingsProps) {
  const [config, setConfig] = useState<LoopConfig>({
    ...defaultConfig,
    ...initialConfig,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const contentSpring = useSpring({
    height: showAdvanced ? 'auto' : 0,
    opacity: showAdvanced ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const toggleSpring = useSpring({
    backgroundColor: config.enabled ? 'rgb(59, 130, 246)' : 'rgb(209, 213, 219)',
    config: { tension: 200, friction: 20 },
  });

  const updateConfig = (updates: Partial<LoopConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const toggleDay = (day: number) => {
    const newDays = config.activeDays.includes(day)
      ? config.activeDays.filter((d) => d !== day)
      : [...config.activeDays, day].sort();
    updateConfig({ activeDays: newDays });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              วนลูปโพสต์ซ้ำ
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              โพสต์อัตโนมัติตามเวลาที่กำหนด
            </p>
          </div>
        </div>

        {/* Toggle switch */}
        <animated.button
          style={{ backgroundColor: toggleSpring.backgroundColor }}
          onClick={() => updateConfig({ enabled: !config.enabled })}
          className="relative w-14 h-7 rounded-full transition-colors"
        >
          <div
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              config.enabled ? 'left-8' : 'left-1'
            }`}
          />
        </animated.button>
      </div>

      {config.enabled && (
        <>
          {/* Quick settings */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Interval */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                โพสต์ทุกๆ
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={config.interval}
                  onChange={(e) =>
                    updateConfig({ interval: parseInt(e.target.value) || 1 })
                  }
                  min={1}
                  max={config.intervalUnit === 'hours' ? 24 : 30}
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                />
                <select
                  value={config.intervalUnit}
                  onChange={(e) =>
                    updateConfig({
                      intervalUnit: e.target.value as IntervalUnit,
                    })
                  }
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="hours">ชั่วโมง</option>
                  <option value="days">วัน</option>
                </select>
              </div>
            </div>

            {/* Max repeat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                จำนวนรอบ
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={config.maxRepeat}
                  onChange={(e) =>
                    updateConfig({ maxRepeat: parseInt(e.target.value) || 0 })
                  }
                  min={0}
                  placeholder="0 = ไม่จำกัด"
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                />
                <span className="text-sm text-gray-500">ครั้ง</span>
              </div>
            </div>
          </div>

          {/* Time range */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                เริ่มโพสต์
              </label>
              <input
                type="time"
                value={config.startTime}
                onChange={(e) => updateConfig({ startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                หยุดโพสต์
              </label>
              <input
                type="time"
                value={config.endTime}
                onChange={(e) => updateConfig({ endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Active days */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              วันที่เปิดใช้งาน
            </label>
            <div className="flex gap-2">
              {dayLabels.map((label, index) => (
                <button
                  key={index}
                  onClick={() => toggleDay(index)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    config.activeDays.includes(index)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium">สรุปการตั้งค่า</p>
                <p>
                  โพสต์ทุกๆ {config.interval}{' '}
                  {config.intervalUnit === 'hours' ? 'ชั่วโมง' : 'วัน'}
                  {config.maxRepeat > 0 && ` จำนวน ${config.maxRepeat} ครั้ง`}
                  {config.maxRepeat === 0 && ' (ไม่จำกัด)'}
                </p>
                <p>
                  ระหว่างเวลา {config.startTime} - {config.endTime} น.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {onSave && (
            <button
              onClick={() => onSave(config)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              บันทึกการตั้งค่า
            </button>
          )}
        </>
      )}
    </div>
  );
}
