import { useState, type FormEvent } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { signIn, signUp } from '../services/auth'
import { useAuth } from '../context/auth-context'

type Mode = 'signin' | 'signup'

export default function AuthPage() {
  const { user, loading, configured } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  if (!loading && user) return <Navigate to="/" replace />

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode)
    setError('')
    setMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      if (mode === 'signup') {
        const result = await signUp(email.trim(), password, displayName)
        if (!result.session) {
          setMessage('Account created. Check your email to confirm it, then sign in.')
        }
      } else {
        await signIn(email.trim(), password)
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Authentication failed. Please retry.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080909] text-white grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden lg:flex relative overflow-hidden border-r border-white/10 p-14 flex-col justify-between bg-grain">
        <Link to="/" className="font-mono text-sm tracking-[0.24em] font-bold uppercase">
          Pixel<span className="text-[#ccff00]">Proof</span>
        </Link>
        <div className="relative z-10 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ccff00] mb-6">Your progress, proven</p>
          <h1 className="text-6xl xl:text-7xl font-medium tracking-[-0.06em] leading-[0.92]">
            BUILD. SUBMIT.<br />IMPROVE. REPEAT.
          </h1>
          <p className="mt-7 max-w-md text-neutral-400 text-lg leading-relaxed">
            Save every attempt, follow your strongest skills, and continue exactly where you stopped.
          </p>
        </div>
        <p className="font-mono text-xs text-neutral-600 uppercase tracking-widest">Six challenges · One measurable journey</p>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-block mb-12 font-mono text-sm tracking-[0.24em] font-bold uppercase">
            Pixel<span className="text-[#ccff00]">Proof</span>
          </Link>

          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ccff00] mb-3">
            {mode === 'signin' ? 'Welcome back' : 'Create your profile'}
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">
            {mode === 'signin' ? 'Continue building.' : 'Start your progress.'}
          </h2>
          <p className="mt-3 text-neutral-400">
            {mode === 'signin'
              ? 'Sign in to restore your attempts and scores.'
              : 'Your challenge history will be available on any device.'}
          </p>

          {!configured && (
            <div className="mt-7 border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Supabase is not configured in this environment.
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label className="block">
                <span className="block mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">Display name</span>
                <input
                  required
                  autoComplete="name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="w-full rounded-none border border-white/15 bg-white/[0.035] px-4 py-3.5 outline-none transition focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]"
                />
              </label>
            )}

            <label className="block">
              <span className="block mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">Email</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-none border border-white/15 bg-white/[0.035] px-4 py-3.5 outline-none transition focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">Password</span>
              <input
                required
                minLength={6}
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-none border border-white/15 bg-white/[0.035] px-4 py-3.5 outline-none transition focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]"
              />
              {mode === 'signup' && <span className="mt-2 block text-xs text-neutral-600">Minimum six characters.</span>}
            </label>

            {error && <p role="alert" className="border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
            {message && <p role="status" className="border border-[#ccff00]/30 bg-[#ccff00]/10 px-4 py-3 text-sm text-[#ddff55]">{message}</p>}

            <button
              type="submit"
              disabled={submitting || !configured}
              className="w-full bg-[#ccff00] px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            {mode === 'signin' ? 'New to PixelProof?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-[#ccff00]"
            >
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </section>
    </main>
  )
}
