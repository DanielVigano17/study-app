import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { modules } from "@/domain";

export async function checkSubscription(request: NextRequest) {
    try {
        const { isActive, subscription, error } = await modules.useCase.billing.checkSubscriptionStatus.execute();
        console.log(isActive, subscription, error);
        if (!isActive) {
            // Adiciona parâmetros na URL para mostrar mensagem apropriada
            const redirectUrl = new URL("/billing", request.url);
            
            if (error) {
                redirectUrl.searchParams.set("error", error);
            } else if (subscription?.status === "past_due") {
                redirectUrl.searchParams.set("error", "Sua assinatura está atrasada. Por favor, atualize seus dados de pagamento.");
            } else if (subscription?.status === "canceled") {
                redirectUrl.searchParams.set("error", "Sua assinatura foi cancelada. Renove sua assinatura para continuar usando os recursos premium.");
            } else {
                redirectUrl.searchParams.set("error", "Você precisa de uma assinatura ativa para acessar este recurso.");
            }

            // Adiciona a URL de retorno após a assinatura
            redirectUrl.searchParams.set("redirectTo", request.url);

            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
        const redirectUrl = new URL("/billing", request.url);
        redirectUrl.searchParams.set("error", "Erro ao verificar status da assinatura. Por favor, tente novamente.");
        redirectUrl.searchParams.set("redirectTo", request.url);
        return NextResponse.redirect(redirectUrl);
    }
} 