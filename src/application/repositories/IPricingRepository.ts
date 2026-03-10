/**
 * IPricingRepository
 * Repository interface for Pricing data access
 */

export interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  originalPrice: number;
  price: number;
  pricePerDay: number;
  savings?: number;
  features: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
  gradient: string;
  iconName: string; // Store icon name as string to resolve in view
}

export interface PricingFAQ {
  q: string;
  a: string;
}

export interface IPricingRepository {
  getPlans(): Promise<PricingPlan[]>;
  getFAQs(): Promise<PricingFAQ[]>;
}
