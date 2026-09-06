
import { useParams } from "react-router-dom";
import ScoreOverview from "../components/feedback/ScoreOverview";
import ScoreBreakdown from "../components/feedback/ScoreBreakdown";
import AiReasoningPanel from "../components/feedback/AiReasoningPanel";
import { mockEvaluationResult } from "../mocks/evaluationData";

export default function ResultsPage() {
  const { id } = useParams();
  // Using mock data for now
  const data = mockEvaluationResult;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Evaluation Results</h1>
        <p className="text-gray-600">Submission ID: {id}</p>
        
        <ScoreOverview scores={data.scores} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <ScoreBreakdown scores={data.scores} />
          </div>
          <div className="col-span-1">
            <AiReasoningPanel reasoning={data.aiReasoning} />
          </div>
        </div>
      </div>
    </div>
  );
}
