// src/components/SkeletonCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Placeholder card shown while pricing data is being fetched.
// Uses a shimmer animation to indicate loading.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

export default function SkeletonCard({ index }) {
  return (
    <div
      className="card skeleton-card"
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-hidden="true"
    >
      <div className="skel skel-sm" />
      <div className="skel skel-md" style={{ width: "60%" }} />
      <div className="skel skel-xs" style={{ width: "80%", marginBottom: 28 }} />

      <div className="skel skel-price" />
      <div className="skel skel-xs" style={{ width: "50%", marginBottom: 32 }} />

      <div className="card-divider" />
      <div style={{ marginTop: 24 }}>
        {[90, 75, 85, 70].map((w, i) => (
          <div
            key={i}
            className="skel skel-xs"
            style={{ width: `${w}%`, marginBottom: 12 }}
          />
        ))}
      </div>

      <div className="skel skel-btn" style={{ marginTop: 32 }} />
    </div>
  );
}
