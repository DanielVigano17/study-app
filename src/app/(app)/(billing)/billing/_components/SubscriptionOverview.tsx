"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check } from 'lucide-react'
import { auth } from "@/auth"
import Stripe from "stripe"
import { useContext } from "react"
import { ApplicationContext } from "@/app/_context/app.context"
import { Subscription } from "@/domain/entities/Subscription"

interface SubscriptionOverviewProps {
  url : string | undefined
  subscriptionDetails : {
    nameAssinatura? : string,
    metadata? : Stripe.Metadata,
    status : string,
    amount : number
  }
}

export default function SubscriptionOverview({url,subscriptionDetails}:SubscriptionOverviewProps) {
  // Aqui você incluiria a lógica para buscar os detalhes da assinatura do usuário
  const subscription = {
    plan: "Pro",
    status: "Ativo",
    renewalDate: "15/05/2024",
    price: "R$ 49,90"
  }

  const listaFeatures = (subscriptionDetails.metadata?.FEATURES || "").split(",")

  console.log(listaFeatures);

  const handleClick = () =>{
    window.location.href = url!;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Visão Geral da Assinatura</CardTitle>
          {/* <Badge variant="outline">{subscription.status}</Badge> */}
          <Badge 
                    variant={subscriptionDetails.status === "active" ? "default" : "destructive"}
                    className={
                      subscriptionDetails.status === "active" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
          >{subscriptionDetails.status}</Badge>
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Plano Atual</p>
            <p className="text-2xl font-bold">{subscriptionDetails.nameAssinatura}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Preço Mensal</p>
            <p className="text-2xl font-bold">{"R$ " + subscriptionDetails.amount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Próxima Renovação</p>
            <p className="text-lg">{subscription.renewalDate}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recursos Incluídos:</h3>
          <ul className="space-y-2">
          {/* {Object.keys(subscriptionDetails.metadata).map((value, index) => (
            <li key={index} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                {subscriptionDetails.metadata[value] + " " + value}
              </li>
            ))
          } */}
            {listaFeatures.map((feature, index) => (
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

