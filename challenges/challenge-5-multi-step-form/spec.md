# Challenge 5: Multi-Step Form Wizard with Validation

## Difficulty: Hard
## Category: State Management & Form Accessibility

---

## Overview
Build a 3-step checkout/registration wizard (1. Account Details ➔ 2. Company Info ➔ 3. Review & Submit). The component requires state preservation between steps, real-time client-side validation before advancing, animated progress bar, and full keyboard/screen-reader accessibility.

---

## Step Flow & Requirements

1. **Step 1: Account Information**:
   - Fields: Full Name (required, min 2 chars), Work Email (required, valid email pattern).
   - "Next" button validates fields. If invalid, displays inline error messages and focuses the first invalid field.
2. **Step 2: Company Details**:
   - Fields: Company Name (required), Company Size dropdown (`1-10`, `11-50`, `51-200`, `200+`), Terms checkbox (required).
   - "Back" button preserves step 1 state without re-validation.
3. **Step 3: Review & Confirmation**:
   - Summarizes entered details in a clean card format.
   - "Submit" button simulates submission with a loading state, followed by a success screen.

---

## Design Specifications & Tokens

### 1. Colors
- **Step Active / Completed**: `#2563EB` (Blue 600)
- **Step Inactive**: `#E2E8F0` (Slate 200) with text `#94A3B8` (Slate 400)
- **Error Border / Text**: `#EF4444` (Red 500)
- **Card Background**: `#FFFFFF` with border `1px solid #E2E8F0`, shadow `0 10px 25px -5px rgba(0,0,0,0.05)`
- **Button Primary**: `#2563EB` hover `#1D4ED8`
- **Button Secondary / Back**: `#FFFFFF` border `1px solid #CBD5E1` text `#475569`

### 2. Dimensions & Breakpoints
- **Container Max Width**: `560px`, centered.
- **Progress Bar**: Horizontal step indicators with connected line. On mobile (`< 640px`), hide step labels and show step numbers only.

---

## Accessibility Criteria (WCAG Form Standards)

1. **Progress Indicator**:
   - Stepper container uses `<nav aria-label="Progress">` with `<ol>`.
   - Current step marked with `aria-current="step"`.
2. **Accessible Error Handling**:
   - Inputs with errors must have `aria-invalid="true"`.
   - Error messages must have a unique ID linked to the input via `aria-describedby="[inputId]-error"`.
   - Error messages should have `role="alert"` so screen readers immediately announce validation issues.
3. **Form Semantics**:
   - Each step wrapped in a logical `<fieldset>` with `<legend>`.
