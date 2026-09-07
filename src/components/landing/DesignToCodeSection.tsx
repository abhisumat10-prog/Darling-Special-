import { motion } from 'motion/react';

export default function DesignToCodeSection() {
  return (
    <section className="bg-[#F7F5EE] py-20 md:py-28 border-t border-[#E0DAC9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DB] text-[#456153] text-[11px] font-mono tracking-wider font-semibold uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A65]"></span>
            Side-By-Side Crafting
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#233E31] mb-3">
            From design to code.
          </h2>
          <p className="text-[#556E61] text-sm sm:text-base leading-relaxed">
            Inspect specific spacings, colors, and shadows, then translate them instantly in our custom editor.
          </p>
        </div>

        {/* Side-by-Side Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Panel: Spec Guide */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F7F5EE] border-2 border-[#557564] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E0DAC9] mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#233E31]">
                  Spec Guide
                </h3>
                <span className="text-xs font-mono text-[#556E61]">
                  Spacing: 8px Scale
                </span>
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EFECE3] border border-[#DDD7C8]">
                  <span className="text-xs font-bold text-[#233E31]">Card Radius</span>
                  <span className="font-mono text-xs text-[#556E61]">16px</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EFECE3] border border-[#DDD7C8]">
                  <span className="text-xs font-bold text-[#233E31]">Primary Fill</span>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-[#F7F5EE] border border-[#D0CAB9]"></span>
                    <span className="font-mono text-xs text-[#556E61]">#F7F5EE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EFECE3] border border-[#DDD7C8]">
                  <span className="text-xs font-bold text-[#233E31]">Padding</span>
                  <span className="font-mono text-xs text-[#556E61]">24px uniform</span>
                </div>
              </div>
            </div>

            {/* Footnote */}
            <p className="text-[11px] font-mono italic text-[#698576] pt-8">
              * Inspect individual borders and margins by clicking any element in the active viewport mock.
            </p>
          </motion.div>

          {/* Right Panel: Code Editor Window */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#19221C] text-[#EAE6DB] rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col font-mono text-xs border border-[#2B3B31]"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A3B31]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E57A68]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5B568]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#75B888]"></span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                <span>📄</span>
                <span className="text-[#A2C7B4]">Card.tsx</span>
              </div>
              <span className="text-[10px] text-neutral-500 uppercase">React</span>
            </div>

            {/* Realistic Code block */}
            <div className="flex-1 overflow-x-auto leading-relaxed space-y-1 text-[11px] sm:text-xs">
              <p className="text-[#96A89D]">
                <span className="text-[#D4A373]">import</span> React <span className="text-[#D4A373]">from</span> <span className="text-[#B5C99A]">'react'</span>
              </p>
              <p className="text-[#96A89D]">
                <span className="text-[#D4A373]">export default function</span> <span className="text-[#E9D8A6]">Card</span>() {'{'}
              </p>
              <p className="pl-4 text-[#96A89D]">
                <span className="text-[#D4A373]">return</span> (
              </p>
              <p className="pl-8 text-[#EAE6DB]">
                &lt;<span className="text-[#75B888]">div</span> <span className="text-[#B5C99A]">className</span>=<span className="text-[#D4A373]">"p-6 bg-cream rounded-xl"</span>&gt;
              </p>
              <p className="pl-12 text-[#EAE6DB]">
                &lt;<span className="text-[#75B888]">div</span> <span className="text-[#B5C99A]">className</span>=<span className="text-[#D4A373]">"flex gap-4"</span>&gt;
              </p>
              <p className="pl-16 text-[#EAE6DB]">
                &lt;<span className="text-[#75B888]">h3</span> <span className="text-[#B5C99A]">className</span>=<span className="text-[#D4A373]">"font-display"</span>&gt;Bamboo&lt;/<span className="text-[#75B888]">h3</span>&gt;
              </p>
              <p className="pl-16 text-[#6F8679] italic">
                {'{/* Real feedback here */}'}
              </p>
              <p className="pl-12 text-[#EAE6DB]">
                &lt;/<span className="text-[#75B888]">div</span>&gt;
              </p>
              <p className="pl-8 text-[#EAE6DB]">
                &lt;/<span className="text-[#75B888]">div</span>&gt;
              </p>
              <p className="pl-4 text-[#96A89D]">)</p>
              <p className="text-[#96A89D]">{'}'}</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
