import { FeatureUsage } from "@/domain/interfaces/userInterface";

interface Feature {
  lookup_key: string;
  name: string;
  feature_presentation: string;
  value: string;
}

export class FeatureLimitService {
  static checkFeatureLimits(features: Feature[], currentUsage: FeatureUsage) {
    const limits: { [key: string]: boolean } = {};
    const usagePercentage: { [key: string]: number } = {};

    features.forEach(feature => {
      const limit = parseInt(feature.value);
      const usage = currentUsage[feature.lookup_key] || 0;
      
      limits[feature.lookup_key] = usage >= limit;
      usagePercentage[feature.lookup_key] = (usage / limit) * 100;
    });

    return {
      limits,
      usagePercentage,
      hasReachedAnyLimit: Object.values(limits).some(isLimited => isLimited)
    };
  }
} 