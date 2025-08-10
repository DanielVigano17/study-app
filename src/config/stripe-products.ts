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

export type StripeProduct = {
  id: string;
  name: string;
  description: string;
  features: StripeProductFeature[];
  prices: StripeProductPrice[];
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
      { id: "price_1Rufn5P3utzNziQ1gxvLpj7A", type: "recurring", recurring: { interval: "month" }, currency: "brl", unit_amount: 2190 },
      { id: "price_1Rufn6P3utzNziQ1U2x3iXjj", type: "recurring", recurring: { interval: "year" }, currency: "brl", unit_amount: 19800 }
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
      { id: "price_1Rufn7P3utzNziQ1qfbW5Ns3", type: "recurring", recurring: { interval: "month" }, currency: "brl", unit_amount: 3990 },
      { id: "price_1Rufn7P3utzNziQ1KHo3q5BS", type: "recurring", recurring: { interval: "year" }, currency: "brl", unit_amount: 35900 }
    ]
  }
];

export default stripeProducts;
