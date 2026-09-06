import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ChallengeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth continuous parallax movement without leaving dead gaps
  const y1 = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] bg-[#050606] border-t border-neutral-900 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">01 // The Challenges</span>
          </div>
          
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white mb-6 flex flex-col">
            <span className="leading-[0.9] z-10">Real Designs.</span>
            <span className="leading-[0.9] text-neutral-500 mt-1 md:mt-2 z-0">Real Challenges.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-400 font-body border-l border-neutral-800 pl-6 mb-8 leading-relaxed">
            Recreate modern interfaces from real-world design specifications. Build pixel-perfect SaaS dashboards, immersive e-commerce pages, and complex interactive components.
          </p>

          {/* Button directing to 1st Challenge Sandbox */}
          <div className="pl-6">
            <a 
              href="/sandbox.html?mode=challenge1" 
              className="inline-flex items-center gap-3 bg-[#ccff00] text-black px-7 py-3.5 font-mono text-xs md:text-sm tracking-widest font-bold uppercase transition-all hover:bg-white hover:scale-105 pointer-events-auto"
            >
              Start 1st Challenge
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Floating UI Cards */}
      <div className="absolute inset-0 top-[15vh] pointer-events-none">
        {/* Main Challenge Card */}
        <motion.div style={{ y: y1 }} className="absolute right-[5%] md:right-[8%] top-[2%] w-[320px] md:w-[480px] h-[260px] md:h-[320px] bg-[#080909] border border-neutral-800 shadow-2xl p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <div className="font-mono text-xs uppercase tracking-widest text-white">SaaS Dashboard</div>
            <div className="font-mono text-xs text-[#ccff00]">Hard</div>
          </div>
          <div className="flex-1 flex gap-4">
            <div className="w-1/4 bg-neutral-900"></div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-16 bg-neutral-900 w-full"></div>
              <div className="flex gap-3 flex-1">
                <div className="flex-1 bg-neutral-900"></div>
                <div className="flex-1 bg-neutral-900"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Card 1 */}
        <motion.div style={{ y: y2 }} className="absolute right-[28%] md:right-[38%] top-[28%] w-[220px] md:w-[280px] h-[280px] md:h-[340px] bg-[#080909] border border-neutral-800 shadow-2xl p-5 flex flex-col gap-3 opacity-60">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <div className="font-mono text-xs uppercase tracking-widest text-white">E-Commerce</div>
            <div className="font-mono text-xs text-neutral-500">Medium</div>
          </div>
          <div className="h-28 md:h-36 bg-neutral-900 w-full"></div>
          <div className="h-5 bg-neutral-900 w-3/4"></div>
          <div className="h-3 bg-[#ccff00] w-1/4 opacity-50"></div>
        </motion.div>

        {/* Secondary Card 2 */}
        <motion.div style={{ y: y3 }} className="absolute right-[4%] top-[55%] w-[260px] md:w-[320px] h-[180px] md:h-[220px] bg-[#080909] border border-neutral-800 shadow-2xl p-4 flex flex-col opacity-80 z-20">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-3">
            <div className="font-mono text-xs uppercase tracking-widest text-white">Analytics</div>
            <div className="font-mono text-xs text-neutral-500">Expert</div>
          </div>
          <div className="flex-1 border border-neutral-800 flex items-end px-4 gap-2">
            <div className="w-full h-[40%] bg-neutral-800"></div>
            <div className="w-full h-[70%] bg-neutral-800"></div>
            <div className="w-full h-[50%] bg-[#ccff00] opacity-30"></div>
            <div className="w-full h-[90%] bg-neutral-800"></div>
          </div>
        </motion.div>
        
        {/* Abstract shape */}
        <motion.div style={{ y: y4 }} className="absolute left-[8%] top-[60%] w-[140px] h-[140px] border border-neutral-800 rounded-full opacity-20"></motion.div>
      </div>
    </section>
  );
}
