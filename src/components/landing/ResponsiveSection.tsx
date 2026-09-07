import { motion } from 'motion/react';
import { RotateCw } from 'lucide-react';

export default function ResponsiveSection() {
  return (
    <section className="bg-[var(--bg-surface-secondary)] py-20 md:py-28 border-y border-[var(--border-subtle)] transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4 border border-[var(--border-subtle)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]"></span>
            Responsive Compiles
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            It should look good everywhere.
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
            Your implementations are checked against mobile, tablet, and desktop breakpoints automatically.
          </p>
        </div>

        {/* Browser Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--bg-card)] overflow-hidden shadow-sm transition-colors duration-250"
        >
          {/* Browser Top Bar */}
          <div className="bg-[var(--bg-tag)] px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sage)]/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sage)]/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-sage)]/60"></span>
            </div>
            
            {/* Address Bar */}
            <div className="bg-[var(--bg-card)] px-6 py-1 rounded-full text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] w-1/2 max-w-sm text-center">
              workspace.pixelproof.io/challenge-1
            </div>

            <RotateCw className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          </div>

          {/* Browser Content: Side by side Desktop Viewport + Mobile View */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[var(--bg-card)]">
            
            {/* Desktop Viewport (1440px) */}
            <div className="md:col-span-8 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col justify-between">
              <div className="text-[11px] font-mono uppercase font-bold text-[var(--text-primary)] mb-3">
                Desktop Viewport (1440px)
              </div>
              
              {/* Mountain landscape watercolor art */}
              <div className="w-full h-36 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] relative flex items-center justify-center mb-4">
                <svg className="w-full h-full object-cover" viewBox="0 0 400 120" preserveAspectRatio="none" fill="none">
                  {/* Mountain layers */}
                  <path d="M0 120 L0 80 Q60 40 120 70 T240 50 Q320 20 400 65 L400 120 Z" fill="currentColor" className="text-[var(--accent-sage)]" opacity="0.4"/>
                  <path d="M0 120 L0 90 Q80 60 160 85 T320 70 Q370 50 400 80 L400 120 Z" fill="currentColor" className="text-[var(--accent-sage)]" opacity="0.6"/>
                  <path d="M0 120 L0 100 Q100 80 200 95 T400 90 L400 120 Z" fill="currentColor" className="text-[var(--border-strong)]" opacity="0.85"/>
                </svg>
              </div>

              {/* Wireframe lines */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-3 bg-[var(--border-subtle)] rounded"></div>
                <div className="h-3 bg-[var(--border-subtle)] rounded"></div>
              </div>
            </div>

            {/* Mobile View (390px) */}
            <div className="md:col-span-4 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col justify-between">
              <div className="text-[11px] font-mono uppercase font-bold text-[var(--text-primary)] mb-3">
                Mobile View (390px)
              </div>
              
              {/* Hand holding mobile phone with same art */}
              <div className="w-full h-36 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] relative flex items-center justify-center mb-4">
                <div className="w-20 h-32 rounded-lg bg-[var(--bg-surface-secondary)] border-2 border-[var(--border-strong)] shadow-md p-1.5 flex flex-col justify-between overflow-hidden">
                  <div className="w-full h-16 rounded bg-[var(--bg-tag)] flex items-end">
                    <div className="w-full h-6 bg-[var(--border-strong)] opacity-80"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-[var(--border-subtle)] rounded"></div>
                    <div className="w-3/4 h-1.5 bg-[var(--border-subtle)] rounded"></div>
                  </div>
                </div>
              </div>

              {/* Wireframe lines */}
              <div className="space-y-2">
                <div className="h-3 bg-[var(--border-subtle)] rounded w-full"></div>
                <div className="h-3 bg-[var(--border-subtle)] rounded w-2/3"></div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
