import type { EvaluationResult } from "../types/evaluation";
export const mockEvaluationResult: EvaluationResult = {
  submissionId: "demo-submission-123",
  scores: {
    visualFidelity: 92,
    responsiveness: 85,
    accessibility: 70,
    codeQuality: 88,
    overall: 84
  },
  aiReasoning: {
    summary: "Great job overall. The visual fidelity matches the spec closely, but there are some critical accessibility issues that need attention.",
    actionableFeedback: [
      "Use semantic HTML elements (e.g., <button> instead of <div onClick={...}>).",
      "Ensure text contrast ratios meet WCAG AA standards."
    ],
    accessibilityViolations: [
      "Buttons must have discernible text",
      "Form elements must have labels"
    ]
  }
};
