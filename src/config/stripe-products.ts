export type StripeProductFeature = {
  lookup_key: string;
  name: string;
  feature_presentation: string;
  value: string;
};

export type StripeProductPrice = {
  id: string;
  type: string;
  recurring: { interval: string };
  currency: string;
  unit_amount: number;
};

type EnvironmentPrices = {
  development: string;
  production: string;
};

export type StripeProduct = {
  id: string;
  name: string;
  description: string;
  features: StripeProductFeature[];
  prices: StripeProductPrice[];
};

// IDs dos preços por ambiente
const priceIds = {
  basic: {
    monthly: {
      development: "price_1SZL9lP3utzNziQ1W7fvhXOO",
      production: "price_1SZLkKP3utzNziQ1QF5hddKc"
    },
    yearly: {
      development: "price_1SZLBKP3utzNziQ1vBBSG4eM", 
      production: "price_1SZLkhP3utzNziQ1lQb3QRkb"
    }
  },
  pro: {
    monthly: {
      development: "price_1SZLVUP3utzNziQ1laQEI0FR",
      production: "price_1SZLioP3utzNziQ1IG6972v1"
    },
    yearly: {
      development: "price_1SZLWqP3utzNziQ1BIOUTW0g",
      production: "price_1SZLjIP3utzNziQ1wiPFUmbX"
    }
  }
};

// Função para obter o ID do preço baseado no ambiente
export const getPriceId = (plan: keyof typeof priceIds, interval: 'monthly' | 'yearly'): string => {
  const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
  return priceIds[plan][interval][environment];
};

const stripeProducts: StripeProduct[] = [
  {
    id: "basic",
    name: "Plano Básico",
    description: "Acesso básico à plataforma",
    features: [
      { lookup_key: "flashcards", name: "Flashcards", feature_presentation: "60 flashcards", value: "60" },
      { lookup_key: "quizzes", name: "Questionários", feature_presentation: "15 questionários", value: "15" },
      { lookup_key: "materias", name: "Materias", feature_presentation: "15 materias", value: "15" }
    ],
    prices: [
      { id: getPriceId('basic', 'monthly'), type: "recurring", recurring: { interval: "month" }, currency: "brl", unit_amount: 950 },
      { id: getPriceId('basic', 'yearly'), type: "recurring", recurring: { interval: "year" }, currency: "brl", unit_amount: 8550 }
    ]
  },
  {
    id: "pro",
    name: "Plano Pro",
    description: "Acesso a todas as funcionalidades da plataforma com a maior quantidade de recursos",
    features: [
      { lookup_key: "flashcards", name: "Flashcards", feature_presentation: "180 flashcards", value: "180" },
      { lookup_key: "quizzes", name: "Questionários", feature_presentation: "30 questionários", value: "30" },
      { lookup_key: "materias", name: "Materias", feature_presentation: "30 materias", value: "30" }
    ],
    prices: [
      { id: getPriceId('pro', 'monthly'), type: "recurring", recurring: { interval: "month" }, currency: "brl", unit_amount: 1799 },
      { id: getPriceId('pro', 'yearly'), type: "recurring", recurring: { interval: "year" }, currency: "brl", unit_amount: 16199 }
    ]
  }
];

export default stripeProducts;
