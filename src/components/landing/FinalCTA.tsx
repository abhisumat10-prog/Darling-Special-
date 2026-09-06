import { ArrowRight } from 'lucide-react';


export default function FinalCTA() {
  return (
    <section className="relative bg-dark py-32 border-t border-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Progression Metaphor */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-24 font-mono text-xs tracking-[0.2em] uppercase text-neutral-500">
          <span className="text-white">Practice</span>
          <ArrowRight className="w-4 h-4 text-neutral-800 rotate-90 md:rotate-0" />
          <span className="text-white">Build</span>
          <ArrowRight className="w-4 h-4 text-neutral-800 rotate-90 md:rotate-0" />
          <span className="text-white">Get Feedback</span>
          <ArrowRight className="w-4 h-4 text-[#ccff00] rotate-90 md:rotate-0" />
          <span className="text-[#ccff00] font-bold">Improve</span>
        </div>

        <h2 className="font-display text-7xl md:text-[9vw] leading-[0.8] uppercase tracking-tight text-white mb-12">
          Challenge<br />
          <span className="text-neutral-700">Yourself.</span><br />
          Build<br />
          <span className="text-[#ccff00]">Better UI.</span>
        </h2>
        
        <p className="text-xl text-neutral-400 font-body max-w-xl mx-auto mb-16">
          Every build makes you a better frontend developer.
        </p>
        
        <a
          href="/sandbox.html?mode=challenge1"
          className="group flex items-center gap-4 bg-[#ccff00] text-black px-10 py-5 font-mono text-sm tracking-widest font-bold uppercase transition-all hover:bg-white hover:scale-105"
        >
          Start Your First Challenge
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
        </a>

      </div>

      <footer className="mt-32 border-t border-neutral-900 pt-8 pb-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-xs tracking-widest font-bold uppercase text-white">
            Pixel<span className="text-[#ccff00]">Proof</span>
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-600">
            © {new Date().getFullYear()} PixelProof
          </div>
        </div>
      </footer>
    </section>
  );
}
