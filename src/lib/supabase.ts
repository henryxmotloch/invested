
import { createClient } from '@supabase/supabase-js'

// Redirect to the integrated Supabase client to maintain consistency
import { supabase as supabaseClient } from '@/integrations/supabase/client'

export const supabase = supabaseClient
