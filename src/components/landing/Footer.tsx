export default function Footer() {
  return (
    <footer className="bg-[#EFECE3] border-t border-[#DDD7C8] pt-16 pb-12 text-[#456153]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#DDD7C8]">
          
          {/* Brand Info */}
          <div className="md:col-span-6 flex flex-col items-start pr-6">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full border border-[#233E31] flex items-center justify-center text-[#233E31] text-[10px] font-bold font-mono">
                ✕
              </div>
              <span className="font-serif italic text-xl font-semibold tracking-tight text-[#233E31]">
                PixelProof
              </span>
            </a>
            <p className="text-xs sm:text-sm text-[#556E61] max-w-sm leading-relaxed">
              An interactive ecosystem built for frontend engineers who treat clean UI layout as an art form.
            </p>
          </div>

          {/* Nav column 1 */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#233E31] mb-2">
              Product
            </span>
            <a href="/sandbox.html?mode=challenge1" className="text-xs hover:text-[#233E31] transition-colors">
              Challenges
            </a>
            <a href="/sandbox.html?mode=tutorial" className="text-xs hover:text-[#233E31] transition-colors">
              Tutorials
            </a>
            <a href="#pricing" className="text-xs hover:text-[#233E31] transition-colors">
              Pricing
            </a>
          </div>

          {/* Nav column 2 */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#233E31] mb-2">
              Resources
            </span>
            <a href="#docs" className="text-xs hover:text-[#233E31] transition-colors">
              Documentation
            </a>
            <a href="#blog" className="text-xs hover:text-[#233E31] transition-colors">
              Blog
            </a>
            <a href="#support" className="text-xs hover:text-[#233E31] transition-colors">
              Support
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#556E61]">
          <span>
            © {new Date().getFullYear()} PixelProof. Crafted with Bamboo aesthetics.
          </span>
          <div className="flex items-center gap-4 text-[#456153]">
            {/* SVG Twitter / X icon */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#233E31] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* SVG Github icon */}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#233E31] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a href="/" className="hover:text-[#233E31] transition-colors">
              <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">✕</div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
