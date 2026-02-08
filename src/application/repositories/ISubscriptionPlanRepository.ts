/**
 * ISubscriptionPlanRepository
 * Repository interface for Subscription Plan data access
 * Following Clean Architecture - Application layer
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  nameTh: string;
  duration: number; // days
  price: number;
  originalPrice?: number;
  features: string[];
  isBestValue: boolean;
  isActive: boolean;
}

export interface ISubscriptionPlanRepository {
  getById(id: string): Promise<SubscriptionPlan | null>;
  getAll(): Promise<SubscriptionPlan[]>;
  getActive(): Promise<SubscriptionPlan[]>;
}
