import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, AlertTriangle, ShieldAlert, CheckCircle, Zap } from 'lucide-react';
import { FlagStatus, LeaderboardEntry, TyreCompound } from '../types/race';
import { INITIAL_LEADERBOARD, INITIAL_TELEMETRY_STATUS } from '../data/mockRaceData';

export const LiveRaceCenter: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [currentLap, setCurrentLap] = useState<number>(INITIAL_TELEMETRY_STATUS.currentLap);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [flagStatus, setFlagStatus] = useState<FlagStatus>('GREEN');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulation engine: runs every 3000ms / speed
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = Math.max(1200, 3200 / speed);

    const timer = setInterval(() => {
      setLeaderboard(prev => {
        // Clone array
        const updated = prev.map(entry => ({ ...entry }));

        // Advance lap periodically
        setCurrentLap(lap => (lap >= 57 ? 1 : lap + 1));
        setLastUpdated(new Date());

        // Introduce random overtaking or interval drift
        const swapChance = Math.random();
        if (swapChance > 0.45 && updated.length >= 4) {
          // Pick two adjacent cars between P2 and P6
          const swapIdx = Math.floor(Math.random() * 4) + 1;
          const carA = updated[swapIdx];
          const carB = updated[swapIdx + 1];

          if (carA && carB && !carA.inPit && !carB.inPit) {
            // Swap positions
            const tempPos = carA.position;
            carA.position = carB.position;
            carB.position = tempPos;

            carA.previousPosition = tempPos;
            carB.previousPosition = carA.position;

            updated[swapIdx] = carB;
            updated[swapIdx + 1] = carA;
          }
        }

        // Random pit stops simulation
        updated.forEach((driver, idx) => {
          // Increase tyre laps
          driver.tyreLaps += 1;

          // Pit threshold
          if (driver.tyreLaps > 28 && !driver.inPit && Math.random() > 0.7) {
            driver.inPit = true;
            driver.pitCount += 1;
            driver.tyreLaps = 0;
            // Switch compound
            const compounds: TyreCompound[] = ['SOFT', 'MEDIUM', 'HARD'];
            const nextCompound = compounds[Math.floor(Math.random() * compounds.length)];
            driver.tyreCompound = nextCompound;
          } else if (driver.inPit) {
            driver.inPit = false;
          }

          // Randomize minor interval deltas
          if (idx === 0) {
            driver.gapToLeader = 'LEADER';
            driver.interval = '-';
          } else {
            const baseGap = idx * 2.8 + (Math.random() * 0.8 - 0.4);
            driver.gapToLeader = `+${baseGap.toFixed(3)}s`;
            const baseInterval = 1.2 + (Math.random() * 0.6 - 0.3);
            driver.interval = `+${baseInterval.toFixed(3)}s`;
          }
        });

        // Re-sort strictly by position
        updated.sort((a, b) => a.position - b.position);

        return updated;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const handleReset = () => {
    setLeaderboard(INITIAL_LEADERBOARD);
    setCurrentLap(INITIAL_TELEMETRY_STATUS.currentLap);
    setFlagStatus('GREEN');
  };

  const getTyreBadge = (compound: TyreCompound) => {
    switch (compound) {
      case 'SOFT':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'HARD':
        return 'bg-slate-200/20 text-slate-200 border-slate-300/50';
      case 'INTERMEDIATE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'WET':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  return (
    <section id="race-center" className="py-12 bg-carbon-950 border-b border-carbon-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Live Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-carbon-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-apex-cyan animate-ping"></span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 tracking-tight">
                LIVE RACE CENTER
              </h2>
            </div>
            <p className="text-sm font-mono text-slate-400">
              REAL-TIME TRACK TELEMETRY • LAST TELEMETRY PACKET: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>

          {/* Race Simulation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Lap Counter Pill */}
            <div className="px-3.5 py-1.5 rounded-lg bg-carbon-900 border border-carbon-700 font-mono text-sm">
              <span className="text-slate-400 mr-1.5">LAP</span>
              <span className="text-apex-cyan font-bold tabular-nums">{currentLap}</span>
              <span className="text-slate-500"> / 57</span>
            </div>

            {/* Flag Selector */}
            <div className="flex items-center rounded-lg bg-carbon-900 border border-carbon-700 p-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFlagStatus('GREEN')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  flagStatus === 'GREEN' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>GREEN</span>
              </button>
              <button
                type="button"
                onClick={() => setFlagStatus('VSC')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  flagStatus === 'VSC' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>VSC</span>
              </button>
              <button
                type="button"
                onClick={() => setFlagStatus('SAFETY_CAR')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                  flagStatus === 'SAFETY_CAR' ? 'bg-apex-crimson text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>SC</span>
              </button>
            </div>

            {/* Play/Pause & Speed */}
            <div className="flex items-center gap-1 bg-carbon-900 border border-carbon-700 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded hover:bg-carbon-800 text-slate-200 transition-colors"
                aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-apex-cyan" /> : <Play className="w-4 h-4 text-emerald-400" />}
              </button>
              <button
                type="button"
                onClick={() => setSpeed(s => (s === 1 ? 2 : 1))}
                className="px-2 py-1 rounded text-xs font-mono font-bold text-slate-300 hover:bg-carbon-800"
                aria-label="Toggle simulation speed"
              >
                {speed}x
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded hover:bg-carbon-800 text-slate-400 hover:text-white"
                aria-label="Reset leaderboard"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Flag Alert Banner */}
        {flagStatus !== 'GREEN' && (
          <div
            className={`mb-6 p-3 rounded-xl border flex items-center justify-between font-mono text-sm animate-pulse ${
              flagStatus === 'VSC'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                : 'bg-red-950/40 border-red-500/50 text-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">
                {flagStatus === 'VSC' ? 'VIRTUAL SAFETY CAR DEPLOYED' : 'SAFETY CAR DEPLOYED — DELTA SPEED LIMIT ACTIVE'}
              </span>
            </div>
            <span className="text-xs uppercase px-2 py-0.5 rounded bg-black/40">NO OVERTAKING</span>
          </div>
        )}

        {/* Leaderboard Table Container */}
        <div className="bg-carbon-900/80 border border-carbon-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead className="bg-carbon-950/80 border-b border-carbon-800 text-slate-400 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 pl-4 sm:pl-6 pr-2">POS</th>
                  <th className="py-3.5 px-3">DRIVER</th>
                  <th className="py-3.5 px-3 hidden sm:table-cell">TEAM</th>
                  <th className="py-3.5 px-3">GAP</th>
                  <th className="py-3.5 px-3 hidden md:table-cell">INTERVAL</th>
                  <th className="py-3.5 px-3">TYRE</th>
                  <th className="py-3.5 px-3 hidden lg:table-cell">LAST LAP</th>
                  <th className="py-3.5 pr-4 sm:pr-6 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon-800/60">
                <AnimatePresence initial={false}>
                  {leaderboard.map(entry => {
                    const posDelta = entry.previousPosition - entry.position;
                    return (
                      <motion.tr
                        key={entry.driverId}
                        layout
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className={`hover:bg-carbon-800/40 transition-colors ${
                          entry.inPit ? 'bg-amber-950/15' : ''
                        }`}
                      >
                        {/* Position + Delta */}
                        <td className="py-3.5 pl-4 sm:pl-6 pr-2 font-bold tabular-nums">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 text-center ${
                                entry.position === 1
                                  ? 'text-apex-gold font-extrabold text-base'
                                  : entry.position <= 3
                                  ? 'text-slate-100 font-bold'
                                  : 'text-slate-400'
                              }`}
                            >
                              {entry.position}
                            </span>
                            <span className="text-[10px] w-3">
                              {posDelta > 0 && <span className="text-emerald-400">▲</span>}
                              {posDelta < 0 && <span className="text-red-400">▼</span>}
                              {posDelta === 0 && <span className="text-slate-600">-</span>}
                            </span>
                          </div>
                        </td>

                        {/* Driver */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            {/* Team color accent line */}
                            <div
                              className="w-1 h-8 rounded-full"
                              style={{ backgroundColor: entry.teamColor }}
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-100 tracking-wide">
                                  {entry.driverName}
                                </span>
                                <span className="text-[10px] text-slate-500 font-normal">
                                  {entry.driverCode}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-400 block sm:hidden">
                                {entry.teamName}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Team (Desktop) */}
                        <td className="py-3.5 px-3 text-slate-300 hidden sm:table-cell">
                          {entry.teamName}
                        </td>

                        {/* Gap To Leader */}
                        <td className="py-3.5 px-3 font-semibold text-slate-200 tabular-nums">
                          {entry.gapToLeader === 'LEADER' ? (
                            <span className="text-apex-gold font-bold px-2 py-0.5 rounded bg-apex-gold/10 border border-apex-gold/30 text-[11px]">
                              LEADER
                            </span>
                          ) : (
                            entry.gapToLeader
                          )}
                        </td>

                        {/* Interval */}
                        <td className="py-3.5 px-3 text-slate-400 tabular-nums hidden md:table-cell">
                          {entry.interval}
                        </td>

                        {/* Tyre Compound Badge */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getTyreBadge(
                                entry.tyreCompound
                              )}`}
                            >
                              {entry.tyreCompound[0]}
                            </span>
                            <span className="text-[11px] text-slate-500 hidden sm:inline">
                              {entry.tyreLaps}L
                            </span>
                          </div>
                        </td>

                        {/* Last Lap Time */}
                        <td className="py-3.5 px-3 tabular-nums hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <span className={entry.fastestLap ? 'text-apex-purple font-bold' : 'text-slate-300'}>
                              {entry.lastLapTime}
                            </span>
                            {entry.fastestLap && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-apex-purple/20 text-apex-purple border border-apex-purple/40 font-bold">
                                FASTEST
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status (In Pit / Pits Taken) */}
                        <td className="py-3.5 pr-4 sm:pr-6 text-right">
                          {entry.inPit ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold animate-pulse">
                              <Zap className="w-3 h-3" />
                              IN PIT
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">
                              {entry.pitCount} {entry.pitCount === 1 ? 'Stop' : 'Stops'}
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
