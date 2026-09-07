import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { signOut } from '../../services/auth';

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference"
    >
      <Link to="/" className="font-mono text-sm tracking-widest font-bold uppercase text-white">
        Pixel<span className="text-[#ccff00]">Proof</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-neutral-400">
        <a href="/sandbox.html?mode=tutorial" className="hover:text-white transition-colors duration-300">Tutorial Sandbox</a>
        <a href="/sandbox.html?mode=challenge1" className="hover:text-white transition-colors duration-300">Challenge #1</a>
      </div>
      
      {!loading && user ? (
        <button
          type="button"
          onClick={() => void signOut()}
          className="px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase bg-white text-black hover:bg-[#ccff00] transition-colors duration-300"
        >
          Sign Out
        </button>
      ) : (
        <Link
          to="/auth"
          className="px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase bg-[#ccff00] text-black hover:bg-white transition-colors duration-300"
        >
          Sign In
        </Link>
      )}
    </motion.nav>
  );
}
