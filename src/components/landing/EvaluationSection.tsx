import { motion } from 'motion/react';

const metrics = [
  { label: "Visual Fidelity", score: 92, filled: 92 },
  { label: "Responsiveness", score: 87, filled: 87 },
  { label: "Accessibility", score: 81, filled: 81 },
  { label: "Code Quality", score: 52, filled: 52 },
];

export default function EvaluationSection() {
  return (
    <section className="bg-[var(--bg-base)] py-20 md:py-28 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Tag Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4 border border-[var(--border-subtle)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]"></span>
          Automated Evaluation
        </div>

        {/* Section Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
          How close did you get?
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto mb-16">
          Your implementation is graded across multiple functional dimensions.
        </p>

        {/* 4 Score Rings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 mb-16 w-full max-w-4xl">
          {metrics.map((m, idx) => {
            const radius = 42;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (circumference * m.filled) / 100;

            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center gap-3.5"
              >
                {/* Circular Score Indicator */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      className="text-[var(--border-subtle)]"
                      strokeWidth="5"
                    />
                    {/* Progress Stroke */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      className="text-[var(--accent-primary)]"
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: offset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    {m.score}
                  </span>
                </div>

                <span className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                  {m.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--text-secondary)] mb-2">
            Overall Rating
          </span>
          <div className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold text-[var(--text-primary)] leading-none">
            78%
          </div>
        </motion.div>

      </div>
    </section>
  );
}
