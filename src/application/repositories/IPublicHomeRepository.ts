/**
 * IPublicHomeRepository
 * Repository interface for Public Home Page data access
 */

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PublicHomeData {
  hero: HeroContent;
  features: FeatureItem[];
}

export interface IPublicHomeRepository {
  getHomeData(): Promise<PublicHomeData>;
}
