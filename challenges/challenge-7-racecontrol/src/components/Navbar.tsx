import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Radio, Menu, X, Flag, Gauge, Trophy, Users, GitCompare } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'race-center', label: 'Live Race Center', icon: Gauge },
    { id: 'schedule', label: 'Schedule', icon: Flag },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'comparison', label: 'Head-to-Head', icon: GitCompare },
    { id: 'track-map', label: 'Track Map', icon: Users },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-carbon-950/85 dark:bg-carbon-950/90 border-b border-carbon-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-apex-cyan via-blue-600 to-apex-crimson flex items-center justify-center shadow-lg shadow-apex-cyan/20">
              <span className="font-mono font-black text-black text-base italic tracking-tighter">APX</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-wider text-slate-100 dark:text-slate-100">
                  APEX<span className="text-apex-cyan">GP</span>
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-carbon-800 text-apex-cyan border border-apex-cyan/30">
                  RACE CONTROL
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-apex-cyan/15 text-apex-cyan border border-apex-cyan/40 font-bold shadow-sm shadow-apex-cyan/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-carbon-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold">LIVE TELEMETRY</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg bg-carbon-800/80 border border-carbon-700/60 text-slate-300 hover:text-apex-cyan hover:border-apex-cyan/40 transition-all focus:outline-none focus:ring-2 focus:ring-apex-cyan"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-apex-cyan" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-carbon-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-carbon-800 bg-carbon-950/95 px-4 pt-3 pb-5 space-y-2 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-3 py-1.5 mb-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SESSION: SPRINT LIVE (NEO-TOKYO)</span>
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono uppercase tracking-wide transition-all ${
                  isActive
                    ? 'bg-apex-cyan/20 text-apex-cyan font-bold border border-apex-cyan/40'
                    : 'text-slate-300 hover:bg-carbon-800'
                }`}
              >
                <Icon className="w-4 h-4 text-apex-cyan" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
