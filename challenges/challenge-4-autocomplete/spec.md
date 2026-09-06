# Challenge 4: Accessible Search Autocomplete (Combobox)

## Difficulty: Medium
## Category: Combobox & Keyboard Navigation

---

## Overview
Build an interactive and accessible **Search Autocomplete / Typeahead** input. Users should be able to type to query a list of programming languages/frameworks, see instant highlighted matches, and navigate suggestions using **Arrow Keys (Up/Down)**, select with **Enter**, and dismiss with **Escape**.

---

## Design Specifications & Tokens

### 1. Colors
- **Input Background**: `#FFFFFF`, Border `1px solid #CBD5E1` (Slate 300)
- **Input Focus Ring**: `0 0 0 3px rgba(37, 99, 235, 0.2)`, Border `#2563EB` (Blue 600)
- **Dropdown Menu**: `#FFFFFF`, Shadow `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`
- **Item Hover / Active Focus**: `#F1F5F9` (Slate 100) with left accent border `#2563EB`
- **Highlight Match Text**: Color `#1D4ED8`, Background `#DBEAFE` (Blue 100), `font-weight: 600`
- **Text Primary**: `#0F172A` (Slate 900)
- **Text Secondary / Category**: `#64748B` (Slate 500)

### 2. Dimensions & Layout
- **Container Max Width**: `480px`, centered with `margin: 40px auto`
- **Input Field**: Height `48px`, padding `0 16px 0 44px` (with search icon on left), font size `15px`
- **Dropdown List**: Max height `280px`, scrollable (`overflow-y: auto`), border radius `10px`
- **Dropdown Item**: Height `44px`, padding `0 16px`, flex layout with label + category badge

---

## Accessibility Criteria (WAI-ARIA Combobox Pattern)

1. **ARIA Roles & Attributes**:
   - The `<input>` element must have `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded="true/false"`, and `aria-controls="resultsList"`.
   - The dropdown container must be a `<ul>` with `role="listbox"`.
   - Each suggestion must be a `<li>` with `role="option"`.
   - When an item is active/highlighted via keyboard, set `aria-selected="true"` and update `aria-activedescendant="item-[id]"` on the input.
2. **Keyboard Interaction**:
   - `ArrowDown`: Moves highlight to the next suggestion (wraps to first).
   - `ArrowUp`: Moves highlight to the previous suggestion (wraps to last).
   - `Enter`: Selects the highlighted suggestion, populates input, and closes dropdown.
   - `Escape`: Closes the dropdown and keeps input focus.
3. **Empty State**:
   - If no items match, display a subtle *"No matching results found"* message with `role="status"`.
