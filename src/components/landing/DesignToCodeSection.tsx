import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function DesignToCodeSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const scaleLeft = useTransform(scrollYProgress, [0, 0.3], [1.1, 1]);
  const xLeft = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], ["10%", "0%", "0%", "-5%"]);
  
  const opacityRight = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const xRight = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], ["10%", "0%", "0%", "5%"]);
  
  const highlightOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-grain">
        
        <div className="absolute top-20 left-6 md:left-12 z-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">02 // Implementation</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-none uppercase tracking-tight text-white">
            From Design<br />
            <span className="text-neutral-600">To Code.</span>
          </h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 flex h-[60vh] mt-24 relative z-10">
          {/* Left: Design Reference */}
          <motion.div 
            style={{ scale: scaleLeft, x: xLeft }}
            className="w-1/2 h-full pr-4 flex flex-col justify-center origin-left"
          >
            <div className="relative w-full h-[80%] bg-[#050606] border border-neutral-800 shadow-2xl flex flex-col">
              <div className="h-8 border-b border-neutral-800 flex items-center px-4">
                <span className="font-mono text-[10px] uppercase text-neutral-500">Design Spec.fig</span>
              </div>
              <div className="flex-1 p-8">
                {/* Mock UI */}
                <div className="w-32 h-8 bg-neutral-900 mb-8"></div>
                <div className="relative">
                  <div className="w-full h-32 bg-neutral-900 border border-neutral-800"></div>
                  {/* Highlight box */}
                  <motion.div 
                    style={{ opacity: highlightOpacity }}
                    className="absolute inset-0 border-2 border-[#ccff00] bg-[#ccff00]/10 z-10"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="w-24 h-8 bg-neutral-900"></div>
                  <div className="w-24 h-8 bg-neutral-800"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Code Editor */}
          <motion.div 
            style={{ opacity: opacityRight, x: xRight }}
            className="w-1/2 h-full pl-4 flex flex-col justify-center origin-right"
          >
            <div className="relative w-full h-[80%] bg-[#050606] border border-neutral-800 shadow-2xl flex flex-col">
              <div className="h-8 border-b border-neutral-800 flex items-center px-4 bg-[#0a0a0a]">
                <span className="font-mono text-[10px] uppercase text-[#ccff00]">App.tsx</span>
              </div>
              <div className="flex-1 p-6 font-mono text-[11px] leading-relaxed text-neutral-400 overflow-hidden">
                <p><span className="text-pink-500">export default function</span> <span className="text-blue-400">Card</span>() {'{'}</p>
                <p className="pl-4"><span className="text-pink-500">return</span> (</p>
                <p className="pl-8">&lt;<span className="text-blue-400">div</span> <span className="text-yellow-200">className</span>=<span className="text-green-400">"p-6 bg-white shadow-sm"</span>&gt;</p>
                <motion.div style={{ opacity: highlightOpacity, backgroundColor: "rgba(204, 255, 0, 0.1)" }} className="pl-12 border-l-2 border-[#ccff00] py-1 -ml-[2px]">
                  &lt;<span className="text-blue-400">div</span> <span className="text-yellow-200">className</span>=<span className="text-green-400">"w-full h-32 bg-gray-100"</span> /&gt;
                </motion.div>
                <p className="pl-12">&lt;<span className="text-blue-400">div</span> <span className="text-yellow-200">className</span>=<span className="text-green-400">"flex gap-4 mt-4"</span>&gt;</p>
                <p className="pl-16">&lt;<span className="text-blue-400">button</span>&gt;Save&lt;/<span className="text-blue-400">button</span>&gt;</p>
                <p className="pl-12">&lt;/<span className="text-blue-400">div</span>&gt;</p>
                <p className="pl-8">&lt;/<span className="text-blue-400">div</span>&gt;</p>
                <p className="pl-4">);</p>
                <p>{'}'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
