"use client";

import { useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import stripeProducts, { StripeProduct } from "@/config/stripe-products";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<string | null>(null); // product.id em loading
  const { toast } = useToast();

  const formatBRL = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const products: StripeProduct[] = useMemo(() => stripeProducts, []);

  const handleSubscribe = async (product: StripeProduct) => {
    const monthlyPrice = product.prices.find(p => p.recurring.interval === "month");
    const annualPrice = product.prices.find(p => p.recurring.interval === "year");
    const priceId = (isAnnual ? annualPrice?.id : monthlyPrice?.id) ?? undefined;

    if (!priceId) {
      toast({
        title: "Plano indisponível",
        description: "Não há preço configurado para este período.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(product.id);
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (response.status === 401) {
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
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Economize até 25%!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => {
            const monthly = product.prices.find(p => p.recurring.interval === "month");
            const annual = product.prices.find(p => p.recurring.interval === "year");
            const shownMonthlyValue = isAnnual && annual
              ? (annual.unit_amount / 12) / 100
              : (monthly?.unit_amount ?? 0) / 100;
            const annualTotal = annual ? annual.unit_amount / 100 : undefined;
            const isLoadingThis = isLoading === product.id;
            const isHighlight = product.id === 'pro';
            const cta = "Teste grátis agora";

            return (
              <Card key={product.id} className={isHighlight ? "border-blue-500 shadow-lg" : undefined}>
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{product.name}</span>
                    {isHighlight && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-600 text-white">Mais popular</span>
                    )}
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-end gap-2">
                      <div className="text-4xl font-bold">{formatBRL(shownMonthlyValue)}</div>
                      <div className="text-gray-500 mb-1">/ mês</div>
                    </div>
                    {isAnnual && annualTotal !== undefined ? (
                      <div className="text-xs text-gray-500">Cobrado anualmente: {formatBRL(annualTotal)}</div>
                    ) : null}
                  </div>
                  <ul className="space-y-2 text-sm">
                    {product.features.map((feat) => (
                      <li key={feat.lookup_key} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">{feat.feature_presentation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={isHighlight ? "w-full bg-blue-600 hover:bg-blue-700" : "w-full"}
                    onClick={() => handleSubscribe(product)}
                    disabled={isLoadingThis}
                  >
                    {isLoadingThis && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {cta}
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
