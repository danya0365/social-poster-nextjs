'use client';

/**
 * SettingsView
 * App settings and preferences
 */

import { siteConfig } from '@/src/config/site.config';
import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { animated, useSpring } from '@react-spring/web';
import {
    Bell,
    Clock,
    CreditCard,
    Palette,
    Save,
    Shield,
    User
} from 'lucide-react';
import { useState } from 'react';

type SettingsTab = 'profile' | 'notifications' | 'billing' | 'security' | 'appearance';

interface SettingsSection {
  id: SettingsTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const settingsSections: SettingsSection[] = [
  { id: 'profile', label: 'โปรไฟล์', icon: User, description: 'ข้อมูลส่วนตัวและบัญชี' },
  { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell, description: 'ตั้งค่าการรับการแจ้งเตือน' },
  { id: 'billing', label: 'การชำระเงิน', icon: CreditCard, description: 'แพ็กเกจและประวัติการชำระ' },
  { id: 'security', label: 'ความปลอดภัย', icon: Shield, description: 'รหัสผ่านและการยืนยันตัวตน' },
  { id: 'appearance', label: 'ธีมและภาษา', icon: Palette, description: 'ปรับแต่งการแสดงผล' },
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          ตั้งค่า
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          จัดการบัญชีและการตั้งค่าทั้งหมด
        </p>
      </animated.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeTab === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}

          {/* Save button */}
          <div className="flex justify-end">
            <AnimatedButton
              variant="gradient"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'กำลังบันทึก...' : (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  บันทึกการเปลี่ยนแปลง
                </>
              )}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        ข้อมูลโปรไฟล์
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          P
        </div>
        <div>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            อัปโหลดรูปใหม่
          </button>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG ขนาดไม่เกิน 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ชื่อ
          </label>
          <input
            type="text"
            defaultValue={siteConfig.name}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            นามสกุล
          </label>
          <input
            type="text"
            defaultValue="Admin"
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            อีเมล
          </label>
          <input
            type="email"
            defaultValue={siteConfig.demo.adminEmail}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            defaultValue="081-234-5678"
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    postSuccess: true,
    postFailed: true,
    scheduleReminder: true,
    weeklyReport: true,
    newFeatures: false,
    emailNotify: true,
    lineNotify: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        การแจ้งเตือน
      </h2>

      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">กิจกรรมโพสต์</h3>
          <div className="space-y-3">
            <ToggleItem
              label="โพสต์สำเร็จ"
              description="แจ้งเตือนเมื่อโพสต์ถูกเผยแพร่แล้ว"
              checked={settings.postSuccess}
              onChange={() => toggleSetting('postSuccess')}
            />
            <ToggleItem
              label="โพสต์ล้มเหลว"
              description="แจ้งเตือนเมื่อโพสต์มีปัญหา"
              checked={settings.postFailed}
              onChange={() => toggleSetting('postFailed')}
            />
            <ToggleItem
              label="เตือนก่อนโพสต์ตามกำหนดการ"
              description="แจ้งเตือน 15 นาทีก่อนโพสต์"
              checked={settings.scheduleReminder}
              onChange={() => toggleSetting('scheduleReminder')}
            />
          </div>
        </div>

        <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">รายงาน</h3>
          <ToggleItem
            label="รายงานประจำสัปดาห์"
            description="ส่งสรุปผลการทำงานทุกวันจันทร์"
            checked={settings.weeklyReport}
            onChange={() => toggleSetting('weeklyReport')}
          />
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">ช่องทางการแจ้งเตือน</h3>
          <div className="space-y-3">
            <ToggleItem
              label="อีเมล"
              description="รับการแจ้งเตือนทางอีเมล"
              checked={settings.emailNotify}
              onChange={() => toggleSetting('emailNotify')}
            />
            <ToggleItem
              label="LINE Notify"
              description="รับการแจ้งเตือนผ่าน LINE"
              checked={settings.lineNotify}
              onChange={() => toggleSetting('lineNotify')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      {/* Current plan */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">แพ็กเกจปัจจุบัน</p>
            <h2 className="text-2xl font-bold mt-1">{siteConfig.name} Pro</h2>
            <p className="text-sm opacity-80 mt-2">หมดอายุ: 28 ก.พ. 2026</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">799</p>
            <p className="text-sm opacity-80">บาท/เดือน</p>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
          อัปเกรดแพ็กเกจ
        </button>
      </div>

      {/* Payment method */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          วิธีการชำระเงิน
        </h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">หมดอายุ 12/27</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:underline">แก้ไข</button>
        </div>
      </div>

      {/* Payment history */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          ประวัติการชำระเงิน
        </h2>
        <div className="space-y-3">
          {[
            { date: '1 ก.พ. 2026', amount: '799', status: 'สำเร็จ' },
            { date: '1 ม.ค. 2026', amount: '799', status: 'สำเร็จ' },
            { date: '1 ธ.ค. 2025', amount: '799', status: 'สำเร็จ' },
          ].map((payment, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{payment.date}</p>
                <p className="text-sm text-green-600">{payment.status}</p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">฿{payment.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        ความปลอดภัย
      </h2>

      <div className="space-y-6">
        {/* Change password */}
        <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">เปลี่ยนรหัสผ่าน</h3>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="รหัสผ่านปัจจุบัน"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="รหัสผ่านใหม่"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="ยืนยันรหัสผ่านใหม่"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Two-factor auth */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">ยืนยันตัวตน 2 ขั้นตอน</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                เพิ่มความปลอดภัยด้วย OTP
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg text-sm font-medium">
              เปิดใช้งาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = useState('th');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        ธีมและภาษา
      </h2>

      <div className="space-y-6">
        {/* Theme */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">ธีม</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === t
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className={`w-8 h-8 mx-auto mb-2 rounded-lg ${
                  t === 'light' ? 'bg-white border border-gray-200' :
                  t === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-white to-gray-900'
                }`} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t === 'light' ? 'สว่าง' : t === 'dark' ? 'มืด' : 'ระบบ'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">ภาษา</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="th">ไทย</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">เขตเวลา</h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5" />
            <span>Asia/Bangkok (GMT+7)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
