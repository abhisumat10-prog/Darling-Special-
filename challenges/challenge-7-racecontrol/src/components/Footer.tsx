import React from 'react';
import { Shield, Radio } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-carbon-950 border-t border-carbon-800 text-slate-400 py-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-carbon-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-apex-cyan to-apex-crimson flex items-center justify-center font-bold text-black text-xs italic">
              APX
            </div>
            <div>
              <span className="font-display font-bold text-slate-200 text-sm tracking-wider">
                APEX WORLD CHAMPIONSHIP
              </span>
              <span className="block text-[10px] text-slate-500">
                OFFICIAL RACECONTROL TELEMETRY PLATFORM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>SERVER: TOKYO-1 (24ms)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-apex-cyan" />
              <span>FIA-COMPLIANT TIMEKEEPING</span>
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Apex Grand Prix Association. Purely fictional motorsport championship challenge created for frontend engineering craft.</p>
          <p className="flex items-center gap-2">
            <span>Built with React + TypeScript + Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
