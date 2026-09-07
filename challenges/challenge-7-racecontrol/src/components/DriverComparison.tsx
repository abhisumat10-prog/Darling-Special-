import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Gauge } from 'lucide-react';
import { DRIVERS } from '../data/mockRaceData';
import { Driver } from '../types/race';

export const DriverComparison: React.FC = () => {
  const [driverAId, setDriverAId] = useState<string>('vance');
  const [driverBId, setDriverBId] = useState<string>('sterling');

  const driverA = DRIVERS.find(d => d.id === driverAId) || DRIVERS[0];
  const driverB = DRIVERS.find(d => d.id === driverBId) || DRIVERS[1];

  const radarKeys: (keyof Driver['radarStats'])[] = [
    'speed',
    'consistency',
    'tyreManagement',
    'racecraft',
    'qualifying',
  ];

  const radarLabels: Record<keyof Driver['radarStats'], string> = {
    speed: 'TOP SPEED',
    consistency: 'CONSISTENCY',
    tyreManagement: 'TYRE MGMT',
    racecraft: 'RACECRAFT',
    qualifying: 'QUALIFYING',
  };

  // Generate 5-point SVG polygon coordinates
  const getRadarPolygon = (stats: Driver['radarStats'], center = 150, radius = 105) => {
    const total = radarKeys.length;
    return radarKeys
      .map((key, i) => {
        const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
        const valueRatio = stats[key] / 100;
        const x = center + radius * valueRatio * Math.cos(angle);
        const y = center + radius * valueRatio * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const getAxisPoint = (i: number, center = 150, radius = 105) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      labelX: center + (radius + 24) * Math.cos(angle),
      labelY: center + (radius + 18) * Math.sin(angle),
    };
  };

  const statsComparison = [
    { label: 'Championship Points', valA: driverA.points, valB: driverB.points, suffix: ' PTS' },
    { label: 'Grand Prix Wins', valA: driverA.wins, valB: driverB.wins, suffix: '' },
    { label: 'Podium Finishes', valA: driverA.podiums, valB: driverB.podiums, suffix: '' },
    { label: 'Pole Positions', valA: driverA.poles, valB: driverB.poles, suffix: '' },
    { label: 'Average Finish', valA: driverA.avgFinish, valB: driverB.avgFinish, suffix: '', lowerIsBetter: true },
  ];

  return (
    <section id="comparison" className="py-14 bg-carbon-950/80 border-b border-carbon-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon-800 border border-carbon-700 text-xs font-mono text-apex-cyan mb-2">
            <GitCompare className="w-3.5 h-3.5" />
            <span>HEAD-TO-HEAD ANALYTICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-100 tracking-tight">
            DRIVER TELEMETRY COMPARISON
          </h2>
          <p className="text-sm font-mono text-slate-400 mt-2">
            Compare performance metrics, racecraft ratings, and telemetry attributes side by side.
          </p>
        </div>

        {/* Driver Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Driver A Selector */}
          <div
            className="p-5 rounded-2xl bg-carbon-900 border transition-all"
            style={{ borderColor: `${driverA.teamColor}60` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">DRIVER A</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${driverA.teamColor}20`, color: driverA.teamColor }}>
                {driverA.teamName}
              </span>
            </div>
            <select
              value={driverAId}
              onChange={e => setDriverAId(e.target.value)}
              className="w-full bg-carbon-950 border border-carbon-700 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-100 focus:outline-none focus:border-apex-cyan"
            >
              {DRIVERS.map(d => (
                <option key={d.id} value={d.id} disabled={d.id === driverBId}>
                  {d.flag} #{d.number} {d.name} ({d.teamName})
                </option>
              ))}
            </select>
          </div>

          {/* Driver B Selector */}
          <div
            className="p-5 rounded-2xl bg-carbon-900 border transition-all"
            style={{ borderColor: `${driverB.teamColor}60` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">DRIVER B</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${driverB.teamColor}20`, color: driverB.teamColor }}>
                {driverB.teamName}
              </span>
            </div>
            <select
              value={driverBId}
              onChange={e => setDriverBId(e.target.value)}
              className="w-full bg-carbon-950 border border-carbon-700 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-100 focus:outline-none focus:border-apex-cyan"
            >
              {DRIVERS.map(d => (
                <option key={d.id} value={d.id} disabled={d.id === driverAId}>
                  {d.flag} #{d.number} {d.name} ({d.teamName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Grid: Radar Chart + Stats Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart Visual */}
          <div className="lg:col-span-6 bg-carbon-900/90 border border-carbon-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl">
            <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-apex-cyan" />
              <span>SKILL ATTRIBUTES RADAR (0 - 100)</span>
            </h3>

            {/* Custom SVG Radar */}
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                {/* Background Concentric Webs */}
                {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
                  <polygon
                    key={idx}
                    points={radarKeys
                      .map((_, i) => {
                        const { x, y } = getAxisPoint(i, 150, 105 * scale);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#2A364F"
                    strokeWidth="1"
                    strokeDasharray={scale < 1 ? '3 3' : 'none'}
                  />
                ))}

                {/* Web Axes Lines */}
                {radarKeys.map((_, i) => {
                  const { x, y } = getAxisPoint(i, 150, 105);
                  return <line key={i} x1="150" y1="150" x2={x} y2={y} stroke="#2A364F" strokeWidth="1" />;
                })}

                {/* Driver B Polygon (Background) */}
                <polygon
                  points={getRadarPolygon(driverB.radarStats)}
                  fill={`${driverB.teamColor}33`}
                  stroke={driverB.teamColor}
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />

                {/* Driver A Polygon (Foreground) */}
                <polygon
                  points={getRadarPolygon(driverA.radarStats)}
                  fill={`${driverA.teamColor}40`}
                  stroke={driverA.teamColor}
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />

                {/* Axis Labels */}
                {radarKeys.map((key, i) => {
                  const { labelX, labelY } = getAxisPoint(i, 150, 105);
                  return (
                    <text
                      key={key}
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-400 font-mono text-[9px] font-bold"
                    >
                      {radarLabels[key]}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Radar Legend */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-carbon-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: driverA.teamColor }}></span>
                <span className="font-bold text-slate-200">{driverA.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: driverB.teamColor }}></span>
                <span className="font-bold text-slate-200">{driverB.name}</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Key Metrics */}
          <div className="lg:col-span-6 space-y-4">
            {statsComparison.map((stat, idx) => {
              const isAWinner = stat.lowerIsBetter ? stat.valA < stat.valB : stat.valA > stat.valB;
              const isBWinner = stat.lowerIsBetter ? stat.valB < stat.valA : stat.valB > stat.valA;
              const totalVal = Math.max(0.1, Number(stat.valA) + Number(stat.valB));
              const pctA = Math.round((Number(stat.valA) / totalVal) * 100);

              return (
                <div key={idx} className="bg-carbon-900/90 border border-carbon-800/80 rounded-2xl p-4 shadow-md font-mono">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className={`font-bold ${isAWinner ? 'text-slate-100 text-sm' : 'text-slate-400'}`}>
                      {stat.valA}
                      {stat.suffix}
                    </span>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">{stat.label}</span>
                    <span className={`font-bold ${isBWinner ? 'text-slate-100 text-sm' : 'text-slate-400'}`}>
                      {stat.valB}
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Dual comparative bar */}
                  <div className="h-2 w-full bg-carbon-950 rounded-full flex overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pctA}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full"
                      style={{ backgroundColor: driverA.teamColor }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - pctA}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full"
                      style={{ backgroundColor: driverB.teamColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
