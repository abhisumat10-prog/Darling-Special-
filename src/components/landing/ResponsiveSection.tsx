import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ResponsiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop scales slightly and shifts smoothly right away
  const desktopScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const desktopY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-6%"]);
  const desktopOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);

  // Tablet enters immediately in the active viewing range: 0.04 to 0.25
  const tabletOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const tabletX = useTransform(scrollYProgress, [0.04, 0.22], ["0%", "-26%"]);
  const tabletY = useTransform(scrollYProgress, [0.04, 0.22], ["10%", "5%"]);

  // Mobile enters closely right after: 0.15 to 0.38
  const mobileOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const mobileX = useTransform(scrollYProgress, [0.15, 0.35], ["10%", "32%"]);
  const mobileY = useTransform(scrollYProgress, [0.15, 0.35], ["15%", "10%"]);

  // Section smooth exit
  const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.4]);

  return (
    <section ref={containerRef} className="relative h-[160vh] bg-[#050606] border-t border-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-grain">
        
        <motion.div style={{ opacity: sectionOpacity }} className="w-full flex flex-col items-center justify-center">
          <div className="absolute top-12 md:top-16 text-center z-30">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#ccff00]">03 // Responsive</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              It Should Look Good <span className="text-neutral-500">Everywhere.</span>
            </h2>
          </div>

          <div className="relative w-full max-w-5xl h-[60vh] mt-24 flex items-center justify-center">
            
            {/* Desktop */}
            <motion.div 
              style={{ scale: desktopScale, y: desktopY, opacity: desktopOpacity }}
              className="absolute w-[90vw] md:w-[760px] h-[340px] md:h-[460px] border border-neutral-800 bg-[#080909] shadow-2xl flex flex-col z-10"
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
              className="absolute w-[260px] md:w-[380px] h-[380px] md:h-[500px] border border-neutral-800 bg-[#080909] shadow-2xl flex flex-col z-20"
            >
               <div className="h-6 border-b border-neutral-800 flex justify-end items-center px-4">
                 <span className="font-mono text-[9px] uppercase text-[#ccff00]">768px</span>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-4">
                 <div className="w-full h-28 bg-neutral-900 border border-neutral-800"></div>
                 <div className="flex gap-4 flex-1">
                   <div className="w-1/2 bg-neutral-900 border border-neutral-800"></div>
                   <div className="w-1/2 bg-neutral-900 border border-neutral-800"></div>
                 </div>
              </div>
            </motion.div>

            {/* Mobile */}
            <motion.div 
              style={{ opacity: mobileOpacity, x: mobileX, y: mobileY }}
              className="absolute w-[170px] md:w-[240px] h-[340px] md:h-[460px] border border-neutral-800 bg-[#080909] shadow-2xl rounded-[2rem] flex flex-col overflow-hidden z-30"
            >
              <div className="h-7 border-b border-neutral-800 flex justify-center items-center">
                 <div className="w-14 h-1 rounded-full bg-neutral-800"></div>
              </div>
              <div className="absolute top-2 right-4"><span className="font-mono text-[9px] uppercase text-[#ccff00]">390px</span></div>
              <div className="flex-1 p-3 flex flex-col gap-3">
                 <div className="w-full h-20 bg-neutral-900 border border-neutral-800"></div>
                 <div className="w-full h-20 bg-neutral-900 border border-neutral-800"></div>
                 <div className="w-full h-20 bg-neutral-900 border border-neutral-800"></div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
