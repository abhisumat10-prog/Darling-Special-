import { motion } from 'motion/react';
import { RotateCw } from 'lucide-react';

export default function ResponsiveSection() {
  return (
    <section className="bg-[#EDE9DE] py-20 md:py-28 border-y border-[#E0DAC9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFD9CC] text-[#456153] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A65]"></span>
            Responsive Compiles
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#233E31] mb-3">
            It should look good everywhere.
          </h2>
          <p className="text-[#556E61] text-sm sm:text-base leading-relaxed">
            Your implementations are checked against mobile, tablet, and desktop breakpoints automatically.
          </p>
        </div>

        {/* Browser Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto rounded-2xl border-2 border-[#557564] bg-[#F7F5EE] overflow-hidden shadow-sm"
        >
          {/* Browser Top Bar */}
          <div className="bg-[#D9E4DD] px-5 py-3 border-b border-[#C8D6CD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#527765]/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#527765]/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#527765]/60"></span>
            </div>
            
            {/* Address Bar */}
            <div className="bg-[#F7F5EE]/80 px-6 py-1 rounded-full text-xs font-mono text-[#556E61] border border-[#C8D6CD] w-1/2 max-w-sm text-center">
              workspace.pixelproof.io/challenge-1
            </div>

            <RotateCw className="w-3.5 h-3.5 text-[#556E61]" />
          </div>

          {/* Browser Content: Side by side Desktop Viewport + Mobile View */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F7F5EE]">
            
            {/* Desktop Viewport (1440px) */}
            <div className="md:col-span-8 bg-[#EFECE3] border border-[#DDD7C8] rounded-xl p-5 flex flex-col justify-between">
              <div className="text-[11px] font-mono uppercase font-bold text-[#456153] mb-3">
                Desktop Viewport (1440px)
              </div>
              
              {/* Mountain landscape watercolor art */}
              <div className="w-full h-36 rounded-lg overflow-hidden border border-[#D5CFBF] bg-[#DCE6DE] relative flex items-center justify-center mb-4">
                <svg className="w-full h-full object-cover" viewBox="0 0 400 120" preserveAspectRatio="none" fill="none">
                  {/* Mountain layers */}
                  <path d="M0 120 L0 80 Q60 40 120 70 T240 50 Q320 20 400 65 L400 120 Z" fill="#9FBCA9" opacity="0.6"/>
                  <path d="M0 120 L0 90 Q80 60 160 85 T320 70 Q370 50 400 80 L400 120 Z" fill="#7FA28B" opacity="0.7"/>
                  <path d="M0 120 L0 100 Q100 80 200 95 T400 90 L400 120 Z" fill="#587A65" opacity="0.9"/>
                </svg>
              </div>

              {/* Wireframe lines */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-3 bg-[#DDD7C8] rounded"></div>
                <div className="h-3 bg-[#DDD7C8] rounded"></div>
              </div>
            </div>

            {/* Mobile View (390px) */}
            <div className="md:col-span-4 bg-[#EFECE3] border border-[#DDD7C8] rounded-xl p-5 flex flex-col justify-between">
              <div className="text-[11px] font-mono uppercase font-bold text-[#456153] mb-3">
                Mobile View (390px)
              </div>
              
              {/* Hand holding mobile phone with same art */}
              <div className="w-full h-36 rounded-lg overflow-hidden border border-[#D5CFBF] bg-[#DCE6DE] relative flex items-center justify-center mb-4">
                <div className="w-20 h-32 rounded-lg bg-[#FAF8F3] border-2 border-[#557564] shadow-md p-1.5 flex flex-col justify-between overflow-hidden">
                  <div className="w-full h-16 rounded bg-[#9FBCA9] flex items-end">
                    <div className="w-full h-6 bg-[#587A65] opacity-80"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-[#DDD7C8] rounded"></div>
                    <div className="w-3/4 h-1.5 bg-[#DDD7C8] rounded"></div>
                  </div>
                </div>
              </div>

              {/* Wireframe lines */}
              <div className="space-y-2">
                <div className="h-3 bg-[#DDD7C8] rounded w-full"></div>
                <div className="h-3 bg-[#DDD7C8] rounded w-2/3"></div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
