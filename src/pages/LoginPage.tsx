import { useState, useId } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { X, ArrowRight, Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';
import { useAuth } from '../context/auth-context';
import { signIn, signUp } from '../services/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, loading: sessionLoading, configured } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const displayNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup' && !displayName.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!configured) {
      setError('Supabase is not configured. Check the VITE_SUPABASE settings in your .env file.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const data = await signUp(email, password, displayName);
        if (data.session) navigate('/');
        else setMessage('Account created. Check your email to confirm it, then sign in.');
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!sessionLoading && user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col justify-between p-4 sm:p-6 md:p-10 selection:bg-[var(--accent-primary)] selection:text-[var(--accent-text)] transition-colors duration-250">
      {/* Top back navigation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2"
        >
          ← Back to Landing Page
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/" className="flex items-center gap-1.5 group">
            <div className="w-5 h-5 rounded-full border border-[var(--text-primary)] flex items-center justify-center text-[var(--text-primary)] text-[10px] font-bold font-mono group-hover:rotate-90 transition-transform duration-300">
              ✕
            </div>
            <span className="font-serif italic text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              PixelProof
            </span>
          </Link>
        </div>
      </div>

      {/* Centered Login Card */}
      <div className="my-auto flex justify-center items-center py-6">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[440px] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[24px] p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors duration-250"
        >
          {/* Subtle top organic accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-primary)]" />

          {/* Top Bar: Label & Close Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] text-[10px] font-mono tracking-wider font-semibold uppercase border border-[var(--border-subtle)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]"></span>
              // PIXELPROOF AUTH
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label="Close and return to landing page"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tag)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title and Subtitle */}
          <div className="mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-1.5">
              {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {mode === 'signin'
                ? 'Continue your frontend engineering challenges.'
                : 'Save your challenge progress, scores, and improvement over time.'}
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* GitHub */}
            <button
              type="button"
              disabled
              title="GitHub sign-in is coming soon"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-tag)] transition-all shadow-xs"
            >
              <svg className="w-4 h-4 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </button>

            {/* Google */}
            <button
              type="button"
              disabled
              title="Google sign-in is coming soon"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-tag)] transition-all shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[var(--border-subtle)] w-full" />
            <span className="bg-[var(--bg-card)] px-3 font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)] whitespace-nowrap absolute">
              OR WITH EMAIL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-[var(--bg-surface-secondary)] border border-[var(--border-strong)] text-[var(--accent-amber)] text-xs leading-relaxed" role="alert">
                {error}
              </div>
            )}
            {message && (
              <div className="p-2.5 rounded-lg bg-[var(--bg-surface-secondary)] border border-[var(--accent-sage)] text-[var(--text-primary)] text-xs leading-relaxed" role="status">
                {message}
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1.5 text-left">
                <label htmlFor={displayNameId} className="block font-mono text-[11px] font-semibold text-[var(--text-primary)]">
                  Display Name
                </label>
                <input
                  id={displayNameId}
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Alex"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all shadow-2xs"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label htmlFor={emailId} className="block font-mono text-[11px] font-semibold text-[var(--text-primary)]">
                Email Address
              </label>
              <input 
                id={emailId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@pixelproof.dev"
                className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all shadow-2xs"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label htmlFor={passwordId} className="font-mono text-[11px] font-semibold text-[var(--text-primary)]">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); setError('Password reset instructions will be sent once backend is connected.'); }}
                  className="font-mono text-[11px] text-[var(--accent-primary)] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input 
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all shadow-2xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1 text-left">
              <input 
                id={rememberId}
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border-subtle)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] accent-[var(--accent-primary)] cursor-pointer"
              />
              <label htmlFor={rememberId} className="text-xs text-[var(--text-secondary)] cursor-pointer select-none">
                Keep me signed in on this device
              </label>
            </div>

            {/* Primary Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-full bg-[var(--accent-primary)] text-[var(--accent-text)] font-mono text-xs tracking-wider uppercase font-semibold hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.01] shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'PLEASE WAIT...' : mode === 'signin' ? 'SIGN IN TO PIXELPROOF' : 'CREATE MY ACCOUNT'}</span>
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

          {/* Footer Prompt */}
          <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              {mode === 'signin' ? 'New to PixelProof?' : 'Already have an account?'}{' '}
              <a 
                href={mode === 'signin' ? '#signup' : '#signin'}
                onClick={(e) => {
                  e.preventDefault();
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError(null);
                  setMessage(null);
                }}
                className="font-semibold text-[var(--accent-primary)] hover:underline"
              >
                {mode === 'signin' ? 'Create an account' : 'Sign in'}
              </a>
            </p>

            {/* Security status */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]"></span>
              <span>256-BIT ENCRYPTED SESSION</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom minimal note */}
      <div className="text-center text-xs font-mono text-[var(--text-muted)] py-2">
        © {new Date().getFullYear()} PixelProof. Protected by secure challenge protocols.
      </div>
    </div>
  );
}
