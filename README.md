# Nexus — Dynamic Pricing Dashboard (React)

A responsive, interactive subscription pricing dashboard built with **React 18**.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
# Opens automatically at http://localhost:3000

# 3. Build for production
npm run build
```

**Requirements:** Node.js 16+ and npm installed.

---

## 📁 Project Structure

```
nexus-pricing/
├── public/
│   └── index.html              ← HTML shell (Google Fonts loaded here)
├── src/
│   ├── data/
│   │   └── pricing.js          ← Mock API + all pricing data
│   ├── hooks/
│   │   └── usePricing.js       ← Custom hook: state + data fetching
│   ├── components/
│   │   ├── BillingToggle.jsx   ← Monthly/Yearly toggle pill
│   │   ├── CurrencySelector.jsx← USD/EUR dropdown
│   │   ├── PlanCard.jsx        ← Individual pricing card
│   │   └── SkeletonCard.jsx    ← Loading placeholder
│   ├── App.jsx                 ← Root component (composes everything)
│   ├── App.css                 ← All styles (CSS variables, animations)
│   └── index.js                ← React entry point
├── package.json
└── README.md
```

---

## ✅ Features Implemented

| Requirement | How |
|---|---|
| 3 plans: Basic, Standard, Premium | `pricing.js` → `PlanCard.jsx` |
| Price, billing period, 4+ features | All in `pricing.js` data |
| Monthly ↔ Yearly toggle | `BillingToggle.jsx` + `usePricing.js` state |
| Yearly = 20% discount | Prices pre-calculated in `pricing.js` |
| Savings shown on yearly | `getSavings()` in `usePricing.js` |
| Currency selector (USD / EUR) | `CurrencySelector.jsx` |
| **Recommended plan highlighted** | `recommended: true` in data → gold card style |
| **Mock API / external JSON** | `fetchPricingData()` — async with 700ms delay |
| **UI updates dynamically** | `key` prop on price triggers re-animation |
| Loading state | `SkeletonCard.jsx` shown while fetching |
| Error handling | Error state with retry button |
| Mobile responsive | CSS Grid + media queries |
| Accessibility | ARIA roles, labels, keyboard support |

---

## 🧠 React Concepts Used

| Concept | Where |
|---|---|
| `useState` | Billing + currency state in `usePricing.js` |
| `useEffect` | Trigger API fetch on mount |
| `useCallback` | Memoize price calculation functions |
| Custom hook | `usePricing.js` — keeps App.jsx clean |
| Conditional rendering | Skeleton cards while loading, error state on failure |
| Props drilling | App → PlanCard (clean, shallow) |
| `key` prop trick | Re-triggers CSS animation when price changes |
| Semantic HTML | `article`, `header`, `footer`, `section` |

---

## 🎨 Design Decisions

**Aesthetic: Luxury Dark Editorial**
- `Cormorant Garamond` — elegant serif for prices (premium feel)
- `Syne` — geometric sans for UI labels (modern)
- `DM Mono` — monospace for metadata (technical)
- Gold accent reserved exclusively for the recommended plan
- Background: grid lines + radial glows = depth without noise

**To swap in a real API**, just change one function in `src/data/pricing.js`:
```js
export async function fetchPricingData() {
  const res = await fetch('https://your-api.com/pricing');
  return res.json();
}
```
Everything else updates automatically.

---

## Trade-offs

| Decision | Why | Trade-off |
|---|---|---|
| CSS variables over styled-components | No extra dependency | Less component-scoped |
| Single `App.css` file | Simpler for submission | Scales better with CSS modules |
| Props drilling over Context | Only 2 levels deep | Context better for larger apps |
| `react-scripts` (CRA) | Zero config setup | Vite would be faster |
