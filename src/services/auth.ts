import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '../lib/supabase'

export async function signUp(email: string, password: string, displayName: string) {
  const { data, error } = await getSupabaseClient().auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName.trim() || 'PixelProof learner' },
      emailRedirectTo: `${window.location.origin}/auth`,
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await getSupabaseClient().auth.signOut()
  if (error) throw error
}

export async function sendPasswordReset(email: string) {
  const { error } = await getSupabaseClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth?reset=1`,
  })
  if (error) throw error
}

export async function updatePassword(password: string) {
  const { data, error } = await getSupabaseClient().auth.updateUser({ password })
  if (error) throw error
  return data
}

export async function getCurrentSession() {
  const { data, error } = await getSupabaseClient().auth.getSession()
  if (error) throw error
  return data.session
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  return getSupabaseClient().auth.onAuthStateChange(callback).data.subscription
}
