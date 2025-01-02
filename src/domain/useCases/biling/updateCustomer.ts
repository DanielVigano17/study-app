import { IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import { StripeRepository } from "@/repositories/stripeRepository";
import Stripe from "stripe";

export class UpdateCustomer {
  constructor(private stripeRepository: StripeRepository) {}

  async execute(customerId : string,updateCustomerDTO : Stripe.CustomerUpdateParams){
    const customer = await this.stripeRepository.updateCustomer(customerId, updateCustomerDTO);

    return customer;
  }
  
}
