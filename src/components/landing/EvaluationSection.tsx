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
  // Rings fill progressively right as user views section (0.02 to 0.28)
  const fillStart = index * 0.04;
  const fillEnd = fillStart + 0.16;
  
  const strokeDashoffset = useTransform(progress, [fillStart, fillEnd], [283, 283 - (283 * (score / 100))]);
  const currentScore = useTransform(progress, [fillStart, fillEnd], [0, score], { clamp: true });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
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
        <motion.span className="font-display text-xl md:text-2xl text-white">
          {useTransform(currentScore, latest => Math.round(latest))}
        </motion.span>
      </div>
      <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-neutral-400 text-center">
        {label}
      </span>
    </div>
  );
}

export default function EvaluationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth exit
  const sectionContentOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.4]);

  // Total score appears early (0.18 to 0.40) directly accompanying the rings
  const totalOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const totalScale = useTransform(scrollYProgress, [0.18, 0.32], [0.9, 1]);
  const totalScore = useTransform(scrollYProgress, [0.18, 0.42], [0, 93], { clamp: true });

  return (
    <section ref={containerRef} className="relative h-[160vh] bg-dark border-t border-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-grain px-6">
        
        <motion.div 
          style={{ opacity: sectionContentOpacity }}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">04 // Evaluation</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              How Close <span className="text-neutral-500">Did You Get?</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 font-body max-w-xl mx-auto">
              Your implementation is evaluated across multiple dimensions.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 mb-12">
            <ScoreRing label="Visual Fidelity" score={92} progress={scrollYProgress} index={0} />
            <ScoreRing label="Responsiveness" score={87} progress={scrollYProgress} index={1} />
            <ScoreRing label="Accessibility" score={96} progress={scrollYProgress} index={2} />
            <ScoreRing label="Code Quality" score={89} progress={scrollYProgress} index={3} />
          </div>

          {/* Total Score */}
          <motion.div 
            style={{ opacity: totalOpacity, scale: totalScale }}
            className="flex flex-col items-center gap-1 pt-6 border-t border-neutral-900 w-full max-w-lg"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-[#ccff00]">Total Score</span>
            <motion.div className="font-display text-6xl md:text-8xl text-white tracking-tighter leading-none">
              {useTransform(totalScore, latest => Math.round(latest))}
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
