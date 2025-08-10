import stripeProducts, { StripeProduct as Plan, StripeProductPrice as Price, StripeProductFeature as Feature } from '@/config/stripe-products';

export class PlansService {
  static getPlans(): Plan[] {
    return stripeProducts;
  }

  static getPlanById(planId: string): Plan | undefined {
    return this.getPlans().find(plan => plan.id === planId);
  }

  static getPriceById(priceId: string): Price | undefined {
    for (const plan of this.getPlans()) {
      const price = plan.prices.find(p => p.id === priceId);
      if (price) return price;
    }
    return undefined;
  }

  static getPlanByPriceId(priceId: string): Plan | undefined {
    return this.getPlans().find(plan => 
      plan.prices.some(price => price.id === priceId)
    );
  }
} 