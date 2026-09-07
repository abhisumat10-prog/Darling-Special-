import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[var(--bg-base)] pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] text-[11px] font-mono tracking-wider font-semibold uppercase mb-6 border border-[var(--border-subtle)]">
              Practice Meets Perfection
            </div>
            
            {/* Headline with editorial serif feel */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight text-[var(--text-primary)] mb-6">
              Good frontend developers don't copy. <span className="font-sans font-bold">They build.</span>
            </h1>
            
            {/* Subparagraph */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-8 max-w-lg">
              Stop copy-pasting template blocks. Face actual design specs, write clean component-based markup, and let our compiler critique your craft.
            </p>
            
            {/* CTA buttons matching screenshot */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="/sandbox.html?mode=challenge1" 
                className="inline-flex items-center gap-2.5 bg-[var(--accent-primary)] text-[var(--accent-text)] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] shadow-sm"
              >
                Start Challenge #1
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/sandbox.html?mode=tutorial" 
                className="inline-flex items-center gap-2.5 bg-[var(--bg-tag)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[var(--bg-surface-secondary)] transition-all hover:scale-[1.02]"
              >
                Tutorial Sandbox
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Lesson Sandbox Preview Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-xl rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-sm transition-colors duration-250">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Lesson Sandbox
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] text-xs font-mono font-medium tracking-wide border border-[var(--border-subtle)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]"></span>
                  ACTIVE
                </div>
              </div>

              {/* Botanical/Bamboo watercolor banner image */}
              <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-5 border border-[var(--border-subtle)] relative bg-[var(--bg-surface-secondary)] flex items-center justify-center">
                <img 
                  src="/bamboo-visual.png" 
                  alt="Lesson Spec Visual" 
                  className="w-full h-full object-cover object-center dark:brightness-90 dark:contrast-105 transition-all duration-250" 
                />
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Build this organic card using clean, semantic HTML structure and CSS variables. Let's see how close you get to the design spec!
              </p>
            </div>
          </motion.div>

        </div>

        {/* Scroll To Explore Indicator */}
        <div className="flex justify-center items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] pt-16">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
