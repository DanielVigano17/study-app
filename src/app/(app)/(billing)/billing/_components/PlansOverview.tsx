"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Loader2 } from 'lucide-react'
import { useState } from "react"
import { StripeProduct as Plan } from "@/config/stripe-products";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlansOverviewProps {
  plans: Plan[];
  onSelectPlan: (priceId: string) => Promise<void>;
}

export default function PlansOverview({ plans, onSelectPlan }: PlansOverviewProps) {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

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

  const handlePlanClick = async (planId: string) => {
    setLoadingPlanId(planId);
    try {
      const plan = plans.find(p => p.id === planId);
      const desiredInterval = isAnnual ? 'year' : 'month';
      const selectedPrice = plan?.prices.find(p => p.recurring.interval === desiredInterval);
      if (selectedPrice) {
        await onSelectPlan(selectedPrice.id);
      }
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Escolha seu Plano</h2>
        <p className="text-muted-foreground">
          Ative sua assinatura escolhendo o plano ideal para você
        </p>
      </div>

      {/* Toggle Mensal/Anual */}
      <div className="flex items-center justify-center gap-3">
        <Label className={!isAnnual ? "font-semibold" : "text-muted-foreground"}>Mensal</Label>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <div className="flex items-center gap-2">
          <Label className={isAnnual ? "font-semibold" : "text-muted-foreground"}>Anual</Label>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Economize</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => {
          const monthlyPrice = plan.prices.find(p => p.recurring.interval === 'month');
          const yearlyPrice = plan.prices.find(p => p.recurring.interval === 'year');
          const activePrice = isAnnual ? yearlyPrice : monthlyPrice;
          const secondaryPrice = isAnnual ? monthlyPrice : yearlyPrice;
          const activeInterval = isAnnual ? 'year' : 'month';
          const isLoadingThis = loadingPlanId === plan.id;
          const isAnyLoading = loadingPlanId !== null;

          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 hover:shadow-lg`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1">
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
                  {activePrice && (
                    <div className="mb-2">
                      <span className="text-3xl font-bold">
                        {formatPrice(activePrice.unit_amount, activePrice.currency)}
                      </span>
                      <span className="text-muted-foreground">/{formatInterval(activeInterval)}</span>
                    </div>
                  )}
                  {secondaryPrice && (
                    <div className="text-xs text-muted-foreground">
                      ou {formatPrice(secondaryPrice.unit_amount, secondaryPrice.currency)}/{formatInterval(secondaryPrice.recurring.interval)}
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
                  {activePrice && (
                    <Button 
                      onClick={() => handlePlanClick(plan.id)}
                      disabled={isAnyLoading}
                      className={`w-full bg-primary text-white`}
                    >
                      {isLoadingThis ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        `Assinar ${plan.name}`
                      )}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  )
} 