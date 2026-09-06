import { useState, useRef } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function FinalCTA() {
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCell, setActiveCell] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playgroundRef.current) return;
    const rect = playgroundRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
  };

  return (
    <section className="relative bg-dark pt-20 pb-12 border-t border-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Progression Metaphor */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-16 font-mono text-xs tracking-[0.2em] uppercase text-neutral-500">
          <span className="text-white">Practice</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-800 rotate-90 md:rotate-0" />
          <span className="text-white">Build</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-800 rotate-90 md:rotate-0" />
          <span className="text-white">Get Feedback</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#ccff00] rotate-90 md:rotate-0" />
          <span className="text-[#ccff00] font-bold">Improve</span>
        </div>

        <h2 className="font-display text-6xl md:text-[8vw] leading-[0.85] uppercase tracking-tight text-white mb-8">
          Challenge<br />
          <span className="text-neutral-700">Yourself.</span><br />
          Build<br />
          <span className="text-[#ccff00]">Better UI.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-neutral-400 font-body max-w-xl mx-auto mb-10">
          Every build makes you a better frontend developer.
        </p>
        
        <a 
          href="/sandbox.html?mode=challenge1" 
          className="group flex items-center gap-4 bg-[#ccff00] text-black px-9 py-4 font-mono text-xs md:text-sm tracking-widest font-bold uppercase transition-all hover:bg-white hover:scale-105"
        >
          Start Your First Challenge
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Minimal Frontend Playground Easter Egg */}
        <div className="w-full max-w-4xl mt-24 mb-12 flex flex-col items-start border border-neutral-900 bg-[#050606] p-4 md:p-6 text-left">
          <div className="w-full flex justify-between items-center pb-3 mb-4 border-b border-neutral-900 font-mono text-[10px] tracking-widest uppercase text-neutral-500">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Canvas Inspector // Interactive Easter Egg</span>
            </div>
            <div className="flex items-center gap-4">
              <span>X: {coords.x}px</span>
              <span>Y: {coords.y}px</span>
              <span className="text-[#ccff00]">{isHovering ? "ACTIVE" : "STANDBY"}</span>
            </div>
          </div>

          <div 
            ref={playgroundRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setActiveCell(null); }}
            className="w-full h-40 md:h-48 grid grid-cols-8 md:grid-cols-16 gap-1.5 p-2 bg-[#080909] border border-neutral-900 cursor-crosshair relative overflow-hidden"
          >
            {Array.from({ length: 64 }).map((_, i) => {
              const isActive = activeCell === i;
              return (
                <div 
                  key={i}
                  onMouseEnter={() => setActiveCell(i)}
                  className={`transition-all duration-300 border ${
                    isActive 
                      ? 'border-[#ccff00] bg-[#ccff00]/15 scale-95' 
                      : 'border-neutral-900/80 hover:border-neutral-700 bg-neutral-950/40'
                  } flex items-center justify-center`}
                >
                  <span className="text-[7px] font-mono text-neutral-700 select-none">
                    {i.toString(16).padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="w-full flex justify-between items-center mt-3 font-mono text-[9px] text-neutral-600">
            <span>Hover across the engineering matrix to inspect coordinate reactivity</span>
            <span className="text-neutral-500">64 Nodes Active</span>
          </div>
        </div>

      </div>

      <footer className="mt-8 border-t border-neutral-900 pt-6 pb-6">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs tracking-widest font-bold uppercase text-white">
            LC<span className="text-[#ccff00]">/</span>FE
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-600">
            © {new Date().getFullYear()} LeetCode for Frontend
          </div>
        </div>
      </footer>
    </section>
  );
}
