# Premium Frontend Challenge: "RaceControl" 🏎️💨

> **Tier:** Master / Grandmaster  
> **Estimated Completion Time:** 90–120 Minutes  
> **Tech Stack:** React 18+, TypeScript, Tailwind CSS, Framer Motion  
> **Theme:** High-Performance Motorsport Telemetry & Live Race Center  

---

## 🏁 Brief & Challenge Premise

You have been commissioned by the **Apex Grand Prix World Championship (AGP)**—a premier fictional global motorsport series—to build their next-generation race-weekend digital command center: **RaceControl**.

Unlike basic static landing pages, **RaceControl** is an ultra-high-fidelity, real-time web application. Fans across the globe use it during Grand Prix weekends to track sub-second live telemetry, inspect tyre degradation curves, examine interactive sector maps, and compare championship rivals head-to-head.

> [!IMPORTANT]
> **Strict Original IP Constraint**: Do NOT use Formula 1 branding, logos, trademarked names (Ferrari, Mercedes, Red Bull, Verstappen, Hamilton, etc.). All teams, drivers, engine manufacturers, and circuits in this challenge are 100% original fictional intellectual property (e.g., *Valkyrie Kinetic Racing*, *Solaris Hyperdrive*, *Julian Vance*, *Lumina Bay International Speedway*).

---

## 🎯 Core Requirements

### 1. 🎬 Cinematic Hero & Live Countdown
* **Full-Bleed Visual Impact**: High-contrast motorsport aesthetic with carbon textures, neon speed trails, and an animated prototype racecar aerodynamic silhouette.
* **Ticking Grand Prix Countdown**: Live ticking countdown (Days, Hours, Minutes, Seconds) targeting the start of the next race session.
* **Session Telemetry Pill**: Displays current Grand Prix round (Round 18 of 24), local weather telemetry (Track Temp: 38.4°C, Air Temp: 24.2°C), and DRS status.
* **Dual Action CTAs**: Smooth-scroll quick actions into the Live Race Center and Weekend Schedule.

### 2. ⚡ Live Race Center & Simulated Leaderboard
* **Real-Time Leaderboard Simulation**: Positions, gaps, tyre wear, and pit statuses update dynamically every few seconds from local mock data.
* **Smooth Positional Reordering**: When an overtake happens (e.g. P2 passes P1), the leaderboard rows must animate smoothly using Framer Motion layout springs (`layout` prop).
* **Tyre Strategy Badges**: Clear visual differentiation for tyre compounds (Soft = Red, Medium = Yellow, Hard = White, Intermediate = Green, Wet = Blue) with laps completed on the set.
* **Fastest Lap Recognition**: Highlight the driver holding the fastest lap of the race with a distinctive purple badge and time indicator (`1:18.421 🟣`).
* **Race Control Status Flags**: Interactive or automated flag states:
  * 🟢 **GREEN FLAG**: Standard racing conditions.
  * 🟡 **VSC (Virtual Safety Car)**: Yellow banner warning, delta speed limit active.
  * 🔴 **SAFETY CAR**: Full safety car deployment, pit lane open, no overtaking.
* **Simulation Controls**: Ability to Play, Pause, toggle Speed (1x / 2x), and Reset telemetry.

### 3. 📅 Circuit Weekend Schedule & Local Timezone Conversion
* **Timeline of All Sessions**: Free Practice 1, Free Practice 2, Qualifying, Sprint Shootout, and the Main Grand Prix.
* **Automatic Local Timezone Detection**: Timestamps are stored in UTC ISO 8601 strings in the mock data file and automatically converted into the user’s local browser timezone via `Intl.DateTimeFormat`.
* **Session Status States**:
  * `COMPLETED`: Muted visual state with official session summary notes.
  * `LIVE NOW`: Pulsing beacon indicating the ongoing active session.
  * `UPCOMING`: Scheduled session with clear local start time.

### 4. 🏆 Standings Engine with Instant Search
* **Tabbed View**: Switch between **Driver Championship** and **Constructor Championship**.
* **Real-time Filter/Search**: Instantly filter drivers or teams by name, power unit, or nationality with zero layout jitter.
* **Visual Points Distribution**: Proportional progress bars showing points relative to the championship leader.
* **Recent Form Guide**: Color-coded badges displaying finish positions across the last 5 races (`P1`, `P2`, `P3`, `TOP5`, `PTS`, `DNF`).

### 5. ⚔️ Driver Head-to-Head Comparison Tool
* **Dynamic Driver Selection**: Two dropdown selectors to pit any two championship contenders against each other.
* **Key Metric Comparative Dials**: Side-by-side comparison for Championship Points, Race Wins, Podiums, Pole Positions, and Qualifying Average.
* **Animated SVG Radar / Spider Chart**: 5-axis telemetry skill radar comparing:
  1. Top Speed
  2. Consistency
  3. Tyre Management
  4. Racecraft
  5. Qualifying Pace
* **Comparative Percentage Bars**: Fluid Framer Motion bars displaying head-to-head dominance.

### 6. 🗺️ Interactive SVG Circuit Map
* **Custom Vector Track**: Complete SVG layout of the *Lumina Bay International Speedway*.
* **Interactive Hoverable Sectors**:
  * **Sector 1 (Harbor Straight & Esses)**: High-speed full throttle section with DRS Zone 1.
  * **Sector 2 (Neon Canopy)**: High-downforce technical chicane and speed trap.
  * **Sector 3 (Marina Complex)**: 90-degree street complex opening into the main straight.
* **Live Telemetry Inspection Card**: Hovering or clicking a sector updates the side panel with sector length, speed trap max velocity, benchmark sector lap time, and DRS activation zones.

### 7. 🌓 Design System, Accessibility & Theming
* **Dark / Light Theme Toggle**: Persistent theme state with a default high-octane dark carbon aesthetic and clean high-contrast light mode.
* **WAI-ARIA & Keyboard Navigation**: Full keyboard tab accessibility, proper ARIA labels on all interactive controls (`aria-label`, `aria-expanded`, `role="combobox"`).
* **Loading Skeletons & Empty States**: Polished pulse skeletons and zero-result search fallback states.

---

## 📁 File & Architecture Structure

```
challenge-7-racecontrol/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── types/
│   │   └── race.ts                  # Pure TypeScript interfaces & types
│   ├── data/
│   │   └── mockRaceData.ts          # Fictional championship dataset
│   ├── context/
│   │   └── ThemeContext.tsx         # Dark / Light theme management
│   ├── components/
│   │   ├── Navbar.tsx               # Telemetry navigation & status
│   │   ├── Hero.tsx                 # Full-bleed hero & countdown
│   │   ├── LiveRaceCenter.tsx       # Live leaderboard & simulation
│   │   ├── CircuitSchedule.tsx      # Timezone-aware weekend timeline
│   │   ├── Standings.tsx            # Drivers & Constructors standings
│   │   ├── DriverComparison.tsx     # SVG Radar & Head-to-Head analytics
│   │   ├── TrackMap.tsx             # Interactive SVG circuit sectors
│   │   ├── LoadingSkeleton.tsx      # Skeleton loading states
│   │   └── Footer.tsx               # Fictional series telemetry footer
│   ├── App.tsx                      # Root layout coordinator
│   ├── main.tsx                     # React DOM root
│   └── index.css                    # Tailwind imports & custom scrollbar
└── README.md
```

---

## 🚀 Running the Project Locally

```bash
# 1. Navigate into the challenge directory
cd challenges/challenge-7-racecontrol

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev

# 4. Open in browser: http://localhost:3000
```

---

## 🌟 Stretch Goals & Advanced Extensions

1. **Audio Telemetry Engine**: Integrate Web Audio API or subtle synthetic engine sounds / team radio beep effects when toggling live telemetry.
2. **Pit Window Strategy Predictor**: Build an interactive slider that predicts virtual pit exit positions based on tyre compound lap deltas.
3. **Ghost Car Lap Comparison**: Animate a glowing dot along the SVG track path representing the gap between Driver A and Driver B in real-time.
4. **Export Telemetry Sheet**: Add a button to export the live race leaderboard to CSV or JSON.
