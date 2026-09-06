import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth immediate reaction to scroll
  const yText = useTransform(scrollYProgress, [0, 0.8], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const scaleVisual = useTransform(scrollYProgress, [0, 0.8], [0.9, 1.08]);
  const yVisual = useTransform(scrollYProgress, [0, 0.8], ["10%", "-5%"]);

  return (
    <section ref={containerRef} className="relative h-[115vh] bg-dark">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-grain">
        
        {/* Typographic Hero */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start mt-12 md:mt-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400">Frontend Engineering Platform</span>
          </div>
          
          <h1 className="font-display text-[11vw] md:text-[9.5vw] leading-[0.88] uppercase tracking-tight text-white mb-6">
            Good Frontend<br />
            <span className="text-neutral-500">Developers</span><br />
            Don't Copy.<br />
            <span className="text-[#ccff00]">They Build.</span>
          </h1>
          
          <div className="max-w-xl border-l border-neutral-800 pl-6 ml-1">
            <p className="text-lg md:text-xl text-neutral-400 font-body mb-6 leading-relaxed">
              Turn real designs into code. Get an AI-powered evaluation. Improve your frontend skills.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href="/sandbox.html?mode=challenge1" className="group flex items-center gap-3 bg-[#ccff00] text-black px-7 py-3.5 font-mono text-xs md:text-sm tracking-widest font-bold uppercase transition-all hover:bg-white">
                Start Challenge #1
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/sandbox.html?mode=tutorial" className="group flex items-center gap-3 text-white px-7 py-3.5 font-mono text-xs md:text-sm tracking-widest uppercase border border-neutral-800 transition-all hover:border-[#ccff00]">
                <Play className="w-4 h-4 text-[#ccff00]" />
                Tutorial Sandbox
              </a>
            </div>
          </div>
        </motion.div>

        {/* Abstract Browser Visual */}
        <motion.div 
          style={{ scale: scaleVisual, y: yVisual }}
          className="absolute right-[-8%] md:right-[-4%] top-[32%] w-[65vw] md:w-[50vw] h-[60vh] md:h-[65vh] border border-neutral-800 bg-[#050606] shadow-2xl flex flex-col z-0 origin-bottom-right"
        >
          {/* Browser Header */}
          <div className="h-9 border-b border-neutral-800 flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
          </div>
          {/* Browser Content (Abstract lines) */}
          <div className="flex-1 p-6 flex flex-col gap-5 opacity-40">
            <div className="w-full h-24 bg-neutral-900 border border-neutral-800"></div>
            <div className="flex gap-5">
              <div className="w-1/3 h-40 bg-neutral-900 border border-neutral-800"></div>
              <div className="w-2/3 h-40 bg-neutral-900 border border-neutral-800 flex flex-col p-5 gap-3">
                 <div className="w-1/2 h-3 bg-[#ccff00] opacity-60"></div>
                 <div className="w-3/4 h-2 bg-neutral-700"></div>
                 <div className="w-full h-2 bg-neutral-700"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3 text-neutral-500 font-mono text-[11px] tracking-widest uppercase">
          <div className="w-px h-8 bg-gradient-to-b from-[#ccff00] to-transparent"></div>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
