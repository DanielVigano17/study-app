"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { useFeatureLimits } from "@/hooks/useFeatureLimits"

interface Feature {
  lookup_key: string;
  name: string;
  feature_presentation: string;
  value: string;
}

interface UsageStatsProps {
  featuresJson?: string;
  currentUsage?: {
    [key: string]: number;
  };
}

export default function UsageStats({ featuresJson, currentUsage = {} }: UsageStatsProps) {
  const features = featuresJson ? JSON.parse(featuresJson) : [];
  const { limits, usagePercentage, hasReachedAnyLimit } = useFeatureLimits(featuresJson, currentUsage);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso do Plano</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        {hasReachedAnyLimit && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Limite Atingido</AlertTitle>
            <AlertDescription>
              Você atingiu o limite em algumas features. Considere fazer upgrade do seu plano.
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-6">
          {features.map((feature : Feature) => {
            const used = currentUsage[feature.lookup_key] || 0;
            const total = parseInt(feature.value);
            const isLimited = limits[feature.lookup_key];
            const percentage = usagePercentage[feature.lookup_key];
            
            return (
              <div key={feature.lookup_key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {feature.name}
                    {isLimited && (
                      <span className="ml-2 text-red-500 text-xs">
                        (Limite atingido)
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {used} / {total}
                  </span>
                </div>
                <Progress 
                  className={`h-3 ${isLimited ? 'bg-red-100' : ''}`}
                  value={percentage}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}

