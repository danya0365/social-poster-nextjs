/**
 * MockAnalyticsRepository
 */

import {
    AnalyticsSummaryMetric,
    AnalyticsViewModelData,
    BestTimeData,
    EngagementDataPoint,
    IAnalyticsRepository,
    PlatformEngagement,
    TopPostMetric,
} from '../../../application/repositories/IAnalyticsRepository';

export class MockAnalyticsRepository implements IAnalyticsRepository {
  async getSummary(): Promise<AnalyticsSummaryMetric[]> {
    return [
      { title: 'การเข้าถึง', value: 158420, change: 15.3, changeLabel: 'เทียบสัปดาห์ก่อน' },
      { title: 'Engagement', value: 24890, change: 23.5, changeLabel: 'เทียบสัปดาห์ก่อน' },
      { title: 'ความคิดเห็น', value: 3245, change: 8.2, changeLabel: 'เทียบสัปดาห์ก่อน' },
      { title: 'แชร์', value: 1876, change: -3.1, changeLabel: 'เทียบสัปดาห์ก่อน' },
    ];
  }

  async getEngagementHistory(): Promise<EngagementDataPoint[]> {
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
      engagement: Math.floor(Math.random() * 5000) + 1000,
      reach: Math.floor(Math.random() * 20000) + 5000,
    }));
  }

  async getPlatformComparison(): Promise<PlatformEngagement[]> {
    return [
      { platform: 'Facebook', engagement: 12500, followers: 45000 },
      { platform: 'Instagram', engagement: 18400, followers: 32000 },
      { platform: 'Twitter', engagement: 4200, followers: 8500 },
    ];
  }

  async getBestTimes(): Promise<BestTimeData[]> {
    const days = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
    return days.flatMap((day) =>
      Array.from({ length: 4 }, (_, i) => ({
        day,
        hour: (i + 4) * 4,
        score: Math.floor(Math.random() * 100),
      }))
    );
  }

  async getTopPosts(): Promise<TopPostMetric[]> {
    return [
      { id: '1', content: '💰 โปรโมชั่นพิเศษ! ลด 50% ทุกชิ้น', engagement: 4500, reach: 18000 },
      { id: '2', content: '🌟 สินค้าขายดี กลับมาอีกครั้ง!', engagement: 3200, reach: 15000 },
      { id: '3', content: '📦 รีวิวจากลูกค้า สินค้าคุณภาพดี', engagement: 2800, reach: 12000 },
    ];
  }

  async getAllAnalytics(): Promise<AnalyticsViewModelData> {
    const [summary, engagementHistory, platformComparison, bestTimes, topPosts] = await Promise.all([
      this.getSummary(),
      this.getEngagementHistory(),
      this.getPlatformComparison(),
      this.getBestTimes(),
      this.getTopPosts(),
    ]);

    return {
      summary,
      engagementHistory,
      platformComparison,
      bestTimes,
      topPosts,
    };
  }
}
