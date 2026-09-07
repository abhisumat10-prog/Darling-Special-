import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveRaceCenter } from './components/LiveRaceCenter';
import { CircuitSchedule } from './components/CircuitSchedule';
import { Standings } from './components/Standings';
import { DriverComparison } from './components/DriverComparison';
import { TrackMap } from './components/TrackMap';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('race-center');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-carbon-950 text-slate-100 font-sans transition-colors selection:bg-apex-cyan selection:text-black">
        {/* Navigation Bar */}
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Hero Section */}
        <main>
          <Hero
            onLaunchLive={() => scrollToSection('race-center')}
            onViewSchedule={() => scrollToSection('schedule')}
          />

          {/* Live Race Center */}
          <LiveRaceCenter />

          {/* Interactive Circuit Map */}
          <TrackMap />

          {/* Circuit Weekend Schedule */}
          <CircuitSchedule />

          {/* Championship Standings */}
          <Standings />

          {/* Driver Head-to-Head Comparison */}
          <DriverComparison />
        </main>

        {/* Platform Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
