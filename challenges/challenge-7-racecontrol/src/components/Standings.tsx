import React, { useState } from 'react';
import { Trophy, Search, Users, Shield } from 'lucide-react';
import { DRIVERS, TEAMS } from '../data/mockRaceData';

export const Standings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrivers = DRIVERS.filter(
    d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeams = TEAMS.filter(
    t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.powerUnit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const maxDriverPoints = Math.max(...DRIVERS.map(d => d.points));
  const maxTeamPoints = Math.max(...TEAMS.map(t => t.points));

  const getFormBadge = (form: string) => {
    switch (form) {
      case 'P1':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'P2':
        return 'bg-slate-200/20 text-slate-200 border-slate-300/40';
      case 'P3':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'DNF':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      default:
        return 'bg-carbon-800 text-slate-400 border-carbon-700';
    }
  };

  return (
    <section id="standings" className="py-14 bg-carbon-950 border-b border-carbon-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-4 border-b border-carbon-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-apex-gold" />
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 tracking-tight">
                CHAMPIONSHIP STANDINGS
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              OFFICIAL APEX WORLD CHAMPIONSHIP POINTS TABLE • 2026 SEASON
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter by driver, team, nation..."
                className="w-64 pl-9 pr-4 py-2 bg-carbon-900 border border-carbon-700 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-apex-cyan transition-all"
              />
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center p-1 bg-carbon-900 border border-carbon-700 rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('drivers')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'drivers'
                    ? 'bg-apex-cyan text-black shadow-md shadow-apex-cyan/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>DRIVERS</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('constructors')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'constructors'
                    ? 'bg-apex-cyan text-black shadow-md shadow-apex-cyan/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>CONSTRUCTORS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drivers Standings Table */}
        {activeTab === 'drivers' && (
          <div className="bg-carbon-900/80 border border-carbon-800 rounded-2xl overflow-hidden shadow-xl">
            {filteredDrivers.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-sm">
                No drivers found matching "{searchQuery}"
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead className="bg-carbon-950/80 border-b border-carbon-800 text-slate-400 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 pl-6 pr-2">POS</th>
                      <th className="py-3.5 px-4">DRIVER</th>
                      <th className="py-3.5 px-4 hidden sm:table-cell">TEAM</th>
                      <th className="py-3.5 px-4 hidden lg:table-cell">RECENT FORM</th>
                      <th className="py-3.5 px-4 text-center hidden md:table-cell">WINS</th>
                      <th className="py-3.5 px-4 text-center hidden md:table-cell">PODIUMS</th>
                      <th className="py-3.5 pr-6 text-right">POINTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-carbon-800/60">
                    {filteredDrivers.map((driver, index) => {
                      const pointsPercentage = (driver.points / maxDriverPoints) * 100;
                      return (
                        <tr key={driver.id} className="hover:bg-carbon-800/40 transition-colors">
                          <td className="py-4 pl-6 pr-2 font-bold tabular-nums">
                            <span
                              className={`inline-block w-6 text-center ${
                                index === 0
                                  ? 'text-apex-gold font-extrabold text-base'
                                  : index <= 2
                                  ? 'text-slate-200'
                                  : 'text-slate-400'
                              }`}
                            >
                              {index + 1}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <span className="text-base">{driver.flag}</span>
                              <div
                                className="w-1.5 h-8 rounded-full"
                                style={{ backgroundColor: driver.teamColor }}
                              />
                              <div>
                                <span className="font-bold text-slate-100 block">
                                  {driver.name}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  #{driver.number} • {driver.country}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-slate-300 hidden sm:table-cell">
                            {driver.teamName}
                          </td>

                          <td className="py-4 px-4 hidden lg:table-cell">
                            <div className="flex items-center gap-1.5">
                              {driver.form.map((f, i) => (
                                <span
                                  key={i}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getFormBadge(
                                    f
                                  )}`}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center font-bold text-slate-200 hidden md:table-cell">
                            {driver.wins}
                          </td>

                          <td className="py-4 px-4 text-center font-bold text-slate-200 hidden md:table-cell">
                            {driver.podiums}
                          </td>

                          <td className="py-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24 bg-carbon-950 rounded-full h-2 overflow-hidden hidden sm:block">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${pointsPercentage}%`,
                                    backgroundColor: driver.teamColor,
                                  }}
                                />
                              </div>
                              <span className="font-bold text-base text-slate-100 tabular-nums">
                                {driver.points} <span className="text-xs text-slate-500 font-normal">PTS</span>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Constructors Standings Table */}
        {activeTab === 'constructors' && (
          <div className="bg-carbon-900/80 border border-carbon-800 rounded-2xl overflow-hidden shadow-xl">
            {filteredTeams.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-sm">
                No constructor found matching "{searchQuery}"
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead className="bg-carbon-950/80 border-b border-carbon-800 text-slate-400 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 pl-6 pr-2">POS</th>
                      <th className="py-3.5 px-4">CONSTRUCTOR</th>
                      <th className="py-3.5 px-4 hidden md:table-cell">POWER UNIT</th>
                      <th className="py-3.5 px-4 hidden sm:table-cell">TEAM PRINCIPAL</th>
                      <th className="py-3.5 px-4 text-center">WINS</th>
                      <th className="py-3.5 pr-6 text-right">POINTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-carbon-800/60">
                    {filteredTeams.map((team, index) => {
                      const pointsPercentage = (team.points / maxTeamPoints) * 100;
                      return (
                        <tr key={team.id} className="hover:bg-carbon-800/40 transition-colors">
                          <td className="py-4 pl-6 pr-2 font-bold tabular-nums">
                            <span
                              className={`inline-block w-6 text-center ${
                                index === 0
                                  ? 'text-apex-gold font-extrabold text-base'
                                  : index <= 2
                                  ? 'text-slate-200'
                                  : 'text-slate-400'
                              }`}
                            >
                              {index + 1}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3.5 h-3.5 rounded-full shadow-sm"
                                style={{ backgroundColor: team.color }}
                              />
                              <span className="font-bold text-slate-100">{team.name}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-slate-400 hidden md:table-cell">
                            {team.powerUnit}
                          </td>

                          <td className="py-4 px-4 text-slate-400 hidden sm:table-cell">
                            {team.principal}
                          </td>

                          <td className="py-4 px-4 text-center font-bold text-slate-200">
                            {team.wins}
                          </td>

                          <td className="py-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24 bg-carbon-950 rounded-full h-2 overflow-hidden hidden sm:block">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${pointsPercentage}%`,
                                    backgroundColor: team.color,
                                  }}
                                />
                              </div>
                              <span className="font-bold text-base text-slate-100 tabular-nums">
                                {team.points} <span className="text-xs text-slate-500 font-normal">PTS</span>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
