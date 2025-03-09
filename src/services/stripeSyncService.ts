import { StripeRepository } from "@/repositories/stripeRepository";
import stripeProducts from "@/config/stripe-products.json";
import Stripe from "stripe";

export class StripeSyncService {
    constructor(private stripeRepo: StripeRepository) {}

    async syncProducts() {
        const results = {
            created: [] as string[],
            updated: [] as string[],
            errors: [] as string[]
        };

        // Cria uma cópia dos produtos para manipulação
        const productsToSync = JSON.parse(JSON.stringify(stripeProducts.products));
        let configUpdated = false;

        for (const product of productsToSync) {
            try {
                // Busca produto existente ou cria novo
                let stripeProduct = await this.stripeRepo.getProduct(product.id).catch(() => null);

                if (stripeProduct) {
                    // Atualiza produto existente
                    stripeProduct = await this.stripeRepo.updateProduct(product.id, {
                        name: product.name,
                        description: product.description,
                        metadata: {
                            features: JSON.stringify(product.features)
                        }
                    });
                    results.updated.push(product.id);
                } else {
                    // Cria novo produto
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

                // Sincroniza preços
                for (const price of product.prices) {
                    try {
                        let stripePrice = await this.stripeRepo.getPrice(price.id).catch(() => null);

                        if (!stripePrice) {
                            // Cria novo preço
                            stripePrice = await this.stripeRepo.createPrice({
                                product: product.id,
                                currency: price.currency,
                                unit_amount: price.unit_amount,
                                recurring: price.recurring as Stripe.PriceCreateParams.Recurring
                            });
                            
                            // Atualiza o ID do preço no array de produtos
                            price.id = stripePrice.id;
                            configUpdated = true;
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