# PixelProof

An AI-powered platform for practicing real-world UI engineering. Build frontend components against real design specs and get automated feedback on visual fidelity, responsiveness, accessibility, and code quality.

---

## 👥 Team Parallel Tracks & Deliverables Map

| Role | Person | Focus Area | Inputs / Dependencies |
| :--- | :--- | :--- | :--- |
| **Person 1** | Editor & Sandbox | iframe live re-render | Use `challenges/challenges.json` and `challenges/*/starter.html` |
| **Person 2** | Client-Side Scoring | `html2canvas` screenshot + `pixelmatch` diff + `axe-core` in iframe | Use `challenges/*/reference.html` for baseline images; format payload as `contracts/grade-request.schema.json` |
| **Person 3** | Backend + AI Agent | Serverless `/grade` endpoint calling Gemini 3.6 flash API | Use system prompt & rubric in `prompts/grading-rubric-prompt.md`; validate against `contracts/grade-request.schema.json` and respond with `contracts/grade-response.schema.json` |
| **Person 4** | Landing & Feedback UI | Results panel showing letter grades, scores, and actionable fixes | Use `contracts/mocks/mock-grade-response.json` to develop the UI immediately without waiting for the backend |
| **Person 5** | Content + Glue | Specs, reference code, API contracts, prompt rubric, and demo script | Everything inside `challenges/`, `contracts/`, `prompts/`, and `demo/` |

---
