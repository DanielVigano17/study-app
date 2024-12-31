import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UsageStats() {
  // Aqui você incluiria a lógica para buscar as estatísticas de uso do usuário
  const usageStats = [
    { name: "Armazenamento", used: 75, total: 100, unit: "GB" },
    { name: "Transferência de Dados", used: 450, total: 500, unit: "GB" },
    { name: "Projetos", used: 8, total: 10, unit: "" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso do Plano</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-6">
          {usageStats.map((stat, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{stat.name}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.used} / {stat.total} {stat.unit}
                </span>
              </div>
              <Progress className="h-3" value={(stat.used / stat.total) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

