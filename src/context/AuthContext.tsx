import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getCurrentSession, onAuthStateChange } from '../services/auth'
import { isSupabaseConfigured } from '../lib/supabase'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let active = true
    void getCurrentSession()
      .then((currentSession) => {
        if (active) setSession(currentSession)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    const subscription = onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession)
        setLoading(false)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({ user: session?.user ?? null, session, loading, configured: isSupabaseConfigured }),
    [session, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
