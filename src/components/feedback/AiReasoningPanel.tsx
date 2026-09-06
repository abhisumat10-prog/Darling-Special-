
import type { EvaluationResult } from "../../types/evaluation";
export default function AiReasoningPanel({ reasoning }: { reasoning: EvaluationResult["aiReasoning"] }) {
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-semibold mb-4">AI Feedback</h3>
    <p className="text-gray-700 mb-4">{reasoning.summary}</p>
    <h4 className="font-semibold mb-2">Actionable Items:</h4>
    <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
      {reasoning.actionableFeedback.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
    {reasoning.accessibilityViolations.length > 0 && (
      <>
        <h4 className="font-semibold mb-2 text-red-600">Accessibility Violations:</h4>
        <ul className="list-disc pl-5 text-red-500 space-y-1">
          {reasoning.accessibilityViolations.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </>
    )}
  </div>;
}
