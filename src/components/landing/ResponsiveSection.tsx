import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ResponsiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop is immediately visible from start
  const desktopScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.65]);
  const desktopY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-8%"]);
  const desktopOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.6]);

  // Tablet enters earlier: from 0.08 to 0.35
  const tabletOpacity = useTransform(scrollYProgress, [0.08, 0.30], [0, 1]);
  const tabletX = useTransform(scrollYProgress, [0.08, 0.30], ["5%", "-28%"]);
  const tabletY = useTransform(scrollYProgress, [0.08, 0.30], ["15%", "8%"]);

  // Mobile enters immediately after tablet: from 0.25 to 0.55
  const mobileOpacity = useTransform(scrollYProgress, [0.25, 0.50], [0, 1]);
  const mobileX = useTransform(scrollYProgress, [0.25, 0.50], ["15%", "35%"]);
  const mobileY = useTransform(scrollYProgress, [0.25, 0.50], ["20%", "15%"]);

  // Section graceful exit
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.3]);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-[#050606] border-t border-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-grain">
        
        <motion.div style={{ opacity: sectionOpacity }} className="w-full flex flex-col items-center justify-center">
          <div className="absolute top-16 md:top-20 text-center z-30">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">03 // Responsive</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-none uppercase tracking-tight text-white">
              It Should<br />
              <span className="text-neutral-600">Look Good</span><br />
              Everywhere.
            </h2>
          </div>

          <div className="relative w-full max-w-5xl h-[60vh] mt-28 flex items-center justify-center">
            
            {/* Desktop */}
            <motion.div 
              style={{ scale: desktopScale, y: desktopY, opacity: desktopOpacity }}
              className="absolute w-[90vw] md:w-[800px] h-[360px] md:h-[500px] border border-neutral-800 bg-[#080909] shadow-2xl flex flex-col z-10"
            >
              <div className="h-6 border-b border-neutral-800 flex justify-between items-center px-4">
                 <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                   <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                 </div>
                 <span className="font-mono text-[9px] uppercase text-neutral-500">1440px</span>
              </div>
              <div className="flex-1 p-6 flex gap-6">
                 <div className="w-1/4 h-full bg-neutral-900 border border-neutral-800"></div>
                 <div className="w-3/4 flex flex-col gap-6">
                   <div className="w-full h-1/2 bg-neutral-900 border border-neutral-800"></div>
                   <div className="flex gap-6 h-1/2">
                     <div className="w-1/2 bg-neutral-900 border border-neutral-800"></div>
                     <div className="w-1/2 bg-neutral-900 border border-neutral-800"></div>
                   </div>
                 </div>
              </div>
            </motion.div>

            {/* Tablet */}
            <motion.div 
              style={{ opacity: tabletOpacity, x: tabletX, y: tabletY }}
              className="absolute w-[280px] md:w-[400px] h-[400px] md:h-[550px] border border-neutral-800 bg-[#080909] shadow-2xl flex flex-col z-20"
            >
               <div className="h-6 border-b border-neutral-800 flex justify-end items-center px-4">
                 <span className="font-mono text-[9px] uppercase text-[#ccff00]">768px</span>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-4">
                 <div className="w-full h-32 bg-neutral-900 border border-neutral-800"></div>
                 <div className="flex gap-4 flex-1">
                   <div className="w-1/2 bg-neutral-900 border border-neutral-800"></div>
                   <div className="w-1/2 bg-neutral-900 border border-neutral-800"></div>
                 </div>
              </div>
            </motion.div>

            {/* Mobile */}
            <motion.div 
              style={{ opacity: mobileOpacity, x: mobileX, y: mobileY }}
              className="absolute w-[180px] md:w-[250px] h-[360px] md:h-[500px] border border-neutral-800 bg-[#080909] shadow-2xl rounded-[2rem] flex flex-col overflow-hidden z-30"
            >
              <div className="h-8 border-b border-neutral-800 flex justify-center items-center">
                 <div className="w-16 h-1 rounded-full bg-neutral-800"></div>
              </div>
              <div className="absolute top-2 right-4"><span className="font-mono text-[9px] uppercase text-[#ccff00]">390px</span></div>
              <div className="flex-1 p-4 flex flex-col gap-4">
                 <div className="w-full h-24 bg-neutral-900 border border-neutral-800"></div>
                 <div className="w-full h-24 bg-neutral-900 border border-neutral-800"></div>
                 <div className="w-full h-24 bg-neutral-900 border border-neutral-800"></div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
