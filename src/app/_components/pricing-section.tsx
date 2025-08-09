"use client";

import { useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  description: string;
  monthly: number;
  annualMonthly: number; // preço por mês no anual
  cta: string;
  href: string;
  features: string[];
  highlight?: boolean;
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const formatBRL = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const plans: Plan[] = useMemo(
    () => [
      {
        name: "Starter",
        description: "Para começar sua jornada com IA",
        monthly: 19,
        annualMonthly: 15,
        cta: "Começar",
        href: "/app/billing",
        features: [
          "100 flashcards/mês",
          "5 uploads de arquivos/mês",
          "Questionários básicos",
          "Suporte por e-mail",
        ],
      },
      {
        name: "Pro",
        description: "Para estudar todos os dias com performance",
        monthly: 39,
        annualMonthly: 31,
        cta: "Assinar Pro",
        href: "/app/billing",
        features: [
          "Ilimitado em flashcards",
          "20 uploads de arquivos/mês",
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
        href: "/app/billing",
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
                  <Button className={plan.highlight ? "w-full bg-blue-600 hover:bg-blue-700" : "w-full"} asChild>
                    <a href={plan.href}>{plan.cta}</a>
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
