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
    amount : number,
    nextBillingDate?: Date
  }
}

// Mapeamento de status para português e suas cores
const subscriptionStatusConfig = {
  'incomplete': {
    label: 'Incompleta',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
  },
  'incomplete_expired': {
    label: 'Expirada',
    className: 'bg-red-100 text-red-800 hover:bg-red-100'
  },
  'trialing': {
    label: 'Período de Teste',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
  },
  'active': {
    label: 'Ativa',
    className: 'bg-green-100 text-green-800 hover:bg-green-100'
  },
  'past_due': {
    label: 'Pagamento Atrasado',
    className: 'bg-orange-100 text-orange-800 hover:bg-orange-100'
  },
  'canceled': {
    label: 'Cancelada',
    className: 'bg-red-100 text-red-800 hover:bg-red-100'
  },
  'unpaid': {
    label: 'Não Paga',
    className: 'bg-red-100 text-red-800 hover:bg-red-100'
  },
  'paused': {
    label: 'Pausada',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
} as const;

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

  const statusConfig = subscriptionStatusConfig[subscriptionDetails.status as keyof typeof subscriptionStatusConfig] || {
    label: subscriptionDetails.status,
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  };

  // Função para formatar a data
  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Visão Geral da Assinatura</CardTitle>
          <Badge 
            variant="outline"
            className={statusConfig.className}
          >
            {statusConfig.label}
          </Badge>
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
            <p className="text-lg">{formatDate(subscriptionDetails.nextBillingDate)}</p>
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

