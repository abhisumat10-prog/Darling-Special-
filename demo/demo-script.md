# Hackathon Presentation & Demo Script (2.5 - 3 Minutes)

## Pitch Title: "PixelProof: Engineering Craft Over Abstract Algorithmic Trivia"

---

## 1. The Hook (0:00 - 0:35) — Problem Statement
> *"When software engineers practice for backend interviews, they have LeetCode. But when frontend engineers practice, they're asked to invert a binary tree on a whiteboard.*
> 
> *In the real world, frontend engineering isn't about LeetCode medium algorithms—it's about **craft**: pixel-accurate design execution, responsive fluid layouts, and strict WCAG accessibility.*
> 
> *Today, we built **Darling Frontend**: the first AI-powered evaluation engine that grades real-world UI engineering."*

---

## 2. Live Product Walkthrough (0:35 - 1:30) — The Architecture
> *"Let's see it in action.*
> 
> *1. **The Workspace (Person 1 & 4)**: A candidate picks a challenge—like this **Accessible Confirmation Modal**. On the left, we have a live code editor; on the right, an isolated, real-time iframe sandbox.*
> 
> *2. **The Client-Side Evaluator (Person 2)**: When the candidate hits 'Submit', our evaluation pipeline triggers:*
> - *`html2canvas` captures the rendered DOM.*
> - *`pixelmatch` computes a sub-pixel diff against our reference screenshot.*
> - *`axe-core` audits the iframe DOM for WCAG accessibility violations.*
> 
> *3. **The AI Evaluation Engine (Person 3)**: Instead of a naive binary pass/fail, our serverless endpoint passes the visual diff, axe-core violations, and raw code to Claude 3.5 Sonnet acting as a Principal Frontend Engineer."*

---

## 3. The "Aha!" Moment (1:30 - 2:20) — The Killer Demo Scenario

### Demo Action:
1. **First Submission (Naive Visual Clone)**:
   - Paste in code that *looks* visually identical to the design (a dark overlay and centered modal with a cancel/confirm button).
   - Hit **Submit**.
2. **The AI Agent Result**:
   - **Visual Diff Score**: `94%` (Looks great!)
   - **Accessibility Score**: `40%` (Failed!)
   - **Letter Grade**: `D`
3. **The Speaker's Line**:
   > *"Notice what happened here! In any visual-only test, this submission would pass. But our AI agent catches that this is just a `<div>` soup with zero ARIA roles, no keyboard escape listener, and the cancel button fails WCAG color contrast.*
   > 
   > *The agent doesn't just fail them—it provides actionable, prioritized fixes with exact CSS and HTML snippets to reach production standards."*
4. **Second Submission (Fixed Implementation)**:
   - Click the fix snippet or paste the reference code.
   - Hit **Submit**.
   - Watch the score jump to `S (98/100)`.

---

## 4. Why This Wins / Tech Stack Summary (2:20 - 2:50)
- **Monaco / CodeMirror Sandbox**: Safe iframe preview with real-time reload.
- **Multi-Modal Client Scoring**: Client-side `pixelmatch` + automated `axe-core` audit.
- **Claude 3.5 Evaluation**: Structured rubric with calibrated dynamic weights, returning actionable recommendations.
- **Scalable Serverless Backend**: Zero infrastructure overhead.

---

## 5. Q&A Anticipation Cheat Sheet for the Team

* **Q: "Why not just use Playwright/Puppeteer on the server?"**
  * *A:* Running headless browsers server-side is expensive, slow, and hard to scale. By running `html2canvas` and `axe-core` in the client's own browser, our architecture is 100% serverless, zero-latency, and costs virtually nothing to host.

* **Q: "Why do you need an LLM if you have pixelmatch and axe-core?"**
  * *A:* Tools give raw numbers, not engineering judgement. A pixel diff cannot tell if a layout uses clean responsive CSS Grid vs brittle fixed coordinates. Axe-core cannot tell if your semantic hierarchy makes sense in context. Claude acts as a Staff Engineer giving human-like mentorship and code-craft reviews.
