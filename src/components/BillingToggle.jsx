// src/components/BillingToggle.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Monthly / Yearly billing toggle pill with animated active state
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

export default function BillingToggle({ billing, onChange }) {
  return (
    <div
      className="toggle-wrap"
      role="radiogroup"
      aria-label="Select billing period"
    >
      {["monthly", "yearly"].map((option) => (
        <button
          key={option}
          className={`toggle-btn ${billing === option ? "active" : ""}`}
          role="radio"
          aria-checked={billing === option}
          onClick={() => onChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
          {option === "yearly" && (
            <span className="badge-save" aria-label="Save 20 percent">
              −20%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
