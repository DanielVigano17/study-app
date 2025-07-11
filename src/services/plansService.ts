import stripeProducts from '@/config/stripe-products.json';

export interface Feature {
  lookup_key: string;
  name: string;
  feature_presentation: string;
  value: string;
}

export interface Price {
  id: string;
  type: string;
  recurring: {
    interval: string;
  };
  currency: string;
  unit_amount: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  prices: Price[];
}

export class PlansService {
  static getPlans(): Plan[] {
    return stripeProducts.products as Plan[];
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