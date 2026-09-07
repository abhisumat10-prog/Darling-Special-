import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "PRACTICE",
    desc: "Start with micro-interactions and small layouts"
  },
  {
    num: "02",
    title: "BUILD",
    desc: "Construct full responsive designs from specs"
  },
  {
    num: "03",
    title: "GET FEEDBACK",
    desc: "Let our analyzer critique your visual fidelity"
  },
  {
    num: "04",
    title: "IMPROVE",
    desc: "Iterate on code standards, structure & style"
  }
];

export default function ChallengeStepsSection() {
  return (
    <section className="bg-[var(--bg-surface-secondary)] py-20 md:py-24 border-y border-[var(--border-subtle)] transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Subtle pill dot indicator */}
        <div className="w-6 h-2 rounded-full bg-[var(--border-subtle)] mb-4"></div>

        {/* Section Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-4"
        >
          Challenge yourself. Build better UI.
        </motion.h2>

        {/* Subtitle */}
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto mb-14">
          Every build is a structured checkpoint designed to elevate your eye for detail.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-14">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-6 sm:p-7 rounded-2xl border text-left transition-all duration-250 ${
                idx === 1 
                  ? "bg-[var(--bg-card)] border-[var(--border-strong)] shadow-sm" 
                  : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
              }`}
            >
              <div className="font-serif text-3xl font-bold text-[var(--accent-amber)] mb-3">
                {step.num}
              </div>
              <h3 className="font-mono text-xs tracking-wider uppercase font-bold text-[var(--text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/sandbox.html?mode=challenge1"
            className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-[var(--accent-text)] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] shadow-sm"
          >
            Start Your First Challenge
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
