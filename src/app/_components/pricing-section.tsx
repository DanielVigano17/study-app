"use client";

import { useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  name: string;
  description: string;
  monthly: number; // preço mensal exibido no modo Mensal
  annualMonthly: number; // preço por mês quando anual
  cta: string;
  href?: string; // fallback para planos sem checkout
  features: string[];
  highlight?: boolean;
  priceIdMonthly?: string; // Stripe Price ID mensal
  priceIdAnnual?: string; // Stripe Price ID anual
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<string | null>(null); // plano em loading
  const { toast } = useToast();

  const formatBRL = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  // ATENÇÃO: IDs vindos do arquivo src/config/stripe-products.json
  // basic: price_1R04BRP3utzNziQ1oJ1T83CB (mensal), price_1R04BSP3utzNziQ1mPWHca4S (anual)
  // pro:   price_1R04BTP3utzNziQ17bDLmAJB (mensal), price_1R04BTP3utzNziQ1uaE0jauy (anual)
  const plans: Plan[] = useMemo(
    () => [
      {
        name: "Starter",
        description: "Para começar sua jornada com IA",
        monthly: 29.9,
        annualMonthly: 24.9,
        cta: "Começar",
        priceIdMonthly: "price_1R04BRP3utzNziQ1oJ1T83CB",
        priceIdAnnual: "price_1R04BSP3utzNziQ1mPWHca4S",
        features: [
          "60 flashcards/mês",
          "15 questionários/mês",
          "Até 15 matérias",
          "Suporte por e-mail",
        ],
      },
      {
        name: "Pro",
        description: "Para estudar todos os dias com performance",
        monthly: 49.9,
        annualMonthly: 41.5,
        cta: "Assinar Pro",
        priceIdMonthly: "price_1R04BTP3utzNziQ17bDLmAJB",
        priceIdAnnual: "price_1R04BTP3utzNziQ1uaE0jauy",
        features: [
          "Ilimitado em flashcards",
          "Questionários adaptativos",
          "Revisão espaçada avançada",
          "Prioridade no suporte",
        ],
        highlight: true,
      },
      {
        name: "Teams",
        description: "Para grupos, turmas e pequenos times",
        monthly: 79,
        annualMonthly: 63,
        cta: "Falar com vendas",
        href: "mailto:contato@smartstudy.com",
        features: [
          "Até 5 membros",
          "Bibliotecas compartilhadas",
          "Análises de progresso",
          "Permissões e papéis",
          "Suporte dedicado",
        ],
      },
    ],
    []
  );

  const handleSubscribe = async (plan: Plan) => {
    const priceId = isAnnual ? plan.priceIdAnnual : plan.priceIdMonthly;

    // Planos sem priceId abrem link fallback
    if (!priceId) {
      if (plan.href) window.location.href = plan.href;
      return;
    }

    try {
      setIsLoading(plan.name);
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (response.status === 401) {
        // Não autenticado → redireciona ao login preservando fluxo e priceId
        const redirectTo = encodeURIComponent(`/continue-checkout?priceId=${priceId}`);
        window.location.href = `/login?redirectTo=${redirectTo}`;
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao criar sessão de checkout');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('URL de checkout não recebida');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Erro ao iniciar assinatura',
        description: 'Tente novamente em instantes ou contate o suporte.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Planos e preços</h2>
          <p className="text-gray-600">Escolha o plano ideal para o seu momento</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          <Label className={!isAnnual ? "font-semibold" : "text-gray-600"}>Mensal</Label>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <div className="flex items-center gap-2">
            <Label className={isAnnual ? "font-semibold" : "text-gray-600"}>Anual</Label>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Economize ~20%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const monthlyPrice = isAnnual ? plan.annualMonthly : plan.monthly;
            const annualTotal = plan.annualMonthly * 12;
            const isLoadingThis = isLoading === plan.name;

            return (
              <Card key={plan.name} className={plan.highlight ? "border-blue-500 shadow-lg" : undefined}>
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{plan.name}</span>
                    {plan.highlight && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-600 text-white">Mais popular</span>
                    )}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-end gap-2">
                      <div className="text-4xl font-bold">{formatBRL(monthlyPrice)}</div>
                      <div className="text-gray-500 mb-1">/ mês</div>
                    </div>
                    {isAnnual ? (
                      <div className="text-xs text-gray-500">Cobrado anualmente: {formatBRL(annualTotal)}</div>
                    ) : null}
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={plan.highlight ? "w-full bg-blue-600 hover:bg-blue-700" : "w-full"}
                    onClick={() => handleSubscribe(plan)}
                    disabled={isLoadingThis}
                  >
                    {isLoadingThis && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
