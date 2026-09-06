import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleVisual = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const yVisual = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-dark">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-grain">
        
        {/* Typographic Hero */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-[#ccff00] rounded-full"></div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400">Frontend Engineering Platform</span>
          </div>
          
          <h1 className="font-display text-[12vw] leading-[0.85] uppercase tracking-tight text-white mb-8">
            Good Frontend<br />
            <span className="text-neutral-500">Developers</span><br />
            Don't Copy.<br />
            <span className="text-[#ccff00]">They Build.</span>
          </h1>
          
          <div className="max-w-xl border-l border-neutral-800 pl-6 ml-2">
            <p className="text-xl text-neutral-400 font-body mb-8">
              Turn real designs into code. Get an AI-powered evaluation. Improve your frontend skills.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button className="group flex items-center gap-3 bg-[#ccff00] text-black px-8 py-4 font-mono text-sm tracking-widest font-bold uppercase transition-all hover:bg-white">
                Start a Challenge
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="group flex items-center gap-3 text-white px-8 py-4 font-mono text-sm tracking-widest uppercase border border-neutral-800 transition-all hover:border-[#ccff00]">
                <Play className="w-4 h-4 text-[#ccff00]" />
                Watch How It Works
              </button>
            </div>
          </div>
        </motion.div>

        {/* Abstract Browser Visual */}
        <motion.div 
          style={{ scale: scaleVisual, y: yVisual }}
          className="absolute right-[-10%] top-[30%] w-[60vw] h-[70vh] border border-neutral-800 bg-[#050606] shadow-2xl flex flex-col z-0 origin-bottom-right"
        >
          {/* Browser Header */}
          <div className="h-10 border-b border-neutral-800 flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
          </div>
          {/* Browser Content (Abstract lines) */}
          <div className="flex-1 p-8 flex flex-col gap-6 opacity-30">
            <div className="w-full h-32 bg-neutral-900 border border-neutral-800"></div>
            <div className="flex gap-6">
              <div className="w-1/3 h-48 bg-neutral-900 border border-neutral-800"></div>
              <div className="w-2/3 h-48 bg-neutral-900 border border-neutral-800 flex flex-col p-6 gap-4">
                 <div className="w-1/2 h-4 bg-[#ccff00] opacity-50"></div>
                 <div className="w-3/4 h-2 bg-neutral-700"></div>
                 <div className="w-full h-2 bg-neutral-700"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-12 flex items-center gap-4 text-neutral-500 font-mono text-xs tracking-widest uppercase">
          <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent"></div>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
