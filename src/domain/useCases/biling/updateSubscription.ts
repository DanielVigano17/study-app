import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { StripeRepository } from "@/repositories/stripeRepository";
import Stripe from "stripe";

export class UpdateSubscription {
  constructor(private stripeRepository: StripeRepository) {}

  async execute(subscriptionId : string,updateSubscriptionDTO : Stripe.SubscriptionUpdateParams){
    const subscription = await this.stripeRepository.updateSubscription(subscriptionId, updateSubscriptionDTO);

    return subscription;
  }
  
}
