export interface EvaluationResult {
  submissionId: string;
  scores: {
    visualFidelity: number;
    responsiveness: number;
    accessibility: number;
    codeQuality: number;
    overall: number;
  };
  aiReasoning: {
    summary: string;
    actionableFeedback: string[];
    accessibilityViolations: string[];
  };
}
