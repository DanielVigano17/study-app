import { auth } from "@/auth";
import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { StripeRepository } from "@/repositories/stripeRepository";

export class FindSubscription {

    constructor(private paymentGateway : IPaymentGateway){}

    async execute(subscriptionId : string){
            try{
                const subscription = await this.paymentGateway.findSubscription(subscriptionId);
                return subscription;
            }catch(e){
                console.log(e);
            }
        }
}