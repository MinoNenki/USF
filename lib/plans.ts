export type PlanKey = 'free' | 'starter25' | 'growth50' | 'business99';

export const PLANS = {
  free: {
    key: 'free',
    name: 'Free',
    audience: 'Test produktu',
    priceLabel: '$0',
    monthlyCredits: 1,
    monthlyAnalyses: 1,
    stripePriceEnv: null,
    featured: false,
    description: 'Na start dla osoby prywatnej lub firmy, która chce sprawdzić jakość raportu.',
    bullets: ['1 analiza / miesiąc', '1 kredyt startowy', 'Historia analiz', 'Panel użytkownika'],
  },
  starter25: {
    key: 'starter25',
    name: 'Starter',
    audience: 'Prywatni + freelancerzy',
    priceLabel: '$25',
    monthlyCredits: 10,
    monthlyAnalyses: 10,
    stripePriceEnv: 'STRIPE_PRICE_25',
    featured: false,
    description: 'Dla osób prywatnych, freelancerów i małych działalności, które potrzebują regularnych analiz.',
    bullets: ['10 kredytów / miesiąc', '10 analiz / miesiąc', 'Raporty dla ofert, reklam i landing page', 'Pełna historia analiz'],
  },
  growth50: {
    key: 'growth50',
    name: 'Growth',
    audience: 'Mikro i małe firmy',
    priceLabel: '$50',
    monthlyCredits: 30,
    monthlyAnalyses: 40,
    stripePriceEnv: 'STRIPE_PRICE_50',
    featured: true,
    description: 'Najlepszy plan dla małych firm i sklepów online. Więcej analiz niż kredytów zwiększa atrakcyjność oferty.',
    bullets: ['30 kredytów / miesiąc', '40 analiz / miesiąc', 'Bonusowe 10 analiz', 'Najlepszy stosunek ceny do wartości'],
  },
  business99: {
    key: 'business99',
    name: 'Business',
    audience: 'Firmy i agencje',
    priceLabel: '$99',
    monthlyCredits: 120,
    monthlyAnalyses: 130,
    stripePriceEnv: 'STRIPE_PRICE_99',
    featured: false,
    description: 'Dla firm, agencji i zespołów, które chcą generować dużo analiz i pracować seryjnie.',
    bullets: ['120 kredytów / miesiąc', '130 analiz / miesiąc', 'Bonusowe 10 analiz', 'Gotowe do większej skali'],
  },
} as const;

export const PLAN_ORDER = [PLANS.free, PLANS.starter25, PLANS.growth50, PLANS.business99];

export const getPlanByStripePriceId = (priceId: string | null | undefined): PlanKey | null => {
  if (!priceId) return null;

  if (priceId === process.env.STRIPE_PRICE_25) return 'starter25';
  if (priceId === process.env.STRIPE_PRICE_50) return 'growth50';
  if (priceId === process.env.STRIPE_PRICE_99) return 'business99';

  return null;
};
