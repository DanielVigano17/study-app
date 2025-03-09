import { StripeRepository } from "@/repositories/stripeRepository";
import Stripe from "stripe";

export class RetriveProduct {

    constructor(private stripeRepository : StripeRepository){}

    async execute(productId? : string) : Promise<Stripe.Product | null>{

        if(!productId) return null;

        const product = await this.stripeRepository.retriveProduct(productId);
        return product;
    }
}