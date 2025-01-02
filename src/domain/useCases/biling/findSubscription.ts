import { auth } from "@/auth";
import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { StripeRepository } from "@/repositories/stripeRepository";

export class FindSubscription {

    constructor(private paymentGateway : IPaymentGateway){}

    async execute(){
            try{
                const session = await auth();
    
                const subscriptionId = session?.user.subscriptionId
    
                if(!subscriptionId) throw new Error("Erro ao obter customerId");
    
                const subscription = await this.paymentGateway.findSubscription(subscriptionId);

                return subscription;
            }catch(e){
                console.log(e);
            }
        }
}