// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Root component. Composes all sub-components and wires up the usePricing hook.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { usePricing } from "./hooks/usePricing";
import BillingToggle from "./components/BillingToggle";
import CurrencySelector from "./components/CurrencySelector";
import PlanCard from "./components/PlanCard";
import SkeletonCard from "./components/SkeletonCard";
import "./App.css";

// ── Background decorative elements ───────────────────────────────────────────
function Background() {
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
    </>
  );
}

// ── Top navigation bar ────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        N<span>e</span>xus
      </div>
      <div className="header-tag">Subscription Pricing</div>
    </header>
  );
}

// ── Hero section ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-eyebrow" aria-hidden="true">
        Choose your plan
      </div>
      <h1 id="hero-heading">
        Invest in your <em>potential</em>
      </h1>
      <p>
        Transparent, fair pricing — no hidden fees, no surprises.
        <br />
        Cancel or change anytime.
      </p>
    </section>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p>{message}</p>
      <button className="cta cta-ghost" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

// ── Footer note ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer-note">
      All plans include a 14-day free trial · No credit card required · Secure
      payments via Stripe
      <br />
      Data served from{" "}
      <a
        href="#mock-api"
        onClick={(e) => e.preventDefault()}
        aria-label="Mock API endpoint"
      >
        mock API (pricing.js)
      </a>{" "}
      — updates dynamically on every selection change
    </footer>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const {
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
    retry,
  } = usePricing();

  return (
    <div className="app">
      <Background />

      <div className="wrapper">
        <Header />
        <Hero />

        {/* ── Controls bar ─────────────────────────────────────────────── */}
        <div
          className="controls"
          role="group"
          aria-label="Pricing display options"
        >
          <BillingToggle billing={billing} onChange={setBilling} />
          <CurrencySelector currency={currency} onChange={setCurrency} />
        </div>

        {/* ── Cards grid ───────────────────────────────────────────────── */}
        {error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <div className="cards" role="list" aria-label="Pricing plans">
            {loading
              ? [0, 1, 2].map((i) => <SkeletonCard key={i} index={i} />)
              : plans.map((plan, index) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    index={index}
                    billing={billing}
                    symbol={symbol}
                    price={getPrice(plan)}
                    monthlyPrice={getMonthlyPrice(plan)}
                    savings={getSavings(plan)}
                    annualTotal={getAnnualTotal(plan)}
                  />
                ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
