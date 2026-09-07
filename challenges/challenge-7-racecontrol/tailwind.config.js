/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#06080B',
          900: '#0B0F15',
          800: '#121824',
          700: '#1B2436',
          600: '#2A364F',
          500: '#3D4D6E',
        },
        apex: {
          cyan: '#00F0FF',
          crimson: '#FF2A54',
          gold: '#F59E0B',
          emerald: '#10B981',
          purple: '#A855F7',
          blue: '#3B82F6',
        },
        tyre: {
          soft: '#EF4444',
          medium: '#F59E0B',
          hard: '#F8FAFC',
          inters: '#10B981',
          wet: '#3B82F6',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Cabinet Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'speed-streak': 'speedStreak 3s linear infinite',
      },
      keyframes: {
        speedStreak: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
