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
    <section className="bg-[#F7F5EE] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DB] text-[#456153] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A65]"></span>
              A Curated Catalog
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#233E31] mb-3">
              Real designs. Real challenges.
            </h2>
            <p className="text-[#556E61] text-sm sm:text-base max-w-xl">
              Replicate hand-crafted interfaces ranging from simple components to complex dashboards.
            </p>
          </div>

          <a 
            href="/sandbox.html?mode=challenge1"
            className="inline-flex items-center gap-2 bg-[#EAE6DB] text-[#233E31] border border-[#D5CFBF] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#DDD6C5] transition-colors self-start md:self-auto"
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
              className="bg-[#EFECE3] border border-[#DDD7C8] rounded-2xl p-5 flex flex-col justify-between group transition-all duration-200 hover:border-[#4E7A65]/40 hover:shadow-md"
            >
              {/* Preview Box */}
              <div className="w-full h-44 rounded-xl overflow-hidden mb-5 bg-[#FAF8F3] border border-[#D8D2C2] relative flex items-center justify-center">
                {item.previewType === "dashboard" && (
                  /* Pastel geometric pastel chart watercolor abstraction */
                  <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-gradient-to-br from-[#FFEFE8]/60 via-[#F0F8FF]/80 to-[#E8F8F0]/70 relative overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#FFD1BA]/40 blur-xl"></div>
                    <div className="absolute top-8 right-6 w-20 h-20 rounded-full bg-[#BAE5FF]/40 blur-xl"></div>
                    <div className="w-full flex items-end justify-between gap-1.5 h-20 px-4 border-b border-[#D8D2C2]/40 pb-2">
                      <div className="w-4 bg-[#FFB899] rounded-t-sm h-[60%]"></div>
                      <div className="w-4 bg-[#A3D9C9] rounded-t-sm h-[85%]"></div>
                      <div className="w-4 bg-[#9AC5EB] rounded-t-sm h-[40%]"></div>
                      <div className="w-4 bg-[#FFD1BA] rounded-t-sm h-[70%]"></div>
                      <div className="w-4 bg-[#B5E0D5] rounded-t-sm h-[95%]"></div>
                      <div className="w-4 bg-[#B8D5E5] rounded-t-sm h-[50%]"></div>
                    </div>
                    <div className="w-full flex justify-between gap-2 px-4 pt-2">
                      <div className="h-2 w-12 bg-[#DDD7C8] rounded-full"></div>
                      <div className="h-2 w-8 bg-[#D0E5DC] rounded-full"></div>
                    </div>
                  </div>
                )}

                {item.previewType === "ecommerce" && (
                  /* Ceramic vases / minimal ecommerce preview */
                  <div className="w-full h-full p-3 flex flex-col justify-center items-center bg-[#E5DFD1] relative">
                    <div className="bg-[#FAF8F3] rounded-lg border border-[#D5CFBF] p-2.5 w-4/5 shadow-xs flex flex-col gap-2">
                      <div className="flex justify-between items-center pb-1 border-b border-[#EAE6DB]">
                        <span className="text-[8px] font-mono text-[#456153]">Products</span>
                        <div className="w-2 h-2 rounded-full bg-[#C97A52]"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 py-1">
                        <div className="h-10 bg-[#D9CEBC] rounded flex items-center justify-center text-[10px]">🏺</div>
                        <div className="h-10 bg-[#CFC3B0] rounded flex items-center justify-center text-[10px]">🥣</div>
                        <div className="h-10 bg-[#E2D8C8] rounded flex items-center justify-center text-[10px]">🍶</div>
                      </div>
                    </div>
                  </div>
                )}

                {item.previewType === "analytics" && (
                  /* Green circular radar/target technical art */
                  <div className="w-full h-full p-4 flex justify-center items-center bg-[#E7EFEA] relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
                      <circle cx="100" cy="60" r="45" stroke="#3A5D4A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7"/>
                      <circle cx="100" cy="60" r="30" stroke="#4A755E" strokeWidth="2" opacity="0.6"/>
                      <circle cx="100" cy="60" r="14" stroke="#254233" strokeWidth="2.5" fill="#3A5D4A" fillOpacity="0.2"/>
                      <circle cx="100" cy="60" r="3" fill="#254233"/>
                      <path d="M20 60 H180 M100 10 V110" stroke="#7A9A87" strokeWidth="0.8" opacity="0.5"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Metadata Row */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#2D4A3E] text-[#F7F5EE]">
                  {item.difficulty}
                </span>
                <span className="text-xs font-mono font-medium text-[#B97B58]">
                  {item.points}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl font-bold text-[#233E31] mb-1.5 group-hover:text-[#182C22] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#556E61] leading-relaxed mb-4 flex-grow">
                {item.description}
              </p>

              {/* Subtle card action */}
              <a 
                href="/sandbox.html?mode=challenge1"
                className="text-xs font-mono font-semibold text-[#2D4A3E] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
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
