// src/components/CurrencySelector.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Dropdown to switch between USD and EUR
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { CURRENCY_LABELS } from "../data/pricing";

export default function CurrencySelector({ currency, onChange }) {
  return (
    <select
      className="currency-select"
      value={currency}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select currency"
    >
      {Object.entries(CURRENCY_LABELS).map(([code, label]) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
