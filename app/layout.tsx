import '@/public/styles/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'POSTDEE 24HR | ระบบโพสต์ขายอัตโนมัติ 24 ชม.',
  description: 'ระบบ AI ช่วยโพสต์ขายของอัตโนมัติ 24 ชั่วโมง รองรับ Facebook, Instagram, Twitter พร้อมระบบค้นหากลุ่มลูกค้าด้วย AI และ Auto Comment',
  keywords: ['โพสต์อัตโนมัติ', 'ขายของออนไลน์', 'AI posting', 'social media', 'Facebook', 'Instagram'],
  openGraph: {
    title: 'POSTDEE 24HR | ระบบโพสต์ขายอัตโนมัติ',
    description: 'ระบบ AI ช่วยโพสต์ขายของอัตโนมัติ 24 ชั่วโมง',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
