// src/hooks/usePricing.js
// ─────────────────────────────────────────────────────────────────────────────
// Custom React hook that manages:
//   - fetching pricing data from the mock API
//   - billing toggle state (monthly / yearly)
//   - currency state (USD / EUR)
//   - computed price values
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { fetchPricingData, CURRENCY_SYMBOLS } from "../data/pricing";

export function usePricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"
  const [currency, setCurrency] = useState("USD");   // "USD" | "EUR"

  // Fetch data on mount (and whenever we need to refresh)
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPricingData();
      setPlans(data.plans);
    } catch (err) {
      setError("Failed to load pricing. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute display price for a plan
  const getPrice = useCallback(
    (plan) => {
      const raw = plan.prices[currency][billing];
      return raw % 1 === 0 ? raw.toFixed(0) : raw.toFixed(2);
    },
    [currency, billing]
  );

  // Compute monthly price (for strikethrough)
  const getMonthlyPrice = useCallback(
    (plan) => {
      const raw = plan.prices[currency]["monthly"];
      return raw % 1 === 0 ? raw.toFixed(0) : raw.toFixed(2);
    },
    [currency]
  );

  // Annual savings amount
  const getSavings = useCallback(
    (plan) => {
      const monthly = plan.prices[currency]["monthly"];
      const yearly = plan.prices[currency]["yearly"];
      return ((monthly - yearly) * 12).toFixed(0);
    },
    [currency]
  );

  // Annual billed total
  const getAnnualTotal = useCallback(
    (plan) => {
      return (plan.prices[currency]["yearly"] * 12).toFixed(2);
    },
    [currency]
  );

  const symbol = CURRENCY_SYMBOLS[currency];

  return {
    plans,
    loading,
    error,
    billing,
    setBilling,
    currency,
    setCurrency,
    getPrice,
    getMonthlyPrice,
    getSavings,
    getAnnualTotal,
    symbol,
    retry: loadData,
  };
}
