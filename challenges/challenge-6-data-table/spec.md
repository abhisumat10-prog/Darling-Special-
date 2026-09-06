# Challenge 6: Sortable & Filterable Data Table with Pagination

## Difficulty: Hard
## Category: Complex Data Display & Table Semantics

---

## Overview
Build an interactive, accessible **Data Table** that displays a roster of team members. Candidates must implement multi-column sorting (Name, Role, Status), search filtering across rows, pagination controls (Previous/Next + page counter), and responsive overflow protection.

---

## Functional Requirements

1. **Column Sorting**:
   - Clicking on column headers (Name, Role, Status) toggles sorting: `Ascending ➔ Descending ➔ Default`.
   - Clear visual arrow icon indicating active sort direction.
2. **Search Filter**:
   - An input field at the top filtering rows in real-time across name and email.
   - Resets pagination back to page 1 upon typing.
3. **Pagination**:
   - Displays 5 rows per page.
   - "Previous" button disabled on first page; "Next" button disabled on last page.
   - Indicator displays *"Showing 1-5 of 12 results"*.
4. **Status Badges**:
   - "Active" (Green pill), "Pending" (Yellow pill), "Offline" (Gray pill).

---

## Design Specifications & Tokens

### 1. Colors
- **Header Background**: `#F8FAFC` (Slate 50) with border `#E2E8F0`
- **Row Hover**: `#F8FAFC`
- **Table Border**: `1px solid #E2E8F0`, border-radius `12px`
- **Active Badge**: Background `#ECFDF5`, Text `#047857`
- **Pending Badge**: Background `#FFFBEB`, Text `#B45309`
- **Offline Badge**: Background `#F1F5F9`, Text `#475569`

### 2. Dimensions & Breakpoints
- **Container Max Width**: `900px`, centered.
- **Header Height**: `48px`, Row Height `56px`.
- **Responsive Handling**: Wrapper with `overflow-x: auto` so the table doesn't blow up viewport boundaries on mobile (`< 768px`).

---

## Accessibility Criteria (WAI-ARIA Table Standards)

1. **Table Semantics**:
   - Proper use of `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th scope="col">`, and `<td>`.
   - Hidden or visible `<caption>Team Member Directory</caption>` for screen readers.
2. **Sort State Announcement**:
   - Sortable header buttons must update `aria-sort="ascending"`, `aria-sort="descending"`, or `aria-sort="none"`.
3. **Keyboard Usability**:
   - Sort headers must be accessible buttons (`<button>` inside `<th>` or `<th>` with keyboard trigger).
   - Pagination buttons must be keyboard focusable with descriptive `aria-label`s (e.g. `aria-label="Go to next page"`).
