import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
  const features: Feature[] = featuresJson ? JSON.parse(featuresJson) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso do Plano</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-6">
          {features.map((feature) => {
            const used = currentUsage[feature.lookup_key] || 0;
            const total = parseInt(feature.value);
            
            return (
              <div key={feature.lookup_key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{feature.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {used} / {total}
                  </span>
                </div>
                <Progress 
                  className="h-3" 
                  value={(used / total) * 100} 
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}

