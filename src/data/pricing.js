// src/data/pricing.js
// ─────────────────────────────────────────────────────────────────────────────
// This file simulates an external API / JSON feed.
// In production, replace fetchPricingData() with a real fetch() call:
//   const res = await fetch('/api/pricing');
//   return res.json();
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
};

export const CURRENCY_LABELS = {
  USD: "🇺🇸 USD — Dollar",
  EUR: "🇪🇺 EUR — Euro",
};

const MOCK_DATA = {
  plans: [
    {
      id: "basic",
      tier: "01 / Basic",
      name: "Essential",
      tagline: "Everything you need to get started.",
      prices: {
        USD: { monthly: 12, yearly: 9.6 },
        EUR: { monthly: 11, yearly: 8.8 },
      },
      features: [
        "Up to 3 projects",
        "5 GB cloud storage",
        "Email support (48h response)",
        "Core analytics dashboard",
        "API access (1,000 req/mo)",
      ],
      recommended: false,
      cta: "Start for free",
    },
    {
      id: "standard",
      tier: "02 / Standard",
      name: "Professional",
      tagline: "The smart choice for serious work.",
      prices: {
        USD: { monthly: 39, yearly: 31.2 },
        EUR: { monthly: 36, yearly: 28.8 },
      },
      features: [
        "Unlimited projects",
        "50 GB cloud storage",
        "Priority support (4h SLA)",
        "Advanced analytics & exports",
        "API access (50,000 req/mo)",
        "Team collaboration (5 seats)",
        "Custom integrations",
      ],
      recommended: true,
      cta: "Get Professional",
    },
    {
      id: "premium",
      tier: "03 / Premium",
      name: "Enterprise",
      tagline: "Full power, zero limits.",
      prices: {
        USD: { monthly: 89, yearly: 71.2 },
        EUR: { monthly: 82, yearly: 65.6 },
      },
      features: [
        "Everything in Professional",
        "500 GB cloud storage",
        "Dedicated account manager",
        "Custom SLA & uptime guarantee",
        "Unlimited API access",
        "Unlimited team seats",
        "SSO & advanced security",
        "White-label options",
      ],
      recommended: false,
      cta: "Contact sales",
    },
  ],
};

// Simulates network latency — swap with real fetch() in production
export async function fetchPricingData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(MOCK_DATA), 700)
  );
}
