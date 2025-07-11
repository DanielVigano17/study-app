"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Loader2 } from 'lucide-react'
import { useState } from "react"

interface Feature {
  lookup_key: string;
  name: string;
  feature_presentation: string;
  value: string;
}

interface Price {
  id: string;
  type: string;
  recurring: {
    interval: string;
  };
  currency: string;
  unit_amount: number;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  prices: Price[];
}

interface PlansOverviewProps {
  plans: Plan[];
  onSelectPlan: (priceId: string) => Promise<void>;
}

export default function PlansOverview({ plans, onSelectPlan }: PlansOverviewProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (amount: number, currency: string) => {
    const value = amount / 100; // Stripe armazena em centavos
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(value);
  };

  const formatInterval = (interval: string) => {
    return interval === 'month' ? 'mês' : 'ano';
  };

  const handlePlanSelect = (planId: string, priceId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinueSubscription = async () => {
    if (selectedPlan) {
      setIsLoading(true);
      try {
        const plan = plans.find(p => p.id === selectedPlan);
        const monthlyPrice = plan?.prices.find(p => p.recurring.interval === 'month');
        if (monthlyPrice) {
          await onSelectPlan(monthlyPrice.id);
        }
      } catch (error) {
        console.error('Erro ao processar assinatura:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Escolha seu Plano</h2>
        <p className="text-muted-foreground">
          Reative sua assinatura escolhendo o plano ideal para você
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => {
          const monthlyPrice = plan.prices.find(p => p.recurring.interval === 'month');
          const yearlyPrice = plan.prices.find(p => p.recurring.interval === 'year');
          
          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 hover:shadow-lg ${
                selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="text-center mb-6">
                  {monthlyPrice && (
                    <div className="mb-2">
                      <span className="text-3xl font-bold">
                        {formatPrice(monthlyPrice.unit_amount, monthlyPrice.currency)}
                      </span>
                      <span className="text-muted-foreground">/{formatInterval(monthlyPrice.recurring.interval)}</span>
                    </div>
                  )}
                  {yearlyPrice && (
                    <div className="text-sm text-muted-foreground">
                      ou {formatPrice(yearlyPrice.unit_amount, yearlyPrice.currency)}/{formatInterval(yearlyPrice.recurring.interval)}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Recursos Incluídos:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature.lookup_key} className="flex items-center text-sm">
                        <Check className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature.feature_presentation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="w-full space-y-2">
                  {monthlyPrice && (
                    <Button 
                      onClick={() => handlePlanSelect(plan.id, monthlyPrice.id)}
                      disabled={isLoading}
                      className={`w-full ${
                        selectedPlan === plan.id ? 'bg-primary' : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Plano Selecionado' : `Assinar ${plan.name}`}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground mb-2">
            Clique no botão abaixo para prosseguir com a assinatura
          </p>
          <Button 
            onClick={handleContinueSubscription}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Continuar com a Assinatura'
            )}
          </Button>
        </div>
      )}
    </div>
  )
} 