import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#F7F5EE] pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden">
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAE6DB] text-[#456153] text-[11px] font-mono tracking-wider font-semibold uppercase mb-6">
              Practice Meets Perfection
            </div>
            
            {/* Headline with editorial serif feel */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight text-[#233E31] mb-6">
              Good frontend developers don't copy. <span className="font-sans font-bold">They build.</span>
            </h1>
            
            {/* Subparagraph */}
            <p className="text-base sm:text-lg text-[#556E61] font-normal leading-relaxed mb-8 max-w-lg">
              Stop copy-pasting template blocks. Face actual design specs, write clean component-based markup, and let our compiler critique your craft.
            </p>
            
            {/* CTA buttons matching screenshot */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="/sandbox.html?mode=challenge1" 
                className="inline-flex items-center gap-2.5 bg-[#2D4A3E] text-[#F7F5EE] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#1E332A] transition-all hover:scale-[1.02] shadow-sm"
              >
                Start Challenge #1
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/sandbox.html?mode=tutorial" 
                className="inline-flex items-center gap-2.5 bg-[#EAE6DB] text-[#233E31] border border-[#D5CFBF] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#DFD9CC] transition-all hover:scale-[1.02]"
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
            <div className="w-full max-w-xl rounded-2xl border-2 border-[#557564] bg-[#F7F5EE] p-6 sm:p-8 shadow-sm">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#233E31]">
                  Lesson Sandbox
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAE6DB] text-[#3B5B4C] text-xs font-mono font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A65]"></span>
                  ACTIVE
                </div>
              </div>

              {/* Botanical/Bamboo watercolor banner illustration */}
              <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-5 border border-[#D5CFBF] relative bg-[#EBE5D3] flex items-center justify-center">
                {/* Stylized CSS Botanical/Bamboo Art */}
                <svg className="w-full h-full object-cover" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="500" height="200" fill="#E6DFCB"/>
                  <circle cx="250" cy="100" r="140" fill="#DDD5BF" opacity="0.6"/>
                  {/* Bamboo stalks */}
                  <g opacity="0.85">
                    {/* Stalk 1 */}
                    <path d="M70 0V200" stroke="#3F6451" strokeWidth="12" strokeLinecap="round" strokeDasharray="38 4"/>
                    {/* Stalk 2 */}
                    <path d="M110 0V200" stroke="#4F7A64" strokeWidth="9" strokeLinecap="round" strokeDasharray="34 4"/>
                    {/* Stalk 3 */}
                    <path d="M150 0V200" stroke="#325342" strokeWidth="14" strokeLinecap="round" strokeDasharray="42 4"/>
                    {/* Stalk 4 center-right */}
                    <path d="M380 0V200" stroke="#3B604D" strokeWidth="11" strokeLinecap="round" strokeDasharray="36 4"/>
                    {/* Stalk 5 */}
                    <path d="M420 0V200" stroke="#4E7761" strokeWidth="13" strokeLinecap="round" strokeDasharray="40 4"/>
                    {/* Stalk 6 */}
                    <path d="M450 0V200" stroke="#2F4F3E" strokeWidth="8" strokeLinecap="round" strokeDasharray="32 4"/>
                  </g>
                  {/* Leaves */}
                  <g fill="#4E7761" opacity="0.8">
                    <path d="M70 50 Q110 30 140 45 Q100 60 70 50Z" />
                    <path d="M150 90 Q190 70 230 85 Q190 100 150 90Z" />
                    <path d="M110 130 Q160 110 190 125 Q150 140 110 130Z" />
                    <path d="M380 60 Q340 40 300 55 Q340 70 380 60Z" />
                    <path d="M420 110 Q370 90 330 105 Q370 120 420 110Z" />
                    <path d="M420 40 Q460 20 490 35 Q460 50 420 40Z" />
                  </g>
                  <g fill="#375947" opacity="0.6">
                    <path d="M70 80 Q120 70 150 85 Q110 95 70 80Z" />
                    <path d="M380 130 Q330 120 290 135 Q330 145 380 130Z" />
                  </g>
                </svg>
              </div>

              {/* Description */}
              <p className="text-sm text-[#456153] leading-relaxed">
                Build this organic card using clean, semantic HTML structure and CSS variables. Let's see how close you get to the design spec!
              </p>
            </div>
          </motion.div>

        </div>

        {/* Scroll To Explore Indicator */}
        <div className="flex justify-center items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#557564] pt-16">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
