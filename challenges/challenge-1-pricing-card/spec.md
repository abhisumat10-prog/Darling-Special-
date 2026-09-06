# Challenge 1: Responsive SaaS Pricing Tier Card

## Overview
Build a responsive, accessible SaaS Pricing Tier Card for a "Pro" plan. Candidates must implement clean typography hierarchy, badge pill styling, feature checkmarks, hover micro-interactions, and responsive adaptation across viewports.

---

## Design Specifications & Tokens

### 1. Colors
- **Card Background**: `#FFFFFF` (Dark mode alternative / contrast border: `#F3F4F6` background)
- **Primary Accent / CTA**: `#2563EB` (Blue 600) with hover `#1D4ED8` (Blue 700)
- **Badge Background**: `#EFF6FF` (Blue 50) with text `#1D4ED8` (Blue 700)
- **Headings & Price**: `#111827` (Gray 900)
- **Body & Subtitle Text**: `#4B5563` (Gray 600)
- **Card Border**: `1px solid #E5E7EB` (Gray 200)
- **Checkmark Icon**: `#10B981` (Emerald 500)

### 2. Typography
- **Font Family**: System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- **Plan Title**: `20px` / `font-weight: 700`
- **Price**: `44px` / `font-weight: 800`
- **Billing Period**: `14px` / `font-weight: 500` / `#6B7280`
- **Feature List Items**: `15px` / `line-height: 1.5`

### 3. Dimensions & Spacing
- **Card Padding**: `32px`
- **Card Border Radius**: `16px`
- **Card Box Shadow**: `0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)`
- **Card Max Width**: `380px`
- **Button Padding**: `14px 24px`, border-radius `10px`, `width: 100%`

---

## Breakpoints & Responsive Behavior

| Breakpoint | Viewport Width | Behavior |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` (tested at `375px`) | Card takes `calc(100% - 32px)` width, centered, padding reduces to `24px`, CTA button is sticky or full width. |
| **Desktop** | `≥ 640px` (tested at `1200px`) | Card fixed at `380px` width, centered in viewport. |

---

## Acceptance Criteria

1. **Semantic HTML**: Use `<article>` as the outer wrapper, `<h3>` for the plan title, `<ul>` and `<li>` for the feature list, and `<button>` for the CTA.
2. **Accessibility**:
   - Primary button must have WCAG AA contrast ratio (≥ 4.5:1).
   - Checkmark icons must have `aria-hidden="true"` so screen readers don't announce raw SVGs or unicode characters.
   - Visible `:focus-visible` outline for keyboard navigation.
3. **Micro-interactions**:
   - Card has subtle hover lift (`transform: translateY(-4px); transition: all 0.2s ease`).
   - Button has subtle darken state on `:hover`.
