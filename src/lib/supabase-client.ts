import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_API_KEY || "" )

export default supabase;