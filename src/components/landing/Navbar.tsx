import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference"
    >
      <a href="/" className="font-mono text-sm tracking-widest font-bold uppercase text-white">
        LC<span className="text-[#ccff00]">/</span>FE
      </a>
      
      <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-neutral-400">
        <a href="/sandbox.html?mode=tutorial" className="hover:text-white transition-colors duration-300">Tutorial Sandbox</a>
        <a href="/sandbox.html?mode=challenge1" className="hover:text-white transition-colors duration-300">Challenge #1</a>
      </div>
      
      <a 
        href="/sandbox.html?mode=tutorial" 
        className="px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase bg-[#ccff00] text-black hover:bg-white transition-colors duration-300"
      >
        Get Started
      </a>
    </motion.nav>
  );
}
