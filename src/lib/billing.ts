import { EnumTipoCheckout } from "@/domain/enums/enum-tipo-checkout";
import { PlansService } from "@/services/plansService";

/**
 * Retorna o tipo de checkout adequado com base no plano e no status da assinatura do usuário.
 * @param priceId - ID do preço no Stripe
 * @param subscriptionId - ID da assinatura do usuário (null/undefined se não tiver)
 * @returns EnumTipoCheckout - FREE, FREE_TRIAL ou NORMAL_SUBSCRIPTION
 */
export function getTipoCheckout(
  priceId: string,
  subscriptionId: string | null | undefined
): EnumTipoCheckout {
  const plan = PlansService.getPlanByPriceId(priceId);
  const usuarioJaUtilizouFreeTrial = !!subscriptionId;

  if (plan?.id === "free") 
    return EnumTipoCheckout.FREE;

  if (!usuarioJaUtilizouFreeTrial)
    return EnumTipoCheckout.FREE_TRIAL;

  return EnumTipoCheckout.NORMAL_SUBSCRIPTION;
}
