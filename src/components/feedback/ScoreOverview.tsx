
import type { EvaluationResult } from "../../types/evaluation";
export default function ScoreOverview({ scores }: { scores: EvaluationResult["scores"] }) {
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-xl font-bold mb-4">Overall Score: {scores.overall}%</h2>
  </div>;
}
