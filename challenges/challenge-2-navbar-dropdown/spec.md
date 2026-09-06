# Challenge 2: Responsive Navigation Bar with Mobile Drawer

## Overview
Build a responsive, accessible navigation bar. On desktop (`≥ 768px`), navigation links are displayed horizontally inline alongside an action CTA button. On mobile (`< 768px`), navigation collapses into an accessible hamburger button that toggles an animated slide-down or overlay drawer.

---

## Design Specifications & Tokens

### 1. Colors
- **Nav Background**: `#FFFFFF` with bottom border `1px solid #E2E8F0`
- **Link Text**: `#475569` (Slate 600) with hover `#0F172A` (Slate 900)
- **Active / Primary CTA**: `#0F172A` (Slate 900) with text `#FFFFFF`
- **Mobile Menu Background**: `#FFFFFF` with shadow `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

### 2. Typography & Layout
- **Brand Logo**: `18px` / `font-weight: 700`
- **Nav Links**: `15px` / `font-weight: 500`
- **Nav Height**: `64px`
- **Max Content Width**: `1200px` (centered with `margin: 0 auto; padding: 0 24px`)

---

## Breakpoints & Behavior

| Breakpoint | Viewport Width | Behavior |
| :--- | :--- | :--- |
| **Desktop** | `≥ 768px` | Full horizontal menu is visible. Hamburger button is hidden (`display: none`). |
| **Mobile** | `< 768px` | Horizontal nav links are hidden. Hamburger button is visible. Clicking toggles drawer open/closed with `aria-expanded="true/false"`. |

---

## Acceptance Criteria

1. **Semantic HTML**: Use `<header>`, `<nav>`, `<ul>`, `<li>`, and `<button>`.
2. **Accessibility (WCAG)**:
   - Mobile hamburger button MUST have `aria-label="Toggle navigation menu"` and dynamic `aria-expanded="false/true"`.
   - Keyboard users can Tab through nav links naturally. Pressing `Escape` while the mobile menu is open closes the drawer.
3. **Smooth Transitions**: Mobile drawer slides or fades open smoothly using CSS `transition`.
