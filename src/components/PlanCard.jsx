// src/components/PlanCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Renders a single pricing plan card.
// Props:
//   plan         — plan data object
//   billing      — "monthly" | "yearly"
//   symbol       — currency symbol ("$" | "€")
//   price        — formatted price string
//   monthlyPrice — original monthly price (for strikethrough)
//   savings      — yearly savings amount
//   annualTotal  — total billed per year
//   index        — card index for staggered animation
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";

function CheckIcon() {
  return (
    <span className="feature-icon" aria-hidden="true">
      ✓
    </span>
  );
}

export default function PlanCard({
  plan,
  billing,
  symbol,
  price,
  monthlyPrice,
  savings,
  annualTotal,
  index,
}) {
  const [clicked, setClicked] = useState(false);
  const isYearly = billing === "yearly";

  function handleCTA() {
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
    // In a real app: navigate to checkout, open modal, etc.
    alert(
      `🚀 Starting with the ${plan.name} plan!\n\nIn production this would open checkout.`
    );
  }

  return (
    <article
      className={`card ${plan.recommended ? "recommended" : ""}`}
      style={{ animationDelay: `${0.15 + index * 0.1}s` }}
      role="listitem"
      aria-label={`${plan.name} plan`}
      aria-selected={plan.recommended || undefined}
    >
      {/* Recommended badge */}
      {plan.recommended && (
        <div className="rec-badge" aria-label="Recommended plan">
          Recommended
        </div>
      )}

      {/* Card header */}
      <div className="card-tier">{plan.tier}</div>
      <div className="card-name">{plan.name}</div>
      <div className="card-tagline">{plan.tagline}</div>

      {/* Price block */}
      <div className="price-block">
        {/* Strikethrough original price (yearly only) */}
        <div className="price-original" aria-hidden={!isYearly}>
          {isYearly ? (
            <span>
              {symbol}
              {monthlyPrice} / mo
            </span>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>

        <div className="price-main">
          <span className="price-currency" aria-hidden="true">
            {symbol}
          </span>
          <span
            key={`${price}-${billing}-${symbol}`} /* key triggers re-animation */
            className="price-amount price-flash"
            aria-label={`Price: ${symbol}${price} per month`}
          >
            {price}
          </span>
          <span className="price-period">/ mo</span>
        </div>

        <div className="price-billed">
          {isYearly ? (
            <>
              Billed {symbol}
              {annualTotal} / year{" "}
              <span className="savings">
                Save {symbol}
                {savings}
              </span>
            </>
          ) : (
            "Billed monthly"
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="card-divider" role="separator" />

      {/* Features list */}
      <div className="features-label">What's included</div>
      <ul
        className="features"
        aria-label={`Features in ${plan.name} plan`}
      >
        {plan.features.map((feature, i) => (
          <li key={i} className="feature">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        className={`cta ${plan.recommended ? "cta-gold" : "cta-ghost"} ${
          clicked ? "clicked" : ""
        }`}
        onClick={handleCTA}
        aria-label={`${plan.cta} — ${plan.name} plan`}
      >
        {clicked ? "✓ Let's go!" : plan.cta}
      </button>
    </article>
  );
}
