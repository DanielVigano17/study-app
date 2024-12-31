import { auth } from "@/auth";
import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { StripeRepository } from "@/repositories/stripeRepository";

export class CreateBillingPortal {
    constructor(private paymentGateway : StripeRepository){}

    async execute(){
        try{
            const session = await auth();

            const customerId = session?.user.customerId

            if(!customerId) throw new Error("Erro ao obter customerId");

            const billingPortalUrl = await this.paymentGateway.createBillingPortal(customerId);
            return billingPortalUrl.url;
        }catch(e){
            console.log(e);
        }
    }
}