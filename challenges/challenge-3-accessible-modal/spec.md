# Challenge 3: Accessible Confirmation Dialog / Modal (Hero Challenge)

## Overview
Build an accessible confirmation dialog / modal with a semi-transparent backdrop overlay. This challenge specifically tests accessibility compliance (WCAG 2.1 AA), keyboard focus management, ARIA attributes, and color contrast.

---

## Design Specifications & Tokens

### 1. Colors
- **Backdrop Overlay**: `rgba(15, 23, 42, 0.6)` with backdrop-filter blur (`4px`)
- **Dialog Background**: `#FFFFFF`
- **Header Icon (Warning/Alert)**: `#EF4444` (Red 500) on `#FEE2E2` (Red 100)
- **Title Text**: `#0F172A` (Slate 900)
- **Body Text**: `#475569` (Slate 600)
- **Destructive Button (Confirm)**: `#DC2626` (Red 600) with hover `#B91C1C` (Red 700) and text `#FFFFFF`
- **Cancel Button**: `#FFFFFF` background, border `1px solid #CBD5E1`, text `#334155` (Slate 700) with hover `#F1F5F9`

### 2. Dimensions & Layout
- **Modal Width**: `100%`, max-width `460px`
- **Padding**: `28px`
- **Border Radius**: `16px`
- **Box Shadow**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

---

## Accessibility Criteria (Evaluated by axe-core & AI Agent)

1. **ARIA Roles & Attributes**:
   - The modal container must have `role="dialog"` and `aria-modal="true"`.
   - Must specify `aria-labelledby="modalTitle"` and `aria-describedby="modalDesc"`.
2. **Focus Management & Keyboard Interaction**:
   - Pressing `Escape` must dismiss the modal.
   - Visible `:focus-visible` ring on buttons (contrast ≥ 3:1 against background).
   - Close icon button in the top right corner must have an accessible label `aria-label="Close dialog"`.
3. **Contrast Standards**:
   - All text and interactive button labels must achieve at least `4.5:1` contrast ratio against their respective backgrounds.
