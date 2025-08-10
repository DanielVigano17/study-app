import { StripeRepository } from "@/repositories/stripeRepository";
import stripeProducts from "@/config/stripe-products";
import Stripe from "stripe";

export class StripeSyncService {
    constructor(private stripeRepo: StripeRepository) {}

    async syncProducts() {
        const results = {
            created: [] as string[],
            updated: [] as string[],
            errors: [] as string[]
        };

        const productsToSync = stripeProducts; // já é array tipado

        for (const product of productsToSync) {
            try {
                let stripeProduct = await this.stripeRepo.getProduct(product.id).catch(() => null);

                if (stripeProduct) {
                    stripeProduct = await this.stripeRepo.updateProduct(product.id, {
                        name: product.name,
                        description: product.description,
                        metadata: {
                            features: JSON.stringify(product.features)
                        }
                    });
                    results.updated.push(product.id);
                } else {
                    stripeProduct = await this.stripeRepo.createProduct({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        metadata: {
                            features: JSON.stringify(product.features)
                        }
                    });
                    results.created.push(product.id);
                }

                for (const price of product.prices) {
                    try {
                        let stripePrice = await this.stripeRepo.getPrice(price.id).catch(() => null);

                        console.log("stripePrice", stripePrice);

                        if (!stripePrice) {
                            stripePrice = await this.stripeRepo.createPrice({
                                product: product.id,
                                currency: price.currency,
                                unit_amount: price.unit_amount,
                                recurring: price.recurring as Stripe.PriceCreateParams.Recurring
                            });
                            // opcional: não sobrescrevemos o id local
                            results.created.push(`${product.id}:${price.id}`);
                        }
                    } catch (error) {
                        results.errors.push(`Erro ao sincronizar preço ${price.id}: ${error}`);
                    }
                }
            } catch (error) {
                results.errors.push(`Erro ao sincronizar produto ${product.id}: ${error}`);
            }
        }

        return results;
    }
} 