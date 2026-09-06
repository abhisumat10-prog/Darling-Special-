import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

function FeedbackItem({ 
  icon: Icon, 
  text, 
  progress, 
  index, 
  isWarning = false 
}: { 
  icon: any, 
  text: string, 
  progress: MotionValue<number>, 
  index: number,
  isWarning?: boolean
}) {
  const start = 0.2 + (index * 0.1);
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const x = useTransform(progress, [start, start + 0.1], [-20, 0]);

  return (
    <motion.div 
      style={{ opacity, x }} 
      className="flex items-start gap-4 p-4 border border-neutral-900 bg-[#080909]"
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isWarning ? 'text-yellow-500' : 'text-[#ccff00]'}`} />
      <p className="text-neutral-300 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

export default function AiFeedbackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const panelOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  const thumbsOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050606] border-t border-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 bg-grain">
        
        {/* Left: Typography */}
        <div className="w-full md:w-1/3 flex flex-col items-start z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">05 // Feedback</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-none uppercase tracking-tight text-white mb-6">
            Detailed<br />Feedback.<br />
            <span className="text-neutral-600">Real<br />Improvement.</span>
          </h2>
        </div>

        {/* Right: AI Panel */}
        <div className="w-full md:w-1/2 max-w-xl z-20">
          <motion.div 
            style={{ opacity: panelOpacity, y: panelY }}
            className="border border-neutral-800 bg-[#080909] p-6 shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-900">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
                <span className="font-mono text-xs tracking-widest uppercase text-white">AI Agent Review</span>
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">Confidence: 98%</span>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 mb-8">
              <FeedbackItem 
                icon={CheckCircle2} 
                text="Overall layout matches the reference closely. The grid structure is precise." 
                progress={scrollYProgress} 
                index={0} 
              />
              <FeedbackItem 
                icon={CheckCircle2} 
                text="Responsive implementation works well across breakpoints." 
                progress={scrollYProgress} 
                index={1} 
              />
              <FeedbackItem 
                icon={AlertTriangle} 
                text="Navigation is 24px wider than the reference on mobile." 
                progress={scrollYProgress} 
                index={2} 
                isWarning 
              />
              <FeedbackItem 
                icon={AlertTriangle} 
                text="Consider improving color contrast for accessibility on the secondary text." 
                progress={scrollYProgress} 
                index={3} 
                isWarning 
              />
              <FeedbackItem 
                icon={CheckCircle2} 
                text="Clean component structure and semantic HTML." 
                progress={scrollYProgress} 
                index={4} 
              />
            </div>

            {/* Thumbnails */}
            <motion.div 
              style={{ opacity: thumbsOpacity }}
              className="flex gap-4 pt-6 border-t border-neutral-900"
            >
              <div className="flex-1">
                <span className="block font-mono text-[9px] tracking-widest uppercase text-neutral-500 mb-2">Reference</span>
                <div className="w-full h-20 bg-neutral-900 border border-neutral-800"></div>
              </div>
              <div className="flex-1">
                <span className="block font-mono text-[9px] tracking-widest uppercase text-neutral-500 mb-2">Your Output</span>
                <div className="w-full h-20 bg-[#0a0a0a] border border-[#ccff00]/30 relative">
                  <div className="absolute inset-x-2 top-2 h-2 bg-red-500/20 border border-red-500/50"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
