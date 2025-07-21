import { auth } from "../../../../auth/auth";
import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { StripeRepository } from "@/repositories/stripeRepository";

export class CreateCheckoutSession {
    constructor(private paymentGateway : StripeRepository){}

    async execute(priceId?: string){
        try{
            const session = await auth();

            const customerId = session?.user.customerId

            if(!customerId) throw new Error("Erro ao obter customerId");

            const checkoutSession = await this.paymentGateway.createCheckoutSession(customerId, priceId);
            return checkoutSession.url;
        }catch(e){
            console.log(e);
        }
    }
}