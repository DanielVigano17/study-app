"use client"

import { useState } from "react";
import PlansOverview from "./PlansOverview";
import { Plan } from "@/services/plansService";

interface PlansWrapperProps {
  plans: Plan[];
}

export default function PlansWrapper({ plans }: PlansWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (priceId: string) => {
    setIsLoading(true);
    try {
      // Criar nova sessão de checkout com o priceId selecionado
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (response.ok) {
        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      } else {
        console.error('Erro ao criar sessão de checkout');
      }
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PlansOverview 
      plans={plans} 
      onSelectPlan={handleSelectPlan}
    />
  );
} 