
import type { EvaluationResult } from "../../types/evaluation";
import FeedbackItem from "./FeedbackItem";
export default function ScoreBreakdown({ scores }: { scores: EvaluationResult["scores"] }) {
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
    <h3 className="text-lg font-semibold">Score Breakdown</h3>
    <FeedbackItem label="Visual Fidelity" score={scores.visualFidelity} />
    <FeedbackItem label="Responsiveness" score={scores.responsiveness} />
    <FeedbackItem label="Accessibility" score={scores.accessibility} />
    <FeedbackItem label="Code Quality" score={scores.codeQuality} />
  </div>;
}
