import { Subscription } from "../entities/Subscription"
import Stripe from "stripe";

export interface CreateCustomerDTO {
    email : string
    name? : string
    userId : string
}

export interface Invoice {
    id: string;
    date: Date;
    status: 'paid' | 'open' | 'uncollectible' | 'void';
    amount: number;
    plan: string;
    pdfUrl?: string;
}

export interface IPaymentGateway {
    createCustomer : (custumer : CreateCustomerDTO) => Promise<string>
    createSubscription : (custumerId : string) => Promise<string>
    findSubscription : (customerId : string) => Promise<Subscription>
    listInvoices : (customerId : string) => Promise<Invoice[]>
    createCheckoutSession : (customerId : string, successUrl: string, priceId?: string) => Promise<any>
    getPrice : (priceId : string) => Promise<Stripe.Price>
}