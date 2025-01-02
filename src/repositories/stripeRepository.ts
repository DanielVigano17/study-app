import { Subscription } from "@/domain/entities/Subscription";
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
    async findSubscription(subscriptionId: string) {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      console.log(subscription);
      const subscriptionObject : Subscription = {
        customerId : subscription.customer.toString(),
        metadata : subscription.metadata,
        subscriptionId : subscription.id,
        status : subscription.status,
        amount : (subscription.items.data[0].plan.amount || 0) / 100
      }
      return subscriptionObject;
    };

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

    async createSubscription(customerId: string){
        const priceDetails = await this.stripe.prices.retrieve('price_1QbYMcP3utzNziQ1636UZ1Nv');

        const subscription = await this.stripe.subscriptions.create({
            customer: customerId,
            items: [
              {
                price: 'price_1QbYMcP3utzNziQ1636UZ1Nv',
              },
            ],
            metadata : {
              productId : priceDetails.product.toString()
            }
          });

          return subscription.id;
    };
    async createBillingPortal(customerId: string) : Promise<Stripe.BillingPortal.Session>{
      const portalBilling = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: 'https://example.com/account',
      });

        return portalBilling;
  };

    async retriveProduct(productId: string) : Promise<Stripe.Product>{
        const product = await this.stripe.products.retrieve(productId);
        return product;
  };
}
