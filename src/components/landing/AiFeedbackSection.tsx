import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Check } from 'lucide-react';

const auditPoints = [
  {
    icon: CheckCircle2,
    iconColor: "text-[#2D4A3E]",
    text: "HTML Structure: Header nesting was corrected from non-semantic divs."
  },
  {
    icon: CheckCircle2,
    iconColor: "text-[#2D4A3E]",
    text: "Colors: Sage variables mapped directly to spec color palette."
  },
  {
    icon: AlertTriangle,
    iconColor: "text-[#B97B58]",
    text: "Accessibility: Add appropriate aria-labels to raw SVG vectors in your navbar."
  },
  {
    icon: Check,
    iconColor: "text-[#2D4A3E]",
    text: "Fidelity: Layout aligns perfectly on mobile break with 0px visual offset!"
  }
];

export default function AiFeedbackSection() {
  return (
    <section className="bg-[#F7F5EE] py-20 md:py-28 border-t border-[#E0DAC9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DB] text-[#456153] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A65]"></span>
            Detailed Feedback
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#233E31] mb-3">
            Detailed feedback. Real improvement.
          </h2>
          <p className="text-[#556E61] text-sm sm:text-base leading-relaxed">
            Our analysis engine flags pixel differences, accessibility omissions, and markup structure issues.
          </p>
        </div>

        {/* AI Auditor Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto bg-[#EFECE3] border-2 border-[#557564] rounded-2xl p-6 sm:p-10 shadow-xs"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#DDD7C8]">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2D4A3E] flex items-center justify-center text-[#F7F5EE] font-serif font-bold text-lg">
                🌿
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#233E31]">
                  AI Bamboo Auditor
                </h3>
                <p className="text-xs font-mono text-[#556E61]">
                  Audit complete · 3 issues resolved
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#DFD9CC] text-[#2D4A3E] text-xs font-mono font-medium">
              98% Confidence
            </span>
          </div>

          {/* Feedback Points List */}
          <div className="flex flex-col gap-4">
            {auditPoints.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                  className="flex items-start gap-3.5 text-xs sm:text-sm text-[#385345] leading-relaxed"
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${pt.iconColor}`} />
                  <span>{pt.text}</span>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
