import { auth } from "../../../../auth/auth";
import { StripeRepository } from "@/repositories/stripeRepository";

export class CreateCheckoutSession {
    constructor(private paymentGateway : StripeRepository){}

    async execute(successUrl: string,usuarioJaUtilizouFreeTrial: boolean, priceId?: string){
        try{
            const session = await auth();

            const customerId = session?.user.customerId

            if(!customerId) throw new Error("Erro ao obter customerId");

            const url = `${process.env.NEXT_PUBLIC_APP_URL}${successUrl}`;

            const checkoutSession = usuarioJaUtilizouFreeTrial 
                ? await this.paymentGateway.createCheckoutSession(customerId, url, priceId)
                : await this.paymentGateway.createCheckoutSessionWithFreeTrial(customerId, url, priceId);

            return checkoutSession.url;
        }catch(e){
            console.log(e);
        }
    }
}