import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:scale-105 transition-all duration-200 shadow-2xs"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-[var(--text-primary)]" />
      ) : (
        <Sun className="w-4 h-4 text-[var(--text-primary)]" />
      )}
    </button>
  );
}
