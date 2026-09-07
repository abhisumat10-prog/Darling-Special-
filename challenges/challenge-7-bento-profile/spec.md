# Challenge 8: Responsive Bento Profile

**Difficulty:** Easy · **Target:** 20 minutes

Build a one-page profile for an independent type designer. Recreate the asymmetric bento composition in the reference without using images.

## Requirements

- Use CSS Grid for a four-column desktop canvas; the intro card spans two columns and the work card spans two rows.
- At 720px and below, collapse to two columns. At 500px and below, stack every card.
- Include a visible keyboard focus style on every link and button.
- The availability pill must be semantic text, not a decorative pseudo-element.
- Respect prefers-reduced-motion for hover lifts.

## Acceptance checks

1. No horizontal scrolling at 375px.
2. Card order remains logical when read top-to-bottom on mobile.
3. The Copy email action updates its label briefly.

## Stretch

Add a theme switch using CSS custom properties and persist it with localStorage.
