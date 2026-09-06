# Darling-Special: 

An AI-powered platform for practicing real-world UI engineering. Build frontend components against real design specs and get automated feedback on visual fidelity, responsiveness, accessibility, and code quality.

---

## 👥 Team Parallel Tracks & Deliverables Map

| Role | Person | Focus Area | Inputs / Dependencies |
| :--- | :--- | :--- | :--- |
| **Person 1** | Editor & Sandbox | Monaco/CodeMirror editor + iframe live re-render | Use `challenges/challenges.json` and `challenges/*/starter.html` |
| **Person 2** | Client-Side Scoring | `html2canvas` screenshot + `pixelmatch` diff + `axe-core` in iframe | Use `challenges/*/reference.html` for baseline images; format payload as `contracts/grade-request.schema.json` |
| **Person 3** | Backend + AI Agent | Serverless `/grade` endpoint calling Claude 3.5 API | Use system prompt & rubric in `prompts/grading-rubric-prompt.md`; validate against `contracts/grade-request.schema.json` and respond with `contracts/grade-response.schema.json` |
| **Person 4** | Landing & Feedback UI | Results panel showing letter grades, scores, and actionable fixes | Use `contracts/mocks/mock-grade-response.json` to develop the UI immediately without waiting for the backend |
| **Person 5** | Content + Glue | Specs, reference code, API contracts, prompt rubric, and demo script | Everything inside `challenges/`, `contracts/`, `prompts/`, and `demo/` |

---

## 📂 Repository Structure

```
Darling-Special-/
├── challenges/
│   ├── challenges.json                  # Challenge registry (for Person 1's dropdown)
│   ├── challenge-1-pricing-card/        # Easy: Visual & Responsive Layout
│   │   ├── spec.md                      # Detailed design specs & acceptance criteria
│   │   ├── reference.html               # Pixel-perfect reference solution (for screenshotting)
│   │   └── starter.html                 # Starter code loaded into editor
│   ├── challenge-2-navbar-dropdown/     # Medium: Responsive Navbar with Drawer
│   │   ├── spec.md
│   │   ├── reference.html
│   │   └── starter.html
│   └── challenge-3-accessible-modal/    # Hard (Hero): Accessible Modal & WCAG Dialog
│       ├── spec.md
│       ├── reference.html
│       └── starter.html
├── contracts/
│   ├── grade-request.schema.json        # Contract: Person 2 -> Person 3
│   ├── grade-response.schema.json       # Contract: Person 3 -> Person 4
│   └── mocks/
│       ├── mock-grade-request.json      # Test payload for Person 3's /grade endpoint
│       └── mock-grade-response.json     # Mock payload for Person 4's results UI
├── prompts/
│   └── grading-rubric-prompt.md         # Production prompt for Claude API in /grade
└── demo/
    └── demo-script.md                   # 3-minute hackathon pitch & live demo flow
```

---

