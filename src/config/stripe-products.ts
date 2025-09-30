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
      development: "price_1Rufn5P3utzNziQ1gxvLpj7A",
      production: "price_1S4mOdP3utzNziQ11AYQbojg"
    },
    yearly: {
      development: "price_1Rufn6P3utzNziQ1U2x3iXjj", 
      production: "price_1S4mOdP3utzNziQ1Yzn3ABRP"
    }
  },
  pro: {
    monthly: {
      development: "price_1Rufn7P3utzNziQ1qfbW5Ns3",
      production: "price_1S4mOkP3utzNziQ1zFC12hHc"
    },
    yearly: {
      development: "price_1Rufn7P3utzNziQ1KHo3q5BS",
      production: "price_1S4mOjP3utzNziQ10W5Ibjy1"
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
      { id: getPriceId('basic', 'monthly'), type: "recurring", recurring: { interval: "month" }, currency: "brl", unit_amount: 2190 },
      { id: getPriceId('basic', 'yearly'), type: "recurring", recurring: { interval: "year" }, currency: "brl", unit_amount: 19800 }
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
      { id: getPriceId('pro', 'monthly'), type: "recurring", recurring: { interval: "month" }, currency: "brl", unit_amount: 3990 },
      { id: getPriceId('pro', 'yearly'), type: "recurring", recurring: { interval: "year" }, currency: "brl", unit_amount: 35900 }
    ]
  }
];

export default stripeProducts;
