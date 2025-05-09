import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useAuth as useAuthFromProvider } from '@/components/AuthProvider'

// Re-export the hook from AuthProvider for backwards compatibility
export const useAuth = useAuthFromProvider;

// Keep the existing implementation as a separate export for any code that might be using it directly
export function useAuthLegacy() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
