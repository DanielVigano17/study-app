import { auth } from "../../../../auth/auth";
import { StripeRepository } from "@/repositories/stripeRepository";
import { EnumTipoCheckout } from "../../enums/enum-tipo-checkout";

export class CreateCheckoutSession {
    constructor(private paymentGateway : StripeRepository){}

    async execute(successUrl: string,tipoCheckout: EnumTipoCheckout, priceId?: string){
        try{
            const session = await auth();

            const customerId = session?.user.customerId

            if(!customerId) throw new Error("Erro ao obter customerId");

            const url = `${process.env.NEXT_PUBLIC_APP_URL}${successUrl}`;

            let checkoutSession;

            switch (tipoCheckout) {
                case EnumTipoCheckout.FREE_TRIAL:
                    checkoutSession = await this.paymentGateway.createCheckoutSessionWithFreeTrial(customerId, url, priceId);
                    break;
                case EnumTipoCheckout.FREE:
                    checkoutSession = await this.paymentGateway.createChckoutSessioFremium(customerId, url, priceId);
                    break;
                case EnumTipoCheckout.NORMAL_SUBSCRIPTION:
                    checkoutSession = await this.paymentGateway.createCheckoutSession(customerId, url, priceId);
                    break;
                default:
                    throw new Error("Tipo de checkout inválido");
            }

            return checkoutSession?.url;
        }catch(e){
            console.log(e);
        }
    }
}