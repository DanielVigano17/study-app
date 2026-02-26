export type StripeProductFeature = {
  lookup_key: string;
  name: string;
  feature_presentation: string;
  value: string;
};

export type StripeProductPrice = {
  id: string;
  type: string;
  recurring: { interval: "month" | "year" };
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

// Definição dos produtos e seus preços em um único lugar
const stripeProducts: StripeProduct[] = [
  {
    id: "free",
    name: "Plano Grátis",
    description:
      "Comece gratuitamente com limites reduzidos para testar a plataforma sem compromisso.",
    features: [
      {
        lookup_key: "flashcards",
        name: "Flashcards",
        feature_presentation: "20 flashcards",
        value: "20",
      },
      {
        lookup_key: "quizzes",
        name: "Questionários",
        feature_presentation: "5 questionários",
        value: "5",
      },
      {
        lookup_key: "materias",
        name: "Materias",
        feature_presentation: "3 materias",
        value: "3",
      },
    ],
    prices: [
      {
        id:
          process.env.NODE_ENV === "production"
            ? "price_FREE_MONTHLY_PROD"
            : "price_1T52vPP3utzNziQ1wKFvdwvY",
        type: "recurring",
        recurring: { interval: "month" },
        currency: "brl",
        unit_amount: 0,
      },
      {
        id:
          process.env.NODE_ENV === "production"
            ? "price_FREE_YEARLY_PROD"
            : "price_1T53ACP3utzNziQ1as3eRVPV",
        type: "recurring",
        recurring: { interval: "year" },
        currency: "brl",
        unit_amount: 0,
      },
    ],
  },
  {
    id: "basic",
    name: "Plano Básico",
    description: "Acesso básico à plataforma",
    features: [
      {
        lookup_key: "flashcards",
        name: "Flashcards",
        feature_presentation: "60 flashcards",
        value: "60",
      },
      {
        lookup_key: "quizzes",
        name: "Questionários",
        feature_presentation: "15 questionários",
        value: "15",
      },
      {
        lookup_key: "materias",
        name: "Materias",
        feature_presentation: "15 materias",
        value: "15",
      },
    ],
    prices: [
      {
        id:
          process.env.NODE_ENV === "production"
            ? "price_1SZLkKP3utzNziQ1QF5hddKc"
            : "price_1SZL9lP3utzNziQ1W7fvhXOO",
        type: "recurring",
        recurring: { interval: "month" },
        currency: "brl",
        unit_amount: 950,
      },
      {
        id:
          process.env.NODE_ENV === "production"
            ? "price_1SZLkhP3utzNziQ1lQb3QRkb"
            : "price_1SZLBKP3utzNziQ1vBBSG4eM",
        type: "recurring",
        recurring: { interval: "year" },
        currency: "brl",
        unit_amount: 8550,
      },
    ],
  },
  {
    id: "pro",
    name: "Plano Pro",
    description:
      "Acesso a todas as funcionalidades da plataforma com a maior quantidade de recursos",
    features: [
      {
        lookup_key: "flashcards",
        name: "Flashcards",
        feature_presentation: "180 flashcards",
        value: "180",
      },
      {
        lookup_key: "quizzes",
        name: "Questionários",
        feature_presentation: "30 questionários",
        value: "30",
      },
      {
        lookup_key: "materias",
        name: "Materias",
        feature_presentation: "30 materias",
        value: "30",
      },
    ],
    prices: [
      {
        id:
          process.env.NODE_ENV === "production"
            ? "price_1SZLioP3utzNziQ1IG6972v1"
            : "price_1SZLVUP3utzNziQ1laQEI0FR",
        type: "recurring",
        recurring: { interval: "month" },
        currency: "brl",
        unit_amount: 1799,
      },
      {
        id:
          process.env.NODE_ENV === "production"
            ? "price_1SZLjIP3utzNziQ1wiPFUmbX"
            : "price_1SZLWqP3utzNziQ1BIOUTW0g",
        type: "recurring",
        recurring: { interval: "year" },
        currency: "brl",
        unit_amount: 16199,
      },
    ],
  },
];

// Mantém a função auxiliar usada na landing page
export const getPriceId = (
  plan: "free" | "basic" | "pro",
  interval: "monthly" | "yearly"
): string => {
  const product = stripeProducts.find((p) => p.id === plan);
  if (!product) {
    throw new Error(`Plano não encontrado: ${plan}`);
  }

  const stripeInterval = interval === "monthly" ? "month" : "year";
  const price = product.prices.find(
    (p) => p.recurring.interval === stripeInterval
  );

  if (!price) {
    throw new Error(
      `Preço não encontrado para o plano ${plan} com intervalo ${interval}`
    );
  }

  return price.id;
};

export default stripeProducts;
