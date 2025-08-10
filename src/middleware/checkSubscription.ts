import { modules } from "@/domain";
import { redirect } from "next/navigation";

export async function checkSubscription() {
    let redirectUrl = "/billing";

    const { isActive, subscription, error } = await modules.useCase.billing.checkSubscriptionStatus.execute();

    if (!isActive) {
        if (error) {
            redirectUrl += `?error=${error}`;
        } else if (subscription?.status === "past_due") {
            redirectUrl += `?error=Sua assinatura está atrasada. Por favor, atualize seus dados de pagamento.`;
        } else if (subscription?.status === "canceled") {
            redirectUrl += `?error=Sua assinatura foi cancelada. Renove sua assinatura para continuar usando os recursos premium.`;
        } else {
            redirectUrl += `?error=Você precisa de uma assinatura ativa para acessar este recurso.`;
        }    
        
        return redirect(redirectUrl);        
    }
} 