import React from 'react';
import { Calendar, Clock, CheckCircle2, Radio, MapPin, AlertCircle } from 'lucide-react';
import { WEEKEND_SESSIONS, CIRCUIT_INFO } from '../data/mockRaceData';
import { WeekendSession } from '../types/race';

export const CircuitSchedule: React.FC = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatLocalTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
  };

  const getSessionBadge = (status: WeekendSession['status']) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 text-[11px] font-mono font-bold animate-pulse">
            <Radio className="w-3 h-3" />
            LIVE NOW
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-carbon-800 text-slate-400 border border-carbon-700 text-[11px] font-mono">
            <CheckCircle2 className="w-3 h-3 text-slate-500" />
            OFFICIAL RESULTS
          </span>
        );
      case 'UPCOMING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-apex-cyan/10 text-apex-cyan border border-apex-cyan/30 text-[11px] font-mono font-semibold">
            <Clock className="w-3 h-3" />
            NEXT UP
          </span>
        );
    }
  };

  return (
    <section id="schedule" className="py-14 bg-carbon-950/60 border-b border-carbon-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-carbon-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="w-5 h-5 text-apex-cyan" />
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 tracking-tight">
                RACE WEEKEND SCHEDULE
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-apex-crimson" />
              <span>{CIRCUIT_INFO.name} • {CIRCUIT_INFO.city}, {CIRCUIT_INFO.country}</span>
            </div>
          </div>

          {/* Timezone Disclaimer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-carbon-900 border border-carbon-700/70 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-apex-cyan" />
            <span>LOCAL TIMEZONE: <span className="text-white font-bold">{userTimezone}</span></span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEEKEND_SESSIONS.map((session, index) => {
            const { date, time } = formatLocalTime(session.startTimeUTC);
            const isLive = session.status === 'LIVE';

            return (
              <div
                key={session.id}
                className={`relative rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  isLive
                    ? 'bg-gradient-to-b from-carbon-900 via-carbon-900 to-emerald-950/30 border-emerald-500/50 shadow-xl shadow-emerald-500/10 scale-[1.02]'
                    : session.status === 'COMPLETED'
                    ? 'bg-carbon-900/40 border-carbon-800/80 text-slate-400'
                    : 'bg-carbon-900/80 border-carbon-700/80 hover:border-apex-cyan/40 shadow-lg'
                }`}
              >
                {/* Card Top Row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      SESSION 0{index + 1}
                    </span>
                    {getSessionBadge(session.status)}
                  </div>

                  <h3 className={`text-lg font-display font-bold mb-2 ${isLive ? 'text-white' : 'text-slate-100'}`}>
                    {session.name}
                  </h3>

                  {/* Time and Duration */}
                  <div className="space-y-1.5 font-mono text-xs my-4 bg-carbon-950/60 rounded-xl p-3 border border-carbon-800">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-500">Date:</span>
                      <span className="font-semibold text-slate-200">{date}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-500">Start Time:</span>
                      <span className="font-bold text-apex-cyan text-sm">{time}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-500">Duration:</span>
                      <span>{session.durationMinutes} Minutes</span>
                    </div>
                  </div>
                </div>

                {/* Highlights / Notes */}
                {session.sessionHighlights && (
                  <div className="pt-3 border-t border-carbon-800/60 text-xs font-mono text-slate-400 flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <p className="line-clamp-2">{session.sessionHighlights}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
