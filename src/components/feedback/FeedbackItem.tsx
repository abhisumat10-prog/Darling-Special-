
export default function FeedbackItem({ label, score }: { label: string; score: number }) {
  return <div className="flex justify-between items-center py-2 border-b last:border-0"><span className="text-gray-700">{label}</span><span className="font-bold">{score}%</span></div>;
}
