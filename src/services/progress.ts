import { getSupabaseClient } from '../lib/supabase'

export type ChallengeProgress = {
  user_id: string
  challenge_id: string
  attempt_count: number
  best_score: number
  latest_score: number
  completed: boolean
  completed_at: string | null
  last_attempted_at: string
}

export type PerformanceSummary = {
  user_id: string
  total_attempts: number
  completed_challenges: number
  average_score: number
  best_score: number
  visual_accuracy: number
  responsive_accuracy: number
  accessibility_accuracy: number
  code_quality_accuracy: number
  last_active_at: string
}

export async function getUserProgress() {
  const { data, error } = await getSupabaseClient()
    .from('user_challenge_progress')
    .select('*')
    .order('challenge_id')

  if (error) throw error
  return data as ChallengeProgress[]
}

export async function getPerformanceSummary() {
  const { data, error } = await getSupabaseClient()
    .from('user_performance_summary')
    .select('*')
    .maybeSingle()

  if (error) throw error
  return data as PerformanceSummary | null
}
