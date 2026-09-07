import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[#F7F5EE]/90 backdrop-blur-md border-b border-[#E6E1D2]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full border border-[#233E31] flex items-center justify-center text-[#233E31] text-xs font-bold font-mono group-hover:rotate-90 transition-transform duration-300">
            ✕
          </div>
          <span className="font-serif italic text-2xl font-semibold tracking-tight text-[#233E31]">
            PixelProof
          </span>
        </Link>
        
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#456153]">
          <a href="/sandbox.html?mode=challenge1" className="hover:text-[#233E31] transition-colors">
            Challenges
          </a>
          <a href="/sandbox.html?mode=tutorial" className="hover:text-[#233E31] transition-colors">
            Tutorials
          </a>
          <a href="#community" className="hover:text-[#233E31] transition-colors">
            Community
          </a>
          <a href="#enterprise" className="hover:text-[#233E31] transition-colors">
            Enterprise
          </a>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-[#233E31] hover:text-[#456153] transition-colors hidden sm:inline-block"
          >
            Sign In
          </Link>
          <a 
            href="/sandbox.html?mode=challenge1" 
            className="inline-flex items-center gap-2 bg-[#2D4A3E] text-[#F7F5EE] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1E332A] transition-all hover:scale-[1.02] shadow-sm"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
