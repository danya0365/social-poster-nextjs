/**
 * IAnalyticsRepository
 * Interface for Analytics data access
 */

export interface AnalyticsSummaryMetric {
  title: string;
  value: number;
  change: number;
  changeLabel: string;
}

export interface EngagementDataPoint {
  date: string;
  engagement: number;
  reach: number;
}

export interface PlatformEngagement {
  platform: string;
  engagement: number;
  followers: number;
}

export interface BestTimeData {
  day: string;
  hour: number;
  score: number;
}

export interface TopPostMetric {
  id: string;
  content: string;
  engagement: number;
  reach: number;
}

export interface AnalyticsViewModelData {
  summary: AnalyticsSummaryMetric[];
  engagementHistory: EngagementDataPoint[];
  platformComparison: PlatformEngagement[];
  bestTimes: BestTimeData[];
  topPosts: TopPostMetric[];
}

export interface IAnalyticsRepository {
  getSummary(): Promise<AnalyticsSummaryMetric[]>;
  getEngagementHistory(): Promise<EngagementDataPoint[]>;
  getPlatformComparison(): Promise<PlatformEngagement[]>;
  getBestTimes(): Promise<BestTimeData[]>;
  getTopPosts(): Promise<TopPostMetric[]>;
  getAllAnalytics(): Promise<AnalyticsViewModelData>;
}
