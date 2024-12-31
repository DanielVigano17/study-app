import { CreateCustomerDTO, IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import Stripe from "stripe";

export class StripeRepository implements IPaymentGateway {
    
    private stripe: Stripe;

    constructor() {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        
        if (!secretKey) {
            throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
        }
        
        this.stripe = new Stripe(secretKey)
    }

    async createCustomer(custumer: CreateCustomerDTO){
        const customer = await this.stripe.customers.create({
            name: custumer.name,
            email: custumer.email || "",
            metadata : {
                userId : custumer.userId
            }
          });

          return customer.id;
    }

    async createSubscription(custumerId: string){
        const subscription = await this.stripe.subscriptions.create({
            customer: custumerId,
            items: [
              {
                price: 'price_1QbYMcP3utzNziQ1636UZ1Nv',
              },
            ],
          });

          return subscription.id;
    };
}
