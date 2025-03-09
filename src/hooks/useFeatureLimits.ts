'use client'
import { useState, useEffect } from 'react';
import { FeatureLimitService } from '@/services/featureLimitService';

interface LimitInfo {
  limits: { [key: string]: boolean };
  usagePercentage: { [key: string]: number };
  hasReachedAnyLimit: boolean;
}

export function useFeatureLimits(featuresJson?: string, currentUsage: { [key: string]: number } = {}) {
  const [limitInfo, setLimitInfo] = useState<LimitInfo>({
    limits: {},
    usagePercentage: {},
    hasReachedAnyLimit: false
  });

  useEffect(() => {
    if (featuresJson) {
      const features = JSON.parse(featuresJson);
      const info = FeatureLimitService.checkFeatureLimits(features, currentUsage);
      setLimitInfo(info);
    }
  }, [featuresJson, currentUsage]);

  return limitInfo;
} 