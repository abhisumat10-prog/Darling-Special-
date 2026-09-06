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
  // Map overall scroll progress to this specific ring's animation window
  const start = 0.1 + (index * 0.15);
  const end = start + 0.2;
  
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.1], [20, 0]);
  const strokeDashoffset = useTransform(progress, [start, end], [283, 283 - (283 * (score / 100))]);
  const currentScore = useTransform(progress, [start, end], [0, score], { clamp: true });

  return (
    <motion.div style={{ opacity, y }} className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" stroke="#111" strokeWidth="4" 
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

  const totalOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const totalScale = useTransform(scrollYProgress, [0.8, 0.9], [0.8, 1]);
  const totalScore = useTransform(scrollYProgress, [0.8, 0.95], [0, 93], { clamp: true });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-dark border-t border-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-grain px-6">
        
        <div className="text-center mb-24">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 mb-24">
          <ScoreRing label="Visual Fidelity" score={92} progress={scrollYProgress} index={0} />
          <ScoreRing label="Responsiveness" score={87} progress={scrollYProgress} index={1} />
          <ScoreRing label="Accessibility" score={96} progress={scrollYProgress} index={2} />
          <ScoreRing label="Code Quality" score={89} progress={scrollYProgress} index={3} />
        </div>

        {/* Total Score */}
        <motion.div 
          style={{ opacity: totalOpacity, scale: totalScale }}
          className="flex flex-col items-center gap-4 pt-12 border-t border-neutral-900 w-full max-w-2xl"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-[#ccff00]">Total Score</span>
          <motion.div className="font-display text-8xl md:text-9xl text-white tracking-tighter">
            {useTransform(totalScore, latest => Math.round(latest))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
