import React, { useState } from 'react';
import { Compass, Info } from 'lucide-react';
import { CIRCUIT_INFO } from '../data/mockRaceData';
import { SectorInfo } from '../types/race';

export const TrackMap: React.FC = () => {
  const [activeSectorNumber, setActiveSectorNumber] = useState<1 | 2 | 3>(1);
  const activeSector = CIRCUIT_INFO.sectors.find(s => s.sectorNumber === activeSectorNumber) as SectorInfo;

  return (
    <section id="track-map" className="py-14 bg-carbon-950 border-b border-carbon-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-carbon-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Compass className="w-5 h-5 text-apex-cyan" />
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 tracking-tight">
                INTERACTIVE CIRCUIT MAP
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              {CIRCUIT_INFO.name.toUpperCase()} • 19 TURNS • 5.380 KM
            </p>
          </div>

          {/* Sector Selector Buttons */}
          <div className="flex items-center gap-2 bg-carbon-900 border border-carbon-700 p-1 rounded-xl text-xs font-mono">
            {([1, 2, 3] as const).map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setActiveSectorNumber(num)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeSectorNumber === num
                    ? 'bg-apex-cyan text-black shadow-md shadow-apex-cyan/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SECTOR {num}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive SVG Track Display */}
          <div className="lg:col-span-7 bg-carbon-900/90 border border-carbon-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden min-h-[420px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#2A364F_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

            {/* Circuit Outline SVG */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-auto max-h-[380px] drop-shadow-2xl overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Neutral Base Track (full circuit) */}
              <path
                d="M 120 220 
                   C 140 120, 260 80, 420 90 
                   C 560 100, 680 140, 720 220 
                   C 760 300, 690 410, 560 420 
                   C 480 425, 420 370, 360 370 
                   C 300 370, 280 430, 200 420 
                   C 130 410, 100 320, 120 220 Z"
                stroke="#1B2436"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Sector 1: High speed entry (Top curve & Harbor straight) */}
              <path
                d="M 120 220 C 140 120, 260 80, 420 90"
                stroke={activeSectorNumber === 1 ? '#00F0FF' : '#2A364F'}
                strokeWidth={activeSectorNumber === 1 ? '16' : '10'}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300 hover:stroke-apex-cyan"
                onMouseEnter={() => setActiveSectorNumber(1)}
              />

              {/* Sector 2: Technical Esses & Infield */}
              <path
                d="M 420 90 C 560 100, 680 140, 720 220 C 760 300, 690 410, 560 420"
                stroke={activeSectorNumber === 2 ? '#FF2A54' : '#2A364F'}
                strokeWidth={activeSectorNumber === 2 ? '16' : '10'}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300 hover:stroke-apex-crimson"
                onMouseEnter={() => setActiveSectorNumber(2)}
              />

              {/* Sector 3: Marina Hairpin and Finish Straight */}
              <path
                d="M 560 420 C 480 425, 420 370, 360 370 C 300 370, 280 430, 200 420 C 130 410, 100 320, 120 220"
                stroke={activeSectorNumber === 3 ? '#F59E0B' : '#2A364F'}
                strokeWidth={activeSectorNumber === 3 ? '16' : '10'}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300 hover:stroke-apex-gold"
                onMouseEnter={() => setActiveSectorNumber(3)}
              />

              {/* Start / Finish Line Marker */}
              <line x1="108" y1="220" x2="132" y2="220" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="4 2" />
              <text x="75" y="224" fill="#FFFFFF" className="font-mono text-[11px] font-bold">START/FINISH</text>

              {/* DRS Zone Annotations */}
              <circle cx="280" cy="85" r="5" fill="#00F0FF" />
              <text x="280" y="70" textAnchor="middle" fill="#00F0FF" className="font-mono text-[10px] font-bold">DRS ZONE 1</text>

              <circle cx="160" cy="418" r="5" fill="#00F0FF" />
              <text x="160" y="445" textAnchor="middle" fill="#00F0FF" className="font-mono text-[10px] font-bold">DRS ZONE 2</text>

              {/* Speed Trap Indicator */}
              <circle cx="680" cy="150" r="4" fill="#FF2A54" />
              <text x="700" y="150" fill="#FF2A54" className="font-mono text-[10px] font-bold">SPEED TRAP</text>
            </svg>

            {/* Interactive Instruction Note */}
            <span className="text-[11px] font-mono text-slate-500 mt-2 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Hover on sectors or click buttons above to inspect telemetry
            </span>
          </div>

          {/* Sector Telemetry Breakdown Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-carbon-900/90 border border-carbon-800 rounded-2xl p-6 shadow-xl font-mono">
              <div className="flex items-center justify-between pb-4 border-b border-carbon-800">
                <div>
                  <span className="text-xs text-slate-500 block uppercase">ACTIVE SECTOR INSPECTION</span>
                  <h3 className="text-xl font-display font-bold text-slate-100">
                    SECTOR 0{activeSector.sectorNumber}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  activeSector.sectorNumber === 1
                    ? 'bg-apex-cyan/20 text-apex-cyan border border-apex-cyan/40'
                    : activeSector.sectorNumber === 2
                    ? 'bg-apex-crimson/20 text-apex-crimson border border-apex-crimson/40'
                    : 'bg-apex-gold/20 text-apex-gold border border-apex-gold/40'
                }`}>
                  {activeSector.title}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans my-4 leading-relaxed">
                {activeSector.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-carbon-950 p-3 rounded-xl border border-carbon-800">
                  <span className="text-[10px] text-slate-500 block">SECTOR DISTANCE</span>
                  <span className="text-base font-bold text-slate-100">{activeSector.lengthMeters} m</span>
                </div>

                <div className="bg-carbon-950 p-3 rounded-xl border border-carbon-800">
                  <span className="text-[10px] text-slate-500 block">SPEED TRAP MAX</span>
                  <span className="text-base font-bold text-apex-crimson">{activeSector.speedTrapKmh} km/h</span>
                </div>

                <div className="bg-carbon-950 p-3 rounded-xl border border-carbon-800">
                  <span className="text-[10px] text-slate-500 block">BEST SECTOR TIME</span>
                  <span className="text-base font-bold text-apex-purple">{activeSector.bestSectorTime} 🟣</span>
                </div>

                <div className="bg-carbon-950 p-3 rounded-xl border border-carbon-800">
                  <span className="text-[10px] text-slate-500 block">BENCHMARK HOLDER</span>
                  <span className="text-sm font-bold text-slate-200 truncate block">{activeSector.bestSectorHolder}</span>
                </div>
              </div>

              {/* DRS Zone Status */}
              <div className="mt-4 pt-4 border-t border-carbon-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">DRS DETECTION & ACTIVATION:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  activeSector.drsZone
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-carbon-800 text-slate-500'
                }`}>
                  {activeSector.drsZone ? 'DRS ENABLED' : 'NO DRS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
