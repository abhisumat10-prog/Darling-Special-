$dirs = @(
    "src/pages",
    "src/components/landing",
    "src/components/feedback",
    "src/types",
    "src/mocks"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Set-Content -Path "src/pages/LandingPage.tsx" -Value 'import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import EvaluationFeatures from "../components/landing/EvaluationFeatures";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <EvaluationFeatures />
        <FinalCTA />
      </main>
    </div>
  );
}'

Set-Content -Path "src/pages/ResultsPage.tsx" -Value 'import React from "react";
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
}'

Set-Content -Path "src/components/landing/Navbar.tsx" -Value 'import React from "react";
export default function Navbar() {
  return <nav className="p-4 bg-white shadow-sm font-bold text-xl text-blue-600">LeetCode for Frontend</nav>;
}'

Set-Content -Path "src/components/landing/HeroSection.tsx" -Value 'import React from "react";
export default function HeroSection() {
  return <section className="py-20 text-center px-4">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Master UI Engineering</h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Build frontend components against real design specs and get automated feedback on visual fidelity, responsiveness, accessibility, and code quality.</p>
  </section>;
}'

Set-Content -Path "src/components/landing/HowItWorks.tsx" -Value 'import React from "react";
export default function HowItWorks() {
  return <section className="py-16 bg-white"><div className="max-w-4xl mx-auto px-4"><h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2><p className="text-center text-gray-600">Placeholder for How It Works steps.</p></div></section>;
}'

Set-Content -Path "src/components/landing/EvaluationFeatures.tsx" -Value 'import React from "react";
export default function EvaluationFeatures() {
  return <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-4"><h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Evaluation</h2><p className="text-center text-gray-600">Placeholder for Features.</p></div></section>;
}'

Set-Content -Path "src/components/landing/FinalCTA.tsx" -Value 'import React from "react";
export default function FinalCTA() {
  return <section className="py-20 bg-blue-600 text-white text-center px-4"><h2 className="text-3xl font-bold mb-6">Ready to improve your craft?</h2><button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold">Start a Challenge</button></section>;
}'

Set-Content -Path "src/components/feedback/ScoreOverview.tsx" -Value 'import React from "react";
import { EvaluationResult } from "../../types/evaluation";
export default function ScoreOverview({ scores }: { scores: EvaluationResult["scores"] }) {
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-xl font-bold mb-4">Overall Score: {scores.overall}%</h2>
  </div>;
}'

Set-Content -Path "src/components/feedback/ScoreBreakdown.tsx" -Value 'import React from "react";
import { EvaluationResult } from "../../types/evaluation";
import FeedbackItem from "./FeedbackItem";
export default function ScoreBreakdown({ scores }: { scores: EvaluationResult["scores"] }) {
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
    <h3 className="text-lg font-semibold">Score Breakdown</h3>
    <FeedbackItem label="Visual Fidelity" score={scores.visualFidelity} />
    <FeedbackItem label="Responsiveness" score={scores.responsiveness} />
    <FeedbackItem label="Accessibility" score={scores.accessibility} />
    <FeedbackItem label="Code Quality" score={scores.codeQuality} />
  </div>;
}'

Set-Content -Path "src/components/feedback/AiReasoningPanel.tsx" -Value 'import React from "react";
import { EvaluationResult } from "../../types/evaluation";
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
}'

Set-Content -Path "src/components/feedback/FeedbackItem.tsx" -Value 'import React from "react";
export default function FeedbackItem({ label, score }: { label: string; score: number }) {
  return <div className="flex justify-between items-center py-2 border-b last:border-0"><span className="text-gray-700">{label}</span><span className="font-bold">{score}%</span></div>;
}'

Set-Content -Path "src/types/evaluation.ts" -Value 'export interface EvaluationResult {
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
}'

Set-Content -Path "src/mocks/evaluationData.ts" -Value 'import { EvaluationResult } from "../types/evaluation";
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
};'
