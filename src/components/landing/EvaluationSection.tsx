import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

// Custom component for the score ring
function ScoreRing({ 
  label, 
  score, 
  progress, 
  index 
}: { 
  label: string, 
  score: number, 
  progress: MotionValue<number>, 
  index: number 
}) {
  // Rings are already visible with initial stroke/layout, then fill as user scrolls
  const fillStart = index * 0.08;
  const fillEnd = fillStart + 0.22;
  
  // They are visible from the start (opacity: 1) or quickly fade in by 0.05
  const opacity = useTransform(progress, [0, 0.08], [0.6, 1]);
  const strokeDashoffset = useTransform(progress, [fillStart, fillEnd], [283, 283 - (283 * (score / 100))]);
  const currentScore = useTransform(progress, [fillStart, fillEnd], [0, score], { clamp: true });

  return (
    <motion.div style={{ opacity }} className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" stroke="#1c1f1f" strokeWidth="4" 
          />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" stroke="#ccff00" strokeWidth="4"
            strokeDasharray="283"
            style={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>
        <motion.span className="font-display text-2xl text-white">
          {useTransform(currentScore, latest => Math.round(latest))}
        </motion.span>
      </div>
      <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function EvaluationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Entrance and content reveal early in the timeline
  const sectionContentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.88, 1], [0.9, 1, 1, 0.2]);
  const sectionContentScale = useTransform(scrollYProgress, [0.88, 1], [1, 0.96]);

  // Total score appears smoothly right as the 4 rings finish their fills (~0.45 - 0.70)
  const totalOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const totalScale = useTransform(scrollYProgress, [0.35, 0.55], [0.85, 1]);
  const totalScore = useTransform(scrollYProgress, [0.38, 0.65], [0, 93], { clamp: true });

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-dark border-t border-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-grain px-6">
        
        <motion.div 
          style={{ opacity: sectionContentOpacity, scale: sectionContentScale }}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">04 // Evaluation</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-none uppercase tracking-tight text-white mb-6">
              How Close<br />
              <span className="text-neutral-600">Did You Get?</span>
            </h2>
            <p className="text-xl text-neutral-400 font-body max-w-xl mx-auto">
              Your implementation is evaluated across multiple dimensions.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 mb-16">
            <ScoreRing label="Visual Fidelity" score={92} progress={scrollYProgress} index={0} />
            <ScoreRing label="Responsiveness" score={87} progress={scrollYProgress} index={1} />
            <ScoreRing label="Accessibility" score={96} progress={scrollYProgress} index={2} />
            <ScoreRing label="Code Quality" score={89} progress={scrollYProgress} index={3} />
          </div>

          {/* Total Score */}
          <motion.div 
            style={{ opacity: totalOpacity, scale: totalScale }}
            className="flex flex-col items-center gap-2 pt-8 border-t border-neutral-900 w-full max-w-xl"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-[#ccff00]">Total Score</span>
            <motion.div className="font-display text-7xl md:text-8xl text-white tracking-tighter">
              {useTransform(totalScore, latest => Math.round(latest))}
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
