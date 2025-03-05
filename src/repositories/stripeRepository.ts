import { Subscription } from "@/domain/entities/Subscription";
import { CreateCustomerDTO, IPaymentGateway } from "@/domain/interfaces/paymentGatewayInterface";
import Stripe from "stripe";

interface Invoice {
    id: string;
    date: Date;
    status: 'paid' | 'open' | 'uncollectible' | 'void';
    amount: number;
    plan: string;
    pdfUrl?: string;
}

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
        amount : (subscription.items.data[0].plan.amount || 0) / 100,
        nextBillingDate: new Date(subscription.current_period_end * 1000)
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

    async updateCustomer(customerId: string, customerDetails : Stripe.CustomerUpdateParams) : Promise<Stripe.Customer>{
      const customer = await this.stripe.customers.update(
        customerId,
        customerDetails
      )
      return customer;
    };

    async updateSubscription(subscriptionId: string, subscriptionDetails : Stripe.SubscriptionUpdateParams) : Promise<Stripe.Subscription>{
      const subscription = await this.stripe.subscriptions.update(
        subscriptionId,
        subscriptionDetails
      );
      return subscription;
  };

  async listInvoices(customerId: string): Promise<Invoice[]> {
    const invoices = await this.stripe.invoices.list({
        customer: customerId,
        limit: 10,
        expand: ['data.subscription']
    });

    return invoices.data.map(invoice => ({
        id: invoice.number || invoice.id,
        date: new Date(invoice.created * 1000),
        status: (invoice.status || 'void') as 'paid' | 'open' | 'uncollectible' | 'void',
        amount: invoice.amount_paid ? invoice.amount_paid / 100 : 0,
        plan: (invoice.subscription as Stripe.Subscription)?.items.data[0]?.price.nickname || 'Plano',
        pdfUrl: invoice.invoice_pdf || undefined
    }));
  }
}
