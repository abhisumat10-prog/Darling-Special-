import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Zap, Compass, Flag, Thermometer, Wind } from 'lucide-react';
import { CIRCUIT_INFO } from '../data/mockRaceData';

interface HeroProps {
  onLaunchLive: () => void;
  onViewSchedule: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchLive, onViewSchedule }) => {
  // Target next race time (18 hours from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 17,
    minutes: 48,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-carbon-800/80 bg-gradient-to-b from-carbon-950 via-carbon-900 to-carbon-950">
      {/* Background Neon Glow & Speed Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-apex-cyan/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-apex-crimson/15 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#2A364F_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading, Countdown & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon-800/90 border border-apex-cyan/30 text-xs font-mono text-apex-cyan">
              <Zap className="w-3.5 h-3.5 text-apex-cyan" />
              <span>ROUND 18 OF 24 • WORLD CHAMPIONSHIP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight leading-none text-slate-100">
              NEO-TOKYO <br />
              <span className="bg-gradient-to-r from-apex-cyan via-white to-apex-crimson bg-clip-text text-transparent">
                NIGHT GRAND PRIX
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 font-normal max-w-xl leading-relaxed">
              57 laps through the neon-drenched harbor of Lumina Bay. Experience real-time sub-second telemetry, 
              live tyre degradation analytics, and dynamic AI race control.
            </p>

            {/* Countdown Grid */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Lights Out Countdown
              </span>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINS', val: timeLeft.minutes },
                  { label: 'SECS', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-carbon-900/90 border border-carbon-700/70 rounded-xl p-2.5 sm:p-3 text-center shadow-lg backdrop-blur-sm"
                  >
                    <span className="block text-2xl sm:text-3xl font-mono font-bold text-slate-100 tabular-nums">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-apex-cyan uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onLaunchLive}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wider text-black bg-apex-cyan hover:bg-white transition-all duration-200 shadow-xl shadow-apex-cyan/25 hover:shadow-white/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Launch Race Center</span>
                <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
              </button>

              <button
                type="button"
                onClick={onViewSchedule}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm font-medium uppercase tracking-wider text-slate-200 bg-carbon-800/80 hover:bg-carbon-700 border border-carbon-600 hover:border-slate-400 transition-all duration-200 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>Weekend Schedule</span>
              </button>
            </div>

            {/* Track Micro Specs */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-slate-400 border-t border-carbon-800/60">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-apex-cyan" />
                <span>{CIRCUIT_INFO.trackLengthKm} km</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-apex-crimson" />
                <span>{CIRCUIT_INFO.totalLaps} Laps ({CIRCUIT_INFO.turns} Turns)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span>Track 38.4°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-blue-400" />
                <span>Air 24.2°C</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Prototype Racecar Silhouette SVG */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-lg aspect-[4/3] rounded-2xl bg-gradient-to-tr from-carbon-900 via-carbon-800 to-carbon-900 border border-carbon-700/60 p-6 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Telemetry Corner Header */}
              <div className="flex items-center justify-between border-b border-carbon-700/50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-apex-cyan animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
                    CHASSIS AERO TELEMETRY
                  </span>
                </div>
                <span className="text-[11px] font-mono text-apex-cyan bg-apex-cyan/10 px-2 py-0.5 rounded border border-apex-cyan/30">
                  DRS ACTIVE (342 KM/H)
                </span>
              </div>

              {/* Stylized Modern Formula Silhouette SVG */}
              <div className="my-auto relative flex items-center justify-center py-4">
                <svg
                  viewBox="0 0 600 200"
                  className="w-full h-auto drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Airflow streaks */}
                  <path d="M 20 50 Q 200 40 450 45 T 580 40" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                  <path d="M 40 85 Q 260 70 480 80 T 590 75" stroke="#00F0FF" strokeWidth="2" strokeDasharray="8 6" opacity="0.7" />
                  <path d="M 60 120 Q 300 130 520 110 T 595 105" stroke="#FF2A54" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />

                  {/* Rear Wing & Endplate */}
                  <rect x="50" y="30" width="20" height="70" rx="3" fill="#1B2436" stroke="#00F0FF" strokeWidth="2" />
                  <path d="M 50 35 L 120 35 L 115 48 L 50 48 Z" fill="#00F0FF" opacity="0.9" />
                  <path d="M 50 54 L 110 54 L 105 65 L 50 65 Z" fill="#2A364F" />

                  {/* Rear Wheel */}
                  <circle cx="150" cy="130" r="45" fill="#06080B" stroke="#2A364F" strokeWidth="6" />
                  <circle cx="150" cy="130" r="30" fill="#121824" stroke="#F59E0B" strokeWidth="3" />
                  <circle cx="150" cy="130" r="12" fill="#00F0FF" />

                  {/* Engine Cover & Shark Fin */}
                  <path
                    d="M 120 55 C 160 55 190 70 240 70 L 320 85 C 330 95 350 110 380 110 L 480 115 L 540 145 L 200 145 Z"
                    fill="url(#chassisGradient)"
                    stroke="#00F0FF"
                    strokeWidth="1.5"
                  />

                  {/* Halo & Cockpit */}
                  <path d="M 270 85 C 290 60 330 65 350 85 Z" fill="#06080B" stroke="#A855F7" strokeWidth="2" />
                  <circle cx="305" cy="78" r="8" fill="#F8FAFC" />

                  {/* Sidepod & Bargeboard */}
                  <path d="M 230 115 L 340 105 L 360 135 L 210 135 Z" fill="#FF2A54" opacity="0.8" />

                  {/* Nose Cone & Front Wing */}
                  <path d="M 370 100 L 490 125 L 530 135 L 480 140 Z" fill="#121824" stroke="#00F0FF" strokeWidth="1" />
                  <path d="M 480 130 L 560 140 L 560 155 L 470 145 Z" fill="#00F0FF" opacity="0.8" />
                  <rect x="540" y="125" width="12" height="32" rx="2" fill="#FF2A54" />

                  {/* Front Wheel */}
                  <circle cx="460" cy="130" r="42" fill="#06080B" stroke="#2A364F" strokeWidth="6" />
                  <circle cx="460" cy="130" r="28" fill="#121824" stroke="#F59E0B" strokeWidth="3" />
                  <circle cx="460" cy="130" r="10" fill="#00F0FF" />

                  {/* Underfloor Ground Effect Diffuser Glow */}
                  <rect x="180" y="145" width="260" height="4" fill="#00F0FF" className="animate-pulse" />

                  <defs>
                    <linearGradient id="chassisGradient" x1="120" y1="55" x2="540" y2="145" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0B0F15" />
                      <stop offset="0.5" stopColor="#1B2436" />
                      <stop offset="1" stopColor="#00F0FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Bottom Card Micro Telemetry Row */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-carbon-700/50 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block">CURRENT LEADER</span>
                  <span className="text-slate-200 font-bold">J. VANCE (#1)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">LAST LAP</span>
                  <span className="text-apex-purple font-bold">1:18.421 🟣</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">DELTA GAP</span>
                  <span className="text-apex-cyan font-bold">+1.428s</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
