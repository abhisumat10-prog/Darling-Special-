import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const challenges = [
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    difficulty: "Hard",
    points: "240 pts",
    description: "A robust admin portal highlighting data tables, sidebar filters, and nested layouts.",
    previewType: "dashboard"
  },
  {
    id: "ecommerce-plate",
    title: "E-Commerce Plate",
    difficulty: "Medium",
    points: "150 pts",
    description: "A product-grid experience requiring accurate spacing, filters, and checkout cards.",
    previewType: "ecommerce"
  },
  {
    id: "analytics-panel",
    title: "Analytics Panel",
    difficulty: "Expert",
    points: "320 pts",
    description: "High-density charts, metric rings, and layout variables that stretch elegantly.",
    previewType: "analytics"
  }
];

export default function ChallengeSection() {
  return (
    <section className="bg-[var(--bg-base)] py-20 md:py-28 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4 border border-[var(--border-subtle)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]"></span>
              A Curated Catalog
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              Real designs. Real challenges.
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl">
              Replicate hand-crafted interfaces ranging from simple components to complex dashboards.
            </p>
          </div>

          <a 
            href="/sandbox.html?mode=challenge1"
            className="inline-flex items-center gap-2 bg-[var(--bg-tag)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--bg-surface-secondary)] transition-all self-start md:self-auto"
          >
            View All Challenges
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 flex flex-col justify-between group transition-all duration-250 hover:border-[var(--border-strong)] hover:shadow-md"
            >
              {/* Preview Box */}
              <div className="w-full h-44 rounded-xl overflow-hidden mb-5 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] relative flex items-center justify-center">
                {item.previewType === "dashboard" && (
                  /* Pastel geometric chart abstraction */
                  <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-gradient-to-br from-[#FFEFE8]/20 via-[var(--bg-surface)] to-[var(--bg-surface-secondary)] relative overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#FFD1BA]/20 blur-xl"></div>
                    <div className="absolute top-8 right-6 w-20 h-20 rounded-full bg-[#BAE5FF]/20 blur-xl"></div>
                    <div className="w-full flex items-end justify-between gap-1.5 h-20 px-4 border-b border-[var(--border-subtle)] pb-2">
                      <div className="w-4 bg-[#FFB899] rounded-t-sm h-[60%] opacity-80"></div>
                      <div className="w-4 bg-[#A3D9C9] rounded-t-sm h-[85%] opacity-80"></div>
                      <div className="w-4 bg-[#9AC5EB] rounded-t-sm h-[40%] opacity-80"></div>
                      <div className="w-4 bg-[#FFD1BA] rounded-t-sm h-[70%] opacity-80"></div>
                      <div className="w-4 bg-[#B5E0D5] rounded-t-sm h-[95%] opacity-80"></div>
                      <div className="w-4 bg-[#B8D5E5] rounded-t-sm h-[50%] opacity-80"></div>
                    </div>
                    <div className="w-full flex justify-between gap-2 px-4 pt-2">
                      <div className="h-2 w-12 bg-[var(--border-subtle)] rounded-full"></div>
                      <div className="h-2 w-8 bg-[var(--accent-sage)]/40 rounded-full"></div>
                    </div>
                  </div>
                )}

                {item.previewType === "ecommerce" && (
                  /* Ceramic vases / minimal ecommerce preview */
                  <div className="w-full h-full p-3 flex flex-col justify-center items-center bg-[var(--bg-surface-secondary)] relative">
                    <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-2.5 w-4/5 shadow-xs flex flex-col gap-2">
                      <div className="flex justify-between items-center pb-1 border-b border-[var(--border-subtle)]">
                        <span className="text-[8px] font-mono text-[var(--text-secondary)]">Products</span>
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-amber)]"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 py-1">
                        <div className="h-10 bg-[var(--bg-tag)] rounded flex items-center justify-center text-[10px]">🏺</div>
                        <div className="h-10 bg-[var(--bg-tag)] rounded flex items-center justify-center text-[10px]">🥣</div>
                        <div className="h-10 bg-[var(--bg-tag)] rounded flex items-center justify-center text-[10px]">🍶</div>
                      </div>
                    </div>
                  </div>
                )}

                {item.previewType === "analytics" && (
                  /* Green circular radar/target technical art */
                  <div className="w-full h-full p-4 flex justify-center items-center bg-[var(--bg-surface-secondary)] relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
                      <circle cx="100" cy="60" r="45" stroke="currentColor" className="text-[var(--accent-sage)]" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7"/>
                      <circle cx="100" cy="60" r="30" stroke="currentColor" className="text-[var(--border-strong)]" strokeWidth="2" opacity="0.6"/>
                      <circle cx="100" cy="60" r="14" stroke="currentColor" className="text-[var(--text-primary)]" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2"/>
                      <circle cx="100" cy="60" r="3" fill="currentColor" className="text-[var(--text-primary)]"/>
                      <path d="M20 60 H180 M100 10 V110" stroke="currentColor" className="text-[var(--text-muted)]" strokeWidth="0.8" opacity="0.4"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Metadata Row */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[var(--accent-primary)] text-[var(--accent-text)]">
                  {item.difficulty}
                </span>
                <span className="text-xs font-mono font-medium text-[var(--accent-amber)]">
                  {item.points}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-grow">
                {item.description}
              </p>

              {/* Subtle card action */}
              <a 
                href="/sandbox.html?mode=challenge1"
                className="text-xs font-mono font-semibold text-[var(--accent-primary)] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
              >
                Inspect Challenge
                <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
