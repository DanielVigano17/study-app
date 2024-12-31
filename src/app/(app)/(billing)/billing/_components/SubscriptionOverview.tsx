"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check } from 'lucide-react'
import { auth } from "@/auth"
import Stripe from "stripe"
import { useContext } from "react"
import { ApplicationContext } from "@/app/_context/app.context"

export default function SubscriptionOverview({url}:{url : string | undefined}) {
  // Aqui você incluiria a lógica para buscar os detalhes da assinatura do usuário
  const subscription = {
    plan: "Pro",
    status: "Ativo",
    renewalDate: "15/05/2024",
    price: "R$ 49,90"
  }

  const handleClick = () =>{
    window.location.href = url!;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Visão Geral da Assinatura</CardTitle>
          <Badge variant="outline">{subscription.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Plano Atual</p>
            <p className="text-2xl font-bold">{subscription.plan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Preço Mensal</p>
            <p className="text-2xl font-bold">{subscription.price}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Próxima Renovação</p>
            <p className="text-lg">{subscription.renewalDate}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recursos Incluídos:</h3>
          <ul className="space-y-2">
            {["Recurso Pro 1", "Recurso Pro 2", "Recurso Pro 3"].map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={!url} onClick={handleClick} className="w-full">
          Gerenciar Assinatura
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

